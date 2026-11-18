# Client fix list: what we changed (2026-11-18)

Source: the client document "AC- AU site Fixes" (2026-11-18). Every item in it is applied below, with the exact change, the file and line, and the regions it reaches. One codebase builds all four sites (US at `/`, AU `/au`, India `/in`, UAE `/uae`), so a shared change reaches every region that shows that element.

Part A covers the items in the document. Part B covers the same kinds of issue we found elsewhere on the site and fixed the same way: wording and settings only, with no sections restructured, no copy rewritten beyond the phrase at fault, and no design changes. Part C lists what we found but left for your decision.

## How to check our work

```
npm run build
node tools/audit/serve.mjs dist /au/ 4321       # second terminal; use the region's base: / , /au/ , /in/ , /uae/
node tools/audit/clientfixes.mjs dist           # set REGION=us|au|in|uae to check another region's build
```

`tools/audit/clientfixes.mjs` checks every item in Parts A and B against the built site, in a real browser where an item is about behaviour (menus, phones, button placement). It prints PASS, FAIL, or N/A (not applicable to that region) for each item.

Result on 2026-11-18, all four regions built from the same code:

| Region | Passed | Failed | Not applicable |
|---|---|---|---|
| AU | 25 | 0 | 2 (US-home-only items) |
| US | 27 | 0 | 1 (AU home stat card) |
| India | 22 | 0 | 4 (items that are not on the India menus or home) |
| UAE | 22 | 0 | 4 (same as India) |

## Order of work, as the document asks

1. **CLAUDE.md first.** "Microsoft leads" now reads: "Positioning order: AI, then modernization, then data and Azure, then the Microsoft stack. Microsoft is a credential, not the headline." ([CLAUDE.md:21](../CLAUDE.md#L21)). We made the same change in `SUMMARY.md`, `README.md`, and `docs/launch-checklist.md`, and in code comments that said "Microsoft leads", so nothing the AI editor reads brings the old wording back.
2. **Fixes**, below.
3. **Checks:** `npm run build` for all four regions, then the checks in `docs/launch-checklist.md` (see the end of this file).

## Part A. Your list

### Brand errors

| # | Where | Changed from | Changed to | File | Regions |
|---|---|---|---|---|---|
| 1 | Insurance nav, TPA page (title tag, H1, lead, page name) | "Third Party Adjusters (TPA)", "Technology for Third-Party Adjusters (TPAs)", "for third-party adjusters.", "helps third-party adjusters (TPAs)" | "Third-Party Administrators (TPA)", "Technology for Third-Party Administrators (TPAs)", "for third-party administrators.", "helps third-party administrators (TPAs)" | [menus.ts](../src/components/layout/nav/menus.ts) (Insurance column), [industries.ts:152-161](../src/data/services/industries.ts#L152-L161) | US, AU (IN and UAE have no TPA page) |
| 1 | TPA page URL | Kept as `/industry/insurance/third-party-adjusters/`, as asked | | | |
| 2 | Homepage numbers heading | "Two decades of Microsoft-first delivery, from Texas to the world." | "Senior AI and cloud specialists, headquartered in Richardson, Texas." | [UsCredentials.tsx:51](../src/components/site/us/UsCredentials.tsx#L51) | US home (the only home with this band) |
| 3 | Stat label | "Engineers under one roof" | "Engineers" | [UsCredentials.tsx:15](../src/components/site/us/UsCredentials.tsx#L15), [layouts/shared.ts:9](../src/data/services/layouts/shared.ts#L9) | All (service-page stats strip) |
| 3 | Home stat card | "200+ engineers under one roof, delivering from 4 locations." | "200+ engineers, delivering from 4 locations." | [About.tsx:37](../src/components/site/About.tsx#L37) | AU, IN, UAE homes |
| 4 | Footer tagline, every page | "Microsoft first, and proven on your data." | "See it work. Then scale it." | [Footer.astro](../src/components/layout/Footer.astro) | All |
| 5 | About page section heading | "Microsoft, at the centre of what we do." | "What we do." | [company.ts:57](../src/data/services/layouts/company.ts#L57) | All |

### Navigation and CTA fixes

| # | Where | Changed from | Changed to | File | Regions |
|---|---|---|---|---|---|
| 14 | Azure menu button | "Get your cloud cost review" | "Explore Azure optimisation", opening the Azure Optimisation page (`/azure-optimization/`) | [menus.ts](../src/components/layout/nav/menus.ts) (`AZURE_PROMO`) | US, AU |
| 15 | Services menu button, every page except the homepage | "See what the workshop covers" (jumped to the homepage) | "Book your AI assessment", opening the contact form on the same page (`#contact`). The homepage keeps its button. | [menus.ts](../src/components/layout/nav/menus.ts) (`offHome`), [MegaPanel.tsx](../src/components/layout/nav/MegaPanel.tsx) (`useOnHome`), [Nav.tsx](../src/components/layout/Nav.tsx) (phone menu) | All (see B6 for India and UAE) |
| 16 | Homepage hero, second button | "Explore the Microsoft platform" (to `#platform`) | "See how we work", linking to the Why AptaCloud section (`#why`) | [UsHero.tsx](../src/components/site/us/UsHero.tsx) | US home |
| 17 | Footer link "Microsoft Azure" | US: Azure Hosting page. AU: the home page's Azure section | Azure Optimisation page (`/azure-optimization/`) | [Footer.astro](../src/components/layout/Footer.astro) | US, AU |
| 18 | Mid-page button, service and industry pages | On the first banner, often section 2 or 3, before any proof | On the first banner after the first "Typical engagement" or process section. Where no banner follows that section (15 pages: the AWS, Azure, and data pages and the insurance and oil and gas hubs), the button sits at the foot of the process section, so it still comes after the proof. Pages with neither section are unchanged. | [[...slug].astro](../src/pages/[...slug].astro) (`proofAt`, `midCta`), [Steps.tsx](../src/components/service/blocks/Steps.tsx) | All. 46 pages checked. |
| 19 | Phones: Why AptaCloud cards, Typical engagement stories, "What happens next" steps | Cut to 2 lines with "Read more" (the "What happens next" step text was hidden) | Full text, no "Read more" | [ReadMore.module.css](../src/components/ui/ReadMore.module.css) (`data-full-text`), set on [Cases.tsx](../src/components/service/blocks/Cases.tsx), [WhyUs.tsx](../src/components/service/WhyUs.tsx), [WhyWorkshop.tsx](../src/components/site/WhyWorkshop.tsx), Why AptaCloud blocks in [[...slug].astro](../src/pages/[...slug].astro) (`fullText`) and [index.astro](../src/pages/index.astro); [CTA.module.css](../src/components/site/CTA.module.css) | All |

### How we read three items

- **#14 spelling.** The AU site uses Australian spelling in copy, so the AU menu reads "Explore Azure optimisation". The US build converts copy to US spelling, so the US menu reads "Explore Azure optimization". The checker accepts both.
- **#14 and #17 on AU.** On the AU site, the Azure menu button and the footer link went to the home page's Azure section, not a service page. Both now open the Azure Optimisation page, so they do what the new label says.
- **#17 on India and UAE.** Their footer Azure link goes to Azure Migration, which is the Azure page in their own menus, so it stays.

## Part B. The same issues elsewhere, fixed the same way

Each one repeats a problem your list flagged: Microsoft leading the wording (items 2, 4, 5 and the CLAUDE.md rule), a claim that contradicts another (item 3), a button that leaves the page (items 14, 15, 17), outdated naming (item 1), and proofreading. Only the phrase at fault changed.

| # | Pattern | Where | Changed from → to | Regions |
|---|---|---|---|---|
| B1 | Microsoft leads a title tag | Home title tags; India and UAE About title tags | "AptaCloud \| Microsoft Cloud, Data, and AI Consultancy" → "AptaCloud \| AI, Data, and Cloud Consultancy"; "AptaCloud UAE \| Microsoft Cloud and AI Consulting" → "AptaCloud UAE \| AI and Cloud Consulting"; "AptaCloud India \| Cloud and AI for Indian Businesses" → "AptaCloud India \| AI and Cloud for Indian Businesses"; "About AptaCloud India/UAE \| Microsoft Cloud and AI Consultancy" → "… \| AI and Cloud Consultancy". Home descriptions list AI first. | All |
| B2 | Microsoft leads the hero | Home hero tag, hero chip, ticker | "Microsoft-certified cloud, data & AI" → "AI-first, Microsoft-certified"; chip "Microsoft-centric solutions: Dynamics 365, Microsoft 365, Azure, Copilot" → "AI-first solutions: AI agents, Modernisation, Data, Azure"; ticker now starts "AI, Modernisation, Data, Cloud…" ("IT" dropped: generic IT support is not the target buyer) | AU, IN, UAE |
| B3 | Microsoft leads a heading | India and UAE home About headings; US home platform section | "Microsoft cloud and AI specialists for…" → "AI and cloud specialists for…"; "One partner across the Microsoft platform." → "The platforms your AI runs on." (tag "The Microsoft platform" → "Platforms") | IN, UAE, US |
| B4 | "Microsoft first / leads / centric" in copy | Service hero badge; AI pages strip; tools sections; tools board pill; Partners section; About partners; Careers card; India and UAE financial-services cards; region cards; industries menu; UAE hub; Global presence; FAQ answers on AI, data, and app modernisation pages; Copilot page card | "Microsoft-first" → "Microsoft-certified"; "Model-agnostic, Microsoft-first" → "Model-agnostic, Microsoft-certified"; "Microsoft first, with the tools…" → "Built by Microsoft-certified specialists, with the tools…"; "Microsoft first" pill → "Core platform"; "Microsoft first: Azure, Dynamics 365…" → "AptaCloud's senior specialists are Microsoft-certified, and most of our AI and data work runs on Azure and Microsoft Fabric."; "Microsoft leads." → "Microsoft is our main platform partner."; "Microsoft-first technology" → "AI-first technology"; "Microsoft cloud, data, and AI" → "AI, data, and cloud"; "led by Microsoft specialists" → "led by senior AI and cloud specialists"; "We are Microsoft-first…" / "We lead with Microsoft Azure" → "Most of our AI work runs on…" / "Most of our work runs on Microsoft Azure" | All |
| B5 | "Senior Microsoft specialists" (the guidelines' reason 3 is "Senior AI and cloud specialists (Microsoft-certified)") | Why AptaCloud reason on every service page and the home; home and About story; workshop | → "Senior, Microsoft-certified AI and cloud specialists"; workshop → "our senior AI specialists" | All |
| B6 | A menu button leaves the page (as item 15) | India and UAE Services menu button "See how we work" (jumped to the homepage) | Same rule as item 15: off the homepage it reads "Book your AI assessment" and opens the form on the same page | IN, UAE |
| B7 | A footer service link opens the homepage (as item 17) | Footer "Dynamics 365" (AU and India went to the home page's Dynamics section) | Opens the Dynamics 365 service page | AU, IN |
| B8 | Order of services (positioning order) | Footer Services list; Services menu tabs; US hero tiles; US platform tabs; Partners links | AI, then app modernisation, then data, then Azure, then the Microsoft stack (AWS last). India and UAE keep their own menu tabs and links, ordered AI first. | All |
| B9 | Contradiction (as item 3) | Service hero: "Delivered in six phases", while process sections show four to six stages | → "Delivered in clear phases" | All |
| B10 | Outdated product names | Logo label "Azure Active Directory"; "Yammer" on the Microsoft 365 page | → "Microsoft Entra ID"; → "Viva Engage" | All |
| B11 | Share image (every shared link) | "Modernise, connect, and put AI to work… · Microsoft-first" | "Put AI to work on the systems you run, proven on your data. · Microsoft-certified" (no region-specific spelling, so it suits all four sites) | All |
| B12 | Proofreading: missing Oxford comma | Insurance menu, Microsoft 365 menu promo, Why AptaCloud reason 4, app modernisation risk card | "claims adjustment and compliance" → "claims adjustment, and compliance"; "collaboration and security" → "collaboration, and security"; "ERP, SCADA and project" → "ERP, SCADA, and project"; "Security, legal and compliance, and continuity planning" → "Security, legal, compliance, and continuity planning" | All |

## Part B2. Later requests (same day)

| # | Request | What changed | File | Regions |
|---|---|---|---|---|
| D1 | Remove the vertical lines on both sides of the hero content | The site's decorative construction lines (two fixed rules on the page grid) showed through the heroes because the hero background was transparent. Both heroes now use the solid page colour, so the lines no longer show; nothing else on the page changes. Checked on every page of all four sites with `tools/audit/linesaudit.mjs`: no section shows the lines (the old build showed them in the hero of every service, industry, and company page, and the AU, India, and UAE homes). | [ServiceHero.module.css](../src/components/service/ServiceHero.module.css), [Hero.module.css](../src/components/site/Hero.module.css) | All |
| D2 | Rewrite the US hero from the old aptacloud.com hero | Old: "Revolutionize with Artificial Intelligence / Your Path to Measurable AI ROI / Harness the power of AI to transform your business and drive efficiency." New: tag "Artificial intelligence · Microsoft-certified" (sparkle icon); H1 "Your path to measurable AI ROI." (unchanged); lead "Put AI to work across your business and take the manual effort out of everyday operations. We prove it on your data first." Same message, in house style: "revolutionise" and "harness the power of" are banned words, and the lead ends on the proof-of-concept promise. | [UsHero.tsx](../src/components/site/us/UsHero.tsx) | US home |

## Part C. Found, not changed: for your decision

Each of these needs a decision or sign-off we don't have, or would mean restructuring, which your document rules out.

1. **AU home section order.** The Dynamics 365 and Microsoft 365 sections come before the Azure section. Putting Azure first follows the positioning order, but it moves sections. Ready to apply on your word (the backgrounds need swapping too, to keep the grey, white, dark rhythm).
2. **One-line value proposition** (home hero lead and footer): "AptaCloud modernises the systems … and puts AI to work on top of them." The SEO team's guideline offers an AI-first line, "AptaCloud puts AI to work for mid-sized insurance, oil & gas, and construction firms, and modernizes the systems underneath it. We prove it on your data first.", but says to confirm it with the CEO first.
3. **Major Operators page** (Oil & Gas menu). The guidelines say major operators are not the target buyer. Keep, rewrite, or remove? Already listed in `docs/launch-checklist.md` as awaiting approval.
4. **Azure Hosting page's own button**, "Get your cloud cost review", opens the form. It isn't the menu button from item 14. Change it too?
5. **Privacy page** still names the legal entity, OTS Solutions Inc. It is a placeholder (not indexed) until the approved policy text arrives.
6. **India and UAE healthcare, banking, and manufacturing pages** come from those regions' previous websites and sit outside the three verticals. They stay unless you say otherwise.
7. **AU contact details** still show the Richardson, Texas headquarters and US numbers, awaiting AU details.

## Checks run (docs/launch-checklist.md)

| Check | AU | US | India | UAE |
|---|---|---|---|---|
| `npm run build` | Pass (53 pages) | Pass (53) | Pass (72, incl. redirects) | Pass (72) |
| `seoaudit.mjs` (titles, descriptions, H1, canonical, OG, JSON-LD) | No duplicate titles or descriptions | Same | Duplicates only on the old-URL redirect pages, as before | Same |
| `linkcheck.mjs` (every internal link and anchor) | All resolve | All resolve | All resolve | All resolve |
| `rulecheck.mjs` (content rules) | No new hits; counts identical to before the changes. The remaining hits are known and deliberate: question headings kept for search and AI answers, AWS product names such as "AWS Compute Optimizer", the managed-services pricing from the live pages, and the privacy placeholder. | Same | Same, plus the India-only out-of-vertical pages (C6) | Same, plus the UAE-only out-of-vertical pages (C6) |
| `clientfixes.mjs` (Parts A and B) | 25 pass, 0 fail | 27 pass, 0 fail | 22 pass, 0 fail | 22 pass, 0 fail |

Screenshots reviewed by eye: the AU home hero (tag, chip, ticker) at 1440px; a service hero (badge, "Delivered in clear phases") at 1440px and 390px; and on phones (390px) the Why AptaCloud cards, Typical engagement stories, "What happens next", and a process section carrying the mid-page button. No overflow or wrapping problems.
