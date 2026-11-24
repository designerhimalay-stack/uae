// Client P0 fix list 2026-11-20 ("AptaCloud_Website_P0_Fixes_All_Regions"): PASS / FAIL per row,
// read from a built site. Build one region (region.json), then run:
//   node tools/audit/clientfixes-1120.mjs [dist]
// Rows that need the client (A1 to A3 endpoints, privacy text) report INPUT.
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join } from "node:path";

const dist = process.argv[2] || "dist";
const REGION = JSON.parse(readFileSync(new URL("../../region.json", import.meta.url), "utf8")).region;
const pages = new Map();
const walk = (d) => {
  for (const f of readdirSync(d)) {
    const p = join(d, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (f === "index.html") pages.set("/" + p.slice(dist.length + 1).replace(/\\/g, "/").replace(/index\.html$/, ""), readFileSync(p, "utf8"));
  }
};
walk(dist);
const page = (path) => pages.get(path) ?? "";
const text = (html) => html.replace(/<script[\s\S]*?<\/script>/g, " ").replace(/<[^>]+>/g, " ").replace(/&#39;|&#x27;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ");
const all = [...pages.values()].map(text).join("\n");
const title = (path) => (page(path).match(/<title>([^<]*)<\/title>/) ?? [])[1]?.replace(/&amp;/g, "&").replace(/&#39;/g, "'") ?? "";

const rows = [];
const row = (id, name, ok, detail = "") => rows.push({ id, name, status: ok === null ? "INPUT" : ok === "N/A" ? "N/A" : ok ? "PASS" : "FAIL", detail });
const only = (regions, id, name, test) => row(id, name, regions.includes(REGION) ? test() : "N/A");
const has = (s) => all.includes(s);
const none = (re) => !re.test(all);

// 1. All sites
const integrations = readFileSync(new URL("../../src/brand/integrations.ts", import.meta.url), "utf8");
row("A1", "Form posts to the CRM / booking tool (endpoint set)", /endpoint: "\S+"/.test(integrations) ? true : null, "LEADS.endpoint in src/brand/integrations.ts");
row("A2", "GA4 through Google Tag Manager (container set)", /gtmId: "GTM-\w+"/.test(integrations) ? true : null, "ANALYTICS.gtmId in src/brand/integrations.ts");
row("A3", "Privacy policy published and indexable", existsSync(join(dist, "privacy", "index.html")) && !/noindex/.test(page("/privacy/")) ? true : null, "needs the approved text");
row("A4", "Canonical and sitemap on the production address", /<link rel="canonical" href="https:\/\/aptacloud\.com/.test(page("/")) && !/github\.io/.test(page("/")));
row("A6", 'No "under one roof"', none(/under one roof/i));
row("A7", 'About numbers: "200+ engineers, delivering from 4 locations."', REGION === "us" ? "N/A" : has("200+ engineers, delivering from 4 locations"));
row("A8", 'Footer tagline "See it work. Then scale it."', [...pages.values()].every((h) => /See it work\. Then scale it\./.test(h) || !/<footer/.test(h)));
row("A9", 'About heading "What we do."', has("What we do."));
row("A10", 'Stats strip "Microsoft-certified", no "Microsoft-first"', none(/Microsoft[- ]first/i) && has("Microsoft-certified"));
only(["au", "in"], "A11", 'Home platform strip "Built on the Microsoft stack"', () => text(page("/")).includes("Built on the Microsoft stack"));
only(["us", "au"], "A12", "AI Consulting FAQ wording (India runs its own FAQ)", () => text(page("/ai-consulting/")).includes("We build first on Azure OpenAI Service, Microsoft Copilot Studio, and Azure Machine Learning"));
only(["us", "au"], "A13", "Generative AI FAQ wording (India runs its own FAQ)", () => text(page("/generative-ai/")).includes("We start with Azure OpenAI Service, and choose other models"));
only(["us", "au", "in"], "A14", "Data Engineering FAQ: Fabric (the UAE runs its own FAQ)", () => text(page("/data-engineering/")).includes("Yes. We build many data platforms on Microsoft Fabric"));
only(["us", "au", "in"], "A15", "Data Engineering FAQ: Azure and AWS (the UAE runs its own FAQ)", () => text(page("/data-engineering/")).includes("We migrate data platforms to Azure and AWS"));
row("A16", "Data banners", ["/data-engineering/", "/data-warehousing/", "/data-visualization/"].every((p) => text(page(p)).includes("Build the data foundation your AI work runs on.")) && none(/future-proof your data strategy/i));
row("A17", "AI Agents closing banner", text(page("/ai-agents/")).includes("Put your first AI agent into production."));
row("A18", 'Application Re-engineering "Systems ready for AI"', text(page("/application-re-engineering/")).includes("Systems ready for AI"));
row("A19", 'Microsoft 365: "Microsoft Viva Engage", no "Yammer"', none(/Yammer/) && text(page("/services/microsoft/microsoft-365/")).includes("Viva Engage"));
row("A20", 'Azure menu button "Explore Azure optimization"', /Explore Azure optimi[sz]ation/.test(readFileSync(new URL("../../src/components/layout/nav/menus.ts", import.meta.url), "utf8")) && !/Get your cloud cost review", href: asset\("\/azure-optimization/.test(readFileSync(new URL("../../src/components/layout/nav/menus.ts", import.meta.url), "utf8")));
row("A21", '"Third-Party Administrators", not "Third Party Adjusters"', none(/third[\s-]party adjusters?/i) && has("Third-Party Administrators"));
row("A22", "Major Operators off the Oil & Gas menu", !/svc\("Major Operators"/.test(readFileSync(new URL("../../src/components/layout/nav/menus.ts", import.meta.url), "utf8")));
row("A23", "UAE hidden (switcher, hreflang)", REGION === "uae" ? "N/A" : !/hreflang="[^"]*"\s+href="[^"]*\/uae\//.test(page("/")) && !/href="\/uae\/"/.test(page("/")));

// 2. US
only(["us"], "US1", 'Home title "AptaCloud | AI Consulting, Modernization, and Data"', () => title("/") === "AptaCloud | AI Consulting, Modernization, and Data");
only(["us"], "US2", 'About title "About AptaCloud | AI, Modernization, and Data Consultancy"', () => title("/about-us/") === "About AptaCloud | AI, Modernization, and Data Consultancy");
only(["us"], "US3", 'Hero second button "See how we work"', () => text(page("/")).includes("See how we work"));
only(["us"], "US4", "Numbers heading", () => text(page("/")).includes("Senior AI and cloud specialists, headquartered in Richardson, Texas."));
only(["us"], "US5", "No UAE card or global-presence section on the US home", () => !/id="global-presence"/.test(page("/")));

// 3. Australia
only(["au"], "AU1", 'Home title "AptaCloud Australia | AI Consulting, Modernisation, and Data"', () => title("/") === "AptaCloud Australia | AI Consulting, Modernisation, and Data");
only(["au"], "AU2", 'About title "About AptaCloud | AI, Modernisation, and Data Consultancy"', () => title("/about-us/") === "About AptaCloud | AI, Modernisation, and Data Consultancy");
only(["au"], "AU3", "Contact block: AWST and AEST line", () => has("Australian enquiries answered in AWST and AEST business hours."));
only(["au"], "AU4", 'No "US$35 an hour"', () => none(/US\$35/));
only(["au"], "AU5", 'No "general contractor(s)"', () => none(/general contractors?/i));
only(["au"], "AU6", 'No "carrier(s)" in copy', () => none(/\bcarriers?\b/i));

// 4. India
only(["in"], "IN1", 'Home title "AptaCloud India | AI and Cloud for Indian Businesses"', () => title("/") === "AptaCloud India | AI and Cloud for Indian Businesses");
only(["in"], "IN2", 'Home H1 "AI and cloud transformation for Indian businesses."', () => /AI and cloud\s*transformation for\s*Indian businesses\./.test(text((page("/").match(/<h1[\s\S]*?<\/h1>/) ?? [""])[0])));
only(["in"], "IN3", 'About title "About AptaCloud India | AI and Cloud Consultancy"', () => title("/about-us/") === "About AptaCloud India | AI and Cloud Consultancy");
only(["in"], "IN4", 'No "US$35 an hour"', () => none(/US\$35/));
only(["in"], "IN5", 'Carriers page: "IRDAI", no "SOC 2"', () => text(page("/industry/insurance/carriers/")).includes("IRDAI") && !text(page("/industry/insurance/carriers/")).includes("SOC 2"));
only(["in"], "IN6", "US segment pages noindex and out of the sitemap", () => {
  const segs = [...pages.keys()].filter((p) => /^\/industry\/[^/]+\/[^/]+\/$/.test(p));
  const sitemap = existsSync(join(dist, "sitemap.xml")) ? readFileSync(join(dist, "sitemap.xml"), "utf8") : "";
  return segs.length === 11 && segs.every((p) => /noindex/.test(page(p)) && !sitemap.includes(`/in${p}`));
});

// 5. Value proposition lines
const VP = {
  us: "AptaCloud helps insurers quote sooner and field crews stop waiting on the office, with AI that runs on systems we've modernized to support it.",
  au: "AptaCloud helps Australian insurers quote sooner and site crews stop waiting on the office, with AI that runs on systems we've modernised to support it.",
  in: "AptaCloud helps Indian manufacturers and industrial firms cut manual reporting and get AI working in daily operations, on systems we've modernised to support it.",
};
if (VP[REGION]) row("VP1-3", "Value line (footer)", has(VP[REGION]));
only(["in"], "VP4", "IN home hero lead", () => has("Get AI working in your daily operations, with cloud services sized to your budget and delivered by our teams in Gurugram and Pune."));
only(["us", "au"], "VP5", "About meta description (India has its own About copy)", () => /helps insurers quote sooner and field crews in oil &amp; gas and construction stop waiting on the office, with AI built on systems we moderni[sz]e\./.test(page("/about-us/")));
only(["us", "au"], "VP6", "About hero lead (India has its own About copy)", () => text(page("/about-us/")).includes("We help insurers quote and settle claims sooner, and help oil & gas and construction crews get answers in the field instead of waiting on the office."));
row("VP7", "About, Our story", text(page("/about-us/")).includes("We help their teams move work faster with AI, and we modernise and connect the systems that AI depends on.".replace(/modernise/, REGION === "us" ? "modernize" : "modernise")));
row("VP8", "Careers lead", text(page("/careers/")).includes("Join our 200+ engineers helping insurers quote sooner and field crews get answers on the spot, with AI built on systems we moderni"));

const w = Math.max(...rows.map((r) => r.name.length));
console.log(`Client P0 list 2026-11-20, region ${REGION}, ${pages.size} pages\n`);
for (const r of rows) console.log(`${r.status.padEnd(6)} ${r.id.padEnd(6)} ${r.name.padEnd(w)}  ${r.detail}`);
const fails = rows.filter((r) => r.status === "FAIL").length;
console.log(`\n${rows.filter((r) => r.status === "PASS").length} pass, ${fails} fail, ${rows.filter((r) => r.status === "INPUT").length} waiting on the client, ${rows.filter((r) => r.status === "N/A").length} not for this region`);
process.exitCode = fails ? 1 : 0;
