// Photos (/images/photos/...) used on more than one page of a build, and twice on one page.
// node tools/audit/photorepeats.mjs <dist> <base or /__nobase__> <out.json>   (ALL=1 counts every section)
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
const [, , dist, base = "", out] = process.argv;
const pages = [];
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html") pages.push(p);
  }
};
walk(dist);
const uses = new Map();
const samePage = [];
for (const p of pages) {
  const raw = readFileSync(p, "utf8");
  // EXCLUDE: sections whose photos repeat by design (related-page cards, the industries rotation, events cards).
  const html = process.env.ALL ? raw : raw.replace(/<section\b[^>]*\b(id="(related|industries|more-events|events|articles)"|aria-labelledby="related-title")[\s\S]*?<\/section>/g, "");
  if (/http-equiv="refresh"/i.test(raw)) continue;
  const page = "/" + relative(dist, p).replace(/\\/g, "/").replace(/index\.html$/, "");
  const seen = new Map();
  for (const m of html.matchAll(/<img\b[^>]*?\ssrc="([^"]+)"/g)) {
    let src = m[1].replace(base, "");
    if (!src.startsWith("/images/photos/")) continue;
    src = src.replace(/-\d+w?\.webp$/, "").replace(/\.(jpe?g|png|webp)$/i, "");
    seen.set(src, (seen.get(src) ?? 0) + 1);
  }
  for (const [src, n] of seen) {
    if (!uses.has(src)) uses.set(src, []);
    uses.get(src).push(page);
    if (n > 1) samePage.push({ page, src, n });
  }
}
const repeated = [...uses].filter(([, ps]) => ps.length > 1).sort((a, b) => b[1].length - a[1].length).map(([src, ps]) => ({ src, count: ps.length, pages: ps }));
writeFileSync(out, JSON.stringify({ pages: pages.length, photos: uses.size, repeated, samePage }, null, 1));
console.log(`pages ${pages.length}, photos ${uses.size}, repeated ${repeated.length}, same-page ${samePage.length}`);
for (const r of repeated.slice(0, 40)) console.log(`${r.count}  ${r.src}  ${r.pages.slice(0, 4).join(" ")}${r.pages.length > 4 ? " …" : ""}`);
for (const s of samePage.slice(0, 20)) console.log(`SAME PAGE x${s.n}  ${s.page}  ${s.src}`);
