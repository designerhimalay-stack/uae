import { BASE as REGION_BASE } from "../region/base.mjs";
// Usage: node tools/audit/homesheet.mjs <name> [width=1440]
// One screenshot per home section (#top, #about, #workshop, #dynamics, and the
// regional section) scaled down and stacked into tools/audit/out/<name>.png,
// so a whole region's home can be reviewed in one image.
import { chromium } from "playwright-core";
import { createRequire } from "node:module";
import { mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const sharp = require("sharp");
const [, , name = "home", w = "1440"] = process.argv;
const width = Number(w);
const out = fileURLToPath(new URL("./out/", import.meta.url));
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const page = await (await browser.newContext({ viewport: { width, height: width < 600 ? 844 : 900 }, reducedMotion: "reduce" })).newPage();
// PAGE=/healthcare/ to sheet another page than the home page.
await page.goto(`http://localhost:4321${REGION_BASE.replace(/\/$/, "")}${process.env.PAGE ?? "/"}`, { waitUntil: "networkidle" });
// Hide the fixed nav and dev toolbar so they don't cover section shots.
await page.addStyleTag({ content: "astro-dev-toolbar,.skip-link{display:none!important} header,nav{visibility:hidden!important}" });
const shots = [];
// Every top-level section of <main>, in page order (or a selector list after the width).
const sels = process.argv[4] ? process.argv[4].split(",") : await page.$$eval("main > section, main > * > section", (els) => [...new Set(els)].map((e, i) => (e.id ? `#${e.id}` : `main section >> nth=${i}`)));
for (const sel of sels) {
  const el = page.locator(sel).first();
  if (!(await el.count())) continue;
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(900);
  shots.push(await el.screenshot());
}
await browser.close();
const scale = 0.5;
const imgs = await Promise.all(shots.map((b) => sharp(b).resize({ width: Math.round(width * scale) }).toBuffer({ resolveWithObject: true })));
const H = imgs.reduce((h, i) => h + i.info.height + 8, 0);
let top = 0;
await sharp({ create: { width: Math.round(width * scale), height: H, channels: 3, background: "#888" } })
  .composite(imgs.map((i) => { const c = { input: i.data, top, left: 0 }; top += i.info.height + 8; return c; }))
  .png()
  .toFile(`${out}${name}.png`);
console.log(`${name}.png`, shots.length, "sections");
