import { REGION } from "@/brand/regions";

/** Swaps every shared photo ({ src, alt }) for this region's own, wherever it sits in page data. */
export function regionPhotos<T>(v: T): T {
  const map = REGION.photos;
  if (!map) return v;
  if (Array.isArray(v)) return v.map(regionPhotos) as T;
  if (v && typeof v === "object") {
    const o = v as Record<string, unknown>;
    const own = typeof o.src === "string" ? map[o.src] : undefined;
    // The shared photo's crop was tuned for that photo, so the region's own position (or centre) applies.
    if (own) return { ...o, src: own.src, alt: o.alt === "" ? "" : own.alt, position: own.position } as T;
    return Object.fromEntries(Object.entries(o).map(([k, x]) => [k, regionPhotos(x)])) as T;
  }
  return v;
}
