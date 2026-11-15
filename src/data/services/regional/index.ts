// Region-specific page copy, applied over the shared pages by getService().
import { local } from "@/brand/regions";
import { IN_PAGES } from "./in";
import { IN_INSERTS } from "./in-sections";
import { UAE_PAGES } from "./uae";
import { UAE_INSERTS } from "./uae-sections";
import type { PageOverride, RegionalSection } from "./types";

/** A region's copy overrides plus the sections only its old pages have. */
function withInserts(pages: Record<string, PageOverride>, inserts: Record<string, RegionalSection[]>): Record<string, PageOverride> {
  const out = { ...pages };
  for (const [slug, insert] of Object.entries(inserts)) out[slug] = { ...out[slug], insert };
  return out;
}

export const REGIONAL_PAGES: Record<string, PageOverride> = local({ us: {}, in: withInserts(IN_PAGES, IN_INSERTS), uae: withInserts(UAE_PAGES, UAE_INSERTS) });
export type { PageOverride };
