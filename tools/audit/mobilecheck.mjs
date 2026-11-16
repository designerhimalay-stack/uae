// node tools/audit/mobilecheck.mjs <width> <out.json> <slug>...   ("/" for home; set REGION, serve the build first)
// Phone audit, one row per section, against the AU phone system (CLAUDE.md "Phones"):
//   overflow past the screen · sideways-scrolling rails (not allowed) · card group
//   columns (2 across, odd last card spans, heavy cards 1 across, 1 across under 360)
//   · card copy longer than 3 lines without a "Read more" · text under 12px · tap
//   targets under 40px · heading size · side gutters.
import { BASE } from "../region/base.mjs";
import { chromium } from "playwright-core";
import { writeFileSync } from "node:fs";

const [w, out, ...slugs] = process.argv.slice(2);
const width = Number(w);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await b.newContext({ viewport: { width, height: 800 }, deviceScaleFactor: 2, reducedMotion: "reduce", isMobile: true, hasTouch: true });
const p = await ctx.newPage();
const all = [];
for (const slug of slugs) {
  const url = `http://localhost:4321${BASE}${slug === "/" ? "" : `${slug}/`}`;
  await p.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } scrollTo(0, 0); });
  await p.waitForTimeout(400);
  const rows = await p.evaluate((vw) => {
    const vis = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== "none" && s.visibility !== "hidden" && r.width > 0 && r.height > 0; };
    const mod = (el) => { const c = [...el.classList].find((x) => /^_[a-zA-Z]+_/.test(x)); return c ? c.split("_")[1] : el.tagName.toLowerCase(); };
    const out = [];
    for (const sec of document.querySelectorAll("main section, body > section")) {
      if (!vis(sec)) continue;
      const id = sec.id || sec.getAttribute("aria-labelledby") || "?";
      const issues = [];
      // Overflow past the screen (content clipped by an ancestor, like a logo ticker, is fine).
      const clipped = (el) => { for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) { const s = getComputedStyle(a); if (/(hidden|clip)/.test(s.overflowX) || /(hidden|clip)/.test(s.overflow)) return a.getBoundingClientRect().right <= vw + 1; } return false; };
      for (const el of sec.querySelectorAll("*")) {
        if (!vis(el)) continue;
        const r = el.getBoundingClientRect(), s = getComputedStyle(el);
        if (r.right > vw + 1 && s.position !== "fixed" && !el.closest("[aria-hidden='true']") && !clipped(el)) { issues.push(`overflow ${mod(el)} ${Math.round(r.right - vw)}px`); break; }
      }
      for (const el of sec.querySelectorAll("*")) {
        const s = getComputedStyle(el);
        if (/(auto|scroll)/.test(s.overflowX) && el.scrollWidth > el.clientWidth + 4 && vis(el) && !el.closest("[aria-hidden='true']")) { issues.push(`swipe rail ${mod(el)} (${el.scrollWidth}/${el.clientWidth})`); break; }
      }
      // Card groups: the largest set of 2+ visible siblings that look like cards.
      let best = null;
      for (const parent of sec.querySelectorAll("*")) {
        const kids = [...parent.children].filter((k) => vis(k) && k.getBoundingClientRect().height > 60 && k.getBoundingClientRect().width > 80);
        if (kids.length < 2) continue;
        const sameMod = kids.filter((k) => mod(k) === mod(kids[0]));
        if (sameMod.length < 2 || sameMod.length !== kids.length) continue;
        if (!best || sameMod.length > best.length) best = sameMod;
      }
      let cols = 0, cards = 0, cardMod = "";
      if (best) {
        cards = best.length; cardMod = mod(best[0]);
        const lefts = new Set(best.map((k) => Math.round(k.getBoundingClientRect().left / 4)));
        cols = lefts.size;
        const last = best[best.length - 1].getBoundingClientRect(), first = best[0].getBoundingClientRect();
        if (cols === 2 && cards % 2 === 1 && last.width < first.width * 1.5) issues.push("odd last card does not span");
      }
      // Long card copy without a Read more.
      const hasMore = [...sec.querySelectorAll("button, label, span")].some((x) => /^read more/i.test(x.textContent.trim()) && vis(x));
      let longest = 0;
      for (const para of sec.querySelectorAll("p")) {
        if (!vis(para)) continue;
        const card = para.closest("[class*='card'], [class*='Card'], li");
        if (!card || !sec.contains(card)) continue;
        // Copy of 50 characters or fewer stays plain by design (ui/ReadMore `min`).
        if (para.textContent.trim().length <= 50) continue;
        const lh = parseFloat(getComputedStyle(para).lineHeight) || 20;
        longest = Math.max(longest, Math.round(para.getBoundingClientRect().height / lh));
      }
      if (longest > 3 && !hasMore && cards > 2) issues.push(`card copy ${longest} lines, no Read more`);
      // Tiny text and small tap targets.
      let minFont = 99;
      for (const el of sec.querySelectorAll("p, span, li, a, button, h3, h4, small, label")) {
        if (!vis(el) || !el.textContent.trim() || el.children.length > 2) continue;
        minFont = Math.min(minFont, parseFloat(getComputedStyle(el).fontSize));
      }
      if (minFont < 12) issues.push(`text ${minFont}px`);
      for (const el of sec.querySelectorAll("button, a[class*='btn'], a[class*='Btn'], a[class*='button'], a[class*='cta']")) {
        if (!vis(el)) continue;
        const r = el.getBoundingClientRect();
        if (r.height < 40 && r.width < 200 && !/read more/i.test(el.textContent)) { issues.push(`tap target ${Math.round(r.width)}x${Math.round(r.height)} "${el.textContent.trim().slice(0, 20)}"`); break; }
      }
      const h2 = sec.querySelector("h2");
      const hsize = h2 && vis(h2) ? parseFloat(getComputedStyle(h2).fontSize) : 0;
      const inner = sec.querySelector("[class*='container'], [class*='inner'], [class*='wrap']") || sec;
      const gutter = Math.round(inner.getBoundingClientRect().left + parseFloat(getComputedStyle(inner).paddingLeft));
      out.push({ id, cardMod, cards, cols, longest, hasMore, hsize, gutter, height: Math.round(sec.getBoundingClientRect().height), issues });
    }
    return out;
  }, width);
  all.push({ slug, rows });
  const bad = rows.filter((r) => r.issues.length);
  console.log(`${slug}: ${rows.length} sections${bad.length ? "" : " ok"}`);
  for (const r of bad) console.log(`  #${r.id}: ${r.issues.join(" · ")}`);
}
writeFileSync(out, JSON.stringify(all, null, 1));
await b.close();
