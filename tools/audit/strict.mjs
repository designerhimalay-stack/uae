// node tools/audit/strict.mjs <origin> <base> <out.json> [slug...]
//   e.g. node tools/audit/strict.mjs http://localhost:4321 /au/ out.json
// Strict audit of every page (slugs from <origin><base>sitemap or the args):
//  geometry at 1440/1024/390/320 · scroll states (stuck headers vs the nav) ·
//  interactions (tabs, accordions, Read more, nav menus) · network (failed,
//  duplicate, original or oversized images, fonts, console errors) · overlapping
//  or clipped text · stretched images · sparse cards on phones · contrast ·
//  accessibility basics · placeholder text · anchors under the nav.
import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";

const [origin, base, out, ...argSlugs] = process.argv.slice(2);
const WIDTHS = [1440, 1024, 390, 320];
const DEEP = new Set([1440, 390]);

async function slugs() {
  if (argSlugs.length) return argSlugs;
  const xml = await (await fetch(`${origin}${base}sitemap.xml`).catch(() => null))?.text().catch(() => "");
  const list = [...(xml || "").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname);
  if (list.length) return list.map((p) => p.slice(base.length).replace(/\/$/, "") || "/");
  throw new Error("no slugs: pass them or serve a sitemap.xml");
}

// ── In-page checks (run in the browser) ───────────────────────────────────
const GEOMETRY = ([vw, idx]) => {
  const out = [];
  // idx >= 0: only that top-level section (measured while it is on screen); -1: page-level only.
  const sections = [...document.querySelectorAll("section")].filter((s) => !s.parentElement.closest("section"));
  const root = idx >= 0 ? sections[idx] : null;
  const add = (kind, el, detail) => out.push({ kind, where: where(el), detail });
  const where = (el) => { const s = el?.closest?.("section[id], header, footer, nav"); return s ? (s.id ? `#${s.id}` : s.tagName.toLowerCase()) : "page"; };
  const vis = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== "none" && s.visibility !== "hidden" && parseFloat(s.opacity) > 0.05 && r.width > 0 && r.height > 0; };
  const hiddenTree = (el) => !!el.closest("[aria-hidden='true'], [hidden], dialog:not([open])");
  const fixedAnc = (el) => { for (let a = el; a && a !== document.body; a = a.parentElement) if (getComputedStyle(a).position === "fixed") return true; return false; };
  const clippedBy = (el) => { for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) { const s = getComputedStyle(a); if (/(hidden|clip)/.test(s.overflowX + s.overflowY + s.overflow)) return a; } return null; };
  const ownText = (el) => [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1);
  // What is actually on screen: the element's box cut by every clipping ancestor
  // (collapsed accordions and clamps leave nothing visible).
  const shown = (el) => {
    let r = el.getBoundingClientRect(); let L = r.left, T = r.top, R = r.right, B = r.bottom;
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
      const s = getComputedStyle(a);
      if (/(hidden|clip)/.test(s.overflowX + s.overflowY + s.overflow) || s.clipPath !== "none") { const c = a.getBoundingClientRect(); L = Math.max(L, c.left); T = Math.max(T, c.top); R = Math.min(R, c.right); B = Math.min(B, c.bottom); }
      if (parseFloat(s.opacity) < 0.05) return 0;
    }
    return Math.max(0, R - L) * Math.max(0, B - T);
  };
  const animated = (el) => { for (let a = el; a && a !== document.body; a = a.parentElement) if (getComputedStyle(a).animationName !== "none") return true; return false; };
  const srOnly = (el) => { const r = el.getBoundingClientRect(); return r.width <= 2 || r.height <= 2 || getComputedStyle(el).clip !== "auto"; };
  const moving = (el) => { for (let a = el; a && a !== root; a = a.parentElement) { const t = a.style?.transform; if (t && t !== "none" && !/^translate(Y|X|3d)?\(0(px)?(, ?0(px)?)*\)$/.test(t) && t !== "translateY(0px)") return true; } return false; };
  const stickyAnc = (el) => { for (let a = el; a && a !== document.body; a = a.parentElement) if (getComputedStyle(a).position === "sticky") return true; return false; };
  if (!root) {
    if (document.documentElement.scrollWidth > vw + 1) add("overflow-page", document.body, `${document.documentElement.scrollWidth}px wide`);
    return out;
  }
  const all = [...root.querySelectorAll("*")];
  const texts = all.filter((el) => ownText(el) && vis(el) && !hiddenTree(el) && !fixedAnc(el) && !srOnly(el) && shown(el) > 4);
  // Elements past the right edge and not clipped.
  for (const el of all) {
    if (!vis(el) || hiddenTree(el) || fixedAnc(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.right > vw + 1 || r.left < -1) { const c = clippedBy(el); if (!c || c.getBoundingClientRect().right > vw + 1) { add("overflow-element", el, `${el.tagName.toLowerCase()} ${Math.round(r.left)}..${Math.round(r.right)}`); break; } }
  }
  // Overlapping text (different, non-nested text elements).
  const rects = texts.map((el) => ({ el, r: el.getBoundingClientRect() }));
  let overlaps = 0;
  for (let i = 0; i < rects.length && overlaps < 6; i++) for (let j = i + 1; j < rects.length; j++) {
    const a = rects[i], b = rects[j];
    if (a.el.contains(b.el) || b.el.contains(a.el)) continue;
    if (stickyAnc(a.el) || stickyAnc(b.el)) continue; // a pinned header covering rows is intended
    if (moving(a.el) || moving(b.el)) continue; // mid scroll-driven animation (card stacks)
    const x = Math.min(a.r.right, b.r.right) - Math.max(a.r.left, b.r.left), y = Math.min(a.r.bottom, b.r.bottom) - Math.max(a.r.top, b.r.top);
    if (x <= 2 || y <= 2) continue;
    const small = Math.min(a.r.width * a.r.height, b.r.width * b.r.height);
    if ((x * y) / small > 0.25) { add("overlap-text", a.el, `"${a.el.textContent.trim().slice(0, 30)}" × "${b.el.textContent.trim().slice(0, 30)}"`); overlaps++; break; }
  }
  // Clipped text (cut off, not an intentional clamp or ellipsis).
  for (const el of texts) {
    const s = getComputedStyle(el);
    if (s.webkitLineClamp !== "none" && s.webkitLineClamp) continue;
    if (s.textOverflow === "ellipsis") continue;
    if (animated(el)) continue; // tickers and marquees scroll on purpose
    if (/(hidden|clip)/.test(s.overflowX + s.overflowY) && (el.scrollWidth > el.clientWidth + 2 || el.scrollHeight > el.clientHeight + 3)) add("clipped-text", el, `"${el.textContent.trim().slice(0, 40)}"`);
    const c = clippedBy(el);
    if (c) { const r = el.getBoundingClientRect(), cr = c.getBoundingClientRect(); if ((r.right > cr.right + 2 || r.bottom > cr.bottom + 3) && !c.closest("[class*='marquee'], [class*='ticker'], [class*='Marquee'], [class*='Ticker']") && getComputedStyle(c).webkitLineClamp === "none") add("clipped-text", el, `"${el.textContent.trim().slice(0, 40)}" cut by ${c.className.toString().slice(0, 24)}`); }
  }
  // Words too wide for their box: they split mid-word ("Snowfla / ke") or overflow.
  const ctx2 = document.createElement("canvas").getContext("2d");
  let split = 0;
  for (const el of texts) {
    if (split >= 6) break;
    const s = getComputedStyle(el);
    const box = el.getBoundingClientRect().width;
    if (box < 30 || s.whiteSpace === "nowrap") continue;
    ctx2.font = `${s.fontWeight} ${s.fontSize} ${s.fontFamily}`;
    const own = [...el.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent).join(" ");
    // Hyphens and slashes are normal break points ("Human-in-the-" / "loop"), so measure the parts between them.
    const longest = own.split(/[\s/\-‐–]+/).filter(Boolean).sort((a, b) => ctx2.measureText(b).width - ctx2.measureText(a).width)[0];
    if (!longest || longest.length < 4) continue;
    const ls = parseFloat(s.letterSpacing) || 0;
    const need = ctx2.measureText(longest).width + ls * longest.length;
    if (need > box + 1) { add("word-split", el, `"${longest}" needs ${Math.round(need)}px, box ${Math.round(box)}px`); split++; }
  }
  // Tiny text.
  for (const el of texts) { const f = parseFloat(getComputedStyle(el).fontSize); if (f < 12) { add("tiny-text", el, `${f}px "${el.textContent.trim().slice(0, 30)}"`); break; } }
  // Contrast (text on its first solid background; skipped over images).
  const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const [r, g, b, a = 1] = m[1].split(/[ ,/]+/).filter(Boolean).map(Number); return { r, g, b, a }; };
  const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
  let lowContrast = 0;
  for (const el of texts) {
    if (lowContrast >= 8) break;
    if (el.closest("[class*='_word_']")) continue; // scroll word-fill headings start faint by design
    const s = getComputedStyle(el);
    const fg = parse(s.color); if (!fg || fg.a < 0.4) continue;
    let bg = null, overImage = false;
    for (let a = el; a; a = a.parentElement) {
      const as = getComputedStyle(a);
      if (as.backgroundImage !== "none") { overImage = true; break; }
      const c = parse(as.backgroundColor);
      if (c && c.a > 0.85) { bg = c; break; }
      if (a.querySelector(":scope > img, :scope > picture, :scope > video")) { overImage = true; break; }
    }
    if (overImage || !bg) continue;
    const mix = (c, b) => ({ r: c.r * c.a + b.r * (1 - c.a), g: c.g * c.a + b.g * (1 - c.a), b: c.b * c.a + b.b * (1 - c.a) });
    const L1 = lum(mix(fg, bg)), L2 = lum(bg);
    const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
    const size = parseFloat(s.fontSize), bold = parseInt(s.fontWeight) >= 600;
    const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
    if (ratio < need) { add("contrast", el, `${ratio.toFixed(2)}:1 (needs ${need}) ${size}px "${el.textContent.trim().slice(0, 30)}"`); lowContrast++; }
  }
  // Stretched images.
  for (const img of document.images) {
    if (!vis(img) || !img.naturalWidth || /\.svg(\?|$)/i.test(img.currentSrc)) continue; // SVGs keep their own aspect
    const fit = getComputedStyle(img).objectFit;
    if (fit === "cover" || fit === "contain" || fit === "scale-down") continue;
    const r = img.getBoundingClientRect();
    const want = img.naturalWidth / img.naturalHeight, got = r.width / r.height;
    if (Math.abs(got - want) / want > 0.04 && r.width > 40) add("stretched-image", img, `${img.currentSrc.split("/").pop()} ${Math.round(r.width)}x${Math.round(r.height)} vs ${img.naturalWidth}x${img.naturalHeight}`);
  }
  // Broken images (loaded but zero size).
  for (const img of document.images) if (img.complete && img.naturalWidth === 0 && vis(img) && img.getAttribute("src")) add("broken-image", img, img.getAttribute("src").split("/").pop());
  // Sparse cards on phones: a wide card whose content covers little of it.
  if (vw < 810) {
    for (const el of all) {
      if (!vis(el) || hiddenTree(el)) continue;
      const s = getComputedStyle(el); const r = el.getBoundingClientRect();
      const looksCard = parseFloat(s.borderTopLeftRadius) >= 12 && (parse(s.backgroundColor)?.a ?? 0) > 0.5 && r.width >= vw * 0.75 && r.height >= 90 && r.height < 700;
      if (!looksCard || /^(INPUT|TEXTAREA|SELECT|BUTTON)$/.test(el.tagName) || el.querySelector("img[class*='photo'], picture, video, table, form, iframe, input, textarea, select")) continue;
      let area = 0;
      for (const t of el.querySelectorAll("*")) { if (!vis(t) || t.children.length) continue; const tr = t.getBoundingClientRect(); area += tr.width * tr.height; }
      if (area / (r.width * r.height) < 0.1) add("sparse-card", el, `${Math.round(r.width)}x${Math.round(r.height)} content ${Math.round((area / (r.width * r.height)) * 100)}%`);
    }
  }
  // "Read more" with nothing more to read (its copy already fits the clamp).
  if (vw < 810) for (const lab of root.querySelectorAll("label")) {
    if (!/^read more/i.test(lab.textContent.trim()) || !vis(lab)) continue;
    const p = lab.previousElementSibling;
    if (p && p.tagName === "P" && p.scrollHeight <= p.clientHeight + 1) add("readmore-noop", lab, `"${p.textContent.trim().slice(0, 40)}"`);
  }
  // Tap targets on phones.
  if (vw < 810) for (const el of document.querySelectorAll("a, button, [role='tab'], label[for]")) {
    if (!vis(el) || hiddenTree(el) || srOnly(el) || shown(el) < 4) continue;
    const r = el.getBoundingClientRect();
    const inline = getComputedStyle(el).display === "inline" && el.closest("p, li");
    if (!inline && (r.height < 32 || r.width < 32) && el.textContent.trim().length < 40) { add("tap-target", el, `${Math.round(r.width)}x${Math.round(r.height)} "${(el.textContent.trim() || el.getAttribute("aria-label") || "").slice(0, 24)}"`); }
  }
  // Sub-page hero title: two lines at desktop (CLAUDE.md; the home hero is its own design).
  const h1 = root.querySelector("h1");
  const home = /^\/(au\/|in\/|uae\/)?$/.test(location.pathname);
  if (vw >= 1200 && h1 && !home && root.id === "top") { const lh = parseFloat(getComputedStyle(h1).lineHeight); const lines = Math.round(h1.getBoundingClientRect().height / lh); if (lines !== 2) add("hero-lines", h1, `${lines} lines "${h1.textContent.trim().slice(0, 40)}"`); }
  return out;
};

const STATIC = () => {
  const out = [];
  const add = (kind, detail) => out.push({ kind, where: "page", detail });
  for (const img of document.images) if (!img.hasAttribute("alt")) add("img-no-alt", img.getAttribute("src")?.split("/").pop());
  for (const el of document.querySelectorAll("a[href], button")) {
    const name = (el.textContent.trim() || el.getAttribute("aria-label") || el.getAttribute("title") || [...el.querySelectorAll("img[alt]")].map((i) => i.alt).join("")).trim();
    if (!name && !el.closest("[aria-hidden='true']")) add("unnamed-control", `${el.tagName.toLowerCase()} ${el.getAttribute("href") || el.className.toString().slice(0, 30)}`);
  }
  const ids = {}; for (const el of document.querySelectorAll("[id]")) ids[el.id] = (ids[el.id] || 0) + 1;
  for (const [id, n] of Object.entries(ids)) if (n > 1) add("duplicate-id", `#${id} ×${n}`);
  for (const el of document.querySelectorAll("input:not([type=hidden]):not([type=checkbox]), textarea, select")) {
    const labelled = el.labels?.length || el.getAttribute("aria-label") || el.getAttribute("aria-labelledby") || el.getAttribute("placeholder");
    if (!labelled) add("unlabelled-field", el.name || el.id || el.type);
  }
  const text = document.body.innerText;
  for (const bad of ["undefined", "NaN", "[object Object]", "TODO", "Lorem ipsum", "lorem ipsum", "null null"]) if (text.includes(bad)) add("placeholder-text", bad);
  if (!document.documentElement.lang) add("no-lang", "html lang missing");
  // In-page anchors: the target exists and clears the nav when jumped to.
  for (const a of document.querySelectorAll("a[href^='#']")) {
    const id = a.getAttribute("href").slice(1); if (!id || id === "main" || id === "top") continue; // skip link and back-to-top
    const t = document.getElementById(id);
    if (!t) { add("anchor-missing", `#${id}`); continue; }
    const sec = t.closest("section") || t;
    const sm = Math.max(parseFloat(getComputedStyle(t).scrollMarginTop) || 0, parseFloat(getComputedStyle(sec).scrollMarginTop) || 0, parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0);
    const pad = parseFloat(getComputedStyle(sec).paddingTop) || 0;
    if (sm + pad < 72) add("anchor-under-nav", `#${id} (margin ${sm} + padding ${pad})`);
  }
  return [...new Map(out.map((o) => [o.kind + o.detail, o])).values()];
};

// Scroll states: at each step, every stuck sticky element must not sit under the
// nav, and nothing but the nav may show in the gap above it.
const STICKY_STEP = () => {
  const out = [];
  const navs = [...document.querySelectorAll("body *")].filter((el) => { const s = getComputedStyle(el); return s.position === "fixed" && el.getBoundingClientRect().top < 40 && el.getBoundingClientRect().height < 160 && el.getBoundingClientRect().height > 20; });
  const navBottom = Math.max(0, ...navs.map((n) => n.getBoundingClientRect().bottom));
  const inNav = (el) => navs.some((n) => n.contains(el));
  for (const el of document.querySelectorAll("body *")) {
    const s = getComputedStyle(el);
    if (s.position !== "sticky") continue;
    const top = parseFloat(s.top); if (Number.isNaN(top)) continue;
    const r = el.getBoundingClientRect();
    if (Math.abs(r.top - top) > 1.5 || r.bottom <= 0 || r.height < 10) continue; // not stuck
    const where = el.closest("section[id]")?.id ?? "?";
    if (r.top < navBottom - 4 && r.right > 0) {
      const overlapsNav = navs.some((n) => { const nr = n.getBoundingClientRect(); return nr.left < r.right && nr.right > r.left; });
      if (overlapsNav) out.push({ kind: "sticky-under-nav", where: `#${where}`, detail: `${el.tagName.toLowerCase()} stuck at ${Math.round(r.top)} under nav ending ${Math.round(navBottom)}` });
    }
    // Only pinned headers (table heads, bars) must cover the gap above them; a pinned
    // side photo beside scrolling text is fine.
    const header = el.tagName === "TH" || el.tagName === "THEAD" || r.width >= innerWidth * 0.6;
    if (r.top > 6 && header) {
      // Probe the gap above the stuck element across its width.
      for (const fx of [0.05, 0.25, 0.5, 0.75, 0.95]) for (const fy of [0.3, 0.7]) {
        const x = r.left + r.width * fx, y = r.top * fy;
        const hit = document.elementFromPoint(x, y);
        if (!hit || inNav(hit) || el.contains(hit) || hit === el) continue;
        const hasText = [...hit.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 1) || /^(P|SPAN|H[1-6]|LI|TD|TH|A|IMG|STRONG|DT|DD)$/.test(hit.tagName);
        if (hasText) { out.push({ kind: "content-above-sticky", where: `#${where}`, detail: `"${(hit.textContent || hit.alt || hit.tagName).trim().slice(0, 30)}" shows above a header stuck at ${Math.round(r.top)}` }); return out; }
      }
    }
  }
  return out;
};

// ── Runner ────────────────────────────────────────────────────────────────
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const report = [];
const list = await slugs();
for (const slug of list) {
  const url = `${origin}${base}${slug === "/" ? "" : `${slug}/`}`;
  const findings = [];
  for (const vw of WIDTHS) {
    const ctx = await b.newContext({ viewport: { width: vw, height: vw < 810 ? 844 : 900 }, deviceScaleFactor: vw < 810 ? 3 : 1, isMobile: vw < 810, hasTouch: vw < 810 });
    const p = await ctx.newPage();
    const net = { failed: [], status: [], images: new Map(), fonts: new Set(), console: [] };
    p.on("console", (m) => { if (m.type() === "error") net.console.push(m.text().slice(0, 140)); });
    p.on("pageerror", (e) => net.console.push(`pageerror ${String(e).slice(0, 140)}`));
    p.on("requestfailed", (r) => { if (!/favicon/.test(r.url())) net.failed.push(`${r.resourceType()} ${r.url().replace(origin, "")}`); });
    p.on("response", async (r) => {
      const u = r.url().replace(origin, "");
      if (r.status() >= 400 && !/favicon/.test(u)) net.status.push(`${r.status()} ${u}`);
      const t = r.request().resourceType();
      if (t === "font") net.fonts.add(u);
      if (t === "image" && r.status() < 300) { const len = Number(r.headers()["content-length"] || 0); const prev = net.images.get(u); net.images.set(u, { n: (prev?.n ?? 0) + 1, kb: Math.max(prev?.kb ?? 0, len / 1024) }); }
    });
    try {
      await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    } catch (e) { findings.push({ vw, kind: "load-failed", where: "page", detail: String(e).slice(0, 100) }); await ctx.close(); continue; }
    // INJECT_CSS lets a test re-create a known bug to prove a detector catches it.
    if (process.env.INJECT_CSS) await p.addStyleTag({ content: process.env.INJECT_CSS });
    const h = await p.evaluate(() => document.body.scrollHeight);
    // Scroll through: sticky states at every step (deep widths), reveal everything.
    for (let y = 0; y < h; y += DEEP.has(vw) ? 280 : 700) {
      await p.evaluate((y) => scrollTo(0, y), y);
      // Long enough for scroll-driven UI (React state, rAF) to settle, as a reader would see it.
      await p.waitForTimeout(DEEP.has(vw) ? 220 : 30);
      if (DEEP.has(vw)) for (const f of await p.evaluate(STICKY_STEP)) findings.push({ vw, ...f });
    }
    await p.waitForTimeout(400);
    // Geometry section by section, each measured while it sits just under the nav
    // (scroll-driven layouts are judged in the state a reader sees them in).
    for (const f of await p.evaluate(GEOMETRY, [vw, -1])) findings.push({ vw, ...f });
    const count = await p.evaluate(() => [...document.querySelectorAll("section")].filter((s) => !s.parentElement.closest("section")).length);
    for (let i = 0; i < count; i++) {
      await p.evaluate((i) => { const s = [...document.querySelectorAll("section")].filter((x) => !x.parentElement.closest("section"))[i]; scrollTo(0, s.getBoundingClientRect().top + scrollY - 110); }, i);
      await p.waitForTimeout(260);
      for (const f of await p.evaluate(GEOMETRY, [vw, i])) findings.push({ vw, ...f });
    }
    if (vw === 1440) for (const f of await p.evaluate(STATIC)) findings.push({ vw, ...f });

    // Interactions (deep widths): tabs, disclosure buttons, Read more, nav menus.
    if (DEEP.has(vw)) {
      const sels = ["[role='tab']", "main button[aria-expanded]", "main label[for]"];
      for (const sel of sels) {
        const els = await p.locator(sel).all();
        for (const el of els.slice(0, 14)) {
          if (!(await el.isVisible().catch(() => false))) continue;
          await el.scrollIntoViewIfNeeded().catch(() => {});
          await el.click({ timeout: 2000, force: true }).catch(() => {});
          await p.waitForTimeout(220);
        }
      }
      await p.waitForLoadState("networkidle").catch(() => {});
      await p.waitForTimeout(700); // let accordions and tab panels finish animating
      for (const f of await p.evaluate(GEOMETRY, [vw, -1])) findings.push({ vw, ...f, detail: `after interaction: ${f.detail}` });
      for (let i = 0; i < count; i++) {
        const hasControls = await p.evaluate((i) => { const s = [...document.querySelectorAll("section")].filter((x) => !x.parentElement.closest("section"))[i]; return !!s.querySelector("[role='tab'], button[aria-expanded], label[for]"); }, i);
        if (!hasControls) continue;
        await p.evaluate((i) => { const s = [...document.querySelectorAll("section")].filter((x) => !x.parentElement.closest("section"))[i]; scrollTo(0, s.getBoundingClientRect().top + scrollY - 110); }, i);
        await p.waitForTimeout(260);
        for (const f of (await p.evaluate(GEOMETRY, [vw, i])).filter((f) => /overflow|overlap|broken|stretched|clipped/.test(f.kind))) findings.push({ vw, ...f, detail: `after interaction: ${f.detail}` });
      }
      // Nav menus.
      const triggers = await p.locator("header button[aria-expanded], nav button[aria-expanded]").all();
      for (const t of triggers.slice(0, 6)) {
        if (!(await t.isVisible().catch(() => false))) continue;
        await p.evaluate(() => scrollTo(0, 0));
        await t.click({ timeout: 2000 }).catch(() => {});
        await p.waitForTimeout(400);
        const menu = await p.evaluate((vw) => {
          const vh = innerHeight; const out = [];
          for (const el of document.querySelectorAll("[role='menu'], [class*='panel'], [class*='Panel'], [class*='menu'], [class*='Menu'], [class*='drawer'], [class*='Drawer']")) {
            const s = getComputedStyle(el); const r = el.getBoundingClientRect();
            if (s.display === "none" || s.visibility === "hidden" || parseFloat(s.opacity) < 0.1 || r.width < 120 || r.height < 60) continue;
            if (r.right > vw + 1 || r.left < -1) out.push(`menu past the screen edge (${Math.round(r.left)}..${Math.round(r.right)})`);
            if (r.bottom > vh + 1 && !/(auto|scroll)/.test(s.overflowY) && s.position === "fixed") out.push(`menu taller than the screen and not scrollable (${Math.round(r.height)}px)`);
          }
          return [...new Set(out)];
        }, vw);
        for (const d of menu) findings.push({ vw, kind: "menu", where: "nav", detail: d });
        await p.keyboard.press("Escape").catch(() => {});
        await t.click({ timeout: 1500 }).catch(() => {});
        await p.waitForTimeout(200);
      }
    }
    // Network.
    for (const s of net.status) findings.push({ vw, kind: "http-error", where: "network", detail: s });
    for (const s of net.failed) findings.push({ vw, kind: "request-failed", where: "network", detail: s });
    for (const c of [...new Set(net.console)]) findings.push({ vw, kind: "console-error", where: "console", detail: c });
    for (const [u, v] of net.images) {
      if (/\.(jpe?g|png)$/i.test(u) && v.kb > 50) findings.push({ vw, kind: "original-image", where: "network", detail: `${u} ${v.kb.toFixed(0)} KB` });
      if (v.kb > 300) findings.push({ vw, kind: "heavy-image", where: "network", detail: `${u} ${v.kb.toFixed(0)} KB` });
      if (v.n > 1) findings.push({ vw, kind: "duplicate-download", where: "network", detail: `${u} ×${v.n}` });
    }
    if (net.fonts.size > 6) findings.push({ vw, kind: "fonts", where: "network", detail: `${net.fonts.size} font files: ${[...net.fonts].map((f) => f.split("/").pop()).join(", ")}` });
    await ctx.close();
  }
  report.push({ slug, findings });
  console.log(`${slug}: ${findings.length ? findings.length + " findings" : "clean"}`);
}
writeFileSync(out, JSON.stringify(report, null, 1));
await b.close();
