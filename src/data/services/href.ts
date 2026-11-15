import { asset } from "@/brand/brand";

/** URL of a service page (slug keeps US spelling to match the live site). Its own module so islands don't bundle the page registry. */
export const serviceHref = (slug: string) => asset(`/${slug}/`);
