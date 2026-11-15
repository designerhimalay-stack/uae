// Building blocks for the sections India's and the UAE's old pages have and the
// shared layouts lack (placed by in-sections.ts / uae-sections.ts). Copy follows
// the Brand and Content Writing Guidelines v2.0: no third-party statistics, no
// client names or figures (case studies become typical engagements), and only
// the approved credentials (20+ years, 300+ clients, 200+ engineers).

import type { Block, BlockItem, IconId } from "../types";

type Card = { title: string; text: string; icon: IconId };

/** An icon-card section: challenges, why AptaCloud, or outcomes. */
export function cards(id: string, tag: string, icon: IconId, heading: string, items: Card[], lead?: string): Block {
  const cols = items.length % 3 === 0 ? 3 : 4;
  return { kind: "cards", id, style: "icon", head: "center", tag, icon, heading, ...(lead ? { lead } : {}), cols, items: items as BlockItem[] };
}

export const challenges = (heading: string, lead: string, items: Card[]) => cards("challenges", "Common challenges", "eye", heading, items, lead);
export const why = (heading: string, items: Card[], lead?: string) => cards("why-us", "Why AptaCloud", "target", heading, items, lead);
export const outcomes = (heading: string, items: Card[], lead?: string) => cards("benefits", "Outcomes", "spark", heading, items, lead);

type Engagement = { client: string; text: string; points: string[] };
const engagements = (heading: string, items: Engagement[]): Block => ({
  kind: "cases",
  id: "case-studies",
  layout: "wide",
  label: "Typical engagement",
  tag: "Typical engagements",
  icon: "chart",
  heading,
  lead: "How the work usually runs, starting with one team or one process.",
  items,
});

/** The old India and UAE pages carry case studies on these shared pages (aptacloud.com's do not). */
export const REGIONAL_ENGAGEMENTS: Record<string, Block> = {
  "ai-agents": engagements("What an AI agent project looks like in our industries.", [
    { client: "Insurance: policy and claim questions", text: "Policy and claims teams often answer the same status questions all day. We build one agent that checks the policy and claims systems and answers customers, handing anything complex to staff.", points: ["Status questions answered any time", "Staff free for complex cases", "Every answer logged"] },
    { client: "Oil and gas: maintenance work packs", text: "Maintenance planners often pull work orders, parts, and permits from several systems. We build an agent that prepares the work pack for one asset type, checked by a planner before release.", points: ["Work packs prepared sooner", "Fewer missed parts or permits", "Planners stay in control"] },
    { client: "Engineering and construction: RFIs and submittals", text: "Project teams often chase RFIs and submittals by email. We build an agent that tracks open items on one project, drafts follow-ups, and flags overdue responses.", points: ["Open items tracked for you", "Overdue responses flagged early", "Less time chasing email"] },
  ]),
  "azure-hosting": engagements("What a move to Azure hosting looks like in our industries.", [
    { client: "Insurance: broker portals", text: "Broker portals and quoting apps often run on ageing on-premises servers. We move one portal to Azure App Service with scaling and backup, then plan the rest.", points: ["Portals that scale at renewal time", "Backups on a schedule", "No hardware to replace"] },
    { client: "Oil and gas: field reporting apps", text: "Field reporting apps often run on servers in a single office. We host them on Azure with secure access for crews and automated backup.", points: ["Apps reachable from any site", "Data protected off-site", "Less to maintain on premises"] },
    { client: "Engineering and construction: project apps", text: "Estimating and project apps often slow down on office servers under load. We move one application to Azure, sized to how it is really used.", points: ["Faster apps for project teams", "Costs that follow usage", "Reliable access for every office"] },
  ]),
  "azure-implementation": engagements("What an Azure implementation looks like in our industries.", [
    { client: "Insurance: claims notifications", text: "Policy, claims, and broker systems often exchange data through manual exports. We implement Azure integration services for one flow, such as claims notifications, then extend it.", points: ["Data moving without re-keying", "Integrations you can monitor", "Governance set from day one"] },
    { client: "Oil and gas: asset data to analytics", text: "Operational and maintenance data often stays in separate systems. We implement Azure Data Factory and Event Grid to bring one asset's data to analytics.", points: ["Field data available the same day", "One pipeline pattern to reuse", "Alerts when a flow fails"] },
    { client: "Engineering and construction: approvals", text: "Project, finance, and document systems often rely on email to stay in step. We implement Logic Apps workflows for one approval process, then reuse them across projects.", points: ["Approvals without email chains", "Records kept in every system", "Workflows that survive system changes"] },
  ]),
  "azure-managed-services": engagements("What managed Azure looks like in our industries.", [
    { client: "Insurance: policy and claims platforms", text: "Insurers often rely on a small IT team to watch policy and claims platforms out of hours. We take over monitoring, patching, and backup for one environment first, with agreed response times.", points: ["Platforms watched around the clock", "Patching on a schedule", "Monthly reports on cost and security"] },
    { client: "Oil and gas: operations servers", text: "Operations servers often go unpatched because nobody wants to risk downtime. We manage patching windows, backups, and alerts for one site's systems, with tested restores.", points: ["Patches applied safely", "Restores proven before they are needed", "Fewer surprises for operations"] },
    { client: "Engineering and construction: project systems", text: "Project systems often grow with every new job and are rarely reviewed. We manage the Azure environment across projects, with cost reviews as projects open and close.", points: ["Costs that follow the project pipeline", "One team for every project system", "Issues fixed before sites notice"] },
  ]),
  "azure-migration": engagements("What an Azure migration looks like in our industries.", [
    { client: "Insurance: policy and claims servers", text: "Policy and claims servers often run in ageing data centres. We map dependencies, move one workload to Azure as a pilot, then migrate the rest in planned stages.", points: ["A migration plan with costs", "Cut-over without long outages", "Old hardware retired"] },
    { client: "Oil and gas: site systems", text: "Field and reporting systems often sit on servers at a single site. We move them to Azure in stages, starting with the lowest-risk workload.", points: ["Systems reachable from every site", "Risk reduced at each stage", "Backup and recovery in place"] },
    { client: "Engineering and construction: head office servers", text: "Project and document servers often live in head office. We move one server group to Azure, test it with a project team, then complete the move.", points: ["Project teams tested before cut-over", "No more waiting on hardware", "Costs that scale with projects"] },
  ]),
  "data-engineering": engagements("What a data engineering project looks like in our industries.", [
    { client: "Insurance: claims data", text: "Policy, claims, and finance data often sit in separate systems with different definitions. We build one governed pipeline for claims data on Azure, then add the other sources.", points: ["One trusted claims data set", "Pipelines that are monitored", "Data ready for reporting and AI"] },
    { client: "Oil and gas: asset data", text: "Sensor, maintenance, and production data often arrive in different formats and schedules. We bring one asset's data onto Microsoft Fabric, cleaned and modelled for analytics.", points: ["Asset data in one place", "Quality checks on every load", "A pattern for the next asset"] },
    { client: "Engineering and construction: project data", text: "Project data often sits in spreadsheets and several project tools. We build pipelines that bring one project type's data together for reporting.", points: ["Consistent project figures", "Less manual data preparation", "A base for portfolio reporting"] },
  ]),
  "data-visualization": engagements("What a dashboard project looks like in our industries.", [
    { client: "Insurance: broker performance", text: "Underwriting teams often judge broker performance from exports and pivot tables. We build one dashboard on broker and policy data, then add claims.", points: ["Broker performance in one view", "Figures everyone agrees on", "Reports that refresh themselves"] },
    { client: "Oil and gas: safety reporting", text: "HSE teams often compile incident and inspection figures by hand each month. We build a safety dashboard for one site from the systems already in place.", points: ["Incidents and inspections in one view", "Trends spotted sooner", "Less time compiling reports"] },
    { client: "Engineering and construction: tender pipeline", text: "Bid teams often track tenders and win rates in spreadsheets. We build a dashboard of the tender pipeline, linked to project outcomes.", points: ["The whole pipeline in one view", "Win rates by sector and client type", "Lessons fed back into bids"] },
  ]),
  "data-warehousing": engagements("What a data warehouse project looks like in our industries.", [
    { client: "Insurance: policy and claims history", text: "Insurers often keep years of policy and claims history in systems that cannot be queried together. We build a warehouse for one line of business first, then add the rest.", points: ["History queried in one place", "Faster month-end reporting", "A base for pricing models"] },
    { client: "Oil and gas: production history", text: "Production and maintenance history often sits in historians and spreadsheets. We model one asset's history in a cloud warehouse on Microsoft Fabric.", points: ["Years of history kept and searchable", "One model for every report", "Storage that grows with the data"] },
    { client: "Engineering and construction: project history", text: "Completed project data is often lost when a project closes. We build a warehouse that keeps cost, schedule, and quality history for every project.", points: ["Lessons kept after handover", "Estimates based on real history", "Portfolio reporting on demand"] },
  ]),
  "generative-ai": engagements("What a generative AI project looks like in our industries.", [
    { client: "Insurance: letters and summaries", text: "Underwriters and claims teams often draft the same letters and summaries every day. We pilot Azure OpenAI with one team, grounded in their own documents and checked by staff.", points: ["Drafts ready for review", "Answers grounded in your documents", "Staff stay in control"] },
    { client: "Oil and gas: shift and incident reports", text: "Engineers often write shift and incident reports from scattered notes. We build an assistant that drafts reports from structured inputs for one site.", points: ["Consistent reports every shift", "Less time on paperwork", "Searchable records"] },
    { client: "Engineering and construction: tender responses", text: "Bid teams often rewrite similar tender responses for every bid. We build an assistant over past submissions that drafts first versions for review.", points: ["First drafts produced sooner", "Past answers reused", "Bid managers keep the final say"] },
  ]),
};
