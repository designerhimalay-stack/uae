import type { ServicePage } from "../types";

/** A region's changes to one shared page (src/data/services/regional/<region>.ts). */
export type PageOverride = {
  seo?: ServicePage["seo"];
  hero?: Partial<Pick<ServicePage["hero"], "title" | "accent" | "lead">>;
  faqs?: ServicePage["faqs"];
};
