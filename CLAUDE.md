# AptaCloud site

Full handover (rules, architecture, audits, open items): **SUMMARY.md**. Launch status: `docs/launch-checklist.md`. Design bugs: `docs/design-audit.md`.

Astro 7 + React 19 islands, Tailwind v4 + CSS Modules, static build to GitHub Pages under `/au` (repo `au`).
Dev: `npm run dev -- --port 4321` → http://localhost:4321/au/ · Check: `npx tsc --noEmit`, `npm run build`.

**Regions:** one codebase, four repos (US at `/`, AU `/au`, IN `/in`, UAE `/uae`). `region.json` picks the region; all regional data is in `src/brand/regions.ts`; US spelling is applied at build time. This repo is the upstream and stays `"au"`. See SUMMARY.md §1. US is deliberately not an AU replica: its own photos for every shared one (`src/brand/us-photos.json`, swapped by `data/services/region-photos.ts`; never reuse an AU/IN/UAE photo or shoot), its own home sections (`components/site/us/`), and a framed photo hero on service pages (`ServiceHero` `.framed`).

## Where things live
- `src/brand/brand.ts` — name, colours, contact, `PRIMARY_CTA`, `TRUST`, `asset()` (always wrap paths), `home("#x")` for home anchors.
- `src/pages/index.astro` — home (sections in `src/components/site/`). `src/pages/[...slug].astro` — every service, industry, and company page (50 routes).
- `src/data/services/` — all service-page copy (`ai.ts`, `data.ts`, `appmod.ts`, `shared.ts`); `extras.ts` sets each page's section order (mirrors the live site) + benefits / use cases / frameworks / assessment. Backgrounds follow the home rhythm grey → white → dark (`homeRhythm` in `components/service/tone.ts`); inner panels use `var(--card)` / `var(--bg)` so they contrast on any tone. `src/data/tech.ts` — logo registry.
- `src/data/services/layouts/` — rebuilt pages: every live-page section in live order as typed blocks (cards, banner, split, rows, steps, cases, quotes, logos, statement, tabs, hub, map, pipeline, plans, layers, spectrum, phases, ledger, focus, posts, people, offices, events, papers, blog, industries, faq). Industry pages: `industries.ts` + `layouts/industries.ts`; Company pages (about-us, careers, blog, whitepaper, events): `company.ts` + `layouts/company.ts`, category "company" (no hero console, stats optional). Blog posts: `src/data/blog.ts`, rendered by `components/service/blocks/`. Azure service icons (official architecture set) live in `public/images/azure/`, registered in `src/data/tech.ts`. Stats strip always sits under the hero. Pages without a layout still use the old extras.ts template.
- `src/components/service/` — service-page sections; `src/layouts/Site.astro` wraps Nav + Footer.
- `docs/home-page-review.md`, `docs/service-pages-review.md` — decisions and open items for the SEO reviewer.

## Rules (from AptaCloud Brand + Content Writing Guidelines v2.0)
- "AptaCloud" only. Australian spelling in copy, US spelling in URLs. Oxford comma. No em dashes.
- Banned: seamless, end-to-end, robust, cutting-edge, leverage, unlock, revolutionise, "free", "Contact us", "Book now", superlatives.
- One primary CTA per page, POC-led. No unapproved metrics, case studies or partner claims. No NetSuite. Positioning order: AI, then modernization, then data and Azure, then the Microsoft stack. Microsoft is a credential, not the headline.
- SEO-team skills (from Downloads `aptacloud-content*.skill`): no rhetorical questions; segment pages name the matrix buyer and map only that segment's services; proof = "typical engagement" (client-pattern, no figures, no client names) until RWLS/Warrikal are approved; no testimonials or client logos.
- CRO (template rule in `[...slug].astro`): nav "Let's talk"; primary CTA in hero, once mid-page (pricing/assessment, else first banner/cta block via `ctaFor`), and the form. Later banners get a "Let's talk" text link. Never two identical buttons in one section.
- Verticals only: Insurance, Oil & Gas, Engineering & Construction.

## Design rules
- Match the home page system: pill tags, 24px cards, mono labels, scroll word-fill headings, `<Reveal>`.
- Type scale (service CSS): 12/13/14/15/16/18/20/22/26/28/32 + heading tiers; section H2 48/40/28; no half-pixel sizes. Card padding 24 or 28. Verify with `tools/audit/` (see SUMMARY.md §7).
- Labels use Inter (600, sentence case), never mono uppercase micro-labels; mono only in the hero ticker (as on home).
- No accent "border line" hover effects (user dislikes them).
- Cards stay clean and flat like home: white cards on light sections, surface cards on dark, photos above text (no dark overlays, glows or gradient cards). Hero glow/grid only. Numbers only where order matters (process).
- Sub-page hero title is always two lines (title, then the red accent tail); size scales to the longer line. Phones may wrap.
- Phones: no sideways swiping. Card groups (`sec.rail`) become a 2-column grid, an odd last card spans the row, and heavy cards (case studies, plans, offices, layered lists) use `sec.stack` for one column. Card copy goes through `ui/ReadMore` (2 lines + "Read more" on phones, full text on desktop). Owner, 2026-11-03. Exceptions (client, 2026-11-18): Why AptaCloud cards, Typical engagement stories, and the form's "What happens next" steps show full text on phones (`data-full-text` on the section).
- Client fix list 2026-11-18 (`docs/client-fixes-2026-11-18.md`): change only what it lists; don't restructure sections, rewrite copy, or change design around it.
- AI expertise shows GPT, Claude, Gemini, Grok, Llama logos (`public/images/ai/`).
