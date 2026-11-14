import { BASE as REGION_BASE } from "../region/base.mjs";
// Usage: node tools/audit/oddcards.mjs <width> <slug>...
// Phone rule: in a 2-column card grid, an odd last card spans the row. Reports
// every visible 2-column grid whose last child sits alone at half width.
import { chromium } from "playwright-core";

const [w, ...slugs] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await b.newContext({ viewport: { width: Number(w), height: 844 }, reducedMotion: "reduce" });
for (const slug of slugs) {
  const p = await ctx.newPage();
  await p.goto(`http://localhost:4321${REGION_BASE}${slug}/`, { waitUntil: "networkidle" });
  const r = await p.evaluate(() => {
    const out = [];
    document.querySelectorAll("main *").forEach((g) => {
      const cs = getComputedStyle(g);
      if (cs.display !== "grid" || g.closest("[hidden]")) return;
      if (cs.gridTemplateColumns.split(" ").length !== 2) return;
      const gw = g.getBoundingClientRect().width;
      // Only half-width cells count: a full-width intro or banner child is fine.
      const kids = [...g.children].filter((k) => { const r = k.getBoundingClientRect(); return r.height > 0 && r.width < gw * 0.6 && getComputedStyle(k).position !== "absolute"; });
      if (kids.length < 3 || kids.length % 2 === 0) return;
      const last = kids[kids.length - 1].getBoundingClientRect();
      if (gw > 200 && last.width < gw * 0.6) out.push(`#${g.closest("section")?.id ?? "?"} .${String(g.className).split(" ")[0].slice(0, 30)} (${kids.length} items, last ${Math.round(last.width)}/${Math.round(gw)})`);
    });
    return out;
  });
  if (r.length) console.log(`== ${slug}\n  ${r.join("\n  ")}`);
  await p.close();
}
await b.close();
console.log("done");
