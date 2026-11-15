// node tools/audit/sectioncheck.mjs <region> <distDir> <cacheDir> <out.json>   (run from the project dir)
// Classifies every top-level section of each region's own live page (US/AU:
// aptacloud.com, IN: /in/, UAE: /uae/) and every one of our sections by type,
// then lists the types the live page has and ours lacks, with the live text.
// Live pages are fetched once into <cacheDir>. Industry pages flag "INDUSTRY"
// for their solutions sections; CTA strips, testimonials and logos are ignored.
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { createRequire } from "node:module";
const require = createRequire(process.cwd() + "/package.json");
const { chromium } = require("playwright-core");

const [region, dist, cache, out] = process.argv.slice(2);
mkdirSync(cache, { recursive: true });

// Our slug → the old regional WordPress slug (mirrors LEGACY_REGIONAL in astro.config.mjs).
const LEGACY = {
  "services/microsoft/microsoft-365": "microsoft-365", "services/microsoft/teams": "microsoft-teams",
  "services/microsoft/identity-security": "identity-security", "services/microsoft/copilot-studio": "microsoft-copilot",
  "services/microsoft/sharepoint": "microsoft-sharepoint", "services/microsoft/microsoft-dynamics-365": "microsoft-dynamics-365",
  "data-visualization": "business-intelligence-visualization", "application-re-engineering": "systems-re-engineering",
  "legacy-application-migration": "legacy-migration", "application-modernization": "legacy-modernization",
  "industry/insurance": "insurance", "industry/oil-gas": "oil-gas",
  "industry/engineering-and-construction/construction": "construction", blog: "blogs",
};
const liveUrl = (slug) =>
  region === "in" || region === "uae" ? `https://aptacloud.com/${region}/${LEGACY[slug] ?? slug}/` : `https://aptacloud.com/${slug}/`;

const LIVE_TYPES = [
  ["QUOTES", /testimonial|what our clients|clients? say|trusted by|brands that trust|customers feedback|our partners$/i],
  ["FAQ", /faq|frequently|everything you need to know|questions/i],
  ["CTA", /^(ready|start|book|schedule|request|let'?s|want |looking for|finding|get (a|your|an)|take the next|don'?t let|are you ready|curious|overwhelmed|transform your|build a strong|move beyond|your next stage|turn your data|empower your|unlock|improve roi|enhance collaboration)/i],
  ["CASES", /case stud|recent project|real story|success stor|transformation stories|real-world results/i],
  ["CHALLENGE", /challeng|slowing|hurdle|problem|struggl|pain|why .*(need|matters|moving)|what does this mean|without automation|fragmented/i],
  ["USECASE", /use case/i],
  ["PROCESS", /process|framework|execution model|how .* work|steps|methodolog|journey/i],
  ["WHY", /why|trust|advantage|strengths|trusted partner|choose aptacloud|we are experts/i],
  ["INDUSTRY", /industr|sector/i],
  ["BENEFIT", /benefit|what changes|value/i],
  ["SERVICES", /service|solution|offer|what we do|capabilit|everything you need to power|consulting/i],
  ["TECH", /technolog|tools|stack|backed by|platform/i],
];
const OUR_TYPES = [
  ["CHALLENGE", /^(challenges|pains|problems)/], ["WHY", /^(why-us|why|advantage|strengths)$/], ["CASES", /^(case-studies|engagements|cases)/],
  ["SERVICES", /^(services|solutions|what-we-do|offerings|builders|deploy|products|support|ecosystem|deep-dive)/], ["PROCESS", /^(process|approach|steps|roadmap)/],
  ["BENEFIT", /^benefits/], ["INDUSTRY", /^(industries|by-industry)/], ["FAQ", /^faq/], ["USECASE", /^use-cases/], ["TECH", /^(tools|tech-stack|stack|platform)/],
];
const type = (list, s) => (list.find(([, re]) => re.test(s)) || ["OTHER"])[0];
const text = (s) => s.replace(/<(script|style|svg)[\s\S]*?<\/\1>/g, " ").replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&#8217;|&rsquo;/g, "'").replace(/&[a-z#0-9]+;/g, " ").replace(/\s+/g, " ").trim();
const walk = (d, rel = "") => readdirSync(d).flatMap((f) => {
  const p = join(d, f), r = rel ? `${rel}/${f}` : f;
  if ([".git", "_astro", "images"].includes(f)) return [];
  return statSync(p).isDirectory() ? walk(p, r) : f === "index.html" && rel ? [rel] : [];
});

const browser = await chromium.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const ctx = await browser.newContext({ javaScriptEnabled: false });
async function liveSections(h) {
  const p = await ctx.newPage();
  await p.route("**/*", (r) => (r.request().resourceType() === "document" ? r.continue() : r.abort()));
  await p.setContent(h, { waitUntil: "domcontentloaded" });
  const secs = await p.evaluate(() => {
    const clean = (s) => (s || "").replace(/\s+/g, " ").trim();
    const root = document.querySelector("[data-elementor-type='wp-page'], [data-elementor-type='single-page'], [data-elementor-type='single-post'], [data-elementor-type='single'], main") || document.body;
    const tops = [...root.querySelectorAll(":scope > .elementor-section, :scope > .e-con, :scope > section, :scope > div > .elementor-section, :scope > div > .e-con")];
    return tops.map((sec) => {
      const h = sec.querySelector("h1, h2") || sec.querySelector("h3");
      const parts = [...sec.querySelectorAll("h2,h3,h4,p,li,.elementor-icon-box-title,.elementor-icon-box-description,.elementor-image-box-title,.elementor-image-box-description,.elementor-flip-box__layer__title,.elementor-flip-box__layer__description")].map((e) => (e.tagName.match(/^H\d$/) ? `[${e.tagName.toLowerCase()}] ` : "") + clean(e.textContent)).filter((t) => t.length > 1);
      return { head: clean(h?.textContent), body: [...new Set(parts)].join(" \n").slice(0, 2500) };
    }).filter((s) => s.head);
  });
  await p.close();
  return secs.slice(1); // the first section is the hero
}

const report = [];
for (const slug of walk(dist).filter((s) => !/^(privacy|blog\/.+)$/.test(s))) {
  const ours = readFileSync(join(dist, slug, "index.html"), "utf8");
  if (/http-equiv="refresh"/i.test(ours.slice(0, 2000)) && ours.length < 4000) continue;
  const f = join(cache, slug.replace(/\//g, "__") + ".html");
  if (!existsSync(f)) {
    const r = await fetch(liveUrl(slug), { headers: { "user-agent": "Mozilla/5.0" }, redirect: "manual" }).catch(() => null);
    writeFileSync(f, r?.status === 200 ? await r.text() : "404");
  }
  if (readFileSync(f, "utf8") === "404") continue;
  const live = (await liveSections(readFileSync(f, "utf8"))).map((s) => ({ ...s, type: type(LIVE_TYPES, s.head) }));
  const ourIds = [...ours.matchAll(/<section\b[^>]*\bid="([^"]+)"/g)].map((m) => m[1]).filter((id) => !["top", "numbers", "contact"].includes(id));
  const have = new Set(ourIds.map((id) => type(OUR_TYPES, id)));
  const missing = live.filter((s) => !["QUOTES", "CTA", "OTHER", "TECH"].includes(s.type) && !have.has(s.type));
  report.push({ slug, ours: ourIds, live: live.map((s) => `${s.type}: ${s.head}`), missing });
}
await browser.close();
writeFileSync(out, JSON.stringify(report, null, 1));
for (const r of report.filter((r) => r.missing.length)) console.log(`${r.slug}: ${r.missing.map((m) => `${m.type} "${m.head.slice(0, 50)}"`).join(" | ")}`);
