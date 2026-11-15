// India: sections the old aptacloud.com/in/ pages have that the shared layouts
// lack, rewritten to the brand rules and placed where the old page has them.
// Audit: docs/india-audit.md (section check, Nov 2026).

import type { RegionalSection } from "./types";
import { REGIONAL_ENGAGEMENTS as CASES, cards, challenges, outcomes, why } from "./sections";

export const IN_INSERTS: Record<string, RegionalSection[]> = {
  "about-us": [
    { after: "locations", block: why("Why businesses choose AptaCloud.", [
      { title: "Cloud and transformation experience", text: "More than 20 years helping businesses move to the cloud and modernise how they work.", icon: "cloud" },
      { title: "Certified engineers", text: "200+ engineers who build and support Microsoft platforms every day.", icon: "team" },
      { title: "Focused on outcomes", text: "Every project is measured against the business result it was meant to deliver.", icon: "target" },
      { title: "Support that stays", text: "Reliable delivery, then long-term support after go-live.", icon: "clock" },
    ], "Let's build smarter systems for your business.") },
  ],
  "ai-agents": [
    { after: "process", block: why("Why AptaCloud for AI agents in India.", [
      { title: "Local teams, global standards", text: "Delivery teams in India working to international engineering standards.", icon: "team" },
      { title: "The full range of AI", text: "From predictive analytics to generative assistants, on one platform.", icon: "spark" },
      { title: "Built to grow", text: "Cloud-native agents that scale with your business, from start-up to enterprise.", icon: "gauge" },
      { title: "Responsible by design", text: "Transparent models with bias checks that protect your reputation.", icon: "shield" },
    ]) },
    { after: "why-us", block: CASES["ai-agents"] },
  ],
  "application-modernization": [
    { after: "process", block: outcomes("What changes with AptaCloud.", [
      { title: "Faster, more reliable systems", text: "Applications that respond quickly and stay available.", icon: "gauge" },
      { title: "Lower running costs", text: "Less spent on maintenance, hardware, and workarounds.", icon: "chart" },
      { title: "Easier integration", text: "Systems that connect to modern platforms and data.", icon: "link" },
      { title: "Room to grow", text: "Architecture that scales as the business does.", icon: "layers" },
    ]) },
  ],
  "application-re-engineering": [
    { before: "what-we-do", block: challenges("The challenges Indian businesses face with legacy applications.", "Legacy applications hold many Indian enterprises back.", [
      { title: "Legacy systems everywhere", text: "Core applications tied to old platforms that are hard to change.", icon: "code" },
      { title: "Poor data quality", text: "Inconsistent data that blocks reporting and decisions.", icon: "db" },
      { title: "Security concerns", text: "Older systems that make data harder to protect.", icon: "shield" },
      { title: "Fragmented systems", text: "Disconnected applications that delay decisions and need manual integration.", icon: "link" },
      { title: "Pressure without readiness", text: "Leaders expected to get value from data while outdated systems stand in the way.", icon: "gauge" },
      { title: "AI held back", text: "Unstructured data that keeps AI out of everyday operations.", icon: "spark" },
    ]) },
    { after: "process", block: why("Why AptaCloud for application re-engineering in India.", [
      { title: "Complex legacy experience", text: "20+ years transforming complex systems across industries.", icon: "cog" },
      { title: "Security and compliance first", text: "Architecture aligned with Indian and global data standards, including the DPDP Act.", icon: "shield" },
      { title: "A structured, low-risk approach", text: "Phased re-engineering that keeps the business running.", icon: "flow" },
      { title: "Support around the clock", text: "Continuous monitoring and technical help after go-live.", icon: "clock" },
    ]) },
  ],
  "azure-hosting": [
    { before: "services", block: challenges("Operational challenges of legacy hosting.", "Legacy systems need more people, cost more to run, and take time away from the business.", [
      { title: "Risk of downtime", text: "Ageing servers that fail at the moments that matter most.", icon: "clock" },
      { title: "Security gaps", text: "Older platforms that miss patches and modern protection.", icon: "shield" },
      { title: "Slow to scale", text: "New capacity means buying and installing hardware.", icon: "gauge" },
      { title: "Untuned performance", text: "Nobody has time to tune what is already running.", icon: "cog" },
      { title: "Complex monitoring", text: "Reports and alerts spread across several tools.", icon: "eye" },
      { title: "Rising running costs", text: "Power, space, and maintenance that cost more every year.", icon: "chart" },
    ]) },
    { after: "process", block: CASES["azure-hosting"] },
  ],
  "azure-implementation": [
    { before: "services", block: challenges("Challenges businesses often face with Azure.", "Complex deployments, security and compliance risks, and costs that run out of control.", [
      { title: "Misaligned architecture", text: "An Azure design that does not match how the business works.", icon: "layers" },
      { title: "Too many choices", text: "Hundreds of services and no clear way to pick the right ones.", icon: "search" },
      { title: "Governance gaps", text: "Policies and access rules applied inconsistently.", icon: "shield" },
      { title: "Budget overruns", text: "Resources left running that nobody uses.", icon: "chart" },
      { title: "Slow applications", text: "Workloads sized or placed the wrong way.", icon: "gauge" },
      { title: "Missing foundations", text: "Networking, identity, and monitoring not set up from day one.", icon: "cog" },
    ]) },
    { after: "process", block: why("Why AptaCloud for your move to Azure.", [
      { title: "Years of Azure work", text: "Azure services delivered for businesses of every size.", icon: "team" },
      { title: "Security built in", text: "Every implementation follows security and compliance good practice.", icon: "shield" },
      { title: "Right-sized resources", text: "We pick what your goals need and switch off what is not in use.", icon: "gauge" },
      { title: "With you throughout", text: "From consulting and migration to fully managed operations.", icon: "flow" },
    ]) },
    { after: "why-us", block: CASES["azure-implementation"] },
  ],
  "azure-managed-services": [{ after: "process", block: CASES["azure-managed-services"] }],
  "azure-migration": [
    { before: "services", block: challenges("Challenges with on-premises servers.", "On-premises infrastructure that holds growth back needs attention before it fails.", [
      { title: "Production inefficiency", text: "Teams waiting on slow, ageing systems.", icon: "gauge" },
      { title: "Missed deadlines", text: "Projects delayed by hardware limits and maintenance windows.", icon: "clock" },
      { title: "Seasonal spikes", text: "No easy way to handle sudden peaks in demand.", icon: "chart" },
      { title: "Weak security controls", text: "Compliance audits that are hard to pass.", icon: "shield" },
      { title: "Risk of data loss", text: "A single disaster could take your data with it.", icon: "db" },
      { title: "Wasted capacity", text: "Hardware paid for whether it is used or not.", icon: "cog" },
    ]) },
    { after: "process", block: CASES["azure-migration"] },
  ],
  "data-engineering": [
    { before: "services", block: challenges("Data challenges we solve.", "Complex data problems, turned into an advantage for Indian enterprises.", [
      { title: "Data silos", text: "Data spread across systems that do not talk to each other.", icon: "link" },
      { title: "Slow processing", text: "Pipelines that cannot keep up with the business.", icon: "gauge" },
      { title: "Poor data quality", text: "Duplicates, gaps, and errors that undermine every report.", icon: "search" },
      { title: "Limits to scale", text: "Platforms that struggle as data grows.", icon: "layers" },
      { title: "High infrastructure costs", text: "Hardware and licences that cost more every year.", icon: "chart" },
      { title: "Limited analytics", text: "Teams that cannot get answers from their own data.", icon: "eye" },
    ]) },
    { after: "process", block: why("Why AptaCloud for data engineering.", [
      { title: "Certified on the major platforms", text: "Engineers certified on Azure, AWS, Databricks, and Snowflake, with real project experience.", icon: "team" },
      { title: "Faster progress", text: "Pre-built components and tested frameworks get you moving quickly.", icon: "flow" },
      { title: "Security by design", text: "Encryption and security decisions built into every architecture.", icon: "shield" },
      { title: "Cost-aware architecture", text: "Designs that use resources efficiently and cut waste over time.", icon: "chart" },
      { title: "One accountable team", text: "From the first sketch to production support, with no hand-offs between vendors.", icon: "target" },
      { title: "Local and always on", text: "Teams in Gurugram and Pune, monitoring your pipelines around the clock.", icon: "clock" },
    ]) },
    { after: "why-us", block: CASES["data-engineering"] },
  ],
  "data-visualization": [
    { before: "services", block: challenges("Data handling challenges companies face in India.", "A professional data analysis and visualisation service solves them.", [
      { title: "Low-quality data", text: "Reports built on inaccurate, missing, or duplicate data raise costs and lead to poor decisions.", icon: "db" },
      { title: "Poor dashboards", text: "Incomplete or cluttered dashboards push leaders towards the wrong call.", icon: "chart" },
      { title: "No clear strategy", text: "BI tools rolled out without business goals waste time and budget.", icon: "target" },
      { title: "Scattered sources", text: "Bringing CRM, spreadsheets, and other systems into one platform is hard to get right.", icon: "link" },
    ]) },
    { after: "process", block: why("Why businesses trust AptaCloud with their data.", [
      { title: "Years of data work", text: "Customised data solutions for businesses across industries.", icon: "team" },
      { title: "Specialist engineers", text: "Engineers who design interactive dashboards with modern tools.", icon: "code" },
      { title: "The full BI range", text: "From BI consulting to managed BI and custom visualisation.", icon: "layers" },
      { title: "Built around your goals", text: "Dashboards that answer the questions your business actually asks.", icon: "target" },
    ]) },
    { after: "why-us", block: CASES["data-visualization"] },
  ],
  "data-warehousing": [{ after: "process", block: CASES["data-warehousing"] }],
  "generative-ai": [
    { before: "use-cases", block: challenges("Business challenges without automation.", "Businesses that wait on AI automation struggle with operations, customers, and decisions.", [
      { title: "Missing insights", text: "Valuable patterns buried in data nobody has time to read.", icon: "search" },
      { title: "Support that cannot scale", text: "Customer queries that outgrow the team.", icon: "chat" },
      { title: "Inconsistent content", text: "Messages and documents that vary by author.", icon: "doc" },
      { title: "Rising costs", text: "More work handled by hand every year.", icon: "chart" },
      { title: "Employee fatigue", text: "Repetitive tasks that wear teams down and drive turnover.", icon: "team" },
      { title: "Falling behind", text: "Competitors using AI move faster.", icon: "gauge" },
    ]) },
    { after: "advantage", block: CASES["generative-ai"] },
  ],
  "machine-learning": [
    { after: "process", block: why("Why AptaCloud for machine learning in India.", [
      { title: "20+ years of experience", text: "Across IT, AI, and cloud transformation.", icon: "team" },
      { title: "Practical solutions", text: "We start from your workflows and technical gaps, not the technology.", icon: "target" },
      { title: "Cloud-native ML", text: "Machine learning architecture on Azure and AWS.", icon: "cloud" },
      { title: "Pipelines that scale", text: "Cost-effective pipelines that fit your existing IT.", icon: "flow" },
      { title: "Responsible models", text: "Data masking, secure hosting, and bias reduction built in.", icon: "shield" },
      { title: "MLOps against model decay", text: "Tracking, retraining, and drift detection keep models current.", icon: "gauge" },
    ]) },
  ],
  "services/microsoft/identity-security": [
    { before: "solutions", block: challenges("Why you need identity and security solutions.", "Without them, control over critical digital assets slips away.", [
      { title: "Password fatigue", text: "Too many logins lead to weak, reused passwords.", icon: "shield" },
      { title: "No central access control", text: "Nobody can see who has access to what.", icon: "eye" },
      { title: "Human error", text: "Simple mistakes that open the door to attackers.", icon: "team" },
      { title: "Missed updates", text: "Patches that wait until something breaks.", icon: "clock" },
      { title: "Weak audit trails", text: "Evidence that is hard to produce when auditors ask.", icon: "doc" },
      { title: "Regulatory gaps", text: "Requirements such as the DPDP Act left unmet.", icon: "target" },
    ]) },
  ],
  "services/microsoft/microsoft-365": [
    { before: "services", block: challenges("Challenges you face in daily work.", "Poorly managed Microsoft 365, or legacy systems, slow collaboration and core operations.", [
      { title: "Scattered communication", text: "Chat, email, and calls in tools that do not connect.", icon: "chat" },
      { title: "Hard-to-find data", text: "Files spread across devices and drives.", icon: "search" },
      { title: "No business email", text: "No managed email on your own domain.", icon: "doc" },
      { title: "Phishing and data loss", text: "Mailboxes and files without modern protection.", icon: "shield" },
      { title: "Lost productivity", text: "Time spent looking for information instead of using it.", icon: "gauge" },
      { title: "Disconnected business apps", text: "CRM and HR tools outside the everyday workspace.", icon: "link" },
    ]) },
  ],
  "services/microsoft/microsoft-dynamics-365": [
    { before: "solutions", block: challenges("Dynamics 365 implementation challenges.", "Without clarity on Dynamics 365 ERP and CRM, licences and resources are hard to get right.", [
      { title: "Paying for unused modules", text: "Spend on modules nobody uses.", icon: "chart" },
      { title: "No team to deploy it", text: "Too few people to run a Dynamics 365 rollout.", icon: "team" },
      { title: "Licence confusion", text: "Hard to pick the right licence for each role.", icon: "search" },
      { title: "No support after go-live", text: "Nobody in-house to run the system day to day.", icon: "cog" },
      { title: "Cluttered documents", text: "Approvals delayed by documents spread across the business.", icon: "doc" },
      { title: "Rising monthly bills", text: "Subscription costs that grow without review.", icon: "gauge" },
    ]) },
  ],
  "services/microsoft/sharepoint": [
    { before: "services", block: challenges("The operational hurdles we hear about.", "Data silos, outdated tools, and poor information sharing slow collaboration down.", [
      { title: "Data in too many places", text: "Information spread across email, drives, and local systems.", icon: "search" },
      { title: "No version control", text: "Nobody sure which document is current.", icon: "doc" },
      { title: "Slow approvals", text: "Deadlines missed because work waits on others.", icon: "clock" },
      { title: "Security and compliance risk", text: "No role-based access to sensitive files.", icon: "shield" },
      { title: "Fragmented files", text: "Time lost searching for and duplicating work across departments.", icon: "layers" },
      { title: "IT and HR burden", text: "An outdated intranet, or none at all, adds to the workload.", icon: "team" },
    ]) },
  ],
  "industry/engineering-and-construction/construction": [
    { after: "deep-dive", block: cards("benefits", "Benefits", "spark", "Benefits of digital transformation for construction companies.", [
      { title: "Better project visibility", text: "Schedules, budgets, site reports, and progress in one view, without compiling updates by hand.", icon: "eye" },
      { title: "Stronger collaboration", text: "Design teams, contractors, engineers, and finance working from the same information.", icon: "team" },
      { title: "Cost and schedule control", text: "Plans linked to costs and progress, so variances and risks show up sooner.", icon: "chart" },
      { title: "Less manual work", text: "Reports, documents, and approvals automated, so teams focus on quality and safety.", icon: "flow" },
    ], "Connected systems that make construction easier to manage, not more complex.") },
  ],
  "industry/oil-gas": [
    { after: "security", block: why("Why AptaCloud for oil and gas digital transformation.", [
      { title: "A structured approach", text: "Technology applied to exploration, production, and distribution in clear, goal-driven stages.", icon: "flow" },
      { title: "Industry and technical depth", text: "Digital, oilfield, and regulatory experience in one team.", icon: "team" },
      { title: "From assessment to optimisation", text: "Consistent delivery with minimal disruption at every stage.", icon: "target" },
      { title: "Secure, compliant cloud", text: "Highly available platforms aligned with the DPDP Act 2023.", icon: "shield" },
    ]) },
  ],
};
