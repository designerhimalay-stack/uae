import { BASE as REGION_BASE } from "../region/base.mjs";
// Runs after `astro build`. For every raster <img> in the built HTML it adds WebP
// variants (srcset), intrinsic width and height (no layout shift), and a dominant
// colour behind the photo while it loads. SVGs get width and height from their viewBox.
// Variants are cached in node_modules/.cache, so later builds only encode new photos.
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { createHash } from "node:crypto";
import sharp from "sharp";

const DIST = "dist";
const BASE = REGION_BASE;
const CACHE = "node_modules/.cache/aptacloud-images";
const WIDTHS = [480, 800, 1200, 1600, 2400];
mkdirSync(CACHE, { recursive: true });

const walk = (d, acc = []) => {
  for (const n of readdirSync(d)) {
    const f = join(d, n);
    if (statSync(f).isDirectory()) walk(f, acc);
    else if (n.endsWith(".html")) acc.push(f);
  }
  return acc;
};

const known = new Map();
async function variants(path) {
  if (known.has(path)) return known.get(path);
  const file = join(DIST, path);
  if (!existsSync(file)) return known.set(path, null).get(path);
  const buf = readFileSync(file);
  const hash = createHash("sha1").update(buf).digest("hex").slice(0, 10);
  const meta = await sharp(buf).metadata();
  const { dominant } = await sharp(buf).stats();
  const widths = WIDTHS.filter((w) => w < meta.width);
  widths.push(Math.min(meta.width, WIDTHS[WIDTHS.length - 1]));
  // Short names: long blog slugs break Windows' path limit in git worktrees.
  const stem = path.split("/").pop().replace(/\.[a-z]+$/i, "").slice(0, 32);
  const out = [];
  const files = [];
  for (const w of [...new Set(widths)]) {
    const name = `${stem}-${hash}-${w}.webp`;
    const cached = join(CACHE, name);
    if (!existsSync(cached)) await sharp(buf).resize({ width: w }).webp({ quality: 74 }).toFile(cached);
    const target = join(DIST, "images/_opt", name);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(cached, target);
    out.push(`${BASE}images/_opt/${name} ${w}w`);
    files.push({ w, path: `images/_opt/${name}` });
  }
  const hex = (v) => v.toString(16).padStart(2, "0");
  const opaque = !meta.hasAlpha;
  const info = { srcset: out.join(", "), files, width: meta.width, height: meta.height, bg: opaque ? `#${hex(dominant.r)}${hex(dominant.g)}${hex(dominant.b)}` : null };
  known.set(path, info);
  return info;
}

const svgSize = (path) => {
  const file = join(DIST, path);
  if (!existsSync(file)) return null;
  const m = readFileSync(file, "utf8").match(/viewBox=["'][\d.\-]+[\s,]+[\d.\-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/);
  return m ? { width: Math.round(+m[1]), height: Math.round(+m[2]) } : null;
};

let imgs = 0;
for (const page of walk(DIST)) {
  const html = readFileSync(page, "utf8");
  const tags = [...html.matchAll(/<img\b[^>]*>/g)];
  let next = html;
  for (const tag of new Set(tags.map((t) => t[0]))) {
    const src = tag.match(/\ssrc="([^"]+)"/)?.[1];
    if (!src || !src.startsWith(BASE)) continue;
    const path = src.slice(BASE.length).split("?")[0];
    let out = tag;
    const attr = (name, value) => {
      if (!new RegExp(`\\s${name}=`).test(out)) out = out.replace(/^<img\b/, `<img ${name}="${value}"`);
    };
    if (/\.svg$/i.test(path)) {
      const s = svgSize(path);
      if (s) { attr("width", s.width); attr("height", s.height); }
    } else if (/\.(jpe?g|png)$/i.test(path)) {
      const v = await variants(path);
      if (!v) continue;
      attr("srcset", v.srcset);
      attr("width", v.width);
      attr("height", v.height);
      if (v.bg) {
        out = /\sstyle="/.test(out)
          ? out.replace(/\sstyle="/, ` style="background-color:${v.bg};`)
          : out.replace(/^<img\b/, `<img style="background-color:${v.bg}"`);
      }
      imgs++;
    } else continue;
    next = next.split(tag).join(out);
  }
  if (next !== html) writeFileSync(page, next);
}
console.log(`images: ${known.size} files, ${imgs} tags`);

// React islands re-render some photos in the browser (tab panels, rearranged
// grids), and those renders carry the plain `src`, so the browser fetched the
// full original JPG on top of the WebP. Point every raster photo path in the
// client bundles at its WebP variant (the largest up to 1600px wide) instead.
const PHOTO_IN_JS = /(["'`])\/(images\/[^"'`\s]+?\.(?:jpe?g|png))\1/g;
let swapped = 0;
const astroDir = join(DIST, "_astro");
if (existsSync(astroDir)) {
  for (const f of readdirSync(astroDir).filter((n) => n.endsWith(".js"))) {
    const file = join(astroDir, f);
    const js = readFileSync(file, "utf8");
    const paths = new Set([...js.matchAll(PHOTO_IN_JS)].map((m) => m[2]));
    if (!paths.size) continue;
    let next = js;
    for (const path of paths) {
      const v = await variants(path);
      if (!v || !v.files.length) continue;
      const pick = v.files.filter((x) => x.w <= 1600).sort((a, b) => b.w - a.w)[0] ?? v.files[0];
      next = next.replace(new RegExp(`(["'\`])/${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\1`, "g"), `$1/${pick.path}$1`);
      swapped++;
    }
    if (next !== js) writeFileSync(file, next);
  }
}
console.log(`client bundles: ${swapped} photo paths pointed at WebP variants`);

// Paths the bundles build at run time (`/images/blog/posts/${slug}.jpg`, the US
// page photos) cannot be mapped one by one: give every file in those folders a
// WebP twin at the same name, and point the template's extension at it.
const DYNAMIC = [
  { dir: "images/blog/posts", width: 1200 },
  { dir: "images/photos/regions/us/pages", width: 1600 },
];
let twins = 0;
for (const { dir, width } of DYNAMIC) {
  const abs = join(DIST, dir);
  if (!existsSync(abs)) continue;
  for (const n of readdirSync(abs).filter((x) => /\.(jpe?g|png)$/i.test(x))) {
    const buf = readFileSync(join(abs, n));
    const hash = createHash("sha1").update(buf).digest("hex").slice(0, 10);
    const cached = join(CACHE, `twin-${hash}-${width}.webp`);
    if (!existsSync(cached)) await sharp(buf).resize({ width, withoutEnlargement: true }).webp({ quality: 74 }).toFile(cached);
    copyFileSync(cached, join(abs, n.replace(/\.(jpe?g|png)$/i, ".webp")));
    twins++;
  }
  if (existsSync(astroDir)) {
    const re = new RegExp(`(\`/${dir.replace(/\//g, "\\/")}/\\$\\{[^}]+\\})\\.(?:jpe?g|png)\``, "g");
    for (const f of readdirSync(astroDir).filter((x) => x.endsWith(".js"))) {
      const file = join(astroDir, f);
      const js = readFileSync(file, "utf8");
      const next = js.replace(re, "$1.webp`");
      if (next !== js) writeFileSync(file, next);
    }
  }
}
console.log(`run-time photo folders: ${twins} WebP twins`);
