// India: per-page SEO, hero, and FAQs, rebuilt from each live aptacloud.com/in/
// page (Nov 2026). Copy is rewritten to the Brand and Content Writing
// Guidelines v2.0: Australian spelling, no banned words, no unapproved claims
// (the live "99.9% uptime", "zero downtime guarantee", "zero data loss",
// hard-coded prices, and superlatives are left out). The page sections stay
// the shared ones; getService() applies these on the India build only.

import type { PageOverride } from "./types";

export const IN_PAGES: Record<string, PageOverride> = {
  /* ── Artificial intelligence ─────────────────────────────────────── */
  "ai-agents": {
    seo: { title: "AI Agents India | Agentic AI Automation | AptaCloud", description: "Custom AI agents that automate workflows, cut manual effort, and scale operations for Indian enterprises, designed and deployed by AptaCloud." },
    hero: { title: "AI agents for", accent: "Indian businesses.", lead: "Agents that reason, plan, and act inside your CRM, ERP, and cloud systems, built to the demands of Indian businesses and proven on one workflow first." },
    faqs: [
      { q: "Why choose AptaCloud for AI agent projects in India?", a: "We combine local delivery teams with international engineering standards, so each agent fits your processes, your systems, and the rules you work under." },
      { q: "How do AI agents work with our current tools?", a: "We connect agents to your CRM, ERP, and cloud platforms, so data flows between them automatically and work moves without manual hand-offs." },
      { q: "How is an autonomous agent different from a standard bot?", a: "A bot follows a script. An agent reasons, plans, and completes multi-step tasks on its own, using your data to act without waiting for a prompt." },
      { q: "Can the agents be built for our industry?", a: "Yes. Every agent is built around your industry's workflows, data, and compliance needs, whether that is finance, retail, manufacturing, or another sector." },
    ],
  },
  "ai-consulting": {
    seo: { title: "AI Consulting India | AI Strategy and Custom LLMs | AptaCloud", description: "AI consulting in India: strategy, custom LLMs, and secure automation for Indian enterprises, proven on your data before you commit." },
    hero: { title: "AI consulting for", accent: "Indian businesses.", lead: "Customised, scalable AI that gives your business an edge, starting with the one workflow where it pays off first." },
    faqs: [
      { q: "How does an AI consultant automate the workload?", a: "We analyse your repetitive tasks and where AI can help, then deploy tools that fit your workflow and reduce delays and downtime." },
      { q: "How long does it take to automate business operations with AI?", a: "Basic automation typically takes three to six months. Complex AI automation can take up to twelve months." },
      { q: "What does AI implementation cost?", a: "It depends on workflow complexity, automation scope, team size, and the software you already run. We give you an estimate after a short assessment." },
      { q: "Is AI consulting only for large companies?", a: "No. We scope AI work to the size of the business and focus on the return over time, so small and mid-sized companies can start with one workflow." },
      { q: "How does AptaCloud keep AI integration secure?", a: "We use role-based access control, end-to-end encryption, and governance aligned with the DPDP Act, so your data stays protected." },
      { q: "What does AptaCloud bring as an AI consulting firm in India?", a: "Experience across cloud and automation, and support from the first assessment through implementation, training, and ongoing improvement." },
    ],
  },
  "generative-ai": {
    seo: { title: "Generative AI Solutions India | Azure OpenAI and LLMs | AptaCloud", description: "Enterprise generative AI in India: secure Azure OpenAI integrations, LLM deployments, and automation for content, insight, and customer service." },
    hero: { title: "Generative AI for", accent: "Indian enterprises.", lead: "Generative AI for content, insight analysis, customer responses, and marketing, grounded in your own data and governed from day one." },
    faqs: [
      { q: "Is generative AI secure to bring into our workflow?", a: "Yes. We build on secure platforms such as Azure OpenAI Service, with strict data governance and compliance controls." },
      { q: "How can generative AI solve our business problems?", a: "Copilot can draft content, images, and video from simple prompts, surface insight in real time for decisions, and answer customer queries instantly." },
      { q: "Can generative AI reduce errors and lift productivity?", a: "Yes. Automating repetitive, error-prone tasks improves accuracy and keeps work consistent across the workflow." },
      { q: "How does a custom Copilot support decision-making?", a: "We configure Copilot in your workspace so the data you need is a click away, mid-project, when decisions are made." },
      { q: "How long does a generative AI launch take?", a: "Typically four to eight weeks, and up to twelve weeks when data and integrations are complex." },
      { q: "Do you support generative AI after deployment?", a: "Yes. Our team monitors your models, tunes them, and plans updates as your needs change." },
    ],
  },
  "machine-learning": {
    seo: { title: "Machine Learning Services India | Predictive AI | AptaCloud", description: "Machine learning in India: scalable models, predictive analytics, and intelligent automation on Microsoft Azure, from AptaCloud." },
    hero: { title: "Machine learning for", accent: "Indian businesses.", lead: "Models that streamline operations, predict what comes next, and scale with your business, built on Microsoft Azure." },
    faqs: [
      { q: "What sets AptaCloud apart among machine learning providers in India?", a: "We pair strategy with in-depth engineering, so every model fits your business logic and scales once it is in use." },
      { q: "How long does an AI or ML project take?", a: "Assessment usually takes two to four weeks. A small-scale implementation typically reaches a minimum viable product in three to four months." },
      { q: "Can AI connect to our legacy systems?", a: "Yes. We connect models to your ERP, CRM, and legacy databases without disrupting day-to-day operations." },
      { q: "Do we need a huge dataset to start?", a: "Not necessarily. Approaches such as transfer learning and synthetic data can get a project started on a smaller dataset." },
      { q: "How do you keep AI projects tied to a return?", a: "Each project is measured from the start against agreed outcomes that match a specific business objective." },
      { q: "How do you handle data security and compliance?", a: "Access controls, encryption, and governance run through the whole AI lifecycle, with audit-ready records." },
    ],
  },

  /* ── Data and analytics ──────────────────────────────────────────── */
  "data-engineering": {
    seo: { title: "Data Engineering India | Azure Pipelines and ETL | AptaCloud", description: "Data engineering for Indian businesses: scalable Azure data pipelines, ETL workflows, and cloud-native data architecture from AptaCloud." },
    hero: { title: "Data engineering for", accent: "Indian businesses.", lead: "Cloud-native pipelines, platforms, and infrastructure that help Indian businesses grow faster, work more efficiently, and decide with data they trust." },
  },
  "data-warehousing": {
    seo: { title: "Data Warehousing India | Azure Synapse and Fabric | AptaCloud", description: "Cloud data warehousing in India: scalable, high-performance warehouses on Azure Synapse and Microsoft Fabric, aligned with the DPDP Act." },
    hero: { title: "Data warehousing for", accent: "Indian businesses.", lead: "Turn raw data into one trusted source, with real-time insight your teams can act on." },
    faqs: [
      { q: "What is the main benefit of an enterprise data warehouse?", a: "One consolidated source of truth, so every business decision rests on the same trusted data." },
      { q: "How does a data warehouse make operations more cost-efficient?", a: "We remove redundant data, automate manual reporting, and choose cost-effective storage tiers, which cuts preparation time and infrastructure overhead." },
      { q: "Is a cloud data warehouse more secure than one on premises?", a: "Usually. Cloud platforms such as Microsoft Azure provide automatic backups, constant monitoring, and strong encryption backed by large security investment." },
      { q: "How do you keep a data warehouse compliant?", a: "We design for international privacy rules such as GDPR and for India's Digital Personal Data Protection Act, 2023." },
      { q: "Why is a cloud data warehouse more than a migration?", a: "A modern warehouse changes the architecture so it can handle structured and unstructured data at scale, not just move tables to the cloud." },
      { q: "What does your data warehouse as a service include?", a: "We take care of the infrastructure: maintenance, scaling, patching, and administration." },
    ],
  },
  "data-visualization": {
    seo: { title: "Business Intelligence and Data Visualisation India | AptaCloud", description: "Business intelligence and data visualisation in India: real-time Power BI dashboards and AI-driven analytics on Microsoft Azure." },
    hero: { title: "Business intelligence for", accent: "Indian businesses.", lead: "Analyse market trends, automate reporting, and improve customer experience with dashboards that keep your data unified and accessible." },
    faqs: [
      { q: "How does data visualisation help us decide?", a: "It turns complex datasets into charts, heat maps, and other visuals that show trends, market shifts, and customer behaviour at a glance." },
      { q: "How does a business intelligence service help my business?", a: "You can measure the performance of every operation and understand customer behaviour, so you target the right market." },
      { q: "Can we get a customised business intelligence solution?", a: "Yes. We build dashboards around your business goals and the decisions your teams make." },
      { q: "Does AptaCloud integrate data from different sources?", a: "Yes. We bring together cloud, CRM, ERP, and other sources, prepare and model the data, and present it on one dashboard." },
      { q: "How long does a business intelligence rollout take?", a: "A standard rollout typically takes eight to twelve weeks, longer as complexity grows." },
    ],
  },

  /* ── Application modernisation ───────────────────────────────────── */
  "application-modernization": {
    seo: { title: "Legacy Modernisation India | Cloud-Native Transformation | AptaCloud", description: "Legacy modernisation for Indian businesses: monolithic systems turned into agile, cloud-native applications on Microsoft Azure, with less risk." },
    hero: { title: "Legacy modernisation for", accent: "Indian businesses.", lead: "Smart, scalable modernisation built for speed, flexibility, and growth, without stopping the systems you rely on." },
    faqs: [
      { q: "When is the right time to modernise?", a: "When systems are slow, expensive to run, or hard to integrate, it is time to plan modernisation." },
      { q: "Is modernisation only for big businesses?", a: "No. Businesses of any size can modernise to improve efficiency and scale." },
      { q: "Can we modernise step by step?", a: "Yes. Gradual modernisation lets you upgrade without disrupting the business." },
      { q: "What are the advantages of modernisation?", a: "Better performance, lower costs, easier scaling, stronger security, faster change, simpler integration, and less maintenance." },
      { q: "Do we have to replace our systems?", a: "Not always. Many systems can be improved rather than replaced, depending on what the business needs." },
      { q: "Will there be downtime during upgrades?", a: "We upgrade in stages. Essential systems stay running while each phase goes live." },
      { q: "Will our staff need training?", a: "Some, and we provide it. Modern systems are intuitive, so most teams pick them up quickly." },
    ],
  },
  "legacy-application-migration": {
    seo: { title: "Legacy Migration India | Cloud Re-platforming | AptaCloud", description: "Legacy application migration for Indian enterprises: outdated applications moved to Azure in planned phases, with minimal disruption." },
    hero: { title: "Legacy app migration for", accent: "Indian businesses.", lead: "Old systems slow growth and raise costs. Move them to modern platforms in planned phases, built for how Indian businesses work today." },
    faqs: [
      { q: "When should we start migrating legacy applications?", a: "When an application shows gaps, rising costs, or integration problems. Starting early keeps the risk lower." },
      { q: "How do we decide what to migrate first?", a: "We weigh business, customer, and operational needs in an assessment, then set the order." },
      { q: "What are the risks of a legacy migration?", a: "Downtime, data loss, and degraded performance. We reduce them with careful planning, phased moves, and thorough testing before go-live." },
      { q: "Will migrated systems work with new tools?", a: "Yes. Migrated systems are built for APIs and modern integrations, so new platforms connect easily." },
      { q: "How is our data protected during migration?", a: "Data is backed up, encrypted, and tested at every stage, with validation steps that catch loss or corruption." },
      { q: "Does migration save money?", a: "Usually. You stop paying for ageing hardware, maintenance effort drops, and systems run more efficiently." },
      { q: "What happens to the old system?", a: "It is switched off, partly kept, or kept as a backup for a while and then retired." },
      { q: "Does every application need modernising during migration?", a: "No. Some move as they are and others are improved, depending on business goals and the state of each system." },
    ],
  },
  "application-re-engineering": {
    seo: { title: "Systems Re-engineering India | Modern Architecture | AptaCloud", description: "Systems re-engineering in India: ageing architectures rebuilt into scalable, secure, cloud-ready platforms on Microsoft Azure." },
    hero: { title: "Systems re-engineering for", accent: "Indian businesses.", lead: "Turn legacy systems into scalable, secure platforms that keep the business logic you rely on." },
    faqs: [
      { q: "When should we re-engineer rather than replace a system?", a: "When the system still carries core business logic but struggles with performance, integration, or scale. Re-engineering avoids a costly, risky replacement." },
      { q: "How do you handle undocumented legacy systems?", a: "We reverse-engineer the code, dependencies, and data flows step by step, so no important function is lost." },
      { q: "What are the risks, and how do you reduce them?", a: "Data loss, downtime, and functional gaps. We work in small phases with thorough testing and validation." },
      { q: "How do operations continue during re-engineering?", a: "We deploy in stages, with fallback plans and the old and new systems running side by side until the new one is proven." },
      { q: "What happens to our third-party integrations?", a: "We document every integration in discovery, then keep, improve, or rebuild each one with modern APIs." },
      { q: "How does re-engineering help security and compliance?", a: "We build in current security, access control, and compliance that meet Indian and international standards." },
      { q: "Is re-engineering suitable for Indian SMEs?", a: "Yes. It suits growing companies on legacy systems that cannot afford downtime, at a lower cost than a full rebuild." },
    ],
  },

  /* ── Microsoft ───────────────────────────────────────────────────── */
  "services/microsoft/microsoft-365": {
    seo: { title: "Microsoft 365 India | Deployment and Licensing Support | AptaCloud", description: "Microsoft 365 for Indian businesses: deployment, licensing, security configuration, and support across the full suite." },
    hero: { title: "Microsoft 365 services for", accent: "Indian businesses.", lead: "Deployment, licensing, security, and support across the whole Microsoft 365 suite, set up around how your teams work." },
    faqs: [
      { q: "What do we get from a Microsoft 365 implementation?", a: "Better collaboration, stronger security, and a planned move to Microsoft 365, with support and management afterwards." },
      { q: "How long does a Microsoft 365 migration take?", a: "SMEs typically migrate in two to four weeks. Large enterprises can take six months to a year." },
      { q: "Can you help secure our sensitive data?", a: "Yes. We set up Microsoft Defender, Purview, Intune, and Entra ID to protect data throughout the rollout." },
      { q: "Can Copilot in Microsoft 365 improve our operations?", a: "Yes. We set up Copilot across Teams, Outlook, SharePoint, Word, and PowerPoint to draft content, find information, and automate routine replies." },
      { q: "How do you connect Microsoft 365 with third-party apps?", a: "Through Microsoft Graph, Power Automate, built-in connectors, and Microsoft Entra ID, so CRM and project tools work alongside Microsoft 365." },
      { q: "Do you support Microsoft 365 after implementation?", a: "Yes. Teams in Gurugram and Pune support clients across India, including Mumbai and Bengaluru, with ongoing management and quick issue resolution." },
    ],
  },
  "services/microsoft/teams": {
    seo: { title: "Microsoft Teams India | Collaboration and Calling | AptaCloud", description: "Microsoft Teams services in India: collaboration, calling, and secure hybrid work, set up and supported by AptaCloud." },
    hero: { title: "Microsoft Teams for", accent: "Indian businesses.", lead: "Teams set up to improve communication and keep work flowing across every branch and office." },
    faqs: [
      { q: "How do you migrate us to Teams?", a: "We assess your needs, design the architecture, deploy the apps you need, migrate users, and hand over ownership." },
      { q: "How do you secure confidential data in Teams?", a: "Microsoft identity, security, compliance, and governance controls add layers of protection to your Teams environment." },
      { q: "Can Teams handle our calling?", a: "Yes. We set up Teams Phone, calling plans, SIP trunking, and PBX replacement." },
      { q: "Can Teams connect with our other Microsoft 365 apps?", a: "Yes. Teams works with Outlook, SharePoint, Power BI, and your CRM and HR systems for cross-department work." },
      { q: "Can you move us from Slack or Webex?", a: "Yes. We migrate chats, files, users, and channels from the major collaboration tools." },
      { q: "Do you train our employees?", a: "Yes. Hands-on training, adoption support, and documentation help your people use Teams well." },
    ],
  },
  "services/microsoft/identity-security": {
    seo: { title: "Identity and Security India | Microsoft Entra and Zero Trust | AptaCloud", description: "Microsoft identity and security in India: Microsoft Entra ID and Zero Trust frameworks that protect Indian enterprises' users and data." },
    hero: { title: "Identity and security for", accent: "Indian businesses.", lead: "Protect your business from emerging threats by securing user identities, data, and every app your people use." },
    faqs: [
      { q: "Why is identity the new security perimeter?", a: "With cloud apps and remote work, protection depends on user identities rather than network boundaries." },
      { q: "What do Microsoft identity and security solutions include?", a: "A Zero Trust design with Entra ID, Intune, multi-factor authentication, and conditional access that meets enterprise compliance standards." },
      { q: "How does Microsoft Entra ID improve security?", a: "It centralises access: multi-factor authentication, single sign-on, automated access control, and detection of risky sign-ins." },
      { q: "Can these solutions work with our existing apps?", a: "Yes. They integrate with thousands of cloud and on-premises applications using industry-standard protocols." },
      { q: "How do you keep the implementation cost-effective?", a: "We improve your Microsoft Secure Score and avoid spending on features you do not need." },
      { q: "Do you provide ongoing security management?", a: "Yes. We monitor your setup under an agreed service level and handle troubleshooting and updates." },
    ],
  },
  "services/microsoft/copilot-studio": {
    seo: { title: "Microsoft Copilot Studio India | AI Assistants | AptaCloud", description: "Microsoft Copilot Studio in India: custom AI assistants that improve customer and employee experiences for Indian businesses." },
    hero: { title: "Copilot Studio for", accent: "Indian businesses.", lead: "Custom Microsoft Copilot Studio agents that automate operations and give your teams answers from your own data." },
    faqs: [
      { q: "How do you keep our data secure in Copilot?", a: "Secure data connections, role-based access, and enterprise-grade compliance across every app your copilots use." },
      { q: "How can Copilot Studio help our operations?", a: "Custom agents deployed to the channels your teams use automate processes and surface the information they need." },
      { q: "How do generative AI and language understanding improve our copilots?", a: "Generative AI lets agents learn your workflows, and natural language understanding returns answers in plain language." },
      { q: "Where can we deploy a custom copilot?", a: "In Microsoft Teams, Power Apps, SharePoint, Dynamics 365, and external platforms through APIs." },
      { q: "What does Copilot Studio cost?", a: "Microsoft sets the licence price, and it changes over time. We estimate the full cost of your solution, including licences, build, and support." },
      { q: "How can a copilot automate our workflow?", a: "Copilots trigger Power Automate flows, fetch your data, and run operations from plain-language requests." },
      { q: "Do you support copilots after go-live?", a: "Yes. Our teams in Pune and across India monitor, optimise, and tune your agents so they stay relevant." },
    ],
  },
  "services/microsoft/sharepoint": {
    seo: { title: "SharePoint Consulting India | Microsoft SharePoint | AptaCloud", description: "SharePoint consulting for Indian businesses: secure, metadata-driven document management and Microsoft 365 integration." },
    hero: { title: "SharePoint consulting for", accent: "Indian businesses.", lead: "Smarter collaboration and secure documents, with SharePoint set up around how your business shares work." },
    faqs: [
      { q: "Which companies need SharePoint?", a: "Companies with large volumes of documents, compliance needs, and collaboration across departments and outside teams." },
      { q: "How does SharePoint streamline operations?", a: "It centralises information, automates rule-based workflows, improves team collaboration, and strengthens data security." },
      { q: "How long does a SharePoint implementation take?", a: "A basic setup typically takes two to four weeks, longer with more customisation." },
      { q: "How does AptaCloud approach SharePoint implementation?", a: "We analyse your needs first, prepare your existing systems, then customise SharePoint with automation and AI agents to speed up document work." },
      { q: "Can you migrate our files to SharePoint?", a: "Yes. We move content from on-premises and hybrid sources, Google Drive, Dropbox, file servers, and OneDrive." },
    ],
  },
  "services/microsoft/microsoft-dynamics-365": {
    seo: { title: "Microsoft Dynamics 365 India | CRM and ERP | AptaCloud", description: "Dynamics 365 for Indian enterprises: CRM, ERP, and AI integrated to unify data and automate complex business workflows." },
    hero: { title: "Dynamics 365 for", accent: "Indian businesses.", lead: "Scalable Dynamics 365 that simplifies CRM, supply chain, and finance, connected to the systems you already run." },
    faqs: [
      { q: "Can we connect our existing apps to Dynamics 365?", a: "Yes. We connect in-house and third-party tools through modernisation, implementation, and API configuration." },
      { q: "How does Dynamics 365 improve productivity?", a: "Better use of resources, optimised production scheduling, smoother on-site work, and stronger field service in one system." },
      { q: "How do Dynamics 365 AI tools help?", a: "Custom agents automate repetitive tasks, surface visual insight for decisions, and save time on documents, communication, and data sharing." },
      { q: "Can you set up customer service in Dynamics 365?", a: "Yes. We configure multi-channel customer service so you can offer a personalised experience." },
      { q: "Can you add a contact centre to our Dynamics 365?", a: "Yes. We implement an omnichannel contact centre with AI automation in your Dynamics 365 CRM." },
      { q: "Can you migrate data from several systems into Dynamics 365?", a: "Yes. Our specialists handle complex data migration from multiple sources." },
    ],
  },

  /* ── Azure ───────────────────────────────────────────────────────── */
  "azure-hosting": {
    seo: { title: "Azure Hosting India | Cloud Infrastructure | AptaCloud", description: "Azure hosting in India: secure, high-performance cloud hosting with constant monitoring and data residency for Indian businesses." },
    hero: { title: "Azure hosting services", accent: "in India.", lead: "Azure hosting set up to modernise and move your workloads, with reliability and cost control built in." },
    faqs: [
      { q: "How is modernisation different from cloud hosting?", a: "Modernisation updates existing, often on-premises systems to current standards. Azure hosting runs your services on secure, managed cloud servers." },
      { q: "What makes AptaCloud different as an Azure managed services provider?", a: "We manage the whole migration, optimise costs, and design custom architecture, with full transparency throughout." },
      { q: "Can you move our existing applications to Azure hosting?", a: "Yes. We audit your infrastructure, identify what to modernise, and handle the migration with careful testing to protect your data." },
      { q: "How does Azure hosting benefit our business?", a: "Faster applications, lower infrastructure costs, wider reach, more automation, and stronger security and compliance." },
      { q: "How do you keep Azure hosting costs down?", a: "We project costs from your actual resource needs and size virtual machines and services to your budget." },
      { q: "How does around-the-clock support help us scale?", a: "Our team monitors your Azure operations, finds issues early, and tunes performance as you grow." },
    ],
  },
  "azure-implementation": {
    seo: { title: "Azure Implementation India | Cloud Deployment | AptaCloud", description: "Azure implementation in India: cloud setup, architecture design, and deployment for performance and return on investment." },
    hero: { title: "Azure implementation", accent: "in India.", lead: "Enterprise-grade Azure implementation that connects your apps and data and keeps work flowing." },
    faqs: [
      { q: "How long does an Azure implementation take?", a: "Typically two to twelve weeks, depending on the level of modernisation, serverless work, and automation you need." },
      { q: "What does an Azure implementation cost?", a: "Azure is pay-as-you-go, so cost depends on the services you choose. We estimate virtual machines and other resources and apply available discounts." },
      { q: "Will we face downtime during the move?", a: "Not with the right plan. We follow a structured migration framework and use Azure-native tools to keep downtime to a minimum." },
      { q: "What Azure solutions does AptaCloud provide?", a: "Logic Apps for business processes, API Management, Service Bus for messaging, serverless computing with Event Grid, and Azure Data Factory integration." },
      { q: "How do you protect our Azure data?", a: "Built-in compliance, Microsoft identity, encryption, access management, and automated threat detection." },
      { q: "Do you provide support after implementation?", a: "Yes. Ongoing monitoring, continuous optimisation, and quick answers from our team." },
    ],
  },
  "azure-migration": {
    seo: { title: "Azure Migration India | Cloud Migration Services | AptaCloud", description: "Azure migration in India: legacy apps and data moved to Azure in planned stages, keeping disruption low and costs in check." },
    hero: { title: "Azure migration services", accent: "in India.", lead: "Move your IT infrastructure to Azure with bespoke migration services that keep you agile, secure, and cost-efficient." },
    faqs: [
      { q: "How long does an Azure migration take?", a: "It depends on workload complexity and organisation size: a day for a single storage account, months or longer for an enterprise estate." },
      { q: "What can we move to Azure?", a: "Applications, database servers, and mainframe workloads, with teams in Pune and Gurugram supporting businesses across India." },
      { q: "What should we consider when planning a migration?", a: "Start with an assessment of current applications and workloads, then modernise where needed so the move is smooth and cost-effective." },
      { q: "Do you migrate legacy applications too?", a: "Yes. We re-platform onto Azure and modernise applications as part of the move." },
      { q: "How does Azure SQL Managed Instance help?", a: "It gives you the full functionality of SQL Server in the cloud, with built-in security and scalability." },
      { q: "Do you support us after migration?", a: "Yes. Ongoing monitoring, application tuning, and performance management." },
      { q: "Can you add Azure Synapse to our cloud?", a: "Yes. We connect Synapse with Power BI and reporting tools for real-time dashboards." },
    ],
  },
  "azure-managed-services": {
    seo: { title: "Azure Managed Services India | Cloud Support | AptaCloud", description: "Azure managed services in India: proactive governance, disaster recovery, cost optimisation, and expert support around the clock." },
    hero: { title: "Azure managed services", accent: "in India.", lead: "Stable performance, strong security, and controlled costs on Azure, while your team focuses on the business." },
  },

  /* ── Industries ──────────────────────────────────────────────────── */
  "industry/insurance": {
    seo: { title: "Cloud and AI for Insurance India | Microsoft Azure | AptaCloud", description: "Cloud and AI for Indian insurers: claims automation, analytics, and data management aligned with IRDAI guidelines and the DPDP Act." },
    hero: { title: "Insurance technology for", accent: "Indian insurers.", lead: "Cloud and AI built for India's life, health, and general insurers, modernising existing systems while protecting personal data under IRDAI guidelines and the DPDP Act." },
    faqs: [
      { q: "What does cloud and AI mean for insurance?", a: "Scalable cloud infrastructure and AI applied to underwriting, claims, policy management, and customer service for speed, accuracy, and better decisions." },
      { q: "Why does digital transformation matter for insurers now?", a: "It replaces legacy limits, improves efficiency and customer experience, and keeps you aligned with IRDAI guidelines and the DPDP Act." },
      { q: "How do cloud services improve the customer experience?", a: "Faster claims, current policy information, better-targeted products, and access to information at any hour." },
      { q: "What makes AptaCloud a reliable insurance technology partner?", a: "More than 20 years of experience, Microsoft and AWS expertise, and secure, scalable, compliant delivery." },
      { q: "Do you tailor insurance modernisation?", a: "Yes. System integration, cloud migration, AI automation, or a full redesign, shaped to your company's needs." },
      { q: "Can you support hybrid and legacy environments during change?", a: "Yes. Legacy and cloud systems can run together while you modernise gradually, with minimal disruption." },
    ],
  },
  "industry/oil-gas": {
    seo: { title: "Cloud and AI for Oil and Gas India | Microsoft Azure | AptaCloud", description: "Cloud and AI for Indian oil and gas companies: secure Azure infrastructure, predictive analytics, and safer, more efficient operations." },
    hero: { title: "Oil and gas technology", accent: "for India.", lead: "AI, cloud, and system integration that improve efficiency, safety, and control for Indian oil and gas companies, in line with the DPDP Act and the IT Act." },
    faqs: [
      { q: "Can AI optimise production in oil and gas fields?", a: "Yes. AI uses current and historical production data to raise output, reduce waste, and improve decisions upstream and downstream." },
      { q: "Is cloud and AI cost-effective for oil and gas companies?", a: "Yes. Pay-as-you-go services and automation reduce cost and downtime and use IT resources more efficiently." },
      { q: "How do cloud and AI improve workforce safety?", a: "Live monitoring, hazard detection, and automatic alerts help workers avoid dangers quickly." },
      { q: "Do you build custom AI for oil and gas?", a: "Yes. Maintenance, forecasting, automation, and operational intelligence, built around your needs." },
      { q: "What makes AptaCloud different?", a: "Industry experience, scalable architecture, and support through implementation, designed around the return you expect." },
    ],
  },
  "industry/engineering-and-construction/construction": {
    seo: { title: "Cloud and AI for Construction India | AptaCloud", description: "Cloud, data, and AI for Indian construction firms: connected project systems, BIM, ERP, and Power BI reporting across sites." },
    hero: { title: "Smarter construction", accent: "for Indian firms.", lead: "We help engineering firms and infrastructure developers in India connect their systems and turn project data into insight." },
    faqs: [
      { q: "What is construction system integration?", a: "Connecting construction management software, BIM, ERP, scheduling, and field apps so project information moves between them without re-keying." },
      { q: "Can you integrate Procore with our other systems?", a: "Yes. We connect Procore with ERP, reporting, and project applications through APIs, connectors, and integration workflows." },
      { q: "How does AI help construction?", a: "AI analyses schedules, costs, site reports, and history to flag delays, support resource planning, and automate reporting, alongside professional judgement." },
      { q: "Can you connect BIM with construction management apps?", a: "Yes, depending on the software, data formats, and APIs involved." },
      { q: "Which construction platforms do you work with?", a: "Procore, Autodesk Construction Cloud, Primavera P6, Microsoft Project, Microsoft Dynamics 365, SAP, and Oracle ERP, among others." },
      { q: "How does Power BI improve project reporting?", a: "It combines project, financial, and operational data into dashboards for budgets, schedules, progress, and resources." },
      { q: "Can we modernise without replacing all our software?", a: "Yes. We connect existing applications to modern platforms through APIs, connectors, and cloud integration." },
      { q: "How do we see performance across multiple sites?", a: "By connecting project, schedule, finance, and field systems into one view, so progress, cost, and resources compare across sites." },
    ],
  },

  /* ── Company ─────────────────────────────────────────────────────── */
  "about-us": {
    seo: { title: "About AptaCloud India | Microsoft Cloud and AI Consultancy", description: "AptaCloud India: Microsoft-certified specialists in Azure, AI, data engineering, and modernisation, with teams in Gurugram and Pune." },
    hero: { title: "Taking high-stakes businesses", accent: "beyond digital.", lead: "AptaCloud modernises operations with secure enterprise cloud consulting and AI, building compliance-ready systems that help Indian businesses decide faster." },
  },
  blog: {
    seo: { title: "AptaCloud India Blog | Cloud, Data, and AI Insights", description: "Articles from AptaCloud India on generative AI, cloud, data, and modernisation for Indian businesses." },
  },
};
