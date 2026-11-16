// node tools/audit/phonesheet.mjs <width> <out-prefix> <slug#section>...   (set REGION, serve the build first)
// Screenshots each section at phone width (content fully revealed) and lays them
// side by side, four to a sheet, so a region's sections can be reviewed at a glance.
import { BASE } from "../region/base.mjs";
import { chromium } from "playwright-core";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const sharp = require("sharp");

const [w, prefix, ...targets] = process.argv.slice(2);
const width = Number(w);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const p = await (await b.newContext({ viewport: { width, height: 800 }, deviceScaleFactor: 1, reducedMotion: "reduce", isMobile: true, hasTouch: true })).newPage();
const shots = [];
for (const t of targets) {
  const [slug, id] = t.split("#");
  await p.goto(`http://localhost:4321${BASE}${slug === "/" ? "" : `${slug}/`}`, { waitUntil: "networkidle" });
  await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); } });
  // Hide the fixed nav so it does not cover the section, and finish every reveal.
  await p.addStyleTag({ content: "header, nav[class*='nav'], [class*='Nav_'], [class*='_nav_'] { visibility: hidden !important; } * { opacity: 1 !important; transform: none !important; }" });
  await p.waitForTimeout(300);
  // Clip a full-page shot to the section's box: no "stable element" wait, so live
  // animations (clocks, tickers) cannot stall the run.
  const box = await p.evaluate((sel) => { const el = document.getElementById(sel); if (!el) return null; const r = el.getBoundingClientRect(); return { x: 0, y: r.top + scrollY, width: innerWidth, height: Math.min(r.height, 2400) }; }, id);
  if (!box) { console.log(`missing ${t}`); continue; }
  try {
    const buf = await p.screenshot({ fullPage: true, clip: box, timeout: 20000 });
    shots.push({ t, buf });
  } catch (e) { console.log(`failed ${t}: ${String(e).slice(0, 80)}`); }
}
for (let i = 0; i < shots.length; i += 4) {
  const set = shots.slice(i, i + 4);
  const metas = await Promise.all(set.map((s) => sharp(s.buf).metadata()));
  const H = Math.min(2400, Math.max(...metas.map((m) => m.height))) + 28;
  const gap = 16, W = set.length * width + (set.length - 1) * gap;
  const comps = [];
  for (const [k, s] of set.entries()) {
    const img = await sharp(s.buf).extract({ left: 0, top: 0, width: metas[k].width, height: Math.min(metas[k].height, H - 28) }).toBuffer();
    comps.push({ input: img, left: k * (width + gap), top: 28 });
    const label = Buffer.from(`<svg width="${width}" height="24"><text x="2" y="17" font-family="Arial" font-size="13" fill="#c00">${s.t.replace(/&/g, "&amp;")}</text></svg>`);
    comps.push({ input: label, left: k * (width + gap), top: 0 });
  }
  const file = `${prefix}-${i / 4 + 1}.png`;
  await sharp({ create: { width: W, height: H, channels: 3, background: "#ffffff" } }).composite(comps).png().toFile(file);
  console.log(file);
}
await b.close();
