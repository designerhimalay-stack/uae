// node tools/audit/imgweight.mjs <url>...
// Loads each page like a visitor (scrolling to the bottom) and lists every image
// request: bytes, time, and whether it is an optimised WebP variant or an original.
import { chromium } from "playwright-core";

const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
for (const url of process.argv.slice(2)) {
  for (const [label, viewport] of [["desktop", { width: 1440, height: 900 }], ["phone", { width: 390, height: 844 }]]) {
    const ctx = await b.newContext({ viewport, deviceScaleFactor: label === "phone" ? 3 : 1 });
    const p = await ctx.newPage();
    const imgs = new Map();
    const started = new Map();
    p.on("request", (r) => { if (r.resourceType() === "image") started.set(r.url(), Date.now()); });
    p.on("requestfinished", async (r) => {
      if (r.resourceType() !== "image") return;
      const s = await r.sizes().catch(() => null);
      imgs.set(r.url(), { bytes: s ? s.responseBodySize : 0, ms: Date.now() - (started.get(r.url()) ?? Date.now()) });
    });
    const t0 = Date.now();
    await p.goto(url, { waitUntil: "load", timeout: 90000 });
    const loadMs = Date.now() - t0;
    await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 120)); } });
    await p.waitForLoadState("networkidle", { timeout: 60000 }).catch(() => {});
    const list = [...imgs.entries()].map(([u, v]) => ({ u, ...v })).sort((a, b) => b.bytes - a.bytes);
    const total = list.reduce((a, x) => a + x.bytes, 0);
    const orig = list.filter((x) => !/_opt\/|\.svg/.test(x.u));
    console.log(`\n${label} ${url}\n  load ${loadMs} ms · ${list.length} images · ${(total / 1048576).toFixed(1)} MB · originals (not WebP variants): ${orig.length}`);
    for (const x of list.slice(0, 8)) console.log(`   ${(x.bytes / 1024).toFixed(0).padStart(5)} KB ${String(x.ms).padStart(5)} ms  ${x.u.replace(/^https?:\/\/[^/]+/, "")}`);
    for (const x of orig.filter((x) => x.bytes > 50000).slice(0, 8)) console.log(`   ORIGINAL ${(x.bytes / 1024).toFixed(0)} KB ${x.u.replace(/^https?:\/\/[^/]+/, "")}`);
    await ctx.close();
  }
}
await b.close();
