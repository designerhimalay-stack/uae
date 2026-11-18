// node tools/audit/quality.mjs <origin> <base> <out.json> <slug>...
// Second strict pass: polish and performance the layout audit cannot see.
//  wrapped buttons/pills (all widths) · one-word last lines in headings (1440, 390)
//  · over-long text lines (1440) · lazy hero image / LCP · layout shift (CLS) while
//  loading and scrolling on a throttled phone · mega menus inside the screen at
//  1024 and 1440 · new-tab links without rel=noopener · http links · mailto forms.
import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";

const [origin, base, out, ...slugs] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const report = [];

const PAGE = ([vw]) => {
  const out = [];
  const where = (el) => { const s = el.closest("section[id], header, footer"); return s ? (s.id ? `#${s.id}` : s.tagName.toLowerCase()) : "page"; };
  const vis = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== "none" && s.visibility !== "hidden" && r.width > 2 && r.height > 2 && !el.closest("[aria-hidden='true']"); };
  // Buttons and tabs whose label wraps onto a second line: count the distinct line
  // tops of the visible text (rolling-text duplicates are aria-hidden and skipped).
  const lineTops = (el) => {
    const tops = [];
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    for (let n = walk.nextNode(); n; n = walk.nextNode()) {
      if (!n.textContent.trim() || n.parentElement.closest("[aria-hidden='true']")) continue;
      const r = document.createRange(); r.selectNodeContents(n);
      for (const rc of r.getClientRects()) if (rc.width > 1 && rc.height > 1 && !tops.some((t) => Math.abs(t - rc.top) < 6)) tops.push(rc.top);
    }
    return tops.length;
  };
  for (const el of document.querySelectorAll("a[class*='btn'], a[class*='Btn'], a[class*='button'], a[class*='Button'], a[class*='cta'], button, [role='tab']")) {
    if (!vis(el)) continue;
    const label = [...el.querySelectorAll("*"), el].filter((x) => !x.closest("[aria-hidden='true']")).map((x) => [...x.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join("")).join("").replace(/\s+/g, " ").trim();
    if (!label || label.length > 36 || /read more|show less/i.test(label) || el.hasAttribute("aria-expanded")) continue; // FAQ questions wrap by nature
    if (el.querySelectorAll("p, h3, h4, li").length) continue; // card-sized buttons (accordions, tiles) hold text blocks
    if (lineTops(el) > 1) out.push({ kind: "wrapped-button", where: where(el), detail: `"${label.slice(0, 40)}" ${Math.round(el.getBoundingClientRect().width)}px wide` });
  }
  // Headings whose last line is a single short word (widow).
  if (vw === 1440 || vw === 390) for (const h of document.querySelectorAll("h1, h2, h3")) {
    if (!vis(h)) continue;
    const words = h.innerText.trim().split(/\s+/); if (words.length < 4) continue;
    const range = document.createRange(); range.selectNodeContents(h);
    const rects = [...range.getClientRects()].filter((r) => r.width > 1);
    const lines = [...new Set(rects.map((r) => Math.round(r.top)))];
    if (lines.length < 2) continue;
    const lastTop = Math.max(...lines);
    const lastWidth = rects.filter((r) => Math.round(r.top) === lastTop).reduce((a, r) => a + r.width, 0);
    const lastWord = words[words.length - 1];
    if (lastWidth < h.getBoundingClientRect().width * 0.18 && lastWord.length <= 9) out.push({ kind: "heading-widow", where: where(h), detail: `"…${words.slice(-3).join(" ")}" last line ${Math.round(lastWidth)}px` });
  }
  // Over-long lines of body text on desktop (readability: about 90 characters max).
  if (vw === 1440) for (const p of document.querySelectorAll("main p")) {
    if (!vis(p) || p.innerText.length < 160) continue;
    const s = getComputedStyle(p); const chars = p.getBoundingClientRect().width / (parseFloat(s.fontSize) * 0.5);
    if (chars > 100) out.push({ kind: "long-line", where: where(p), detail: `~${Math.round(chars)} chars per line "${p.innerText.slice(0, 40)}"` });
  }
  // Links and forms.
  for (const a of document.querySelectorAll("a[target='_blank']")) if (!/noopener|noreferrer/.test(a.rel)) out.push({ kind: "blank-no-noopener", where: where(a), detail: a.href });
  for (const a of document.querySelectorAll("a[href^='http:']")) out.push({ kind: "http-link", where: where(a), detail: a.href });
  // The contact form opens a mailto: link (known launch item: no lead backend yet); report it on the home page only.
  if (/^\/(au\/|in\/|uae\/)?$/.test(location.pathname)) for (const f of document.querySelectorAll("form")) { const act = f.getAttribute("action") || ""; if (/^mailto:/i.test(act) || !act) out.push({ kind: "form-destination", where: where(f), detail: act ? act : "no action: the form builds a mailto: link, so leads are not stored or tracked" }); }
  // The first large image (hero / LCP candidate) must not lazy-load.
  const hero = [...document.images].find((i) => { const r = i.getBoundingClientRect(); return vis(i) && r.top < innerHeight && r.width * r.height > 60000; });
  if (hero && hero.loading === "lazy") out.push({ kind: "lazy-hero", where: where(hero), detail: hero.currentSrc.split("/").pop() });
  return [...new Map(out.map((o) => [o.kind + o.where + o.detail, o])).values()];
};

for (const slug of slugs) {
  const url = `${origin}${base}${slug === "/" ? "" : `${slug}/`}`;
  const findings = [];
  for (const vw of [1440, 1024, 390, 320]) {
    const ctx = await b.newContext({ viewport: { width: vw, height: vw < 810 ? 844 : 900 }, deviceScaleFactor: vw < 810 ? 3 : 1, isMobile: vw < 810, hasTouch: vw < 810 });
    const p = await ctx.newPage();
    let cdp = null;
    // PERF=0 skips the throttled CLS/LCP measurement (run it on one page per template instead).
    if (vw === 390 && process.env.PERF !== "0") {
      cdp = await ctx.newCDPSession(p);
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      await cdp.send("Network.enable");
      await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 80, downloadThroughput: 6e6 / 8, uploadThroughput: 1e6 / 8 });
      await p.addInitScript(() => {
        window.__cls = 0; window.__shifts = [];
        new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) { window.__cls += e.value; if (e.value > 0.02) window.__shifts.push({ v: e.value, nodes: (e.sources || []).map((s) => (s.node?.closest?.("section[id]")?.id || s.node?.nodeName || "?")).slice(0, 3) }); } }).observe({ type: "layout-shift", buffered: true });
        new PerformanceObserver((l) => { const e = l.getEntries().at(-1); window.__lcp = { t: e.startTime, el: e.element?.tagName + (e.element?.currentSrc ? " " + e.element.currentSrc.split("/").pop() : "") }; }).observe({ type: "largest-contentful-paint", buffered: true });
      });
    }
    try { await p.goto(url, { waitUntil: "load", timeout: 90000 }); } catch (e) { findings.push({ vw, kind: "load-failed", where: "page", detail: String(e).slice(0, 80) }); await ctx.close(); continue; }
    await p.waitForLoadState("networkidle", { timeout: 60000 }).catch(() => {});
    // LCP as a visitor gets it: browsers stop recording at the first scroll, so read it before scrolling.
    const lcpBeforeScroll = vw === 390 && process.env.PERF !== "0" ? await p.evaluate(() => window.__lcp) : null;
    const h = await p.evaluate(() => document.body.scrollHeight);
    for (let y = 0; y < h; y += 500) { await p.evaluate((y) => scrollTo(0, y), y); await p.waitForTimeout(vw === 390 && process.env.PERF !== "0" ? 120 : 30); }
    await p.waitForTimeout(400);
    await p.evaluate(() => scrollTo(0, 0)); await p.waitForTimeout(200);
    for (const f of await p.evaluate(PAGE, [vw])) findings.push({ vw, ...f });
    if (vw === 390 && process.env.PERF !== "0") {
      const m = await p.evaluate(() => ({ cls: window.__cls, shifts: window.__shifts }));
      m.lcp = lcpBeforeScroll;
      if (m.cls > 0.1) findings.push({ vw, kind: "layout-shift", where: "page", detail: `CLS ${m.cls.toFixed(3)} (needs ≤ 0.1) ${JSON.stringify(m.shifts.slice(0, 3))}` });
      if (m.lcp && m.lcp.t > 2500) findings.push({ vw, kind: "slow-lcp", where: "page", detail: `LCP ${Math.round(m.lcp.t)} ms on a throttled phone (needs ≤ 2500) ${m.lcp.el}` });
    }
    // Mega menus at desktop widths: hover each trigger and keep the panel on screen.
    if (vw === 1440 || vw === 1024) {
      for (const t of (await p.locator("header button[aria-expanded], nav button[aria-expanded]").all()).slice(0, 5)) {
        if (!(await t.isVisible().catch(() => false))) continue;
        await t.hover().catch(() => {}); await t.click({ timeout: 1500 }).catch(() => {}); await p.waitForTimeout(450);
        const bad = await p.evaluate((vw) => { const out = []; for (const el of document.querySelectorAll("header [class*='panel'], header [class*='Panel'], header [class*='mega'], header [class*='Mega'], header [role='menu'], nav [class*='panel'], nav [class*='Panel'], nav [role='menu']")) { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); if (s.display === "none" || s.visibility === "hidden" || parseFloat(s.opacity) < 0.2 || r.width < 200 || r.height < 80) continue; if (r.right > vw + 1 || r.left < -1) out.push(`panel ${Math.round(r.left)}..${Math.round(r.right)} past the edge`); if (r.bottom > innerHeight + 1) out.push(`panel bottom ${Math.round(r.bottom)} below the ${innerHeight}px screen`); } return [...new Set(out)]; }, vw);
        for (const d of bad) findings.push({ vw, kind: "menu", where: "nav", detail: `${(await t.innerText().catch(() => "")).trim()}: ${d}` });
        await p.keyboard.press("Escape").catch(() => {}); await p.mouse.move(5, 600); await p.waitForTimeout(200);
      }
    }
    await ctx.close();
  }
  report.push({ slug, findings });
  console.log(`${slug}: ${findings.length ? findings.length + " findings" : "clean"}`);
}
writeFileSync(out, JSON.stringify(report, null, 1));
await b.close();
