// Imports the articles listed in src/data/blog.ts from the live WordPress blogs into the site:
// cleaned HTML, a table of contents, and self-hosted images (client designer pointers, 2026-11-20).
//
//   node tools/blog/import.mjs <cacheDir> fetch     raw post JSON from the WordPress REST APIs
//   node tools/blog/import.mjs <cacheDir> analyse   tag and class counts across the raw posts
//   node tools/blog/import.mjs <cacheDir> build     src/data/blog/posts/<slug>.json + images
//
// <cacheDir> holds the downloaded (untrusted) responses, outside the repo.
import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const [, , cache, step] = process.argv;
if (!cache || !step) throw new Error("usage: import.mjs <cacheDir> fetch|analyse|build");
const RAW = join(cache, "raw");
mkdirSync(RAW, { recursive: true });

/** Slugs per list in src/data/blog.ts, and the WordPress site each list lives on. */
function lists() {
  const src = readFileSync(new URL("../../src/data/blog.ts", import.meta.url), "utf8");
  const block = (name) => {
    const start = src.indexOf(`export const ${name}: Post[] = [`);
    const end = src.indexOf("];", start);
    return [...src.slice(start, end).matchAll(/slug: "([^"]+)"/g)].map((m) => m[1]);
  };
  return [
    { origin: "https://aptacloud.com", slugs: block("POSTS") },
    { origin: "https://aptacloud.com/in", slugs: block("IN_POSTS") },
    { origin: "https://aptacloud.com/uae", slugs: block("UAE_POSTS") },
  ];
}

const UA = { "User-Agent": "SiteContentMigration/1.0" };
/** Listed slugs that differ from the live post's slug. */
const ALIAS = { "generative-ai-use-cases-12-that-mid-sized-indian-companies-can-put-into-production": "12-generative-ai-use-cases-mid-sized-indian-companies" };

if (step === "fetch") {
  for (const { origin, slugs } of lists()) {
    for (const slug of slugs) {
      const file = join(RAW, `${slug}.json`);
      if (existsSync(file)) continue;
      const url = `${origin}/wp-json/wp/v2/posts?slug=${encodeURIComponent(ALIAS[slug] ?? slug)}&_fields=id,slug,link,title,date,modified,excerpt,content,yoast_head_json`;
      const r = await fetch(url, { headers: UA });
      const json = await r.json();
      if (!Array.isArray(json) || !json.length) {
        console.log("NOT FOUND", origin, slug);
        continue;
      }
      writeFileSync(file, JSON.stringify({ origin, ...json[0] }));
      console.log("ok", slug);
    }
  }
}

if (step === "analyse") {
  const tags = new Map();
  const classes = new Map();
  for (const f of readdirSync(RAW)) {
    const html = JSON.parse(readFileSync(join(RAW, f), "utf8")).content.rendered;
    for (const m of html.matchAll(/<([a-z][a-z0-9]*)\b/g)) tags.set(m[1], (tags.get(m[1]) ?? 0) + 1);
    for (const m of html.matchAll(/class="([^"]+)"/g)) for (const c of m[1].split(/\s+/)) classes.set(c, (classes.get(c) ?? 0) + 1);
  }
  const top = (m) => [...m].sort((a, b) => b[1] - a[1]).map(([k, v]) => `${v} ${k}`).join("\n");
  console.log(`posts: ${readdirSync(RAW).length}\n--- tags\n${top(tags)}\n--- classes\n${top(classes)}`);
}

if (step === "build") {
  const { parse, ELEMENT_NODE, TEXT_NODE } = await import("ultrahtml");
  const sharp = (await import("sharp")).default;
  sharp.cache(false);
  const OUT = new URL("../../src/data/blog/posts/", import.meta.url);
  const IMG = new URL("../../public/images/blog/content/", import.meta.url);
  mkdirSync(OUT, { recursive: true });

  // Elements dropped with their content; elements kept (attributes stripped); renames.
  const DROP = new Set(["script", "style", "svg", "nav", "iframe", "form", "button", "input", "noscript", "col", "colgroup", "link", "meta", "video", "audio", "object", "embed", "select", "textarea", "label"]);
  const KEEP = new Set(["p", "ul", "ol", "li", "strong", "em", "a", "img", "figure", "figcaption", "table", "thead", "tbody", "tr", "th", "td", "blockquote", "br", "hr", "code", "pre", "details", "summary", "h2", "h3", "h4"]);
  const BLOCK = new Set(["p", "div", "section", "article", "ul", "ol", "li", "table", "thead", "tbody", "tr", "td", "th", "h1", "h2", "h3", "h4", "h5", "h6", "details", "summary", "blockquote", "figure", "figcaption", "hr", "pre", "header", "footer", "aside", "main"]);
  const INLINE_CTX = new Set(["p", "li", "td", "th", "a", "strong", "em", "figcaption", "summary", "blockquote"]);
  const RENAME = { b: "strong", i: "em", h1: "h2", h5: "h4", h6: "h4", tfoot: "tbody" };

  const NAMED = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", rsquo: "’", lsquo: "‘", ldquo: "“", rdquo: "”", ndash: "–", mdash: "—", hellip: "…", rarr: "→", larr: "←", bull: "•", middot: "·", trade: "™", reg: "®", copy: "©" };
  const decode = (s) =>
    s
      .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
      .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
      .replace(/&([a-z]+);/gi, (m, k) => NAMED[k.toLowerCase()] ?? m)
      .replace(/ /g, " ");
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const attr = (s) => esc(s).replace(/"/g, "&quot;");
  const isCss = (s) => /[.#]?[a-z][\w-]*(\s+[.#]?[\w-]+)*\s*\{[^}]*:[^}]*;/i.test(s);
  const textOf = (n) => (n.type === TEXT_NODE ? (isCss(decode(n.value)) ? "" : decode(n.value)) : (n.children ?? []).map(textOf).join(""));
  const clean = (s) => s.replace(/\s+/g, " ").trim();
  const slugify = (s) => s.toLowerCase().normalize("NFKD").replace(/[^\w\s-]/g, "").trim().replace(/[\s_]+/g, "-").replace(/-+/g, "-").slice(0, 60).replace(/-$/, "");

  function emit(n, ctx) {
    // Stylesheet code pasted into the live posts as text is dropped.
    if (n.type === TEXT_NODE) return isCss(decode(n.value)) ? "" : esc(decode(n.value));
    if (n.type !== ELEMENT_NODE) return (n.children ?? []).map((c) => emit(c, ctx)).join("");
    const raw = n.name.toLowerCase();
    if (DROP.has(raw)) return "";
    const cls = (n.attributes?.class ?? "").split(/\s+/);
    // The live blog's call-to-action banners and spacer blocks don't carry over.
    if (cls.some((c) => c.startsWith("banner-blog")) || cls.includes("wp-block-spacer")) return "";
    const name = RENAME[raw] ?? raw;
    const kids = (inline = ctx.inline) => (n.children ?? []).map((c) => emit(c, { ...ctx, inline })).join("");

    if (name === "h2" || name === "h3" || name === "h4") {
      const text = clean(textOf(n));
      if (!text || text.toLowerCase() === ctx.title.toLowerCase()) return "";
      const base = slugify(text) || "section";
      let id = base;
      for (let k = 2; ctx.ids.has(id); k++) id = `${base}-${k}`;
      ctx.ids.add(id);
      if (name === "h2") ctx.toc.push({ id, text });
      return `<${name} id="${id}">${esc(text)}</${name}>`;
    }
    if (name === "summary") return `<summary>${esc(clean(textOf(n)))}</summary>`;
    if (name === "a") {
      const href = (n.attributes?.href ?? "").trim();
      const body = kids(true);
      // Dead button links from the live blog ("#", styled as buttons) are dropped.
      if ((!href || href === "#") && (/padding|background/i.test(n.attributes?.style ?? "") || cls.some((c) => /button|btn/i.test(c)))) return "";
      if (!href || href.startsWith("#") || /^javascript:/i.test(href)) return body;
      return `<a href="${attr(href)}">${body}</a>`;
    }
    if (name === "img") {
      const src = n.attributes?.["data-src"] || n.attributes?.src || "";
      if (!src || src.startsWith("data:")) return "";
      ctx.images.push(src);
      return `<img src="__IMG${ctx.images.length - 1}__" alt="${attr(clean(decode(n.attributes?.alt ?? "")))}" loading="lazy" decoding="async">`;
    }
    if (name === "br") return "<br>";
    if (name === "hr") return "<hr>";
    if (name === "td" || name === "th") {
      const span = ["colspan", "rowspan"].map((a) => (n.attributes?.[a] ? ` ${a}="${attr(n.attributes[a])}"` : "")).join("");
      return `<${name}${span}>${kids(true).trim()}</${name}>`;
    }
    if (name === "table") return `<div class="table"><table>${kids(false)}</table></div>`;
    // Layout wrappers (div, section, span, u, …) unwrap. Outside a paragraph, list item, or
    // cell, runs of loose inline content between block children become paragraphs.
    if (!KEEP.has(name)) return ctx.inline || (!BLOCK.has(raw) && !hasBlock(n)) ? kids() : blocks(n.children, ctx);
    if (name === "details") {
      const [summary, ...rest] = [(n.children ?? []).filter((c) => c.type === ELEMENT_NODE && c.name.toLowerCase() === "summary")[0], ...(n.children ?? []).filter((c) => !(c.type === ELEMENT_NODE && c.name.toLowerCase() === "summary"))];
      return `<details>${summary ? emit(summary, ctx) : ""}${blocks(rest, ctx)}</details>`;
    }
    if (name === "ul" || name === "ol") {
      // Stray content straight inside a list (broken markup on the live blog) becomes list items.
      let out = "";
      let run = "";
      const flush = () => {
        if (clean(run.replace(/<[^>]+>/g, ""))) out += `<li>${run.trim()}</li>`;
        run = "";
      };
      for (const c of n.children ?? []) {
        if (c.type === ELEMENT_NODE && c.name.toLowerCase() === "li") {
          flush();
          out += emit(c, ctx);
        } else run += emit(c, { ...ctx, inline: true });
      }
      flush();
      return `<${name}>${out}</${name}>`;
    }
    return `<${name}>${kids(INLINE_CTX.has(name) || ctx.inline).trim()}</${name}>`;
  }

  /** Does this element hold block content anywhere inside it? */
  const hasBlock = (n) => (n.children ?? []).some((c) => c.type === ELEMENT_NODE && (BLOCK.has(c.name.toLowerCase()) || hasBlock(c)));

  /** Splits a run of loose inline HTML into paragraphs at line breaks, keeping inline tags whole. */
  function paras(run) {
    const out = [];
    let buf = "";
    for (const part of run.split(/(?:<br>\s*)+|\n+/)) {
      buf = buf ? `${buf} ${part}` : part;
      const open = (buf.match(/<(strong|em|a)\b/g) ?? []).length;
      const close = (buf.match(/<\/(strong|em|a)>/g) ?? []).length;
      if (open <= close) {
        out.push(buf);
        buf = "";
      }
    }
    if (buf) out.push(buf);
    return out
      .map((s) => s.trim())
      .filter((s) => clean(s.replace(/<[^>]+>/g, "")) || /<img /.test(s))
      .map((s) => `<p>${s}</p>`)
      .join("");
  }

  function blocks(children = [], ctx) {
    let out = "";
    let run = "";
    for (const c of children) {
      const block = c.type === ELEMENT_NODE && (BLOCK.has(c.name.toLowerCase()) || hasBlock(c));
      const html = emit(c, { ...ctx, inline: !block });
      if (block) {
        out += paras(run) + html;
        run = "";
      } else run += html;
    }
    return out + paras(run);
  }

  /** Excerpts (meta description and listing summary) rewritten where the live one breaks the content rules
   *  ("the best", "seamless") or repeats another post's description word for word. */
  const EXCERPTS = {
    "best-predictive-maintenance-software-oil-gas": "Eight predictive maintenance tools for oil and gas compared: what each does, where it fits, and how AI on sensor data prevents equipment failure.",
    "microsoft-fabric-vs-azure-synapse-analytics-2026": "Microsoft Fabric and Azure Synapse Analytics compared: cost structures, real-time analytics, and what a move between them involves.",
    "how-cloud-modernization-transforms-life-insurance-operations": "How moving life insurance administration to the cloud speeds up product launches, policy servicing, and compliance reporting.",
    "generative-ai-consulting-services-pilot-into-production": "How generative AI consulting takes a pilot into production: the steps, the roles, and the checks that make it hold up.",
    "a-practical-timeline-for-implementing-ai-in-business": "A realistic timeline for implementing AI in business, from the first use case to production, and what keeps it on schedule.",
    "ai-myths-holding-growing-businesses-back": "Five common AI myths that hold growing businesses back, and how practical adoption, people, and ROI-led planning get real value from AI.",
    "azure-hosting-ai-iot-future-proof-architecture": "How Azure hosting supports AI, IoT, and intelligent agents in a secure cloud architecture that scales with your business.",
    "dynamics-365-over-quickbooks": "Why growing businesses move from QuickBooks to Microsoft Dynamics 365: scale, automation, reporting, and integration with the tools they already use.",
    "how-a-dallas-bank-can-achieve-soc-2-type-ii-in-6-months-on-azure": "How a Dallas bank can reach SOC 2 Type II readiness on Azure in six months, and how AptaCloud's Azure consulting gets its workloads there.",
    "how-ai-can-help-reduce-manual-processes-by-40-or-more": "Where AI removes manual work from enterprise workflows, and how AptaCloud's AI integration consulting automates the steps that take the most time.",
    "how-cloud-erp-supports-remote-teams": "How cloud ERP supports remote teams with real-time collaboration, secure access, automation, and integration through Microsoft Dynamics 365.",
    "step-by-step-guide-to-migrating-your-web-applications-to-microsoft-azure-2": "A step-by-step roadmap for migrating web applications to Microsoft Azure while keeping downtime low.",
    "power-bi-dashboard-examples-10-dashboards-mid-sized-indian-companies-use": "Ten Power BI dashboards mid-sized Indian companies use, from sales and finance to operations, and what each one shows.",
  };
  /** Per-post repairs for broken source markup. */
  const FIXES = {
    // The live post holds the article three times over; keep the first copy.
    "step-by-step-guide-to-migrating-your-web-applications-to-microsoft-azure-2": (h) => {
      const k = "This guide explains how web app migration to Azure works";
      const second = h.indexOf(k, h.indexOf(k) + k.length);
      return second > 0 ? h.slice(0, second) : h;
    },
  };

  /** Closes list items the live blog leaves open (the parser would nest everything after them). */
  const closeListItems = (s) =>
    s
      .replace(/<li(\s[^>]*)?>/gi, (m) => `</li>${m}`)
      .replace(/<\/(ul|ol)>/gi, "</li></$1>")
      .replace(/<\/li>(\s*<\/li>)+/gi, "</li>")
      .replace(/(<(?:ul|ol)(?:\s[^>]*)?>)\s*<\/li>/gi, "$1");

  const tidy = (html) =>
    html
      .replace(/<\/ul>\s*<ul>/g, "")
      .replace(/<\/ol>\s*<ol>/g, "")
      .replace(/<p>(\s*<br>)+/g, "<p>")
      .replace(/(<br>\s*)+<\/p>/g, "</p>")
      .replace(/<(p|li|strong|em|summary|figcaption)>\s*<\/\1>/g, "")
      .replace(/<p>\s*<p>/g, "<p>")
      .replace(/<\/p>\s*<\/p>/g, "</p>")
      .replace(/[ \t]{2,}/g, " ")
      .replace(/\s*\n\s*/g, "\n")
      // Safety net: a loose line of text between block elements becomes a paragraph.
      .replace(/(^|<\/(?:p|ul|ol|h[2-4]|div|table|details|blockquote|figure)>)\n?((?:(?!<\/?(?:p|ul|ol|li|h[2-4]|div|table|details|blockquote|figure|summary)[\s>])[^\n])+)(?=\n?(?:<(?:p|ul|ol|h[2-4]|div|table|details|blockquote|figure)[\s>]|$))/g, (m, close, text) => (text.replace(/<[^>]+>/g, "").trim() ? `${close}\n<p>${text.trim()}</p>` : m))
      .trim();

  async function saveImage(src, slug, i) {
    const url = new URL(src, "https://aptacloud.com/");
    const original = url.href.replace(/-\d+x\d+(\.\w+)$/, "$1");
    let buf;
    for (const u of [original, url.href]) {
      const r = await fetch(u, { headers: UA });
      if (r.ok) { buf = Buffer.from(await r.arrayBuffer()); break; }
    }
    if (!buf) return null;
    const img = sharp(buf).rotate();
    const meta = await img.metadata();
    const ext = meta.hasAlpha ? "png" : "jpg";
    const dir = new URL(`${slug}/`, IMG);
    mkdirSync(dir, { recursive: true });
    const out = img.resize({ width: Math.min(meta.width ?? 1600, 1600), withoutEnlargement: true });
    const info = await (ext === "png" ? out.png({ compressionLevel: 9 }) : out.jpeg({ quality: 82, mozjpeg: true, progressive: true })).toFile(fileURLToPath(new URL(`${i + 1}.${ext}`, dir)));
    return { src: `/images/blog/content/${slug}/${i + 1}.${ext}`, width: info.width, height: info.height };
  }

  const meta = {};
  for (const f of readdirSync(RAW)) {
    const slug = f.replace(/\.json$/, "");
    const post = JSON.parse(readFileSync(join(RAW, f), "utf8"));
    const title = clean(decode(post.title.rendered));
    const ctx = { title, ids: new Set(), toc: [], images: [], inline: false };
    let html = tidy(emit(parse(`<div>${closeListItems((FIXES[slug] ?? ((h) => h))(post.content.rendered))}</div>`), ctx));
    for (const [i, src] of ctx.images.entries()) {
      const saved = await saveImage(src, slug, i);
      html = saved ? html.replace(`src="__IMG${i}__"`, `src="${saved.src}" width="${saved.width}" height="${saved.height}"`) : html.replace(new RegExp(`<img src="__IMG${i}__"[^>]*>`), "");
    }
    const faqs = [...html.matchAll(/<details><summary>([\s\S]*?)<\/summary>([\s\S]*?)<\/details>/g)].map((m) => ({ q: clean(decode(m[1])), a: clean(decode(m[2].replace(/<[^>]+>/g, " "))) }));
    const words = clean(decode(html.replace(/<[^>]+>/g, " "))).split(" ").length;
    const desc = EXCERPTS[slug] ?? clean(decode((post.yoast_head_json?.description || post.excerpt.rendered).replace(/<[^>]+>/g, " ")));
    const excerpt = desc.length > 200 ? `${desc.slice(0, desc.lastIndexOf(" ", 197))}…` : desc;
    const out = { slug, source: post.link, title, date: post.date.slice(0, 10), modified: post.modified.slice(0, 10), excerpt, words, minutes: Math.max(1, Math.round(words / 230)), toc: ctx.toc, faqs, html };
    writeFileSync(new URL(`${slug}.json`, OUT), JSON.stringify(out, null, 1));
    meta[slug] = { excerpt, minutes: out.minutes };
    console.log(`${slug}: ${words} words, ${ctx.toc.length} sections, ${faqs.length} faqs, ${ctx.images.length} images`);
  }
  // Excerpts and reading times for the blog listing (small enough to ship to the browser).
  writeFileSync(new URL("../meta.json", OUT), JSON.stringify(meta, null, 1));
}

export { lists, RAW, UA };
