# Client feedback 2026-11-20: tracker

Two documents from Downloads, both received 2026-11-20:

- **P0** = "AptaCloud_Website_P0_Fixes_All_Regions" (P0 fixes, all regions). Rule: change only the listed strings and settings.
- **D** = "Website Review Final Pointers for Designer" (design and content pointers; the designer proposes copy where asked).

Status: `done` (already live from the 2026-11-18 round, verified in source) · `todo` · `input` (blocked on something only the client has) · `decided` (conflict resolved, see Conflicts).

## Conflicts between the two documents, and how we resolve them

| # | P0 says | D says | Resolution |
|---|---|---|---|
| C1 | Hide UAE in the region switcher while on hold (P0 A23) | done | Ketki Naidu, Human Resources (photo in company/) |
| C2 | US Global presence: hide UAE card, new heading (P0 US5) | done | About story, leadership lead, locations, and offices; US home unchanged |
| C3 | "200+ engineers, delivering from 4 locations." (P0 A7) | Add Colombia to Locations and About (D C2) | Keep the P0 string literally; flag the count for the client. |

## P0. All sites (shared code)

| # | Item | Status | Note |
|---|---|---|---|
| A1 | Contact form: send to CRM / booking tool, thank-you message, lead event | input | Plumbing built against a configurable endpoint; needs the CRM / booking tool endpoint |
| A2 | GA4 through Google Tag Manager; track form submits, phone and email clicks | input | Plumbing built; needs the GTM container ID |
| A3 | Privacy policy: publish approved text, remove noindex | done | the privacy policy from aptacloud.com is published and indexable (earlier commit); confirm it is the approved text |
| A4 | Production base URLs in astro.config.mjs | done | `site` = https://aptacloud.com; SITE_ORIGIN matches; switcher links root-relative |
| A5 | CLAUDE.md positioning rule | done | |
| A6 | "Engineers under one roof" → "Engineers" | done | |
| A7 | About numbers text | done | |
| A8 | Footer tagline | done | |
| A9 | About heading "What we do." | done | |
| A10 | Stats strip "Microsoft-certified" | done | |
| A11 | Home platform strip "Built on the Microsoft stack" | done | hero chip (AgentConsole.tsx); the 11-18 round had set it to "AI-first solutions" |
| A12 | AI Consulting FAQ wording | done | ai.ts and layouts/ai.ts |
| A13 | Generative AI FAQ wording | done | |
| A14 | Data Engineering FAQ "We build many data platforms on Microsoft Fabric" | done | |
| A15 | Data Engineering FAQ "Azure and AWS" | done | |
| A16 | Data banners "Build the data foundation your AI work runs on." | done | 3 banners |
| A17 | AI Agents banner "Put your first AI agent into production." | done | |
| A18 | App Re-engineering card "Systems ready for AI" | done | |
| A19 | Microsoft 365 "Microsoft Viva Engage" | done | |
| A20 | Azure menu button "Explore Azure optimization" | done | menu button only, as listed; the Azure Hosting page CTA opens the form, so it stays |
| A21 | Third-Party Administrators | done | |
| A22 | Remove Major Operators from the Oil & Gas menu (page stays, unlinked) | done | |
| A23 | Hide UAE in the region switcher | done | `REGION_HOLD` in regions.ts (also drops UAE hreflang) |

## P0. US site

| # | Item | Status |
|---|---|---|
| US1 | Home title "AptaCloud \| AI Consulting, Modernization, and Data" | done |
| US2 | About title "About AptaCloud \| AI, Modernization, and Data Consultancy" | done | company.ts title; the US build spells it Modernization |
| US3 | Hero second button "See how we work" | done |
| US4 | Numbers heading | done |
| US5 | Global presence: hide UAE, new heading | done | heading changed in GlobalPresence.tsx, UAE card dropped via REGION_HOLD; the section itself is off the US home (C2) |

## P0. Australia site

| # | Item | Status |
|---|---|---|
| AU1 | Home title "AptaCloud Australia \| AI Consulting, Modernisation, and Data" | done |
| AU2 | About title "About AptaCloud \| AI, Modernisation, and Data Consultancy" | done |
| AU3 | Contact block: "Australian enquiries answered in AWST and AEST business hours." | done | note under the contacts in the form section (regions.ts contact.note) |
| AU4 | Managed Services pricing "US$35 an hour": remove the rate on AU | done | "Quoted on request" on AU (Azure and AWS managed services tables) |
| AU5 | "general contractor(s)" → "head contractor(s)" (AU build) | done | build-time term pass for the AU build (tools/region/au-terms.mjs); URLs and image paths untouched |
| AU6 | "carrier(s)" → "insurer(s)" (AU build) | done | same pass; "insurance carriers" becomes "insurers", not "insurance insurers" |

## P0. India site

| # | Item | Status |
|---|---|---|
| IN1 | Home title "AptaCloud India \| AI and Cloud for Indian Businesses" | done |
| IN2 | Home H1 "AI and cloud transformation for Indian businesses." | done |
| IN3 | About title | done |
| IN4 | Pricing "US$35 an hour": remove the rate on IN | done | "Quoted on request" on IN |
| IN5 | Carriers page "SOC 2" → "IRDAI" | done | Azure cloud card and the regulations chips |
| IN6 | 11 US segment pages on /in/: noindex | done | noindex and out of the sitemap (isNoindex in data/services/index.ts) |

## P0. Value proposition lines

| # | Item | Status |
|---|---|---|
| VP1 | Shared line, brand.ts | done |
| VP2 | AU valueProp in regions.ts | done |
| VP3 | IN valueProp in regions.ts | done |
| VP4 | IN home hero lead | done |
| VP5 | About meta description | done |
| VP6 | About hero lead | done |
| VP7 | About, Our story | done |
| VP8 | Careers lead | done |

## P0. UAE

| # | Item | Status |
|---|---|---|
| UAE1 | Do not publish /uae/ while on hold | input (taking the live staging copy down is the user's call) |
| UAE2 | Switcher and Global presence card | covered by A23, C2 |

## D. Global (all regional sites)

| # | Item | Status |
|---|---|---|
| G1 | Cut repeated images across pages; distinct images wherever possible | done | 48 repeated uses replaced per region: every content photo now appears on one page only (AU 0, US 0 repeats; tools/audit/photorepeats.mjs). Related-page cards and the industries rotation repeat by design. New AU photos: Pexels fauxels; US: Jopwell and #WOCinTech (American offices); no photo shared across regions (pixel check) |
| G2 | US images more US-centric (American settings and people) | done | the 48 new US photos are American offices and people (Jopwell, #WOCinTech NYC), on top of the Dallas hero, agentic AI, data, and Azure swaps |
| G3 | Industry pages with blank or missing images | checked | every industry page on the US, AU, IN, and UAE staging sites loads all its images (desktop, retina, phone). One real blank found and fixed site-wide: single-colour tool logos in card chips painted white on a white plate (TechMark.module.css). Ask the client which page and section they saw if it persists |
| G4 | Official Anthropic logo, identical everywhere | done | one file, /images/partners/anthropic.svg, in Partners, US credentials, and About |
| G5 | Remove the large footer logo on all regions | done | giant wordmark removed from the footer |
| G6 | Remove Google BERT and Google T5; current models only | done | BERT and T5 removed from Generative AI; model text names current GPT, Claude, Gemini, Llama |
| G7 | Region dropdown order US, India, Australia, UAE | decided (C1) |

## D. US homepage

| # | Item | Status |
|---|---|---|
| US-1 | Hero background: Dallas downtown | done | Reunion Tower and downtown (Pexels 10482416), cropped so the tower stands right of the headline. A wider skyline from the Trinity River (Wikimedia, CC0) is the fallback if the client wants more of downtown |
| US-2 | Hero tiles: correct Dynamics 365 icon and Azure logo | done | official Azure icon; Dynamics 365 icon-only file made from the official lockup (the lockup was unreadable at 24px) |
| US-3 | Technology partners: official Anthropic logo | done |
| US-4 | One or two new sections on agentic AI and AI agents (we propose content) | done | "AI agents that move the work forward" (4 agents) and "Agents your team can trust in production" (photo supplied by the user) |
| US-5 | New focus-industries section (Insurance, Oil & Gas, Engineering & Construction) | done | "Three industries we know from the inside", the existing industry cards and pages |
| US-6 | Remove Global presence | done |
| US-7 | Rewrite "Tell us what your team has started…" with AI consulting positioning | done | "Bring us a business problem. We will show where AI solves it." |
| US-8 | One US phone number, from the live aptacloud.com | done | +1 (972) 928-2341 |

## D. Services menu

| # | Item | Status |
|---|---|---|
| M1 | Flagship program logo: transparent white version | done |
| M2 | "Full Microsoft Business Suite" → "Microsoft Dynamics 365" | done | promo, copy, and "Explore Dynamics 365" link |

## D. Service and technology pages

| # | Item | Status |
|---|---|---|
| S1 | Machine Learning: deeper content, model types, technology stack | done | "What we do" intro made concrete; new "Models we build" (six model types, with methods) and a grouped technology stack board |
| S2 | Legacy migration: more source technologies incl. Delphi and Java | done | 13 source technologies, including Delphi, Java, RPG on IBM i, Classic ASP, Access, Oracle Forms, FoxPro, Lotus Notes; FAQ updated |
| S3 | Legacy migration: AI-assisted migration messaging | done | new "Legacy migration, sped up with AI" section and an FAQ |
| S4 | Data Engineering: proper data engineering toolkit | done | grouped board: Microsoft data platform; ETL, ELT, and orchestration; streaming, APIs, and EDI; storage and warehouses |
| S5 | Data Engineering: remove Power BI from the toolkit | done | Power BI (and Looker Studio) off the Data Engineering toolkit |
| S6 | Data Engineering: add ETL and EDI | done | new "ETL pipelines and EDI exchanges" section, a services card renamed "ETL and data pipelines", and an FAQ |
| S7 | Data Warehouse: replace networking image | done | hero now storage servers: AU Pexels 17489160, US Pexels 4508751 |
| S8 | Data Visualization: dashboards and graphs imagery | done | AU Pexels 12969403; US now the multi-monitor photo supplied by the user |
| S9 | Azure pages: servers and cloud infrastructure imagery | done | Azure Implementation hero (AU 37730212, US 5092815) and Azure Managed Services (AU 325229, US 2881224) now show servers and data centres; Migration, Security, and Hosting already had one |
| S10 | SharePoint: real SharePoint visuals | done | real SharePoint intranet screenshots from Microsoft's PnP Starter Kit (MIT licence), a different page per region. Ask the client for screenshots of their own SharePoint sites and document libraries (client names blurred) to replace them |
| S11 | Microsoft Database: SQL Server, Azure SQL and related product logos | done | new "The Microsoft database products we work with": SQL Server, Azure SQL, Cosmos DB, PostgreSQL, Fabric, Database Migration Service |

## D. Industry pages

| # | Item | Status |
|---|---|---|
| I1 | Insights section (mapped blogs) on every industry main and sub page, as on E&C | done | all 14 industry hubs and segment pages already carry an Insights section of mapped articles (verified on staging) |
| I2 | Remove "Overview" from industry submenus; link the overview from the industry heading | done |
| I3 | Insurance: core policy admin system logos, P&C and Life groups | built, off | logo board in two groups (P&C, Life) on the Insurance page; CORE_SYSTEMS_CONFIRMED = false in layouts/industries.ts until the client confirms the names against the partner list (no unconfirmed partner claims). Vendor logo files still needed |
| I4 | Carriers, MGAs, TPAs: section on our AI-led claims intake and triage solution | done | "AI-led claims intake and triage, built by AptaCloud": capture, check, route flow on Carriers, MGAs, and TPAs, lead written for each |

## D. About, Locations, Leadership, Blog, Events, AU

| # | Item | Status |
|---|---|---|
| C1 | Leadership: add Ketki | done | Ketki Naidu, Human Resources (photo in company/) |
| C2 | Locations and About: add Colombia (not the US home) | done | About story, leadership lead, locations, and offices; US home unchanged |
| B1 | Blog listing: fresh layout | done | lead story beside "Also new", then topics and search beside article rows with excerpts and reading time; topics wrap as chips on phones |
| B2 | Blog detail: matching design | done | 77 articles imported from the live blogs (tools/blog/import.mjs) into /blog/<slug>/: header with cover, article with "On this page", related articles, contact form, BlogPosting and FAQ schema, in the sitemap. Article text as published; AU build applies its trade terms |
| B3 | Events: each event gets its own link and an image | done | every event has its own page (/events/<slug>/) with its own image; the listing shows photo cards |
| AU-1 | AU hero: Sydney landmark | done | Sydney Opera House photo supplied by the user |

## Audit after the round (2026-11-24): beyond the lists, in the clients' own terms

- No rhetorical questions (SEO content rule): 38 section headings were questions ("Why choose AptaCloud?", "What process do we follow?"); now statements with the same keywords. Only published blog titles remain as questions.
- Banned words and duplicates in blog excerpts (meta descriptions and listing summaries): 13 rewritten (leverage, unlock, seamless, "the best"; 2 duplicated descriptions). Article bodies stay as published.
- Imagery fit (Hemant's "networking image" complaint applied everywhere): Legacy Migration hero was a telecom patch panel (AU) and fibre cables (US), now developers on legacy code; US Machine Learning was a blurred lab close-up, now data scientists reviewing results; AU AWS Managed Services was a TV control room, now an engineer on monitoring dashboards; US Dynamics 365 was shot through a doorway, now a team at a conference table. India's Fabric page had the Data Engineering photo; now its own.
- Phones: blog topic chips raised to 44px tap targets.
- Checked and left by design: pricing figures (live site), region-switcher links to other builds, India's redirect stubs, AWS product names in US spelling, Why AptaCloud cards in full on phones (client exception), AU industry heroes (the client's own live-site images).
- For your decision: on phones the AU hero's Opera House sits behind the headline and dark tint; a fix means a different phone hero layout. The privacy policy names OTS Solutions Inc. and says "Contact us" (legal text; client to confirm).
- Result: au 31 pass, us 28, in 28, 0 fail; photo repeats 0 on all three builds.
- UAE polished to the same standard (2026-11-24, user: don't hold the UAE back for polishing): value line rewritten in the new outcome-led pattern; managed-services rate 'Quoted on request'; Azure DevOps hero now developers on pipeline code; every shared fix carried over. Checker 17 pass, 0 fail; 0 photo repeats. Not published (hold).
- All regions: article and event page headers carry id=top, so the footer's Back to top link resolves.

## Next session

1. Run the strict, launch-checklist, and mobile audits on au, us, and in builds; screenshots at 390 / 768 / 1440 of the new pages (blog articles, events).

Checker: `node tools/audit/clientfixes-1120.mjs` after `npm run build` for a region. 2026-11-23: au 31 pass, us 28, in 28; 0 fail; A1 and A2 waiting on the client.
## Waiting on the client

- A1 CRM or booking-tool endpoint (`LEADS.endpoint`), A2 GTM container ID (`ANALYTICS.gtmId`), A3 approved privacy text.
- I3: confirm the core-system names against the partner list, and supply logos.
- S10: screenshots of their own SharePoint sites and document libraries.
- C2: Colombia city (shown as "Delivery team").
- US value line: the US hero keeps the old aptacloud.com lead (rewritten 2026-11-19); the new line shows in the footer and About menu. Confirm whether the US hero should use it too.
