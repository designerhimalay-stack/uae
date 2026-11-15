// Service pages registry: every page, in nav order, plus lookups.

import { asset } from "@/brand/brand";
import { AI_PAGES } from "./ai";
import { APPMOD_PAGES } from "./appmod";
import { DATA_PAGES } from "./data";
import { EXTRAS } from "./extras";
import { DEFAULT_STATS, LAYOUTS } from "./layouts";
import { AZURE_PAGES, MS_PAGES } from "./microsoft";
import { AWS_PAGES } from "./aws";
import { INDUSTRY_PAGES } from "./industries";
import { COMPANY_PAGES } from "./company";
import { MS_EXTRAS } from "./microsoft-extras";
import { CATEGORIES } from "./shared";
import { REGIONAL_PAGES } from "./regional";
import { IN_ONLY_LAYOUTS, IN_ONLY_PAGES } from "./regional/in-pages";
import { REGION, local } from "@/brand/regions";
import { UAE_ONLY_LAYOUTS, UAE_ONLY_PAGES } from "./regional/uae-pages";
import type { Block, CategoryId, ServicePage } from "./types";
import type { RegionalSection } from "./regional/types";

import { regionPhotos } from "./region-photos";

// Region-only pages (e.g. India's Fabric, Business Central, Healthcare) build on their region's site only.
export const SERVICE_PAGES: ServicePage[] = [
  ...AI_PAGES, ...DATA_PAGES, ...APPMOD_PAGES, ...MS_PAGES, ...AZURE_PAGES, ...AWS_PAGES, ...INDUSTRY_PAGES, ...COMPANY_PAGES, ...IN_ONLY_PAGES, ...UAE_ONLY_PAGES,
]
  .filter((p) => !p.regions || p.regions.includes(REGION.id))
  .map(regionPhotos);
// India and the UAE share some region-only slugs, so the layouts are picked per region.
const ALL_LAYOUTS = { ...LAYOUTS, ...local({ us: {}, in: IN_ONLY_LAYOUTS, uae: UAE_ONLY_LAYOUTS }) };

export { serviceHref } from "./href";

export const pagesIn = (category: CategoryId) => SERVICE_PAGES.filter((p) => p.category === category);

/** A shared page with this region's SEO, hero, and FAQ copy applied. */
function regional(page: ServicePage): ServicePage {
  const o = REGIONAL_PAGES[page.slug];
  if (!o) return page;
  return { ...page, seo: o.seo ?? page.seo, hero: { ...page.hero, ...o.hero }, faqs: o.faqs ?? page.faqs };
}

/** Places a region's own sections into the shared block list, by section id.
 *  A regional block whose id the shared page already uses replaces that block in place. */
function withRegional(blocks: Block[], insert: RegionalSection[] | undefined, slug: string): Block[] {
  if (!insert) return blocks;
  const out = [...blocks];
  for (const s of insert) {
    const own = "id" in s.block ? s.block.id : undefined;
    const same = own ? out.findIndex((b) => "id" in b && b.id === own) : -1;
    if (same >= 0) {
      out[same] = regionPhotos(s.block);
      continue;
    }
    const ref = "before" in s ? s.before : s.after;
    const at = out.findIndex((b) => "id" in b && b.id === ref);
    if (at < 0) throw new Error(`${slug}: regional section anchor "${ref}" not found`);
    out.splice("before" in s ? at : at + 1, 0, regionPhotos(s.block));
  }
  return out;
}

export function getService(slug: string) {
  const shared = SERVICE_PAGES.find((p) => p.slug === slug);
  if (!shared) throw new Error(`Unknown service page: ${slug}`);
  const page = regional(shared);
  const extras = EXTRAS[slug] ?? MS_EXTRAS[slug] ?? { sections: ["pains", "services", "process", "industries", "why"] };
  // Related: up to three pages from the same category, the ones that follow this page.
  // An industry hub lists every segment page of its vertical instead.
  const group = pagesIn(page.category);
  const at = group.findIndex((p) => p.slug === slug);
  const siblings = page.relatedCategory
    ? pagesIn(page.relatedCategory)
    : [1, 2, 3].map((k) => group[(at + k) % group.length]).filter((p, i, a) => p.slug !== slug && a.indexOf(p) === i);
  const relatedIn = CATEGORIES[page.relatedCategory ?? page.category];
  // A region's FAQs replace the layout's too (the page renders layout FAQs first).
  const base = ALL_LAYOUTS[slug] && regionPhotos(ALL_LAYOUTS[slug]);
  const o = REGIONAL_PAGES[slug];
  const layout = base && (o?.faqs || o?.insert) ? { ...base, faqs: o.faqs ?? base.faqs, blocks: withRegional(base.blocks, o.insert, slug) } : base;
  return { page, extras, layout, stats: layout?.stats ?? DEFAULT_STATS, category: CATEGORIES[page.category], relatedIn, siblings };
}

export { CATEGORIES };
export type { ServicePage };
