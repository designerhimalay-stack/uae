// Home page copy per region. The AU home (shared by US and UAE until they are
// rebuilt from their own live sites) is the default; India's home is rebuilt
// section by section from the live aptacloud.com/in/ page (Nov 2026):
// duplicated live sections are merged, testimonials, client logos, and case
// study figures are left out (brand rules), and the copy follows the Brand and
// Content Writing Guidelines v2.0 (Australian spelling, no banned words).

import { asset } from "@/brand/brand";
import { local } from "@/brand/regions";
import type { Block, ServicePage } from "@/data/services/types";

export type HomeHero = {
  /** Title lines; the last is shown in the accent colour. */
  lines: string[];
  accent: string;
  /** Replaces the brand value proposition under the title. */
  lead?: string;
  /** The quiet secondary link beside the primary CTA. */
  link: { label: string; href: string };
};

export type HomeAbout = { heading: string; lead: string; photoText: string; photoLink: { label: string; href: string } };

const AU_HERO: HomeHero = {
  lines: ["Your path to", "measurable"],
  accent: "AI ROI.",
  link: { label: "See what the workshop covers", href: "#workshop" },
};

const AU_ABOUT: HomeAbout = {
  heading: "Your team has already started. We take it to production.",
  lead: "An AI pilot, a modernisation plan, a cloud migration: AptaCloud proves the value on your data with a proof of concept, then delivers in clear phases with senior Microsoft specialists, on the systems you already run.",
  photoText: "See where AI pays off in your business first.",
  photoLink: { label: "How the assessment works", href: "#workshop" },
};

/* ───────────────────────────── India ───────────────────────────── */

const IN_HERO: HomeHero = {
  lines: ["Cloud and AI", "transformation for"],
  accent: "Indian businesses.",
  lead: "Modernise with SharePoint, AI, and cloud services sized to your budget, so your teams can innovate and scale. We prove it on your data first.",
  link: { label: "See how we work", href: "#process" },
};

const IN_ABOUT: HomeAbout = {
  heading: "Microsoft cloud and AI specialists for Indian SMBs and enterprises.",
  lead: "AptaCloud moves Indian businesses to the cloud, modernises legacy systems, and builds AI and machine learning around the work, with Copilot and SharePoint shaping how teams collaborate, run operations, and keep audit trails.",
  photoText: "See where AI pays off in your business first.",
  photoLink: { label: "How we work", href: "#process" },
};

/** India's home sections between Partners/Dynamics/Microsoft (rendered by the home page). */
export const IN_SOLUTIONS: Block = {
  kind: "cards",
  id: "solutions",
  style: "icon",
  tone: "white",
  tag: "Core solutions",
  icon: "layers",
  heading: "Our core solutions for Indian businesses.",
  lead: "Six services that take you from scattered systems to governed data, the cloud, and AI that does real work.",
  cols: 3,
  items: [
    { title: "AI consulting", text: "AI that automates customer interactions and repetitive processes, and sharpens forecasts and decisions on your own data.", icon: "spark", href: asset("/ai-consulting/") },
    { title: "Cloud transformation", text: "Opportunity analysis, redesigned workflows, and secure cloud solutions that cut your dependence on legacy apps.", icon: "cloud", href: asset("/azure-implementation/") },
    { title: "SharePoint consulting", text: "A central document library with metadata and Microsoft 365 built in, for your intranet, internal communication, and document management.", icon: "doc", href: asset("/services/microsoft/sharepoint/") },
    { title: "Azure migration", text: "Elastic Azure infrastructure, with on-premises data moved in phases so downtime and complexity stay low.", icon: "migrate", href: asset("/azure-migration/") },
    { title: "Data engineering", text: "Data cleaned, integrated, and governed in one warehouse, so reports come faster and AI models have data they can trust.", icon: "db", href: asset("/data-engineering/") },
    { title: "Legacy app modernisation", text: "Re-engineering and upgrades that improve security, performance, and data flow, and lower the cost of running old systems.", icon: "code", href: asset("/application-modernization/") },
  ],
};

export const IN_WHY: Block = {
  kind: "cards",
  id: "why",
  style: "icon",
  tone: "tint",
  tag: "Why AptaCloud",
  icon: "target",
  heading: "Why Indian businesses choose AptaCloud.",
  lead: "Six reasons, from the first call to the support that follows go-live.",
  cols: 3,
  items: [
    { title: "Certified specialists", text: "Certified cloud and AI engineers who handle simple and complex process changes alike, from onboarding to ongoing optimisation.", icon: "team" },
    { title: "Reliable performance", text: "Automated workflows are monitored continuously, so issues are caught and fixed before they interrupt work.", icon: "gauge" },
    { title: "Built to scale", text: "Resources and architecture grow with your business without adding overhead.", icon: "layers" },
    { title: "Tailored at every stage", text: "Every solution is shaped to your processes, systems, and budget, not sold as a fixed package.", icon: "cog" },
    { title: "Transparent communication", text: "Clear plans, regular updates, and named owners, so you always know what happens next.", icon: "chat" },
    { title: "Support around the clock", text: "Engineers in India, the United States, and Mexico keep support and optimisation running across time zones.", icon: "clock" },
  ],
};

// Icon cards (not a cycle diagram); the step label is the one place numbers belong.
export const IN_PROCESS: Block = {
  kind: "cards",
  id: "process",
  style: "icon",
  tone: "tint",
  tag: "How we work",
  icon: "flow",
  heading: "How AptaCloud works.",
  lead: "Five steps, from your goals to ongoing optimisation.",
  cols: 5,
  items: [
    { kicker: "Step 1", title: "Understand your goals", text: "Workloads, skill gaps, and what is holding growth back.", icon: "target" },
    { kicker: "Step 2", title: "Plan the roadmap", text: "A phased plan that fits the systems you already run.", icon: "flow" },
    { kicker: "Step 3", title: "Implement", text: "Install, test, and train your staff, secure from day one.", icon: "cog" },
    { kicker: "Step 4", title: "Support you to scale", text: "Backup, disaster recovery, and expert help as you grow.", icon: "shield" },
    { kicker: "Step 5", title: "Track and optimise", text: "Performance tuned and resources adjusted to cut monthly bills.", icon: "gauge" },
  ],
};

export const IN_ENGAGEMENTS: Block = {
  kind: "cases",
  id: "engagements",
  tone: "white",
  label: "Typical engagement",
  tag: "Typical engagements",
  icon: "chart",
  heading: "What a typical engagement looks like.",
  lead: "Three patterns we see with Indian businesses, and how we approach them.",
  items: [
    {
      client: "A mid-sized manufacturer",
      text: "Scattered documents and slow approvals were delaying deliveries. We cleaned up and migrated ten years of files, set up a SharePoint intranet, and automated approvals through central document libraries.",
    },
    {
      client: "A logistics enterprise",
      text: "COBOL-based software caused frequent downtime and limited visibility. We re-engineered and moved the legacy applications to Azure, simplified the back-end data, and added cloud storage that scales.",
    },
    {
      client: "A fintech company",
      text: "Unpredictable customer behaviour made campaigns and launches hard to plan. We built custom AI models on Azure AI services, with automated dashboards for customer insight.",
    },
  ],
};

export const IN_AUDIENCE: Block = {
  kind: "split",
  id: "who-we-work-with",
  tone: "dark",
  tag: "Who we work with",
  icon: "team",
  heading: "Built for growing SMBs and large enterprises.",
  body: ["Whether you are moving your first workloads to the cloud or strengthening a large estate, the approach is the same: prove it on your data, then deliver in phases."],
  photo: { src: "/images/photos/regions/in/audience.jpg", alt: "An engineer working on a laptop in a bright office", position: "40% 40%" },
  list: "cards",
  items: [
    { title: "SMBs", text: "Flexible cloud, AI automation, and SharePoint services that lower IT costs as you grow.", icon: "gauge" },
    { title: "Enterprises", text: "Enterprise AI and modern cloud architecture that strengthen security for stable, large-scale operations.", icon: "shield" },
  ],
};

export const IN_FAQS: ServicePage["faqs"] = [
  {
    q: "How long does a cloud migration take?",
    a: "A mid-sized on-premises or hybrid migration often takes six to ten weeks. The timeline depends on data volume, scope, and operational complexity, and we migrate in phases to keep downtime to a minimum.",
  },
  {
    q: "Is Azure migration secure for enterprises?",
    a: "Yes. Microsoft Azure provides multi-layer encryption, identity management, compliance certifications, and threat detection. We monitor critical workloads and act early to prevent data breaches and keep the business running.",
  },
  {
    q: "Do you modernise legacy systems?",
    a: "Yes. Our certified engineers re-engineer software, build data pipelines, and set up cloud-native architecture, so legacy systems perform better, scale, and cost less to run.",
  },
  {
    q: "Can you integrate AI with our existing systems?",
    a: "Yes. We build AI models that work across your CRM, ERP, and SharePoint with Copilot and Azure OpenAI Service, automating workflows and improving insight without replacing your core systems.",
  },
  {
    q: "Which industries do you work with?",
    a: "We work with SMBs and large enterprises in India and overseas, including manufacturing, logistics, financial services, and retail. Every solution is shaped to the industry's complexity, compliance needs, and growth plans.",
  },
];

/* ───────────────────────────── By region ───────────────────────────── */

export const HOME_HERO = local<HomeHero>({ us: AU_HERO, in: IN_HERO });
export const HOME_ABOUT = local<HomeAbout>({ us: AU_ABOUT, in: IN_ABOUT });
