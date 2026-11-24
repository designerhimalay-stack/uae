// Australian industry terms at build time (client P0 list, 2026-11-20, AU rows 5 and 6).
// The shared copy uses the US trade terms the US site needs ("carrier", "general
// contractor"); the AU build rewrites them to the Australian ones, module by module,
// with the same protection as the US spelling pass: slugs, ids, and anything with a
// "/" (URLs, image paths such as carriers-hero.jpg) are never touched, so URLs stay.

/** Longest phrases first, so "insurance carriers" becomes "insurers", not "insurance insurers". */
const TERMS = [
  ["insurance carriers", "insurers"],
  ["insurance carrier", "insurer"],
  ["multi-carrier", "multi-insurer"],
  ["general contractors", "head contractors"],
  ["general contractor", "head contractor"],
  ["carriers", "insurers"],
  ["carrier", "insurer"],
];

const TERM_RE = new RegExp(`(?<![A-Za-z-])(${TERMS.map(([a]) => a.replace(/-/g, "\\-")).join("|")})(?![A-Za-z])`, "gi");
const MAP = Object.fromEntries(TERMS);

function swap(phrase) {
  const au = MAP[phrase.toLowerCase()];
  // "Insurance Carriers" (title case) → "Insurers"; "Carriers" → "Insurers"; "carriers" → "insurers".
  return phrase[0] === phrase[0].toUpperCase() ? au[0].toUpperCase() + au.slice(1) : au;
}

// Same protection as tools/region/spelling.mjs: slug-like literals and any run with a slash.
const PROTECT_RE = /(["'`])[\w.${}:#-]*[.${}:#-][\w.${}:#-]*\1|[^\s"'`<>()]*\/[^\s"'`<>()]*/g;

/** Rewrite US trade terms to Australian ones in one source file. */
export function toAuTerms(code) {
  let out = "";
  let last = 0;
  for (const m of code.matchAll(PROTECT_RE)) {
    out += code.slice(last, m.index).replace(TERM_RE, swap) + m[0];
    last = m.index + m[0].length;
  }
  return out + code.slice(last).replace(TERM_RE, swap);
}

/** Vite plugin: applies toAuTerms to every source module under /src/. */
export function auTerms() {
  return {
    name: "region-au-terms",
    enforce: "pre",
    transform(code, id) {
      const file = id.split("?")[0].replace(/\\/g, "/");
      if (!file.includes("/src/") || !/\.(ts|tsx|astro)$/.test(file)) return null;
      return { code: toAuTerms(code), map: null };
    },
  };
}
