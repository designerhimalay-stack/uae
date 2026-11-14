// Region-specific page copy, applied over the shared pages by getService().
import { local } from "@/brand/regions";
import { IN_PAGES } from "./in";
import { UAE_PAGES } from "./uae";
import type { PageOverride } from "./types";

export const REGIONAL_PAGES: Record<string, PageOverride> = local({ us: {}, in: IN_PAGES, uae: UAE_PAGES });
export type { PageOverride };
