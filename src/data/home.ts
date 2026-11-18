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
  lead: "An AI pilot, a modernisation plan, a cloud migration: AptaCloud proves the value on your data with a proof of concept, then delivers in clear phases with senior, Microsoft-certified AI and cloud specialists, on the systems you already run.",
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
  heading: "AI and cloud specialists for Indian SMBs and enterprises.",
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

/* ───────────────────────────── UAE ───────────────────────────── */
// Rebuilt from the live aptacloud.com/uae/ home (Nov 2026). The live trust strip
// is merged into "Why"; its compliance points live in the UAE rules section
// (UaeHub), so they are not repeated. No UAE office exists, so "local
// presence" is left out.

const UAE_HERO: HomeHero = {
  lines: ["Innovation with", "flexible digital"],
  accent: "solutions.",
  lead: "Flexible, scalable cloud and AI that take the complexity out of operations for the UAE's growing businesses. We prove it on your data first.",
  link: { label: "See how we work", href: "#process" },
};

const UAE_ABOUT: HomeAbout = {
  heading: "AI and cloud specialists for businesses across the UAE.",
  lead: "We help small, medium, and large enterprises in the UAE simplify operations, automate workflows, and see their data clearly, with cloud, AI, and system upgrades that improve performance, secure data, and flex as you grow.",
  photoText: "See where AI pays off in your business first.",
  photoLink: { label: "How we work", href: "#process" },
};

export const UAE_SERVICES: Block = {
  kind: "cards",
  id: "solutions",
  style: "icon",
  tone: "white",
  tag: "Our services",
  icon: "layers",
  heading: "Digital services for steady business growth.",
  lead: "Eight services that cover AI, cloud, ERP, documents, data, and the applications you run on.",
  cols: 4,
  items: [
    { title: "AI consulting", text: "Document handling, customer service, and data that teams can use, with better demand forecasts and lower risk.", icon: "spark", href: asset("/ai-consulting/") },
    { title: "Cloud consulting", text: "Balanced workloads, simpler governance, and lower IT overhead through modernisation and central data.", icon: "cloud", href: asset("/azure-implementation/") },
    { title: "Azure managed services", text: "A secure, scalable Azure environment with transparent operations and controlled costs.", icon: "shield", href: asset("/azure-managed-services/") },
    { title: "AWS cloud hosting", text: "Load balancing, autoscaling, and DDoS protection on cost-effective AWS compute.", icon: "gauge", href: asset("/aws-compute/") },
    { title: "Dynamics 365", text: "Reporting, finance, operations, and supply chain on Business Central, with real-time visibility.", icon: "chart", href: asset("/services/microsoft/microsoft-dynamics-365/") },
    { title: "SharePoint development", text: "Document search, intranet, automation, and site management with audit trails built in.", icon: "doc", href: asset("/services/microsoft/sharepoint/") },
    { title: "Data warehousing", text: "Data cleaned and restructured in central storage, ready for AI, forecasting, and growth analysis.", icon: "db", href: asset("/data-warehousing/") },
    { title: "Application modernisation", text: "Cloud-first upgrades that integrate better, cut manual errors, and lower maintenance costs.", icon: "code", href: asset("/application-modernization/") },
  ],
};

export const UAE_PROCESS: Block = {
  kind: "cards",
  id: "process",
  style: "icon",
  tone: "dark",
  tag: "How we work",
  icon: "flow",
  heading: "Our process.",
  lead: "Five steps, with a pilot before you commit.",
  cols: 5,
  items: [
    { kicker: "Step 1", title: "Discuss your goal", text: "Your complexity, goals, and the issues holding growth back.", icon: "chat" },
    { kicker: "Step 2", title: "Plan the roadmap", text: "A strategic roadmap with solutions built for your growth.", icon: "flow" },
    { kicker: "Step 3", title: "Prove it in a pilot", text: "A pilot project to test the scope before the full build.", icon: "target" },
    { kicker: "Step 4", title: "Build in agile stages", text: "Design to deployment without interrupting operations.", icon: "cog" },
    { kicker: "Step 5", title: "Grow with support", text: "Staff training, adoption help, and dedicated technical support.", icon: "team" },
  ],
};

export const UAE_WHY: Block = {
  kind: "cards",
  id: "why",
  style: "icon",
  tone: "tint",
  tag: "Why AptaCloud",
  icon: "target",
  heading: "Why UAE businesses trust AptaCloud.",
  lead: "Six reasons, from the first conversation to the support after go-live.",
  cols: 3,
  items: [
    { title: "Certified cloud specialists", text: "A skilled team for AI, Azure, Dynamics 365, and SharePoint.", icon: "team" },
    { title: "UAE market knowledge", text: "Solutions shaped to how businesses in the UAE operate and are regulated.", icon: "target" },
    { title: "Enterprise-grade delivery", text: "Practices that stand up in large, regulated environments.", icon: "layers" },
    { title: "Tailored at every stage", text: "Shaped to your processes, systems, and budget.", icon: "cog" },
    { title: "Scales without overhead", text: "An elastic platform that grows as your business evolves.", icon: "gauge" },
    { title: "Dedicated support", text: "Proactive monitoring, optimisation, and disaster recovery.", icon: "clock" },
  ],
};

export const UAE_ENGAGEMENTS: Block = {
  kind: "cases",
  id: "engagements",
  tone: "tint",
  label: "Typical engagement",
  tag: "Typical engagements",
  icon: "chart",
  heading: "What a typical engagement looks like.",
  lead: "Three patterns we see with UAE businesses, and how we approach them.",
  items: [
    { client: "A retail group", text: "Stock ran out in peak seasons because inventory updates were unmanaged. We migrated the point-of-sale data, integrated SAP through secure APIs, and added role-based access in line with regional governance." },
    { client: "An insurance provider", text: "Manual claims took days, with gaps in fraud detection. We added NLP document classification, moved data to the cloud, and built an AI tool for claims triage and underwriting." },
    { client: "A heavy equipment manufacturer", text: "Frequent machine breakdowns delayed production. We built predictive maintenance models on a hybrid cloud with Azure IoT Hub and a Power BI dashboard." },
  ],
};

export const UAE_INDUSTRIES: Block = {
  kind: "cards",
  id: "industries",
  style: "icon",
  tone: "white",
  tag: "Industries",
  icon: "target",
  heading: "Solutions for your industry.",
  cols: 3,
  items: [
    { title: "Healthcare", text: "Modern systems for hospitals, pharma, health insurers, and medical manufacturers, aligned with DHA, DOH Abu Dhabi, and MOH requirements.", icon: "eye", href: asset("/healthcare/") },
    { title: "Banking and finance", text: "Document processing, data governance, and secure infrastructure for lenders, banks, investors, and insurers.", icon: "shield", href: asset("/financial-services/") },
    { title: "Oil and gas", text: "High-performing, secure infrastructure for upstream, midstream, and downstream operations across the Emirates.", icon: "pipe", href: asset("/industry/oil-gas/") },
    { title: "Retail and e-commerce", text: "Real-time inventory, high-traffic orders, demand forecasts, and personal marketing with Business Central and AI.", icon: "chart" },
    { title: "Manufacturing", text: "Better coordination, daily workflows, and production lines with cloud, AI, and Business Central.", icon: "cog", href: asset("/manufacturing/") },
    { title: "IT and SaaS", text: "Secure, scalable infrastructure, DevOps, and data engineering for software and digital companies.", icon: "code", href: asset("/azure-devops/") },
  ],
};

export const UAE_FAQS: ServicePage["faqs"] = [
  { q: "Are your solutions compliance-ready for UAE businesses?", a: "Yes. We follow standard practice for UAE businesses to make compliance audits easier, including FTA, WPS, MOHRE, PDPL, and GDPR requirements." },
  { q: "Will new technology disrupt our workflow?", a: "No. We develop and roll out in agile stages alongside your work, without serious downtime." },
  { q: "What support do we get after modernisation?", a: "A dedicated technical and project team monitors operations and security, tunes performance, and helps your people adopt the new ways of working." },
];

/* ───────────────────────────── US ───────────────────────────── */
// The global site: one tabbed platform section in place of AU's three
// stacked Dynamics, Microsoft, and Azure sections (live aptacloud.com home).

export const US_PLATFORM: Block = {
  kind: "tabs",
  id: "platform",
  tone: "dark",
  tag: "Platforms",
  icon: "layers",
  heading: "The platforms your AI runs on.",
  lead: "Azure, Dynamics 365, and Microsoft 365 with Copilot, set up and run by senior, Microsoft-certified specialists.",
  // Positioning order: Azure (data and cloud tier) before the wider Microsoft stack.
  tabs: [
    {
      label: "Azure",
      intro: "Cloud infrastructure that is secure, scalable, and costs what it should.",
      photo: { src: "/images/photos/regions/us/azure.jpg", alt: "A bright data center aisle lined with server cabinets", position: "50% 50%" },
      items: [
        { title: "Azure hosting", text: "Computing, networking, and security on Azure." },
        { title: "Azure migration", text: "Servers, applications, and databases moved from on premises or other clouds." },
        { title: "Azure optimisation", text: "Performance, cost, and scale tuned to your workloads." },
        { title: "Azure managed services", text: "Monitoring and proactive support, so you can focus on the business." },
      ],
    },
    {
      label: "Dynamics 365",
      intro: "Connect sales, operations, HR, and finance on one platform.",
      photo: { src: "/images/photos/regions/us/team.jpg", alt: "A project team reviewing a plan at a flipchart", position: "55% 50%" },
      items: [
        { title: "Consulting", text: "Your processes assessed and the right Dynamics 365 apps recommended." },
        { title: "Implementation", text: "From solution design to deployment and training, in clear phases." },
        { title: "Integration", text: "Power Platform, Azure, and third-party apps on one view of your data." },
        { title: "Migration and optimisation", text: "On-premises or legacy ERP moved, then tuned, secured, and managed." },
      ],
    },
    {
      label: "Microsoft 365 and Copilot",
      intro: "Productivity, documents, and AI where your people already work.",
      photo: { src: "/images/photos/regions/us/room.jpg", alt: "Colleagues in a meeting with laptops", position: "60% 50%" },
      items: [
        { title: "Microsoft 365", text: "The full productivity suite, set up for collaboration and security." },
        { title: "SharePoint", text: "Content and documents organised, shared, and easy to find." },
        { title: "Microsoft Copilot", text: "AI that automates routine work and surfaces insight." },
        { title: "Power Platform", text: "Low-code apps, automated workflows, and analytics." },
      ],
    },
  ],
};

/* ───────────────────────────── By region ───────────────────────────── */

export const HOME_HERO = local<HomeHero>({ us: AU_HERO, in: IN_HERO, uae: UAE_HERO });
export const HOME_ABOUT = local<HomeAbout>({ us: AU_ABOUT, in: IN_ABOUT, uae: UAE_ABOUT });
