// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { readFileSync } from "node:fs";
import { usSpelling } from "./tools/region/spelling.mjs";
import { auTerms } from "./tools/region/au-terms.mjs";

// Touch screens keep :hover after a tap, so every hover rule only applies on
// devices that can really hover.
/** @type {import("postcss").Plugin} */
const hoverOnly = {
  postcssPlugin: "hover-only",
  OnceExit(root, { AtRule }) {
    root.walkRules(/:hover/, (rule) => {
      if (rule.parent?.type === "atrule" && /hover:\s*hover/.test(/** @type {import("postcss").AtRule} */ (rule.parent).params)) return;
      const hover = rule.selectors.filter((s) => s.includes(":hover"));
      const rest = rule.selectors.filter((s) => !s.includes(":hover"));
      const guarded = new AtRule({ name: "media", params: "(hover: hover)" });
      guarded.append(rule.clone({ selectors: hover }));
      rule.after(guarded);
      if (rest.length) rule.selectors = rest;
      else rule.remove();
    });
  },
};

// One codebase, four sites: region.json picks the region (us at the root,
// au / in / uae under their folders). See src/brand/regions.ts.
/** @type {{ region: "us" | "au" | "in" | "uae" }} */
const { region } = JSON.parse(readFileSync(new URL("./region.json", import.meta.url), "utf8"));
/** @type {Record<string, string>} */
const BASES = { us: "/", au: "/au", in: "/in", uae: "/uae" };
if (!(region in BASES)) throw new Error(`region.json: unknown region "${region}"`);

// Old WordPress URLs that differ from the new routes, per region, so indexed
// links keep working (static meta-refresh pages; the host can swap in 301s).
// India's and the UAE's live sites use the same URL scheme.
/** @type {Record<string, string>} */
const LEGACY_REGIONAL = {
  "/microsoft-365": "/services/microsoft/microsoft-365/",
  "/microsoft-teams": "/services/microsoft/teams/",
  "/identity-security": "/services/microsoft/identity-security/",
  "/microsoft-copilot": "/services/microsoft/copilot-studio/",
  "/microsoft-sharepoint": "/services/microsoft/sharepoint/",
  "/microsoft-dynamics-365": "/services/microsoft/microsoft-dynamics-365/",
  "/business-intelligence-visualization": "/data-visualization/",
  "/systems-re-engineering": "/application-re-engineering/",
  "/legacy-migration": "/legacy-application-migration/",
  "/legacy-modernization": "/application-modernization/",
  "/insurance": "/industry/insurance/",
  "/oil-gas": "/industry/oil-gas/",
  "/construction": "/industry/engineering-and-construction/construction/",
  "/blogs": "/blog/",
};
/** @type {Record<string, Record<string, string>>} */
const LEGACY = { in: LEGACY_REGIONAL, uae: LEGACY_REGIONAL };
const base = BASES[region].replace(/\/$/, "");
const redirects = Object.fromEntries(Object.entries(LEGACY[region] ?? {}).map(([from, to]) => [from, `${base}${to}`]));

export default defineConfig({
  // Production address (client P0, 2026-11-20): canonicals, hreflang, sitemap, and social
  // previews point to aptacloud.com (US at /, /au/, /in/). Keep in step with SITE_ORIGIN in src/brand/regions.ts.
  site: "https://aptacloud.com",
  base: BASES[region],
  output: "static",
  redirects,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss(), ...(region === "us" ? [usSpelling()] : []), ...(region === "au" ? [auTerms()] : [])],
    css: { postcss: { plugins: [hoverOnly] } },
  },
});
