// Full article content, imported from the live WordPress blogs by tools/blog/import.mjs.
// Build-time only (the article pages): never import this into a React island.

export type PostContent = {
  slug: string;
  /** The article on the live blog it was imported from. */
  source: string;
  title: string;
  date: string;
  modified: string;
  excerpt: string;
  words: number;
  minutes: number;
  toc: { id: string; text: string }[];
  faqs: { q: string; a: string }[];
  html: string;
};

import { REGION } from "@/brand/regions";
import { toAuTerms } from "../../tools/region/au-terms.mjs";

const files = import.meta.glob<PostContent>("./blog/posts/*.json", { eager: true, import: "default" });
/** The AU build's trade terms, applied to the imported text (see src/data/blog.ts). */
const au = (s: string): string => (REGION.id === "au" ? toAuTerms(s) : s);

export const POST_CONTENT: Record<string, PostContent> = Object.fromEntries(
  Object.values(files).map((p) => [p.slug, { ...p, excerpt: au(p.excerpt), html: au(p.html), toc: p.toc.map((t) => ({ ...t, text: au(t.text) })), faqs: p.faqs.map((f) => ({ q: au(f.q), a: au(f.a) })) }]),
);
