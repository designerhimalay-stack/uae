// UAE: sections the old aptacloud.com/uae/ pages have that the shared layouts
// lack, rewritten to the brand rules and placed where the old page has them.
// The old pages' market statistics (adoption rates, GDP forecasts) are left out.
// Audit: docs/uae-audit.md (section check, Nov 2026).

import type { RegionalSection } from "./types";
import { REGIONAL_ENGAGEMENTS as CASES, cards, challenges, outcomes, why } from "./sections";

/** The old UAE pages share one "Why AptaCloud" set across AI, data, and modernisation. */
const uaeWhy = (heading: string, expertise: string, extra: [string, string]) =>
  why(heading, [
    { title: "Microsoft-certified expertise", text: expertise, icon: "spark" },
    { title: "20+ years of experience", text: "Deep experience across cloud, AI, and enterprise systems.", icon: "clock" },
    { title: "300+ clients", text: "Solutions delivered and scaled across industries and markets.", icon: "team" },
    { title: "UAE compliance alignment", text: "Systems designed around the UAE PDPL and local data rules.", icon: "shield" },
    { title: "Structured and outcome-focused", text: "Low-risk delivery measured by business results, not just go-live.", icon: "target" },
    { title: extra[0], text: extra[1], icon: "flow" },
  ]);

export const UAE_INSERTS: Record<string, RegionalSection[]> = {
  "about-us": [
    { after: "our-story", block: cards("advantage", "Our approach", "spark", "The AptaCloud advantage.", [
      { title: "Outcome-first engineering", text: "Every solution is built for measurable business impact, not technical success alone.", icon: "target" },
      { title: "AI-led intelligence", text: "AI built into your systems to automate work, inform decisions, and keep improving.", icon: "spark" },
      { title: "Connected systems", text: "Disconnected applications joined into one data and application layer.", icon: "link" },
      { title: "Scale with control", text: "Infrastructure that grows, with governance, security, and compliance built in.", icon: "shield" },
    ], "Where strategy meets execution. Pre-built frameworks shorten the time to value.") },
  ],
  "ai-agents": [
    { after: "overview", block: challenges("What AI agents mean for UAE businesses.", "AI is already part of everyday work across the UAE, and agents support the country's AI-first strategy.", [
      { title: "Faster decisions", text: "Agents that gather the facts and prepare the next step.", icon: "gauge" },
      { title: "Less operational effort", text: "Routine work handled around the clock.", icon: "flow" },
      { title: "Better customer engagement", text: "Quick, consistent answers in every channel.", icon: "chat" },
      { title: "Operations that scale", text: "More volume without adding headcount.", icon: "layers" },
    ]) },
    { after: "process", block: uaeWhy("Why AptaCloud for AI agents in the UAE.", "Agents built with Azure AI, Copilot Studio, and other enterprise tools.", ["Strategic AI consulting", "Guidance from planning to execution, in Dubai and across the UAE."]) },
    { after: "why-us", block: CASES["ai-agents"] },
  ],
  "application-modernization": [
    { after: "process", block: outcomes("What changes with AptaCloud.", [
      { title: "Faster, more reliable applications", text: "Systems that respond quickly and stay available.", icon: "gauge" },
      { title: "Lower operational costs", text: "Less spent keeping old platforms alive.", icon: "chart" },
      { title: "Secure and compliant", text: "Applications aligned with the UAE PDPL.", icon: "shield" },
      { title: "Integrated and scalable", text: "Modern platforms connected, with room to grow.", icon: "link" },
    ]) },
  ],
  "application-re-engineering": [
    { after: "process", block: uaeWhy("Why AptaCloud for systems re-engineering in the UAE.", "Specialists in Azure-based application modernisation tools.", ["Minimal disruption", "Transformation planned so the business keeps running."]) },
  ],
  "azure-hosting": [{ after: "process", block: CASES["azure-hosting"] }],
  "azure-implementation": [
    { after: "process", block: why("Why AptaCloud is an Azure partner you can trust.", [
      { title: "Microsoft-certified Azure team", text: "200+ engineers with real implementation experience.", icon: "team" },
      { title: "Proven frameworks", text: "A structured approach that reduces risk and avoids rework.", icon: "flow" },
      { title: "UAE compliance expertise", text: "Cloud environments aligned with PDPL and DIFC data rules.", icon: "shield" },
      { title: "300+ clients", text: "Experience across industries and markets.", icon: "chart" },
      { title: "Ownership throughout", text: "From design to deployment and optimisation.", icon: "target" },
      { title: "Transparent execution", text: "Clear documentation, timelines, and measurable progress.", icon: "doc" },
    ]) },
    { after: "why-us", block: CASES["azure-implementation"] },
  ],
  "azure-managed-services": [{ after: "process", block: CASES["azure-managed-services"] }],
  "azure-migration": [{ after: "process", block: CASES["azure-migration"] }],
  "data-engineering": [
    { before: "services", block: challenges("Why a strong data foundation matters in the UAE.", "As the UAE works towards its National AI Strategy 2031, businesses need data that is organised, reliable, and easy to reach.", [
      { title: "Disconnected systems", text: "Data spread across applications that do not share it.", icon: "link" },
      { title: "Slow, unreliable pipelines", text: "Loads that fail or arrive late.", icon: "pipe" },
      { title: "Poor data quality", text: "Inconsistencies that undermine every report.", icon: "search" },
      { title: "No real-time insight", text: "Decisions made on yesterday's figures.", icon: "eye" },
      { title: "Hard to scale", text: "Platforms that struggle as data grows.", icon: "layers" },
      { title: "Delayed reporting", text: "Time lost reconciling numbers by hand.", icon: "clock" },
    ]) },
    { after: "process", block: why("Why AptaCloud for data engineering in the UAE.", [
      { title: "20+ years of expertise", text: "Experience with modern data architectures.", icon: "clock" },
      { title: "Enterprise-grade", text: "Scalable, secure solutions for demanding workloads.", icon: "layers" },
      { title: "Customised at every stage", text: "Pipelines shaped to your sources and goals.", icon: "cog" },
      { title: "Security and privacy first", text: "Data protection built into every design.", icon: "shield" },
      { title: "Minimal disruption", text: "Fast implementation that keeps operations running.", icon: "flow" },
      { title: "Continuous optimisation", text: "Pipelines monitored and tuned after go-live.", icon: "gauge" },
    ]) },
    { after: "why-us", block: CASES["data-engineering"] },
  ],
  "data-visualization": [
    { before: "services", block: challenges("Why data alone is not enough.", "Most UAE companies hold plenty of data but struggle to use it for growth.", [
      { title: "Fragmented data", text: "Figures spread across systems that do not agree.", icon: "link" },
      { title: "Security and privacy concerns", text: "Uncertainty over who should see what.", icon: "shield" },
      { title: "Technical complexity", text: "Tools that need specialists to run.", icon: "cog" },
      { title: "High upfront cost", text: "Investment that is hard to justify without a clear plan.", icon: "chart" },
    ]) },
    { after: "process", block: why("Why choose AptaCloud for BI and data visualisation.", [
      { title: "20+ years of domain expertise", text: "Experience turning business data into decisions.", icon: "clock" },
      { title: "Enterprise-grade", text: "Dashboards built on secure, scalable platforms.", icon: "layers" },
      { title: "Customised at every stage", text: "Reports shaped to the questions you ask.", icon: "cog" },
      { title: "Scale without overhead", text: "Room to grow without growing the team.", icon: "gauge" },
      { title: "Security-focused", text: "Access controls and governance from the start.", icon: "shield" },
      { title: "Ongoing support", text: "Fast delivery, then continuous optimisation.", icon: "flow" },
    ]) },
    { after: "why-us", block: CASES["data-visualization"] },
  ],
  "data-warehousing": [
    { before: "services", block: challenges("Why unstructured data slows growth.", "Without structure, data stays scattered, reports take longer, and teams cannot see across departments.", [
      { title: "Disconnected systems", text: "Data stored in many places that do not connect.", icon: "link" },
      { title: "Slow reporting", text: "Insights that arrive after the decision.", icon: "clock" },
      { title: "Unreliable data", text: "Inconsistent figures nobody fully trusts.", icon: "search" },
      { title: "Analytics that cannot scale", text: "Platforms that slow as questions grow.", icon: "layers" },
    ]) },
    { after: "process", block: why("Why choose AptaCloud for BI and data warehousing.", [
      { title: "20+ years of domain expertise", text: "Experience designing warehouses for real reporting needs.", icon: "clock" },
      { title: "Enterprise-grade platforms", text: "Microsoft Fabric, Azure Synapse, and Snowflake.", icon: "layers" },
      { title: "Customised at every stage", text: "Models shaped to your business, not a template.", icon: "cog" },
      { title: "Scale without overhead", text: "Capacity that grows with your data.", icon: "gauge" },
      { title: "Security-focused", text: "Governance and access control built in.", icon: "shield" },
      { title: "Ongoing support", text: "Fast delivery, then continuous optimisation.", icon: "flow" },
    ]) },
    { after: "why-us", block: CASES["data-warehousing"] },
  ],
  "generative-ai": [
    { before: "use-cases", block: challenges("Why UAE businesses are adopting generative AI.", "AI is already changing how UAE businesses work, and customers now expect faster, smarter responses.", [
      { title: "Automate repetitive work", text: "Routine drafting and data handling done for you.", icon: "flow" },
      { title: "Create content faster", text: "Documents and messages drafted in moments.", icon: "doc" },
      { title: "Better customer support", text: "Quick, accurate answers at any hour.", icon: "chat" },
      { title: "Faster decisions", text: "Summaries and insight when they are needed.", icon: "gauge" },
      { title: "Scale without hiring", text: "More output without adding headcount.", icon: "layers" },
      { title: "Stay ahead", text: "Early adopters gain the most.", icon: "target" },
    ]) },
    { after: "advantage", block: CASES["generative-ai"] },
  ],
  "machine-learning": [
    { before: "what-we-do", block: challenges("What machine learning means for UAE enterprises.", "Machine learning is becoming a core driver of efficiency and growth in the UAE, in line with the national AI vision.", [
      { title: "Better forecasting", text: "Plans based on patterns, not averages.", icon: "chart" },
      { title: "Faster decisions", text: "Data-driven answers when they are needed.", icon: "gauge" },
      { title: "Better customer experiences", text: "Service shaped to each customer.", icon: "chat" },
      { title: "Fewer inefficiencies", text: "Waste found and removed across operations.", icon: "cog" },
    ]) },
    { after: "process", block: uaeWhy("Why AptaCloud is the right partner for machine learning.", "Machine learning built on Azure Machine Learning and enterprise AI tools.", ["Strategic AI consulting", "Guidance from planning to execution, in Dubai and across the UAE."]) },
  ],
  "services/microsoft/identity-security": [
    { before: "solutions", block: challenges("Identity and security challenges businesses face in the UAE.", "Without strong identity and security, organisations are exposed to threats and compliance risk.", [
      { title: "Weak authentication", text: "Sign-ins that let attackers reach sensitive data.", icon: "shield" },
      { title: "Phishing and credential theft", text: "Stolen passwords that put people and systems at risk.", icon: "eye" },
      { title: "Compliance risk", text: "Poor identity management that can lead to regulatory penalties.", icon: "doc" },
      { title: "Blind spots", text: "Unmonitored apps and devices, and no central view to spot threats.", icon: "search" },
    ]) },
  ],
  "services/microsoft/microsoft-365": [
    { before: "services", block: challenges("Challenges with a fragmented system.", "Legacy systems, or a desktop-first Microsoft suite, hold back collaboration and core operations.", [
      { title: "Slow workflows", text: "Work that waits on disconnected tools and lowers productivity.", icon: "gauge" },
      { title: "Hard migrations", text: "Moving off legacy systems feels too risky to start.", icon: "migrate" },
      { title: "Limited collaboration", text: "Teams and departments working in separate places.", icon: "team" },
      { title: "Poor data and compliance", text: "Information that is hard to maintain and govern.", icon: "shield" },
    ]) },
  ],
  "services/microsoft/microsoft-dynamics-365": [
    { before: "solutions", block: challenges("What slows UAE businesses down.", "Disconnected systems and manual processes limit growth.", [
      { title: "Siloed systems", text: "Separate CRM, ERP, and finance systems that block real-time insight.", icon: "link" },
      { title: "Manual workflows", text: "Manual reporting that adds work and errors.", icon: "doc" },
      { title: "No single customer view", text: "Sales and service working without the full picture.", icon: "eye" },
      { title: "Limits to scale", text: "Legacy architecture that cannot keep up with the market.", icon: "layers" },
    ]) },
  ],
  "services/microsoft/sharepoint": [
    { before: "services", block: challenges("The challenges we solve.", "Collaboration and document problems that slow the whole business.", [
      { title: "Collaboration gaps", text: "Departments that cannot work together easily.", icon: "team" },
      { title: "Scattered knowledge", text: "Files and know-how spread across disconnected stores.", icon: "search" },
      { title: "Delayed approvals", text: "No central place for documents, so decisions wait.", icon: "clock" },
      { title: "Security and compliance risk", text: "Weak document governance and lifecycle control.", icon: "shield" },
    ]) },
  ],
  "services/microsoft/teams": [
    { before: "services", block: challenges("Why UAE businesses need professional Microsoft Teams support.", "Without unified collaboration, communication fragments, meetings drag, and file sharing becomes a risk.", [
      { title: "Inefficient collaboration", text: "Conversations split across tools and threads.", icon: "chat" },
      { title: "Uncontrolled file sharing", text: "Documents shared and co-authored without rules.", icon: "doc" },
      { title: "No central IT oversight", text: "Settings and access managed team by team.", icon: "eye" },
      { title: "Low productivity", text: "Time lost looking for people and files.", icon: "gauge" },
      { title: "Poor meeting experience", text: "Scheduling and meetings that waste time.", icon: "clock" },
      { title: "Hybrid friction", text: "Remote and office staff working unevenly.", icon: "team" },
    ]) },
  ],
  "industry/engineering-and-construction/construction": [
    { after: "deep-dive", block: cards("benefits", "Benefits", "spark", "Benefits of digital transformation for construction companies in the UAE.", [
      { title: "Better project visibility", text: "Schedules, budgets, site updates, and progress in one reporting view across developments.", icon: "eye" },
      { title: "Stronger collaboration", text: "Developers, consultants, contractors, and engineers working from the same information.", icon: "team" },
      { title: "Cost and schedule control", text: "Plans, financials, and progress connected, so delays and cost variations show up sooner.", icon: "chart" },
      { title: "Less repeated data entry", text: "Data transfers and reporting automated between systems.", icon: "flow" },
    ], "Projects that span many organisations, sites, and systems, run from one connected environment.") },
  ],
  "industry/oil-gas": [
    { after: "security", block: why("Why choose AptaCloud for oil and gas digital transformation.", [
      { title: "A proven framework", text: "Planned integration for a quicker rollout and a measurable return.", icon: "flow" },
      { title: "Deep industry expertise", text: "20+ years solving real operational problems.", icon: "team" },
      { title: "Support at every stage", text: "Consistent delivery, from assessment to optimisation.", icon: "target" },
      { title: "Secure cloud infrastructure", text: "High availability, aligned with the UAE PDPL.", icon: "shield" },
    ]) },
  ],
};
