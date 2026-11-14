# UAE site audit: old /uae/ pages vs the new UAE build

Compared on 2026-11-14: all 32 pages of the live WordPress site at aptacloud.com/uae/ (raw HTML, section by section) against the new UAE build (`region.json` = `uae`, served at `/uae/`). Same method as `docs/india-audit.md`.

## How the UAE site is built
- **Home** is rebuilt from the live /uae/ home: hero, about, eight services, a five-step process with a pilot, why, UAE rules and Azure regions (UaeHub), partners, typical engagements, six industries, FAQ, contact (`src/data/home.ts`, composed in `src/pages/index.astro`).
- **Shared pages** carry the UAE's SEO, two-line hero, and FAQs from each live page (`src/data/services/regional/uae.ts`).
- **UAE-only pages**, built from the UAE's own live pages (different from India's): Azure DevOps, Dynamics 365 Business Central, Microsoft Fabric, Healthcare, Financial Services (`/uae/financial-services/`), Manufacturing (`src/data/services/regional/uae-pages.ts`).
- **Old URLs** redirect as on India (`LEGACY_REGIONAL` in `astro.config.mjs`).
- **Blog** lists the UAE's own posts (`UAE_POSTS` in `src/data/blog.ts`).

## Findings and status

| # | Finding | Status |
|---|---|---|
| 1 | 14 old UAE URLs differ from the new routes. | Fixed: redirects. |
| 2 | Shared pages showed AU/US heroes, SEO, and FAQs. | Fixed: UAE copy on every mapped page. |
| 3 | Six UAE pages had no page on the new site. | Fixed: built from the UAE pages' own sections (not India's). |
| 4 | The live home lists a Richardson, Texas address under "Aptacloud (UAE)" and an Indian phone number. | Kept the contact details (no UAE office exists) but labelled the address "Global headquarters". **Client to supply a UAE address or number if one exists.** |
| 5 | Live copy uses unsourced statistics: Fabric's "81% / 48% / 94%" dark-data figures and "lose over 1 hour daily… 17%", Manufacturing's "improve efficiency by 30%", Oil & Gas's "cut downtime by 50% and costs by up to 40%", Systems Re-engineering's "64% of the UAE's workforce using AI", Legacy Modernisation's "2-3x faster". | Left out (no unapproved metrics). |
| 6 | Live copy claims "99.9% uptime", "zero downtime", USD consulting rates, and access to "exclusive rebate programs like CSP and EIF". | Left out. |
| 7 | Live Generative AI hero: "Your Business is Either Using AI OR Slowly Dying!" | Replaced with a plain, benefit-led headline. |
| 8 | Live Fabric page has an unedited heading: "…Holding UAE Businesses Back Sample Design Suggestions". | Fixed. |
| 9 | Live Dynamics 365 hero has a missing word: "Automate Your with Unified Microsoft Dynamics 365 ERP!" | Fixed. |
| 10 | Live Healthcare page names NetSuite. | Removed (brand rule). |
| 11 | The UAE blog contains WordPress's "hello world" post and a Business Central post written for India; a "cloud server in UAE" post is listed without a working link. | The two are left out; the third needs its URL from the client. |
| 12 | Every live page has case studies with figures, client logos, and testimonials. | Left out (brand rules); shown as typical engagements. |
| 13 | Every live page repeats mid-page "Ready to…?" banners. | One mid-page CTA per page. |
| 14 | The live trust strip and "Why UAE businesses trust AptaCloud" repeat each other; compliance appears in both and in the FAQ. | Merged: one "Why" section; compliance lives in the UAE rules section. |
| 15 | Healthcare, financial services, manufacturing, retail, and IT/SaaS are outside the three brand verticals. | Built from the live UAE site; flagged for the client. |
