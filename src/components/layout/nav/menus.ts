// Nav menu content, one structure per region, each mirroring that region's live site
// (aptacloud.com, /in/, /uae/), with this site's page URLs.
//   US  — Services (AI, Data, App modernisation, Azure, AWS) · Platforms (Microsoft) · Industries · About
//   AU  — Services (with Microsoft as a tab) · Industries · About
//   IN, UAE — Solutions (Microsoft, Cloud, ERP & CRM, AI, Data & Intelligence, App modernisation)
//             · Industries (six sectors) · About (Overview, Resources)
// One shell for every panel — a 3-column grid + a trust strip (no CTA) — filled from three building blocks:
//   tabs   — categories; hovering/focusing one swaps the next two cells
//   column — a header, an optional two-line intro and its links
//   promo  — a highlighted card: logo, eyebrow, title, copy and a CTA

import { BRAND, asset, home } from "@/brand/brand";
import { REGION, local } from "@/brand/regions";

/** Link to a service page on this site (slugs keep the live site's US spelling).
 *  Labels mirror src/data/services; kept here so the nav island stays light. */
const svc = (label: string, slug: string): NavLink => ({ label, href: asset(`/${slug}/`) });

export type NavLink = { label: string; href: string };
export type NavColumn = { title: string; text?: string; links: NavLink[] };
export type NavPromo = {
  /** Logo image path, or "mark" for the brand mark. */
  logo: string;
  logoAlt: string;
  eyebrow: string;
  title: string;
  text: string;
  cta: NavLink;
};
export type NavTab = { id: string; label: string; column: NavColumn; promo: NavPromo };

export type NavMenu = {
  id: string;
  label: string;
} & (
  | { kind: "tabs"; tabsTitle: string; tabs: NavTab[] }
  | { kind: "columns"; lead?: NavPromo; columns: NavColumn[] }
);

const regional = REGION.id === "in" || REGION.id === "uae";
const where = local({ us: "", in: " across India", uae: " across the UAE" });

/* ── Promos ─────────────────────────────────────────────────────────── */

const WORKSHOP_PROMO: NavPromo = {
  logo: "mark",
  logoAlt: "AptaCloud",
  eyebrow: "Flagship Programme",
  title: "AI Assessment Workshop",
  text: "A tailored workshop that shows where AI can automate your operations and what it should return.",
  cta: local({ us: { label: "See what the workshop covers", href: home("#workshop") }, in: { label: "See how we work", href: home("#process") }, uae: { label: "See how we work", href: home("#process") } }),
};

const DATA_PROMO: NavPromo = {
  logo: "/images/microsoft/azure.svg",
  logoAlt: "Microsoft Azure",
  eyebrow: "Data Foundations",
  title: "One Trusted Data Layer",
  text: "Pipelines, warehouses, and Power BI on Microsoft Fabric and Azure, built around the systems you run.",
  cta: { label: "Explore data engineering", href: asset("/data-engineering/") },
};

const APPMOD_PROMO: NavPromo = {
  logo: "/images/microsoft/azure.svg",
  logoAlt: "Microsoft Azure",
  eyebrow: "Modernise Without Starting Over",
  title: "Modernise Core Applications",
  text: "Phased re-platforming and re-architecture on Microsoft Azure, with no operational shutdown.",
  cta: { label: "Explore app modernisation", href: asset("/application-modernization/") },
};

const MS_PROMO: NavPromo = {
  logo: "/images/microsoft/microsoft-365.svg",
  logoAlt: "Microsoft 365",
  eyebrow: "Certified Partner",
  title: "Full Microsoft Business Suite",
  text: "The complete Microsoft ecosystem tailored for productivity, collaboration and security.",
  cta: { label: "Explore Microsoft 365", href: asset("/services/microsoft/microsoft-365/") },
};

const AZURE_PROMO: NavPromo = {
  logo: "/images/microsoft/azure.svg",
  logoAlt: "Microsoft Azure",
  eyebrow: "Cloud Excellence",
  title: "Cloud That Costs What It Should",
  text: "Run more on Azure for less, with costs you can explain to finance.",
  cta: local({
    us: { label: "Get your cloud cost review", href: asset("/azure-optimization/") },
    au: { label: "Get your cloud cost review", href: home("#azure") },
    in: { label: "Plan your move to Azure", href: asset("/azure-migration/") },
    uae: { label: "Plan your move to Azure", href: asset("/azure-migration/") },
  }),
};

const AWS_PROMO: NavPromo = {
  logo: "/images/partners/aws.svg",
  logoAlt: "AWS",
  eyebrow: "Multi-Cloud Support",
  title: "Scale Reliably on AWS",
  text: "Resilient architectures with automated failover, load balancing, and cost governance.",
  cta: { label: "Talk to a cloud expert", href: "#contact" },
};

/* ── Link groups ─────────────────────────────────────────────────────── */

const AI_LINKS = [
  svc("AI Consulting", "ai-consulting"),
  svc("AI Agents", "ai-agents"),
  svc("Generative AI", "generative-ai"),
  svc("Machine Learning", "machine-learning"),
];
const DATA_LINKS = [svc("Data Engineering", "data-engineering"), svc("Data Warehousing", "data-warehousing"), svc("Data Visualisation", "data-visualization")];
const APPMOD_LINKS = [
  svc("Legacy Application Migration", "legacy-application-migration"),
  svc("Application Modernisation", "application-modernization"),
  svc("Application Re-engineering", "application-re-engineering"),
];
const MS_LINKS = [
  svc("Microsoft 365", "services/microsoft/microsoft-365"),
  svc("Microsoft Teams", "services/microsoft/teams"),
  svc("Microsoft Copilot", "services/microsoft/copilot-studio"),
  svc("Microsoft Dynamics 365", "services/microsoft/microsoft-dynamics-365"),
  svc("Microsoft Power BI", "services/microsoft/power-bi"),
  svc("Power Platform", "services/microsoft/power-platform"),
  svc("Microsoft SharePoint", "services/microsoft/sharepoint"),
  svc("Identity & Security", "services/microsoft/identity-security"),
  svc("Cloud Storage & Databases", "services/microsoft/cloud-storage"),
];
const AZURE_LINKS = [
  svc("Azure Hosting", "azure-hosting"),
  svc("Azure Migration", "azure-migration"),
  svc("Azure Implementation", "azure-implementation"),
  svc("Azure Optimisation", "azure-optimization"),
  svc("Azure Managed Services", "azure-managed-services"),
  svc("Azure Security", "azure-security"),
];
const AWS_LINKS = [
  svc("AWS Compute", "aws-compute"),
  svc("AWS Migration", "aws-migration-services"),
  svc("AWS Implementation", "aws-implementation"),
  svc("AWS Optimisation", "aws-optimization"),
  svc("AWS Managed Services", "aws-managed-services"),
  svc("AWS Security", "aws-security"),
];

/* ── Tabs ────────────────────────────────────────────────────────────── */

const AI_TAB: NavTab = {
  id: "ai",
  label: regional ? "AI" : "Artificial Intelligence",
  column: { title: "Artificial Intelligence", text: "Find where AI pays off first, then take it from pilot to production.", links: AI_LINKS },
  promo: WORKSHOP_PROMO,
};
const DATA_TAB: NavTab = {
  id: "data",
  label: "Data & Analytics",
  column: { title: "Data & Analytics", text: "Build the trusted data layer your reporting and AI depend on.", links: DATA_LINKS },
  promo: DATA_PROMO,
};
const APPMOD_TAB: NavTab = {
  id: "app-mod",
  label: "Application Modernisation",
  column: { title: "Application Modernisation", text: "Keep the systems your business runs on, and make them connect, scale, and support AI.", links: APPMOD_LINKS },
  promo: APPMOD_PROMO,
};
const MS_TAB: NavTab = {
  id: "microsoft",
  label: "Microsoft Services",
  column: { title: "Microsoft Services", text: "Collaboration, business applications, and low-code suites your teams already know.", links: MS_LINKS },
  promo: MS_PROMO,
};
const AZURE_TAB: NavTab = {
  id: "azure",
  label: "Azure Cloud",
  column: { title: "Azure Cloud Services", text: "Microsoft Azure support from workload migration to round-the-clock managed cloud.", links: AZURE_LINKS },
  promo: AZURE_PROMO,
};
const AWS_TAB: NavTab = {
  id: "aws",
  label: "AWS Cloud",
  column: { title: "AWS Cloud Services", text: "Comprehensive AWS cloud infrastructure design, deployment, optimisation, and security.", links: AWS_LINKS },
  promo: AWS_PROMO,
};

// India and the UAE: the live sites' "Solutions" menu, in its order and with its labels.
const REGIONAL_TABS: NavTab[] = [
  {
    id: "microsoft",
    label: "Microsoft",
    column: {
      title: "Microsoft",
      text: "Collaboration, security, and Copilot on the Microsoft tools your teams already use.",
      links: [
        svc("Microsoft 365", "services/microsoft/microsoft-365"),
        svc("Microsoft Teams", "services/microsoft/teams"),
        svc("Identity & Security", "services/microsoft/identity-security"),
        svc("Microsoft Copilot", "services/microsoft/copilot-studio"),
        svc("Microsoft SharePoint", "services/microsoft/sharepoint"),
      ],
    },
    promo: MS_PROMO,
  },
  {
    id: "cloud",
    label: "Cloud",
    column: {
      title: "Cloud",
      text: `Microsoft Azure${where}, from hosting and migration to DevOps and managed cloud.`,
      links: [
        svc("Azure Hosting", "azure-hosting"),
        svc("Azure Managed Services", "azure-managed-services"),
        svc("Azure Migration", "azure-migration"),
        svc("Azure Implementation", "azure-implementation"),
        svc("Azure DevOps", "azure-devops"),
      ],
    },
    promo: AZURE_PROMO,
  },
  {
    id: "erp",
    label: "ERP & CRM",
    column: {
      title: "ERP & CRM",
      text: "Finance, operations, sales, and service on Microsoft Dynamics, sized to your business.",
      links: [svc("Microsoft Dynamics 365", "services/microsoft/microsoft-dynamics-365"), svc("Microsoft Dynamics Business Central", "microsoft-dynamics-business-central")],
    },
    promo: {
      logo: "/images/microsoft/dynamics-365.svg",
      logoAlt: "Microsoft Dynamics 365",
      eyebrow: "Business Applications",
      title: "One System for the Business",
      text: "Dynamics 365 for growing enterprises, Business Central for SMBs, connected to the rest of Microsoft.",
      cta: { label: "Explore Business Central", href: asset("/microsoft-dynamics-business-central/") },
    },
  },
  { ...AI_TAB, label: "AI" },
  {
    id: "data",
    label: "Data & Intelligence",
    column: {
      title: "Data & Intelligence",
      text: "Build the trusted data layer your reporting and AI depend on.",
      links: [
        svc("Data Engineering", "data-engineering"),
        svc("Data Warehousing", "data-warehousing"),
        svc("Business Intelligence & Visualisation", "data-visualization"),
        svc("Microsoft Fabric", "microsoft-fabric"),
      ],
    },
    promo: { ...DATA_PROMO, cta: { label: "Explore Microsoft Fabric", href: asset("/microsoft-fabric/") } },
  },
  {
    id: "app-mod",
    label: "Application Modernisation",
    column: {
      title: "Application Modernisation",
      text: "Keep the systems your business runs on, and make them connect, scale, and support AI.",
      links: [
        svc("Systems Re-engineering", "application-re-engineering"),
        svc("Legacy Migration", "legacy-application-migration"),
        svc("Legacy Modernisation", "application-modernization"),
      ],
    },
    promo: APPMOD_PROMO,
  },
];

/* ── Menus ───────────────────────────────────────────────────────────── */

const INDUSTRIES: NavMenu = {
  id: "industries",
  label: "Industries",
  kind: "columns",
  columns: [
    {
      title: "Insurance",
      text: "Automate policy processing, claims adjustment and compliance workflows.",
      links: [
        svc("Insurance overview", "industry/insurance"),
        svc("Carriers", "industry/insurance/carriers"),
        svc("Managing General Agents (MGA)", "industry/insurance/managing-general-agents"),
        svc("Third Party Adjusters (TPA)", "industry/insurance/third-party-adjusters"),
        svc("Independent Agents", "industry/insurance/independent-agents"),
      ],
    },
    {
      title: "Oil & Gas",
      text: "Connect well sites, pipeline maintenance, and refining operations with real-time analytics.",
      links: [
        svc("Oil & Gas overview", "industry/oil-gas"),
        svc("Major Operators", "industry/oil-gas/major-operators"),
        svc("Drilling & Well Services", "industry/oil-gas/drilling-and-well-services"),
        svc("Pipeline Maintenance", "industry/oil-gas/pipeline-maintenance"),
        svc("Refining & Distribution", "industry/oil-gas/refining-and-distribution"),
      ],
    },
    {
      title: "Engineering & Construction",
      text: "Streamline field operations, BIM collaboration, and multi-site project controls.",
      links: [
        svc("Engineering & Construction overview", "industry/engineering-and-construction"),
        svc("Construction", "industry/engineering-and-construction/construction"),
        svc("Engineering & Design", "industry/engineering-and-construction/engineering-and-design"),
        svc("Field Services", "industry/engineering-and-construction/field-services"),
      ],
    },
  ],
};

// India and the UAE list six sectors, flat, as their live sites do (the UAE's banking page is /financial-services/).
const REGIONAL_INDUSTRIES: NavMenu = {
  id: "industries",
  label: "Industries",
  kind: "columns",
  lead: {
    logo: "mark",
    logoAlt: "AptaCloud",
    eyebrow: "Industries",
    title: `Built for the Sectors We Serve${where}`,
    text: "Microsoft cloud, data, and AI shaped around how each industry works and what it has to comply with.",
    cta: { label: "Talk to an industry lead", href: "#contact" },
  },
  columns: [
    {
      title: "Core industries",
      links: [
        svc("Insurance", "industry/insurance"),
        svc("Oil & Gas", "industry/oil-gas"),
        svc("Construction", "industry/engineering-and-construction"),
      ],
    },
    {
      title: "More industries",
      links: [
        svc("Healthcare", "healthcare"),
        svc("Banking & Financial Services", local({ us: "banking-financial-services", uae: "financial-services" })),
        svc("Manufacturing", "manufacturing"),
      ],
    },
  ],
};

const ABOUT: NavMenu = {
  id: "about",
  label: "About",
  kind: "columns",
  lead: {
    logo: "/images/aptacloud-logo.webp",
    logoAlt: BRAND.name,
    eyebrow: `About ${BRAND.name}`,
    title: "Your Path to Measurable AI ROI",
    text: BRAND.valueProp,
    cta: { label: `More about ${BRAND.name}`, href: asset("/about-us/") },
  },
  columns: regional
    ? [
        {
          title: "Overview",
          links: [
            { label: `About ${BRAND.name}`, href: asset("/about-us/") },
            { label: "Locations", href: asset("/about-us/#locations") },
            { label: "Events", href: asset("/events/") },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Blogs", href: asset("/blog/") },
            { label: "White papers", href: asset("/whitepaper/") },
          ],
        },
      ]
    : [
        {
          title: "Company overview",
          links: [
            { label: `About ${BRAND.name}`, href: asset("/about-us/") },
            { label: "Our story", href: asset("/about-us/#our-story") },
            { label: "Leadership team", href: asset("/about-us/#leadership") },
            { label: "Locations", href: asset("/about-us/#locations") },
          ],
        },
        {
          title: "Resources",
          links: [
            { label: "Careers", href: asset("/careers/") },
            { label: "Events", href: asset("/events/") },
            { label: "White papers", href: asset("/whitepaper/") },
            { label: `${BRAND.name} blog`, href: asset("/blog/") },
          ],
        },
      ],
};

// US: Microsoft sits under its own "Platforms" menu, as on aptacloud.com.
const PLATFORMS: NavMenu = {
  id: "platforms",
  label: "Platforms",
  kind: "columns",
  lead: MS_PROMO,
  columns: [
    {
      title: "Microsoft productivity & security",
      text: "Collaboration, security, and Copilot on the tools your teams already use.",
      links: [
        svc("Microsoft 365", "services/microsoft/microsoft-365"),
        svc("Microsoft Teams", "services/microsoft/teams"),
        svc("Microsoft SharePoint", "services/microsoft/sharepoint"),
        svc("Microsoft Copilot", "services/microsoft/copilot-studio"),
        svc("Identity & Security", "services/microsoft/identity-security"),
        svc("Cloud Storage & Databases", "services/microsoft/cloud-storage"),
      ],
    },
    {
      title: "Microsoft business applications",
      text: "ERP, CRM, reporting, and low-code apps on one Microsoft platform.",
      links: [
        svc("Microsoft Dynamics 365", "services/microsoft/microsoft-dynamics-365"),
        svc("Microsoft Power BI", "services/microsoft/power-bi"),
        svc("Power Platform", "services/microsoft/power-platform"),
      ],
    },
  ],
};

export const MENUS: NavMenu[] = local<NavMenu[]>({
  us: [
    { id: "services", label: "Services", kind: "tabs", tabsTitle: "What we do", tabs: [AI_TAB, DATA_TAB, APPMOD_TAB, AZURE_TAB, AWS_TAB] },
    PLATFORMS,
    INDUSTRIES,
    ABOUT,
  ],
  au: [
    { id: "services", label: "Services", kind: "tabs", tabsTitle: "What we do", tabs: [AI_TAB, DATA_TAB, APPMOD_TAB, MS_TAB, AZURE_TAB, AWS_TAB] },
    INDUSTRIES,
    ABOUT,
  ],
  in: [{ id: "services", label: "Solutions", kind: "tabs", tabsTitle: "What we do", tabs: REGIONAL_TABS }, REGIONAL_INDUSTRIES, ABOUT],
  uae: [{ id: "services", label: "Solutions", kind: "tabs", tabsTitle: "What we do", tabs: REGIONAL_TABS }, REGIONAL_INDUSTRIES, ABOUT],
});
