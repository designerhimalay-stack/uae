// UAE: per-page SEO, hero, and FAQs, rebuilt from each live aptacloud.com/uae/
// page (Nov 2026). Rewritten to the Brand and Content Writing Guidelines v2.0;
// unverified statistics ("64% of the UAE's workforce", "cut downtime by 50%",
// "2-3x faster"), "99.9% uptime", USD rate cards, partner rebate claims, and the
// fear-led "using AI or slowly dying" headline are left out.

import type { PageOverride } from "./types";

export const UAE_PAGES: Record<string, PageOverride> = {
  /* ── Artificial intelligence ─────────────────────────────────────── */
  "ai-agents": {
    seo: { title: "AI Agents UAE | Agentic AI Automation | AptaCloud", description: "Custom AI agents that automate workflows, cut manual effort, and scale operations for UAE businesses, designed and deployed by AptaCloud." },
    hero: { title: "AI agents that solve", accent: "real business problems.", lead: "Go beyond automation with agents that decide, act, and keep improving your operations, proven on one workflow first." },
    faqs: [
      { q: "What are AI agents?", a: "Systems that complete tasks, make decisions, and learn from data. Unlike fixed automation, they improve as they work." },
      { q: "How are AI agents different from automation?", a: "Automation follows fixed rules. Agents learn, adapt, and decide from your data, so they are more flexible and scale further." },
      { q: "What do AI agent solutions cost?", a: "It depends on the use case, your organisation's complexity, your goals, and the scale. We estimate the cost during the assessment." },
      { q: "Do your agents work with our current systems?", a: "Yes. Our agents connect to ERPs, CRMs, and other enterprise systems." },
      { q: "Can agents keep our brand voice consistent?", a: "Yes. Trained well, they follow your tone and values in every interaction." },
      { q: "What happens when an agent meets something it was not trained for?", a: "A well-designed agent does not guess. It asks for clarification or hands over to a person. We design every agent to fail gracefully." },
    ],
  },
  "ai-consulting": {
    seo: { title: "AI Consulting UAE | AI Strategy and Custom LLMs | AptaCloud", description: "AI consulting in the UAE: strategy, custom LLMs, and secure automation for UAE businesses, proven on your data before you commit." },
    hero: { title: "AI consulting for", accent: "UAE businesses.", lead: "Design, implement, and scale AI that makes your business more efficient, starting with the workflow where it pays off first." },
    faqs: [
      { q: "Is AI consulting suitable for mid-sized businesses?", a: "Yes. We design scalable AI around your needs and your budget." },
      { q: "Do you use Copilot Studio to build and deploy AI?", a: "Yes. Our team builds and deploys custom agents with Microsoft Copilot Studio, shaped to your use case." },
      { q: "How does your AI strategy keep our data secure?", a: "Encryption, anonymisation, and access controls protect your data while models are built and run." },
      { q: "Can you build a custom AI model for us?", a: "Yes. We work with Azure AI, Azure OpenAI Service, Copilot Studio, and Dynamics 365 AI to build solutions that automate work." },
      { q: "What does AI consulting cost?", a: "It depends on scope, from a focused advisory engagement to an enterprise-wide programme. We estimate it after a short assessment." },
      { q: "How long does an AI implementation take?", a: "Typically three to nine months for small and mid-sized businesses, and twelve months or more for enterprise rollouts." },
    ],
  },
  "generative-ai": {
    seo: { title: "Generative AI UAE | Azure OpenAI and LLMs | AptaCloud", description: "Generative AI for UAE businesses: secure, enterprise-grade solutions on Azure OpenAI Service and large language models." },
    hero: { title: "Generative AI that turns", accent: "ideas into results.", lead: "Your competitors use AI to work faster and serve better. We help UAE businesses put it to work, from automation to instant content." },
    faqs: [
      { q: "What are generative AI services?", a: "Services that generate text, images, reports, and other content, automate tasks, and support decisions using models trained on large datasets." },
      { q: "Do we need technical skills to use generative AI?", a: "No. We plan, implement, and support the project, so you can focus on the business." },
      { q: "Is generative AI safe for our organisation?", a: "Yes, when used properly. Strict security and privacy standards keep the risk low." },
      { q: "How long does a rollout take?", a: "Typically four to twelve weeks, depending on the size and complexity of your organisation." },
      { q: "Does generative AI work for small businesses?", a: "Yes. It helps small businesses save time, cut costs, and compete." },
      { q: "How do you deal with AI hallucinations?", a: "We ground models in verified data, add validation checks and human review, and keep testing, so answers stay accurate." },
    ],
  },
  "machine-learning": {
    seo: { title: "Machine Learning UAE | Predictive AI and ML | AptaCloud", description: "Machine learning for UAE enterprises: predictive models, ML pipelines, and AI-powered analytics on Microsoft Azure." },
    hero: { title: "Machine learning that turns", accent: "data into decisions.", lead: "Turn your data from numbers into decisions with machine learning built for the enterprise." },
    faqs: [
      { q: "What are AI and ML solutions?", a: "Algorithms that spot patterns in data to predict issues and forecast outcomes, automating decisions and reducing manual work." },
      { q: "How long does an ML project take?", a: "Most take six to ten weeks, depending on data availability, complexity, and integration needs." },
      { q: "What do machine learning solutions cost?", a: "It depends on scope, data volume, model complexity, and customisation. We quote after understanding your needs." },
      { q: "Do you advise before implementation?", a: "Yes. We set the plan, find the use cases with the most impact, and agree a roadmap before building." },
      { q: "Do ML models work with our existing systems?", a: "Yes. Models plug into ERP, CRM, and other systems without changing how you work." },
      { q: "Can machine learning handle sparse or unstructured data?", a: "Yes, once the data is cleaned, structured, and enriched." },
      { q: "Do we need a lot of data to start?", a: "Not necessarily. Useful models can start small and improve as data grows." },
      { q: "Is our data secure?", a: "Yes. Encryption and access controls protect data across the whole lifecycle." },
    ],
  },

  /* ── Data and analytics ──────────────────────────────────────────── */
  "data-engineering": {
    seo: { title: "Data Engineering UAE | Azure Pipelines and ETL | AptaCloud", description: "Data engineering for UAE businesses: scalable data pipelines, ETL workflows, and cloud data architecture on Microsoft Azure." },
    hero: { title: "Good data does not happen.", accent: "It is engineered.", lead: "Turn scattered data into structured, reliable pipelines built for scale and speed." },
    faqs: [
      { q: "What is data engineering?", a: "Designing the systems that collect, process, and organise data for analysis and decisions." },
      { q: "How long does a data engineering project take?", a: "Typically six to twelve weeks, depending on data quality, complexity, and stakeholder alignment." },
      { q: "Does data engineering improve data quality?", a: "Yes. Data is cleaned, modelled, and verified, so it is accurate and consistent across systems." },
      { q: "Can we process data in real time afterwards?", a: "Yes. Real-time access to business data is a core goal." },
      { q: "Will it work with our existing systems?", a: "Yes. We build to fit the platforms and tools you already use." },
      { q: "Do we need technical skills to run it?", a: "No. After setup and some guidance, the systems are easy to use and manage." },
    ],
  },
  "data-warehousing": {
    seo: { title: "Data Warehousing UAE | Azure Synapse and Fabric | AptaCloud", description: "Cloud data warehousing in the UAE: scalable, high-performance warehouses on Azure Synapse and Microsoft Fabric." },
    hero: { title: "Your data has potential.", accent: "We give it structure.", lead: "Move from disconnected data to one system built for speed, clarity, and growth." },
    faqs: [
      { q: "What are BI and data warehousing?", a: "Collecting data from many sources into one place, so it is easy to use for reporting and decisions." },
      { q: "How long does a data warehouse take to implement?", a: "Typically six to twelve weeks, depending on requirements, data sources, data quality, integrations, and tools." },
      { q: "Is a cloud data warehouse secure?", a: "Yes, when it follows security best practice." },
      { q: "Can a data warehouse speed up the business?", a: "Yes. Central, consolidated data means faster reporting with fewer errors." },
      { q: "Does it work with our existing systems?", a: "Yes. It connects to your CRM, ERP, and other systems without disrupting work." },
      { q: "Do our teams need technical skills to use it?", a: "No. With training and support, anyone can use the data." },
    ],
  },
  "data-visualization": {
    seo: { title: "Business Intelligence UAE | Power BI | AptaCloud", description: "Business intelligence and data visualisation in the UAE: Power BI dashboards and analytics on Microsoft Azure." },
    hero: { title: "Where data becomes decisions,", accent: "not just dashboards.", lead: "Turn raw data into insight with business intelligence and visualisation built around your decisions." },
    faqs: [
      { q: "What are business intelligence and data visualisation?", a: "Turning data into reports and dashboards that people can read and act on." },
      { q: "Can BI connect to our other systems?", a: "Yes. BI tools connect to CRM, ERP, and other sources for reporting across systems." },
      { q: "Will BI make our decisions more effective?", a: "Yes. A clear view of your data makes decisions more informed and confident." },
      { q: "Can every business benefit from BI?", a: "Yes. It adapts to each industry's reporting needs." },
      { q: "Can non-technical people use BI tools?", a: "Yes. They are designed so anyone can access and understand the data." },
    ],
  },

  /* ── Application modernisation ───────────────────────────────────── */
  "application-modernization": {
    seo: { title: "Legacy Modernisation UAE | Cloud-Native Apps | AptaCloud", description: "Legacy modernisation in the UAE: outdated systems turned into agile, cloud-native applications on Microsoft Azure." },
    hero: { title: "Legacy modernisation for", accent: "UAE businesses.", lead: "Turn legacy systems into high-performing applications that support growth, in planned stages." },
    faqs: [
      { q: "What is legacy system modernisation?", a: "Upgrading old applications and systems for efficiency, speed, and security, so you cut costs and stay competitive." },
      { q: "How is it different from application modernisation?", a: "Application modernisation upgrades applications. Legacy modernisation is broader and can include databases, infrastructure, and whole ecosystems." },
      { q: "How long does modernisation take?", a: "Typically eight to fourteen weeks, depending on complexity, dependencies, and how much changes. An assessment sets a realistic timeline." },
      { q: "Will it disrupt the business?", a: "Very little. We work in phases and test carefully to keep operations running." },
      { q: "Should every legacy system be modernised?", a: "No. We recommend it only where it delivers clear business value." },
      { q: "Can we modernise without rebuilding?", a: "Yes. Encapsulation and API wrapping let older systems work with new applications." },
    ],
  },
  "legacy-application-migration": {
    seo: { title: "Legacy Migration UAE | Cloud Re-platforming | AptaCloud", description: "Legacy application migration in the UAE: outdated applications re-platformed to Azure in planned phases, with minimal disruption." },
    hero: { title: "Future-ready systems start", accent: "with smart migration.", lead: "Reduce complexity and improve performance with structured legacy application migration." },
    faqs: [
      { q: "What is legacy migration?", a: "Moving applications off legacy systems into a modern cloud environment for better performance, lower costs, and scale." },
      { q: "How long does migration take?", a: "Typically six to twelve weeks, depending on complexity, data volume, and the migration method." },
      { q: "Will migration affect daily operations?", a: "Very little. We migrate in phases to keep downtime and risk low." },
      { q: "Can you move our systems without major changes?", a: "Yes. Lift-and-shift moves applications with little code change, and Docker and Kubernetes keep environments consistent." },
      { q: "Which cloud platforms do you support?", a: "Microsoft Azure first, plus AWS and Google Cloud where they fit." },
      { q: "How do you check accuracy during migration?", a: "We run the old and new systems side by side before switching over." },
    ],
  },
  "application-re-engineering": {
    seo: { title: "Systems Re-engineering UAE | Modern Architecture | AptaCloud", description: "Systems re-engineering in the UAE: legacy architectures rebuilt into scalable, cloud-ready solutions on Microsoft Azure." },
    hero: { title: "Re-engineer the systems", accent: "that hold you back.", lead: "As AI becomes part of everyday work across the UAE, modern systems are essential. We rebuild what slows you down and keep what works." },
    faqs: [
      { q: "What is systems re-engineering?", a: "Rebuilding existing systems to make them faster, easier to grow, and simpler to maintain." },
      { q: "How is re-engineering different from rebuilding?", a: "Re-engineering improves the systems you have. Rebuilding creates new ones." },
      { q: "How long does it take?", a: "Typically eight to fourteen weeks." },
      { q: "What are application modernisation tools?", a: "Tools designed to modernise and improve applications and connect them to the cloud." },
      { q: "Is modernisation necessary?", a: "Usually. Systems left alone become inefficient, costly, and hard to scale." },
      { q: "Is there downtime during migration?", a: "There can be some. Our processes keep the impact and downtime low." },
      { q: "Do you support us after implementation?", a: "Yes. Support, maintenance, and follow-up services." },
    ],
  },

  /* ── Microsoft ───────────────────────────────────────────────────── */
  "services/microsoft/microsoft-365": {
    seo: { title: "Microsoft 365 UAE | Deployment and Licensing | AptaCloud", description: "Microsoft 365 for UAE businesses: deployment, migration, licensing, security configuration, and support across Teams, SharePoint, OneDrive, and Exchange." },
    hero: { title: "Microsoft 365 services for", accent: "UAE businesses.", lead: "Better collaboration, security, and productivity with a planned move to Microsoft 365." },
    faqs: [
      { q: "How long does a Microsoft 365 migration take?", a: "Typically one to two weeks for around 50 users, and two to five months for 500 or more." },
      { q: "How can we use Copilot in Microsoft 365?", a: "Copilot analyses data in Power BI, finds information in Microsoft Edge, drafts emails, and builds slides in PowerPoint." },
      { q: "Do we need an internet connection?", a: "Yes. A reliable connection is needed to install, activate, manage subscriptions, and use the apps." },
      { q: "How do employees use our subscription?", a: "Each licensed user installs and activates the apps on their own devices." },
      { q: "Why choose AptaCloud for Microsoft 365?", a: "Our certified specialists follow Microsoft standards and best practice for a smooth rollout." },
    ],
  },
  "services/microsoft/teams": {
    seo: { title: "Microsoft Teams UAE | Collaboration and Voice | AptaCloud", description: "Microsoft Teams in the UAE: secure voice, meetings, integrations, and governance for UAE organisations, set up for hybrid work and supported after go-live." },
    hero: { title: "Microsoft Teams for", accent: "UAE businesses.", lead: "Secure collaboration and integrated workflows with Microsoft Teams, set up around your goals." },
    faqs: [
      { q: "Do you provide voice services for Teams?", a: "Yes. We set up Teams Phone with call queues, an auto attendant, and Microsoft eCDN for advanced calling." },
      { q: "What security do your Teams services include?", a: "Data loss prevention, multi-factor authentication, conditional access, and compliance policies." },
      { q: "Is there a standalone version of Teams?", a: "Yes. Teams Essentials is designed for small and mid-sized businesses, and we can set it up." },
      { q: "How long does a Teams deployment take?", a: "A basic setup can be ready within a day. Customisation and your current infrastructure add time." },
      { q: "Do you support Teams after go-live?", a: "Yes. We monitor and tune your Teams environment and keep it in step across departments." },
      { q: "Can you migrate us from Slack, Zoom, or Skype?", a: "Yes. We move data and chat history securely from the major platforms." },
    ],
  },
  "services/microsoft/identity-security": {
    seo: { title: "Microsoft Identity and Security UAE | Entra ID | AptaCloud", description: "Identity and security for UAE businesses: Microsoft Entra ID, Intune, and Zero Trust security on Azure, set up for PDPL compliance and monitored." },
    hero: { title: "Identity and security for", accent: "UAE businesses.", lead: "Protect your users, devices, AI, applications, and data across hybrid and cloud infrastructure." },
    faqs: [
      { q: "What security does Microsoft Entra ID provide?", a: "Encryption, access management, threat protection, identity protection, and compliance tools for your data and privacy." },
      { q: "How do we secure Microsoft 365 with identity management?", a: "Entra ID adds multi-factor authentication, threat intelligence, and encryption for secure sharing." },
      { q: "Does Microsoft identity protect on-premises systems?", a: "Yes. We set up Microsoft Defender and conditional access to protect on-premises infrastructure." },
      { q: "How do you protect cloud infrastructure?", a: "Layered protection: AI threat alerts and analysis, identity theft prevention, and controlled access." },
      { q: "How do you set up identity and security for us?", a: "A certified specialist reviews your workflows, deploys identity and access policies, and tunes your security." },
    ],
  },
  "services/microsoft/copilot-studio": {
    seo: { title: "Microsoft Copilot UAE | AI Productivity | AptaCloud", description: "Microsoft Copilot in the UAE: Copilot across Microsoft 365 and custom Copilot Studio agents that automate tasks and support decisions." },
    hero: { title: "Microsoft Copilot for", accent: "UAE businesses.", lead: "Boost productivity in everyday work with Copilot set up and customised for your business." },
    faqs: [
      { q: "Can we use Copilot in Excel, Word, and PowerPoint?", a: "Yes. Copilot drafts and edits in Word, analyses in Excel, builds presentations in PowerPoint, and supports collaboration in Teams." },
      { q: "Does Copilot protect security and privacy?", a: "Yes. Entra ID, Defender, Intune, and Purview keep Copilot secure and compliant." },
      { q: "How is Copilot Studio licensed?", a: "Through Microsoft's enterprise licensing, including pay-as-you-go options. We help you choose the right model for your tenant." },
      { q: "Can Copilot connect to third-party tools?", a: "Yes. Copilot works best in Microsoft's ecosystem, and Copilot Studio integrations connect it to your other tools." },
      { q: "Do you deliver Copilot for mid-sized businesses?", a: "Yes. We scale Copilot to your needs with minimal changes to your infrastructure." },
      { q: "Can you help us control Copilot licensing costs?", a: "Yes. We review your licence mix and apply the discounts available to you." },
    ],
  },
  "services/microsoft/sharepoint": {
    seo: { title: "SharePoint UAE | Intranet and Collaboration | AptaCloud", description: "Microsoft SharePoint in the UAE: intranet design, migration, document governance, and workflow automation for enterprise teams." },
    hero: { title: "SharePoint solutions for", accent: "UAE businesses.", lead: "From intranet portals to document governance and workflow automation, change how your business works every day." },
    faqs: [
      { q: "What can we store in SharePoint?", a: "Documents, lists, and site content, backed by OneDrive and Azure storage options." },
      { q: "How does SharePoint help manage workflows?", a: "A central knowledge base where you organise files, plan workflows, track storage, and keep audit trails for compliance." },
      { q: "How do you customise SharePoint?", a: "We review your workflows and design your intranet with Power Apps, web parts, and custom development." },
      { q: "Can you migrate our legacy data to SharePoint?", a: "Yes. We move data and user permissions from legacy systems, cleaning data on the way." },
      { q: "Can you set up an AI-enabled SharePoint intranet?", a: "Yes. Copilot in SharePoint drafts content, builds presentations, and surfaces insight from your documents." },
    ],
  },
  "services/microsoft/microsoft-dynamics-365": {
    seo: { title: "Microsoft Dynamics 365 UAE | ERP and CRM | AptaCloud", description: "Dynamics 365 in the UAE: ERP migration, Business Central setup, CRM, and support for unified, automated workflows across finance, sales, and operations." },
    hero: { title: "Dynamics 365 for", accent: "UAE businesses.", lead: "Optimise, automate, and scale with one ERP and CRM platform, supported by AptaCloud." },
    faqs: [
      { q: "How is Dynamics 365 different from other ERP or CRM systems?", a: "It unifies ERP and CRM on one cloud platform, available anywhere, with real-time data instead of separate systems." },
      { q: "Does Dynamics 365 handle multiple currencies and entities?", a: "Yes. We set it up around your entities, currencies, and regulations." },
      { q: "Is our data safe in Dynamics 365?", a: "Yes. Role-based access, encryption, multi-factor authentication, threat monitoring, and secure integrations." },
      { q: "How can Dynamics 365 be customised?", a: "Low-code tools, API integrations, modular apps, custom workflows, and personalised dashboards." },
      { q: "How does AI improve Dynamics 365?", a: "Predictive analytics, intelligent automation, real-time insight, and better forecasting and customer engagement." },
      { q: "Will implementation disrupt the business?", a: "We plan in stages and run old and new systems side by side during data migration, so disruption stays low." },
    ],
  },

  /* ── Azure ───────────────────────────────────────────────────────── */
  "azure-hosting": {
    seo: { title: "Azure Hosting UAE | Local Data Residency | AptaCloud", description: "Azure hosting in the UAE: high-performance hosting with data residency in Azure's UAE regions and expert monitoring." },
    hero: { title: "Azure hosting services", accent: "in the UAE.", lead: "Enterprise-grade Azure hosting that gives your teams secure, fast, and well-run infrastructure." },
    faqs: [
      { q: "Is an Azure server in the UAE suitable for SMBs?", a: "Yes. You get enterprise-level hosting with security, virtual machines, and data management sized to your business." },
      { q: "How quickly can our Azure hosting go live?", a: "Often within a day, depending on your infrastructure." },
      { q: "Can our Azure servers scale as we grow?", a: "Yes. We upgrade resources as you grow and monitor them throughout." },
      { q: "Can we host several websites on Azure?", a: "Yes. Multiple sites and applications with their own domains, databases, and traffic levels." },
      { q: "How do you keep Azure hosting costs down?", a: "We size resources to your needs and apply the available pricing discounts." },
      { q: "Do you provide technical support?", a: "Yes. A dedicated team monitors your platform and fixes issues." },
    ],
  },
  "azure-implementation": {
    seo: { title: "Azure Implementation UAE | Cloud Deployment | AptaCloud", description: "Azure implementation in the UAE: architecture design to deployment, with governance and PDPL-aligned security, for a secure, scalable Azure rollout." },
    hero: { title: "Expert-led Azure implementation", accent: "for secure growth.", lead: "A strong cloud foundation is critical. We set up Azure so it is secure, fast, and cost-effective from day one." },
    faqs: [
      { q: "What is Azure implementation?", a: "Setting up infrastructure, applications, networking, and security on Azure for performance, cost, and scale." },
      { q: "Why does implementation matter?", a: "Done well, it gives you a secure, cost-effective environment and avoids downtime from misconfiguration." },
      { q: "How long does it take?", a: "Most projects take six to twelve weeks, depending on complexity and requirements." },
      { q: "Is it secure?", a: "Yes. Identity management, encryption, and compliance controls protect your environment." },
      { q: "Can Azure work with our existing systems?", a: "Yes. Azure supports hybrid environments and legacy integration." },
      { q: "What does implementation cost?", a: "It depends on workloads, scale, and architecture. We share a detailed estimate after assessment." },
    ],
  },
  "azure-migration": {
    seo: { title: "Azure Migration UAE | Cloud Migration Services | AptaCloud", description: "Azure migration in the UAE: workloads moved in planned stages with data integrity, documentation, and compliance support." },
    hero: { title: "Migrate with confidence.", accent: "Transform with precision.", lead: "Cloud migration is a business decision, not just a technical one. Move to Azure with clarity and control." },
    faqs: [
      { q: "What is Azure migration?", a: "Moving your data, applications, and systems to Microsoft Azure, rehosting and modernising securely." },
      { q: "How long does it take?", a: "It depends on your organisation's complexity. We structure migrations to be predictable with minimal disruption." },
      { q: "Is our data secure in transit?", a: "Yes. Encrypted transfers and validation checks protect data integrity." },
      { q: "Can legacy applications move?", a: "Yes. We check compatibility and modernise applications for Azure." },
      { q: "Do you support hybrid environments?", a: "Yes. Hybrid and multi-cloud environments are supported." },
      { q: "Do you provide documentation?", a: "Yes. Full architecture, configuration, and process documentation." },
    ],
  },
  "azure-managed-services": {
    seo: { title: "Azure Managed Services UAE | Cloud Support | AptaCloud", description: "Azure managed services for UAE businesses: monitoring, patching, backup, optimisation, security, and support in your time zone, on a monthly plan." },
    hero: { title: "Azure that performs,", accent: "managed for you.", lead: "Most businesses move to the cloud. Fewer get the most from it. We manage Azure so it performs." },
    faqs: [
      { q: "How are managed services different from basic hosting?", a: "Hosting gives you infrastructure. Managed services add full management, optimisation, and security." },
      { q: "Can you reduce our Azure costs?", a: "Yes. We find unused resources and optimise usage." },
      { q: "Is our data secure?", a: "Yes. Layered security and continuous monitoring." },
      { q: "Do you manage hybrid environments?", a: "Yes. On-premises and cloud systems together." },
      { q: "How quickly can you start?", a: "Onboarding can begin within days of the assessment." },
      { q: "Do you support the UAE time zone?", a: "Yes. Responsive support in your working hours." },
      { q: "Can you help with UAE compliance?", a: "Yes. We align your Azure setup with local and international standards." },
      { q: "What happens if something goes wrong?", a: "Proactive monitoring finds and fixes most issues before they affect the business." },
    ],
  },

  /* ── Industries ──────────────────────────────────────────────────── */
  "industry/insurance": {
    seo: { title: "Cloud and AI for Insurance UAE | Microsoft Azure | AptaCloud", description: "Cloud and AI for UAE insurers: claims automation, analytics, and compliance with CBUAE, DIFC, and PDPL requirements." },
    hero: { title: "Policy origination to", accent: "claims delivery.", lead: "Intelligent cloud built for UAE insurers, where automation meets accuracy and compliance runs in the background." },
    faqs: [
      { q: "Why does the cloud matter for UAE insurers?", a: "Higher productivity, easier compliance, and a faster, more secure customer journey." },
      { q: "What are the benefits of AI in insurance?", a: "Claims automation, better fraud detection, sharper underwriting, lower costs, and new products." },
      { q: "Is cloud adoption safe?", a: "Yes. Encryption, authentication, and alignment with UAE law keep data secure." },
      { q: "Will AptaCloud work with our existing software?", a: "Yes. We integrate without disrupting operations." },
      { q: "How does the cloud save insurers money?", a: "No physical hardware, lower maintenance, less IT burden, pay-as-you-go pricing, and faster time to market." },
      { q: "How do you support UAE compliance?", a: "We design for CBUAE, DIFC, PDPL, and GDPR requirements, with monitoring and reporting built in." },
    ],
  },
  "industry/oil-gas": {
    seo: { title: "Oil and Gas Cloud and AI UAE | Microsoft Azure | AptaCloud", description: "Cloud and AI for UAE oil and gas companies: secure Azure infrastructure, predictive analytics, and efficient operations." },
    hero: { title: "Smarter oil and gas", accent: "operations.", lead: "Predictive maintenance and connected data that help UAE operators reduce downtime and run more efficiently." },
    faqs: [
      { q: "Can AI make production more efficient?", a: "Yes. AI analyses real-time and historical data to optimise production and flag issues early." },
      { q: "Can confidential data be stored safely in the cloud?", a: "Yes. Encryption, role-based access, threat detection, and monitoring, aligned with the UAE PDPL and international standards." },
      { q: "How do you keep systems compliant with UAE rules?", a: "Alignment with ISO 9001, ESMA requirements, and the UAE PDPL, with built-in monitoring, reporting, and automated audit trails." },
      { q: "Can legacy systems connect to the cloud?", a: "Yes. We integrate them with little interruption to operations." },
      { q: "What are the main benefits of cloud and AI?", a: "Higher efficiency, lower maintenance and infrastructure costs, real-time decisions, and long-term scale." },
      { q: "How long does a transformation take?", a: "Typically six to twelve weeks, rolled out gradually to keep disruption low." },
    ],
  },
  "industry/engineering-and-construction/construction": {
    seo: { title: "Construction Technology and Analytics UAE | AptaCloud", description: "Construction technology for UAE projects: cloud platforms, connected systems, and real-time BI for resources and supply chains." },
    hero: { title: "Connect construction projects", accent: "across the UAE.", lead: "We help construction companies, developers, and engineering firms see their data clearly and modernise operations." },
    faqs: [
      { q: "What is construction system integration?", a: "Connecting construction management, BIM, ERP, scheduling, and field apps so project information moves without re-keying." },
      { q: "Can you integrate Procore with our other systems?", a: "Yes. Through APIs, connectors, and integration workflows, depending on the systems and data involved." },
      { q: "How does AI help construction?", a: "AI analyses schedules, costs, and site reports to flag delays, support resource planning, and automate reporting, alongside professional judgement." },
      { q: "Can you connect BIM with construction management apps?", a: "Yes, depending on the software, APIs, data formats, and workflows." },
      { q: "Which platforms do you work with?", a: "Procore, Autodesk Construction Cloud, Primavera P6, Microsoft Project, Dynamics 365, SAP, and Oracle ERP, among others." },
      { q: "How does Power BI improve project reporting?", a: "It combines project, financial, and operational data into dashboards for budgets, schedules, and resources." },
      { q: "Can we modernise without replacing everything?", a: "Yes. We connect existing applications to modern platforms through APIs and cloud integration." },
      { q: "How do we see performance across multiple sites?", a: "By connecting project, schedule, finance, and field systems into one view with standard dashboards." },
    ],
  },

  /* ── Company ─────────────────────────────────────────────────────── */
  "about-us": {
    seo: { title: "About AptaCloud UAE | Microsoft Cloud and AI Consultancy", description: "AptaCloud: Microsoft-certified specialists in Azure, AI, data, and modernisation, serving UAE businesses with 20+ years of experience." },
    hero: { title: "Engineering intelligent", accent: "enterprises.", lead: "Connected digital solutions that help UAE enterprises join up their systems, put their data to work, and scale with confidence." },
  },
  blog: {
    seo: { title: "AptaCloud UAE Blog | Cloud, Data, and AI Insights", description: "Articles from AptaCloud on cloud, data, AI, and modernisation for UAE businesses." },
  },
};
