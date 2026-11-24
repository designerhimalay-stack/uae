// Company pages: every section of the live About, Careers, Blog, White Papers,
// and Events pages, rewritten to the guidelines. Live content that broke the
// guidelines or was wrong is left out and listed in docs/service-pages-review.md
// (NetSuite partner logo, "300+ global delivery locations", the white paper's
// mismatched highlights, an out-of-vertical healthcare event).

import { asset } from "@/brand/brand";
import type { Block, CompanyEvent, ServiceLayout } from "../types";
import { COMPANY_STATS } from "./shared";

const C = "/images/photos/company";

/** Office locations (live "Our Global Presence"). */
const OFFICES: Extract<Block, { kind: "offices" }>["items"] = [
  { country: "United States", flag: "us", city: "Richardson, TX", address: "801 E Campbell Rd, Ste 365, Richardson, TX 75081", timeZone: "America/Chicago", label: "Headquarters" },
  { country: "India", flag: "in", city: "Gurugram", address: "Platinum Tower, Unit 1024, Gurugram, Haryana 122018", timeZone: "Asia/Kolkata" },
  { country: "India", flag: "in", city: "Pune", address: "Almonte IT Park, Sprint Coworks, 6th Floor, Unit 622, Kharadi, Pune, Maharashtra 411014", timeZone: "Asia/Kolkata" },
  { country: "Mexico", flag: "mx", city: "Mexico City", timeZone: "America/Mexico_City" },
  // Client, 2026-11-20: Colombia on the About and Locations sections only (not the US home). City to confirm.
  { country: "Colombia", flag: "co", city: "Delivery team", timeZone: "America/Bogota" },
];

const EV = "/images/photos/company/events";

/** Every event, newest first. Each has its own page (/events/<slug>/) and its own image, taken from the
 *  event's page on the live site; Convergence AI Dallas has only a 317px image there, so a conference
 *  photo stands in (client, 2026-11-20). */
export const EVENTS: CompanyEvent[] = [
  {
    slug: "connected-claims-usa-2026",
    name: "Connected Claims USA 2026",
    start: "2026-11-03",
    end: "2026-11-04",
    venue: "Signia by Hilton Orlando Bonnet Creek, 14100 Bonnet Creek Resort Lane, Orlando, FL 32821",
    city: "Orlando, FL",
    text: "Claims leaders met in Orlando to discuss AI, ecosystem integration, and the future of claims operations. AptaCloud's team talked with carriers about using AI for claims triage, and about connecting claims data across their systems.",
    register: "https://resources.reutersevents.com/connected-claims-usa-2026-experience",
    photo: { src: `${EV}/connected-claims-usa-2026.jpg`, alt: "Connected Claims USA 2026, 3 to 4 November 2026, Orlando", position: "50% 50%" },
  },
  {
    slug: "insurtech-america",
    name: "Insurtech America",
    start: "2026-05-13",
    end: "2026-05-14",
    venue: "Connecticut Convention Center, Hartford, CT",
    city: "Hartford, CT",
    text: "Insurers and insurtech teams met in Hartford to discuss new AI regulation, data privacy, compliant claims processing, and automated underwriting. AptaCloud was there to talk about adopting AI on a foundation of data insurers can trust.",
    photo: { src: `${EV}/insurtech-america.jpg`, alt: "Attendees talking in front of the Insurtech Hartford Symposium sponsor wall", position: "50% 50%" },
  },
  {
    slug: "midsize-enterprise-summit",
    name: "Midsize Enterprise Summit",
    start: "2026-04-26",
    end: "2026-04-28",
    venue: "Marriott Marquis Houston, Houston, TX",
    city: "Houston, TX",
    text: "Technology leaders from mid-sized businesses met in Houston to compare notes on AI, cloud, and security. AptaCloud talked with them about putting AI to work on the systems they already run.",
    photo: { src: `${EV}/midsize-enterprise-summit.jpg`, alt: "A speaker presenting to a seated audience at the Midsize Enterprise Summit", position: "50% 50%" },
  },
  {
    slug: "ai-in-oil-gas",
    name: "AI in Oil & Gas",
    start: "2026-04-08",
    end: "2026-04-09",
    venue: "Hyatt Regency Houston West, Houston, TX",
    city: "Houston, TX",
    text: "Operators and service companies met in Houston to discuss AI for predictive maintenance, production, and field operations. AptaCloud joined the conversation on turning sensor and maintenance data into work orders and decisions.",
    photo: { src: `${EV}/ai-in-oil-gas.jpg`, alt: "A speaker on stage at the AI in Oil & Gas conference in front of a full room", position: "50% 50%" },
  },
  {
    slug: "convergence-ai-dallas",
    name: "Convergence AI Dallas",
    start: "2026-03-30",
    end: "2026-03-31",
    venue: "Irving Convention Center, Irving, TX",
    city: "Irving, TX",
    text: "AI leaders met in Irving for talks, panels, and live demonstrations on where AI goes next in business. AptaCloud attended to meet teams taking AI from pilots into production.",
    photo: { src: `${EV}/convergence-ai-dallas.jpg`, alt: "An audience watching talks under blue stage light at a technology conference", position: "50% 50%" },
  },
];

export const COMPANY_LAYOUTS: Record<string, ServiceLayout> = {
  /* ─────────────────────────── About Us ─────────────────────────── */
  "about-us": {
    // The approved credentials (20+ years, 300+ clients, 200+ engineers, 4 delivery locations).
    stats: [...COMPANY_STATS, { value: 4, suffix: "", label: "Delivery locations" }],
    blocks: [
      {
        kind: "split",
        id: "our-story",
        tag: "Our story",
        icon: "team",
        heading: "Your team has already started. We take it to production.",
        body: [
          "AptaCloud works with mid-sized businesses in insurance, oil and gas, and engineering and construction. We help their teams move work faster with AI, and we modernise and connect the systems that AI depends on.",
          "Most of our clients come to us with something already under way: an AI pilot, a modernisation plan, or a cloud migration. We prove the value on their data with a proof of concept, then deliver in clear phases with senior, Microsoft-certified AI and cloud specialists, on the systems they already run.",
          "Our engineers work from the United States, India, Mexico, and Colombia, so delivery and support carry on around the clock.",
        ],
        photo: { src: `${C}/about-story.jpg`, alt: "Three colleagues discussing a project around a computer in the office", position: "55% 50%" },
      },
      {
        kind: "cards",
        id: "microsoft",
        style: "mark",
        tag: "Microsoft",
        icon: "team",
        heading: "What we do.",
        lead: "The Microsoft tools your teams use every day, set up and connected properly.",
        cols: 4,
        items: [
          { title: "Microsoft SharePoint", text: "Content managed and shared in one place, so teams find and work on the right documents together.", mark: "sharepoint", href: asset("/services/microsoft/sharepoint/") },
          { title: "Microsoft 365", text: "A complete set of productivity tools, set up so your people collaborate and work efficiently.", mark: "m365", href: asset("/services/microsoft/microsoft-365/") },
          { title: "Microsoft Copilot", text: "AI that takes on repetitive tasks and surfaces insight inside the tools your teams already use.", mark: "copilot", href: asset("/services/microsoft/copilot-studio/") },
          { title: "Power Platform", text: "Low-code apps, automated workflows, and data analysis, built on Microsoft's Power Platform.", mark: "powerPlatform", href: asset("/services/microsoft/power-platform/") },
        ],
      },
      {
        kind: "people",
        id: "leadership",
        tag: "Leadership",
        icon: "team",
        heading: "Meet our leadership team.",
        lead: "Executive guidance and technical leadership across our United States, India, Mexico, and Colombia engineering practices.",
        items: [
          {
            name: "Hemant Madaan",
            role: "Chief Executive Officer",
            badge: "Co-founder",
            photo: {
              src: `${C}/hemant-madaan.jpg`,
              alt: "Hemant Madaan, Chief Executive Officer at AptaCloud",
              position: "50% 18%",
            },
          },
          {
            name: "Naval Madaan",
            role: "Chief Operating Officer",
            badge: "Co-founder",
            photo: {
              src: `${C}/naval-madaan.jpg`,
              alt: "Naval Madaan, Chief Operating Officer at AptaCloud",
              position: "50% 20%",
            },
          },
          {
            name: "Jignesh Jayaswal",
            role: "Financial Controller",
            photo: {
              src: `${C}/jignesh-jayaswal.jpg`,
              alt: "Jignesh Jayaswal, Financial Controller at AptaCloud",
              position: "50% 18%",
            },
          },
          {
            name: "Ketki Naidu",
            role: "Human Resources",
            photo: {
              src: `${C}/ketki-naidu.jpg`,
              alt: "Ketki Naidu, Human Resources at AptaCloud",
              position: "50% 22%",
            },
          },
        ],
      },
      {
        kind: "cards",
        id: "partners",
        style: "icon",
        tag: "Partners",
        icon: "link",
        heading: "The technology partners we build with.",
        lead: "Microsoft is our main platform partner. We add Anthropic's AI models and Amazon Web Services where they fit the systems you already run.",
        cols: 3,
        items: [
          { title: "Microsoft", text: "Azure, Dynamics 365, Power BI, and Microsoft Fabric are where our senior specialists spend most of their time.", logo: "/images/partners/microsoft.svg" },
          { title: "Anthropic", text: "Claude models for AI that reads documents, reasons over your data, and works inside your workflows.", logo: "/images/partners/anthropic.svg" },
          { title: "Amazon Web Services", text: "Amazon Web Services for the workloads that already run there, or are better suited to it.", logo: "/images/partners/aws.svg" },
        ],
      },
      {
        kind: "posts",
        id: "articles",
        tag: "Blog",
        icon: "doc",
        heading: "From our blog.",
        items: [
          { slug: "how-cloud-modernization-transforms-life-insurance-operations", summary: "How cloud-native administration changes life insurance operations." },
          { slug: "life-insurance-administration-software-modern-vs-mainframe-2026", summary: "Modern and mainframe life insurance software, compared." },
          { slug: "what-is-a-policy-administration-system-insurance-cto-explainer", summary: "A primer on policy administration systems for insurance technology leaders." },
        ],
      },
      {
        kind: "events",
        id: "events",
        tag: "Events",
        icon: "clock",
        heading: "Where to meet us next.",
        next: EVENTS[0],
        past: EVENTS.slice(1, 3),
        all: asset("/events/"),
      },
      {
        kind: "offices",
        id: "locations",
        tag: "Global presence",
        icon: "target",
        heading: "Teams in the United States, India, Mexico, and Colombia.",
        lead: "Delivery and support carry on across time zones, wherever you are.",
        items: OFFICES,
      },
    ],
  },

  /* ─────────────────────────── Careers ─────────────────────────── */
  careers: {
    stats: COMPANY_STATS,
    blocks: [
      {
        kind: "split",
        id: "who-we-are",
        tag: "Who we are",
        icon: "team",
        heading: "Senior engineers, real systems, three industries.",
        body: ["We work with mid-sized businesses in insurance, oil and gas, and engineering and construction, on the systems they depend on every day. The work is hands-on, and it reaches production."],
        list: "cards",
        photo: { src: `${C}/careers-team.jpg`, alt: "A team of colleagues working at computers in a modern office", position: "50% 45%" },
        items: [
          { title: "Senior-led delivery", text: "Experienced specialists lead every project, from the first workshop to go-live.", icon: "team" },
          { title: "AI-first technology", text: "AI on Azure, Microsoft Fabric, Power BI, Dynamics 365, and Copilot, with AWS and Anthropic where they fit.", icon: "cloud" },
          { title: "Industries known in depth", text: "Insurance, oil and gas, and engineering and construction, so the work builds on itself.", icon: "target" },
          { title: "Proof before commitment", text: "Ideas are proven on client data with a proof of concept before full delivery.", icon: "spark" },
        ],
      },
      {
        kind: "cards",
        id: "what-we-work-on",
        style: "mark",
        tag: "The work",
        icon: "layers",
        heading: "What you would work on.",
        lead: "Our service lines, each with its own projects and specialists.",
        cols: 3,
        items: [
          { title: "AI consulting", text: "Finding where AI pays off, then taking it from pilot to production.", icon: "spark", href: asset("/ai-consulting/") },
          { title: "Data engineering", text: "The data platforms that reporting and AI depend on.", icon: "db", href: asset("/data-engineering/") },
          { title: "Application modernisation", text: "Keeping the systems businesses run on, and making them connect and scale.", icon: "layers", href: asset("/application-modernization/") },
          { title: "Microsoft 365", text: "Productivity, collaboration, and security for whole organisations.", mark: "m365", href: asset("/services/microsoft/microsoft-365/") },
          { title: "Dynamics 365", text: "Finance, operations, and customer systems for growing businesses.", mark: "dynamics", href: asset("/services/microsoft/microsoft-dynamics-365/") },
          { title: "Azure and AWS", text: "Migrating, running, securing, and optimising cloud workloads.", mark: "azure", href: asset("/azure-hosting/") },
        ],
      },
      {
        kind: "offices",
        id: "locations",
        tag: "Where we work",
        icon: "target",
        heading: "Our offices.",
        lead: "Teams in the United States, India, Mexico, and Colombia.",
        items: OFFICES,
      },
    ],
  },

  /* ─────────────────────────── Blog ─────────────────────────── */
  blog: {
    stats: [],
    blocks: [{ kind: "blog", tag: "Articles", heading: "All articles" }],
  },

  /* ─────────────────────────── White Papers ─────────────────────────── */
  whitepaper: {
    stats: [],
    blocks: [
      {
        kind: "papers",
        id: "papers",
        tag: "White papers",
        icon: "doc",
        heading: "Our white papers.",
        lead: "Detailed guides you can read, share, and come back to.",
        items: [
          {
            title: "Reducing Cloud Expenditure with Cost-Effective Azure Solutions",
            topic: "Microsoft Azure",
            summary: "Microsoft Azure gives organisations scale, agility, and global reach, but without strategic oversight that flexibility can turn into unchecked spend. This white paper looks at why Azure costs grow, and how to keep them under control.",
            points: ["Why Azure costs climb: complex pricing and a wide range of services", "Why cloud spending is one of the hardest things for organisations to manage", "How strategic oversight keeps Azure flexible and affordable"],
            cover: { src: `${C}/paper-azure-costs.jpg`, alt: "Cover of the white paper Reducing Cloud Expenditure with Cost-Effective Azure Solutions" },
            href: "https://aptacloud.com/whitepaper/reducing-cloud-expenditure-with-cost-effective-azure-solutions/",
          },
        ],
      },
      {
        kind: "posts",
        id: "articles",
        tag: "Related reading",
        icon: "doc",
        heading: "More on Azure.",
        items: [
          { slug: "azure-security-configurations-for-businesses", summary: "The Azure security settings every business should get right." },
          { slug: "step-by-step-guide-to-migrating-your-web-applications-to-microsoft-azure-2", summary: "A step-by-step plan for moving web applications to Azure." },
          { slug: "azure-vs-aws-mid-market-cloud-strategy", summary: "Azure and AWS compared for growing mid-sized businesses." },
        ],
      },
    ],
  },

  /* ─────────────────────────── Events ─────────────────────────── */
  events: {
    stats: [],
    blocks: [
      {
        kind: "events",
        id: "events",
        tag: "Events",
        icon: "clock",
        heading: "Upcoming and past events.",
        lead: "The conferences where you can meet AptaCloud's leadership.",
        next: EVENTS[0],
        past: EVENTS.slice(1),
      },
    ],
  },
};
