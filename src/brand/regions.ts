// ─────────────────────────────────────────────────────────────────────────
//  REGIONS — one codebase, four sites (four repos).
//  Each repo sets its region in /region.json; everything region-specific
//  (base path, contacts, spelling, locale, footer badges) comes from here.
//    US  → /      (global site, repo designerhimalay-stack.github.io)
//    AU  → /au/   (repo au, the upstream)
//    IN  → /in/   (repo in)
//    UAE → /uae/  (repo uae)
// ─────────────────────────────────────────────────────────────────────────
import regionFile from "../../region.json";

export type RegionId = "us" | "au" | "in" | "uae";

type Phone = { number: string; flag: string; country: string };
export type LocalPhoto = { src: string; alt: string; position?: string };

export type RegionConfig = {
  id: RegionId;
  /** Short code shown in the region switcher. */
  code: string;
  label: string;
  flag: string;
  /** URL base path (no trailing slash; "" for the root site). */
  base: string;
  /** BCP 47 tag for <html lang>, hreflang, and Open Graph. */
  lang: string;
  /** Copy spelling: "au" keeps the source (Australian) copy, "us" converts at build time. */
  spelling: "au" | "us";
  /** Shown after the company name where a place is needed. */
  location: string;
  /** Hero / footer value proposition, when the region words it for its market. */
  valueProp?: string;
  contact: { phones: Phone[]; email: string; address: string[]; website: string; whatsapp?: string };
  /** Structured-data postal address for the Organization schema. */
  postal: { streetAddress: string; addressLocality: string; addressRegion: string; postalCode: string; addressCountry: string };
  /** Footer membership badges (only where the membership applies). */
  badges: { src: string; alt: string }[];
  areaServed: string[];
  /** Local photos for this region, keyed by the shared (AU) photo path they replace. */
  photos?: Record<string, LocalPhoto>;
  /** The region's card in the Global presence section. */
  card: { place: string; text: string; timeZone: string; photo: { src: string; alt: string; position?: string } };
};

const EMAIL = "contact@aptacloud.com";
const HQ_ADDRESS = ["801 E Campbell Rd, Ste 365", "Richardson, TX 75081, USA"];
const HQ_POSTAL = { streetAddress: "801 E Campbell Rd, Ste 365", addressLocality: "Richardson", addressRegion: "TX", postalCode: "75081", addressCountry: "US" };
const US_PHONES: Phone[] = [
  { number: "+1 (972) 928-2341", flag: "us", country: "United States" },
  { number: "+1 (972) 779-6347", flag: "us", country: "United States" },
];
const IN_PHONE: Phone = { number: "+91 98180 50070", flag: "in", country: "India" };
const ALLEN_CHAMBER = { src: "/images/badges/allen-chamber.png", alt: "Proud member: Allen Chamber of Commerce 2026" };

export const REGIONS: Record<RegionId, RegionConfig> = {
  us: {
    id: "us",
    code: "US",
    label: "United States",
    flag: "us",
    base: "",
    lang: "en-US",
    spelling: "us",
    location: "Richardson, Texas",
    contact: { phones: US_PHONES, email: EMAIL, address: HQ_ADDRESS, website: "aptacloud.com" },
    postal: HQ_POSTAL,
    badges: [ALLEN_CHAMBER],
    areaServed: ["United States", "Mexico"],
    photos: {
      "/images/photos/hero-developer.jpg": { src: "/images/photos/regions/us/hero.jpg", alt: "", position: "62% 50%" },
      "/images/photos/hero-developer-2.jpg": { src: "/images/photos/regions/us/about.jpg", alt: "An AptaCloud engineer writing code at a desktop monitor", position: "60% 45%" },
      "/images/photos/d365-implementation.jpg": { src: "/images/photos/regions/us/team.jpg", alt: "A project team reviewing a plan at a flipchart", position: "55% 50%" },
      "/images/photos/d365-optimization.jpg": { src: "/images/photos/regions/us/room.jpg", alt: "", position: "60% 50%" },
      "/images/photos/workshop-analysis.jpg": { src: "/images/photos/regions/us/workshop-analysis.jpg", alt: "A consultant presenting at a whiteboard to a team around a boardroom table", position: "50% 50%" },
      "/images/photos/workshop-hands-on.jpg": { src: "/images/photos/regions/us/workshop-hands-on.jpg", alt: "Two colleagues working through a live example on a laptop", position: "45% 45%" },
    },
    card: {
      place: "Richardson, Texas",
      text: "Our headquarters, with delivery teams in the United States and Mexico.",
      timeZone: "America/Chicago",
      photo: { src: "/images/photos/regions/us-dallas.jpg", alt: "The Dallas skyline on a clear day", position: "70% 50%" },
    },
  },
  // AU contact details are pending from the client; the HQ details stand in until then.
  au: {
    id: "au",
    code: "AU",
    label: "Australia",
    flag: "au",
    base: "/au",
    lang: "en-AU",
    spelling: "au",
    location: "Richardson, Texas",
    contact: { phones: US_PHONES, email: EMAIL, address: HQ_ADDRESS, website: "aptacloud.com/au" },
    postal: HQ_POSTAL,
    badges: [ALLEN_CHAMBER],
    areaServed: ["Australia"],
    card: {
      place: "Across Australia",
      text: "Microsoft cloud, data, and AI for mid-sized Australian firms.",
      timeZone: "Australia/Sydney",
      photo: { src: "/images/photos/regions/au-sydney.jpg", alt: "The Sydney Opera House on the harbour", position: "40% 50%" },
    },
  },
  in: {
    id: "in",
    code: "IN",
    label: "India",
    flag: "in",
    base: "/in",
    lang: "en-IN",
    spelling: "au",
    location: "Gurugram, India",
    valueProp:
      "AptaCloud modernises the systems mid-sized insurance, oil & gas, and construction firms across India run on, and puts AI to work on top of them. We prove it on your data first.",
    contact: {
      phones: [IN_PHONE],
      email: EMAIL,
      address: ["Platinum Tower, Unit 1024", "Gurugram, Haryana 122018, India"],
      website: "aptacloud.com/in",
      whatsapp: IN_PHONE.number,
    },
    postal: { streetAddress: "Platinum Tower, Unit 1024", addressLocality: "Gurugram", addressRegion: "Haryana", postalCode: "122018", addressCountry: "IN" },
    badges: [],
    areaServed: ["India"],
    photos: {
      "/images/photos/hero-developer.jpg": { src: "/images/photos/regions/in/hero.jpg", alt: "", position: "62% 55%" },
      "/images/photos/hero-developer-2.jpg": { src: "/images/photos/regions/in/about.jpg", alt: "An AptaCloud engineer working across two monitors", position: "40% 45%" },
      "/images/photos/d365-implementation.jpg": { src: "/images/photos/regions/in/team.jpg", alt: "Colleagues gathered round a laptop, planning the next step together", position: "72% 45%" },
      "/images/photos/d365-optimization.jpg": { src: "/images/photos/regions/in/room.jpg", alt: "", position: "45% 50%" },
      "/images/photos/workshop-analysis.jpg": { src: "/images/photos/regions/in/workshop-analysis.jpg", alt: "A consultant leading a workshop with a team in a bright office", position: "65% 50%" },
      "/images/photos/workshop-hands-on.jpg": { src: "/images/photos/regions/in/workshop-hands-on.jpg", alt: "Two colleagues smiling while working through an example on a laptop", position: "50% 40%" },
    },
    card: {
      place: "Gurugram and Pune",
      text: "Engineering and delivery teams in two Indian offices.",
      timeZone: "Asia/Kolkata",
      photo: { src: "/images/photos/regions/in-delhi.jpg", alt: "India Gate in New Delhi against the sky", position: "50% 40%" },
    },
  },
  // The live UAE site lists no UAE office or number: it shows the Indian number and the US HQ.
  uae: {
    id: "uae",
    code: "UAE",
    label: "United Arab Emirates",
    flag: "ae",
    base: "/uae",
    lang: "en-AE",
    spelling: "au",
    location: "United Arab Emirates",
    valueProp:
      "AptaCloud modernises the systems mid-sized insurance, oil & gas, and construction firms across the UAE run on, and puts AI to work on top of them. We prove it on your data first.",
    contact: {
      phones: [IN_PHONE],
      email: EMAIL,
      address: ["Global headquarters", ...HQ_ADDRESS],
      website: "aptacloud.com/uae",
      whatsapp: IN_PHONE.number,
    },
    postal: HQ_POSTAL,
    badges: [],
    areaServed: ["United Arab Emirates"],
    photos: {
      "/images/photos/hero-developer.jpg": { src: "/images/photos/regions/uae/hero.jpg", alt: "", position: "60% 50%" },
      "/images/photos/hero-developer-2.jpg": { src: "/images/photos/regions/uae/about.jpg", alt: "An AptaCloud specialist smiling while working on a laptop", position: "55% 40%" },
      "/images/photos/d365-implementation.jpg": { src: "/images/photos/regions/uae/team.jpg", alt: "Three colleagues planning a rollout around a laptop at a boardroom table", position: "50% 50%" },
      "/images/photos/d365-optimization.jpg": { src: "/images/photos/regions/uae/room.jpg", alt: "", position: "45% 50%" },
      "/images/photos/workshop-analysis.jpg": { src: "/images/photos/regions/uae/workshop-analysis.jpg", alt: "A consultant mapping a workflow on a whiteboard", position: "55% 40%" },
      "/images/photos/workshop-hands-on.jpg": { src: "/images/photos/regions/uae/workshop-hands-on.jpg", alt: "Colleagues working through a live example together with laptops and notes", position: "50% 45%" },
    },
    card: {
      place: "Across the UAE",
      text: "Microsoft cloud, data, and AI for businesses across the UAE.",
      timeZone: "Asia/Dubai",
      photo: { src: "/images/photos/regions/uae-dubai.jpg", alt: "The Dubai skyline with the Burj Khalifa", position: "50% 55%" },
    },
  },
};

/** Switcher order: the global site first. */
export const REGION_ORDER: RegionId[] = ["us", "au", "in", "uae"];

const id = (regionFile as { region: string }).region as RegionId;
if (!REGIONS[id]) throw new Error(`region.json: unknown region "${id}" (use us, au, in, or uae)`);

/** The region this build is for. */
export const REGION = REGIONS[id];

/** The production-preview origin all four sites share (GitHub Pages user site). */
export const SITE_ORIGIN = "https://designerhimalay-stack.github.io";

/** Region-specific content (regulators, laws): this region's value, else the US one. */
export const local = <T,>(v: { us: T } & Partial<Record<RegionId, T>>): T => v[REGION.id] ?? v.us;

/** The region's own photo for a shared slot, or the shared photo when it has none. */
export const localPhoto = (src: string, alt: string, position?: string): LocalPhoto =>
  REGION.photos?.[src] ?? { src, alt, position };

/** A region's home URL (absolute), for the switcher and hreflang. */
export const regionHome = (r: RegionConfig) => `${SITE_ORIGIN}${r.base}/`;
