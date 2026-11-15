# India site audit: old /in/ pages vs the new India build

Compared on 2026-11-14: all 32 pages of the live WordPress site at aptacloud.com/in/ (raw HTML, section by section) against the new India build (`region.json` = `in`, served at `/in/`).

## How the India site is built
- **Home** is rebuilt from the live /in/ home (copy in `src/data/home.ts`, composed in `src/pages/index.astro`).
- **Service, industry, and company pages** keep the shared layouts. India's SEO title and description, two-line hero, and FAQs come from each live /in/ page (`src/data/services/regional/in.ts`, applied by `getService()`).
- **Old URLs** that differ from the new routes redirect (meta refresh + canonical) via `LEGACY.in` in `astro.config.mjs`. The host should replace these with 301s at launch.
- **Blog** lists India's own posts (`IN_POSTS` in `src/data/blog.ts`), linking to aptacloud.com/in/blogs/.

## Findings and status

| # | Finding | Status |
|---|---|---|
| 1 | 14 old India URLs differ from the new routes (e.g. `/in/microsoft-365/` vs `/in/services/microsoft/microsoft-365/`), so indexed links would 404. | Fixed: redirects. |
| 2 | 23 shared pages showed AU/US heroes, SEO titles, and FAQs instead of India's. | Fixed: India SEO, hero, and FAQs on every mapped page (3 live pages had no FAQs: data engineering, managed services, about). |
| 3 | The blog listed the US articles. | Fixed: India's 10 articles. |
| 4 | Home did not follow the live India home. | Fixed: rebuilt section by section (see `src/data/home.ts`). |
| 5 | Six India pages had no page on the new site: Azure DevOps, Dynamics 365 Business Central, Microsoft Fabric, Healthcare, Banking & Financial Services, Manufacturing. | Fixed: built as India-only pages at their live URLs (`src/data/services/regional/in-pages.ts`), in the India nav (Industries gets a fourth column). Healthcare, banking, and manufacturing are outside the three brand verticals; flagged for the client. |
| 6 | Every live page repeats a mid-page "Ready toâ€¦?" banner two or three times. | Kept to one mid-page CTA (CRO rule). |
| 7 | Every live page has case studies with figures, client logos, and testimonials. | Left out (brand rules) until the client approves them; India's home uses "typical engagement" patterns instead. |
| 8 | Live copy claims "99.9% uptime", "zero downtime guarantee", "zero data loss", a hard-coded Copilot price, "one of the leadingâ€¦", and uses banned words (seamless, robust, unlock, leverage, affordable). | Rewritten without them. |
| 9 | The live Construction page's SEO title says "Banking". | Fixed in the India override. |
| 10 | The live Oil & Gas FAQ "How does AptaCloud support regulatory compliance?" carries the safety answer (a copy of the next question). | Dropped (duplicate). |
| 11 | Industry pages named US regulators on every regional site. | Fixed: India names IRDAI, DPDP Act, PNGRB, OISD, CERT-In, BOCW Act, and so on (`local()` in `layouts/industries.ts`). |

## Section mapping (live â†’ new), service pages
Every live service page follows: hero â†’ partner logos â†’ challenges â†’ services â†’ mid CTA â†’ process â†’ why AptaCloud â†’ mid CTA â†’ case studies â†’ client logos â†’ testimonials â†’ industries â†’ FAQ â†’ closing CTA. The shared layouts cover hero, challenges, services, process, why, industries, FAQ, and the closing CTA for each page, so those sections are present. The partner-logo strip is covered by the hero's tool chips and the stack section.

**Correction (2026-11-15):** a section-by-section check against each old page found the shared layouts did not cover everything. India now adds, per page and in the old page's position (`regional/in-sections.ts`): challenges (Re-engineering, Azure Hosting, Implementation, Migration, Data Engineering, Data Visualisation, Generative AI, Identity & Security, Microsoft 365, Dynamics 365, SharePoint), why AptaCloud (About, AI Agents, Re-engineering, Azure Implementation, Data Engineering, Data Visualisation, Machine Learning, Oil & Gas), outcomes (App Modernisation, Construction), and typical engagements wherever the old page has case studies. Market statistics on the old pages (for example "98% of applications") are left out.
