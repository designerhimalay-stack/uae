// node tools/audit/rulecheck.mjs <distDir> <region> [out.json]
// Checks every built page against the client's content rules (aptacloud-content
// and aptacloud-content-audit skills, Brand Guidelines v2.0):
//   em dashes Â· rhetorical questions (question marks outside FAQs) Â· banned and
//   filler words Â· unsourced statistics (anything beyond the approved credentials)
//   Â· wrong product names (Azure AD, D365) Â· other OTS brands Â· NetSuite Â·
//   out-of-vertical industries Â· CTA wording Â· spelling for the region Â·
//   schema (FAQPage when FAQs show, BreadcrumbList on sub-pages, Organization).
// Prints a per-rule summary; the JSON holds every hit with its context.
import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [dist, region, out] = process.argv.slice(2);
const walk = (d, rel = "") => readdirSync(d).flatMap((f) => {
  const p = join(d, f), r = rel ? `${rel}/${f}` : f;
  if ([".git", "_astro", "images", "fonts"].includes(f)) return [];
  return statSync(p).isDirectory() ? walk(p, r) : f === "index.html" ? [rel || "/"] : [];
});

const decode = (s) => s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;|&rsquo;|&#8217;/g, "'").replace(/&quot;/g, '"').replace(/&nbsp;/g, " ").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&mdash;/g, "â€”").replace(/&ndash;/g, "â€“").replace(/&[a-z#0-9]+;/g, " ");
const strip = (h) => h.replace(/<(script|style|svg|noscript|template)\b[\s\S]*?<\/\1>/g, " ").replace(/<[^>]*aria-hidden="true"[^>]*>[\s\S]*?<\/[a-z]+>/g, " ");
const text = (h) => decode(strip(h).replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();
const ctx = (s, i, n = 60) => s.slice(Math.max(0, i - n), i + n).trim();

// Approved credentials (Content Guidelines): the only figures allowed without a named source.
const APPROVED = /^(20\+|300\+|200\+|4|24\/7|100%)$/;
const RULES = {
  emDash: /â€”|\sâ€“\s/g,
  banned: /\b(seamless(ly)?|end-to-end|robust|cutting[- ]edge|leverag(e|es|ed|ing)|unlock(s|ed|ing)?|revolutioni[sz]\w*|game[- ]chang\w*|world[- ]class|best[- ]in[- ]class|industry[- ]leading|state[- ]of[- ]the[- ]art|top[- ]notch|unparalleled|unmatched|next[- ]gen\w*|synerg\w*|one[- ]stop[- ]shop|in today's|it's no secret|at the end of the day|free (call|consultation|audit|assessment|demo|trial|guide)|contact us|book now|get started today|know more|the leading|a leading|the best)\b/gi,
  productName: /\b(Azure AD|D365|Azure Active Directory)\b/g,
  otsBrand: /\b(JumpGrowth|AptaBook|ClockSocial|OTS Solutions)\b/gi,
  netsuite: /\bNetSuite\b/gi,
  outOfVertical: /\b(healthcare|hospitals?|clinics?|patients?|retail(ers?)?|banking|banks?|pharma\w*|manufactur\w*|logistics|e-?commerce|telecom\w*|fintech|lending)\b/gi,
};
const STAT = /(\$\s?\d[\d,.]*\s?(k|m|b|million|billion)?|\b\d+(\.\d+)?\s?%|\b\d+(\.\d+)?x\b|\b\d+\+)/gi;
const AU_US = /\b(optimiz|organiz|prioritiz|moderniz|customiz|centraliz|standardiz|utiliz|visualiz|minimiz|maximiz|analyz|authoriz|recogniz|specializ|digitiz|operationaliz)\w*/gi;
const US_AU = /\b((optimis|organis|prioritis|modernis|customis|centralis|standardis|utilis|visualis|minimis|maximis|authoris|recognis|digitis|operationalis)\w*|analys(e|ed|es|ing)|specialis(e|ed|es|ing|ation))\b/gi;

const hits = [];
const add = (page, rule, detail) => hits.push({ page, rule, detail });

for (const page of walk(dist)) {
  const html = readFileSync(join(dist, page === "/" ? "" : page, "index.html"), "utf8");
  if (/http-equiv="refresh"/i.test(html.slice(0, 2000)) && html.length < 4000) continue;
  // Nav and footer are the same on every page: check them on the home page only.
  const main = page === "/" ? html : html.replace(/<header\b[\s\S]*?<\/header>/g, " ").replace(/<nav\b[\s\S]*?<\/nav>/g, " ").replace(/<footer\b[\s\S]*?<\/footer>/g, " ");
  const body = (main.match(/<body[\s\S]*<\/body>/) || [main])[0];
  const t = text(body);

  for (const [rule, re] of Object.entries(RULES)) {
    for (const m of t.matchAll(re)) {
      if (rule === "productName" && /formerly Azure Active Directory|formerly Azure AD/i.test(ctx(t, m.index, 40))) continue;
      add(page, rule, `${m[0]} :: ${ctx(t, m.index)}`);
    }
  }
  for (const m of t.matchAll(STAT)) {
    const v = m[0].trim();
    if (APPROVED.test(v)) continue;
    add(page, "statistic", `${v} :: ${ctx(t, m.index)}`);
  }
  const spell = region === "us" ? US_AU : AU_US;
  for (const m of t.matchAll(spell)) add(page, "spelling", `${m[0]} :: ${ctx(t, m.index, 40)}`);

  // Question marks outside the FAQ: rhetorical unless the section answers them (judge by hand).
  const noFaq = body.replace(/<section\b[^>]*id="faq"[\s\S]*?<\/section>/g, " ").replace(/<details\b[\s\S]*?<\/details>/g, " ");
  for (const m of noFaq.matchAll(/<(h[1-6]|p|span|a|button|li|strong)\b[^>]*>([^<]*\?)\s*</g)) add(page, "question", `<${m[1]}> ${decode(m[2]).trim()}`);

  // CTA labels.
  for (const m of body.matchAll(/<(a|button)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    const label = text(m[2]);
    if (/^(contact us|book now|get started( today)?|know more|learn more|read more about us|submit|click here)$/i.test(label)) add(page, "ctaLabel", label);
  }

  // Schema.
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]).join(" ");
  const hasFaq = /id="faq"/.test(html);
  if (hasFaq && !/"FAQPage"/.test(ld)) add(page, "schema", "FAQ section without FAQPage schema");
  if (page !== "/" && !/"BreadcrumbList"/.test(ld)) add(page, "schema", "no BreadcrumbList");
  if (!/"Organization"/.test(ld)) add(page, "schema", "no Organization");
  if (/OTS Solutions|JumpGrowth/i.test(ld)) add(page, "schema", "OTS brand in JSON-LD");
}

if (out) writeFileSync(out, JSON.stringify(hits, null, 1));
const by = {};
for (const h of hits) (by[h.rule] ??= new Set()).add(h.page);
console.log(`${region}: ${walk(dist).length} pages`);
for (const [rule, pages] of Object.entries(by)) console.log(`  ${rule}: ${hits.filter((h) => h.rule === rule).length} hits on ${pages.size} pages`);
