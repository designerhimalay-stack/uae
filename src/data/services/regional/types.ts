import type { Block, ServicePage } from "../types";

/** A region-only section, placed before or after a shared section id (in the order listed). */
export type RegionalSection = { before: string; block: Block } | { after: string; block: Block };

/** A region's changes to one shared page (src/data/services/regional/<region>.ts). */
export type PageOverride = {
  seo?: ServicePage["seo"];
  hero?: Partial<Pick<ServicePage["hero"], "title" | "accent" | "lead">>;
  faqs?: ServicePage["faqs"];
  /** Sections the region's own old page has and the shared layout lacks. */
  insert?: RegionalSection[];
};
