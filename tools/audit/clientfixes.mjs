// Client fix list check (client document "AC- AU site Fixes", 2026-11-18).
// Checks every item in that document against a built site and prints PASS / FAIL / N/A.
//
//   npm run build
//   node tools/audit/serve.mjs dist /au/ 4321          (in a second terminal; base = the region's)
//   node tools/audit/clientfixes.mjs dist              (REGION=us|au|in|uae to check another region's build)
//
// Exit code 1 if any check fails. Items that only exist on some regions' sites are N/A elsewhere.
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { chromium } from "playwright-core";
import { BASE } from "../region/base.mjs";

const dist = process.argv[2] || "dist";
const REGION = process.env.REGION || JSON.parse(await readFile(new URL("../../region.json", import.meta.url), "utf8")).region;
const origin = `http://localhost:${process.env.PORT || 4321}`;
const url = (slug = "") => `${origin}${BASE}${slug ? `${slug.replace(/^\/|\/$/g, "")}/` : ""}`;
const usAu = REGION === "us" || REGION === "au";

const results = [];
const record = (item, name, ok, detail = "") => results.push({ item, name, status: ok === null ? "N/A" : ok ? "PASS" : "FAIL", detail });

/* ── Static checks over every built HTML and JS file ───────────────────── */
async function files(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await files(p, out);
    else if (/\.(html|js)$/.test(e.name)) out.push(p);
  }
  return out;
}
const all = await files(dist);
const text = new Map(await Promise.all(all.map(async (f) => [f, await readFile(f, "utf8")])));
// Real pages only: old URLs on the India and UAE sites are redirect stubs (meta refresh, no footer).
const pages = [...text.keys()].filter((f) => f.endsWith("index.html") && !/http-equiv="refresh"/i.test(text.get(f)));
const rel = (f) => f.slice(dist.length + 1).replace(/\\/g, "/");
const where = (re) => [...text].filter(([, t]) => re.test(t)).map(([f]) => f.slice(dist.length + 1).replace(/\\/g, "/"));
const absent = (item, name, re) => {
  const hits = where(re);
  record(item, name, hits.length === 0, hits.length ? `found in ${hits.slice(0, 5).join(", ")}${hits.length > 5 ? ` (+${hits.length - 5})` : ""}` : "");
};

// 1. TPA = third-party administrators (slug kept).
absent("1", 'No "Third Party Adjusters" / "third-party adjusters" anywhere', /third[\s-]party adjusters?/i);
const tpa = text.get(join(dist, "industry", "insurance", "third-party-adjusters", "index.html")) || "";
const h1 = (tpa.match(/<h1[\s\S]*?<\/h1>/i) || [""])[0].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
record("1", "TPA page title tag names Third-Party Administrators", /<title>[^<]*Third-Party Administrators/.test(tpa));
record("1", "TPA page H1 names third-party administrators", /third-party administrators/i.test(h1), h1.trim());
record("1", "TPA page lead names third-party administrators (TPAs)", /helps third-party administrators \(TPAs\)/.test(tpa));
record("1", "Nav lists Third-Party Administrators (TPA)", where(/Third-Party Administrators \(TPA\)/).length > 0);

// 2. Homepage numbers H2 (US home).
absent("2", 'No "Microsoft-first delivery" heading', /Microsoft-first delivery/);
absent("2", 'No "from Texas to the world"', /from Texas to the world/);
record(
  "2",
  'US home H2 reads "Senior AI and cloud specialists, headquartered in Richardson, Texas."',
  REGION === "us" ? /Senior AI and cloud specialists, headquartered in Richardson, Texas\./.test(text.get(join(dist, "index.html")) || "") : null,
);

// 3. Stat label.
absent("3", 'No "under one roof" anywhere', /under one roof/i);
record("3", 'Home stat reads "200+ engineers, delivering from 4 locations."', REGION === "us" ? null : where(/200\+ engineers, delivering from 4 locations\./).length > 0);

// 4. Footer tagline.
absent("4", 'No "Microsoft first, and proven on your data."', /Microsoft first, and proven on your data/);
const noTagline = pages.filter((f) => !/<footer[\s\S]*See it work\. Then scale it\.[\s\S]*<\/footer>/.test(text.get(f)));
record("4", `Every page footer reads "See it work. Then scale it." (${pages.length} pages)`, noTagline.length === 0, noTagline.slice(0, 5).map(rel).join(", "));

// 5. About page section heading.
absent("5", 'No "Microsoft, at the centre of what we do."', /Microsoft, at the cent(re|er) of what we do/);
record("5", 'About page shows the heading "What we do."', />\s*What we do\.\s*</.test(text.get(join(dist, "about-us", "index.html")) || "") || /What we do\./.test(text.get(join(dist, "about-us", "index.html")) || ""));

// Same-pattern fixes beyond the list (see docs/client-fixes-2026-11-18.md, "Same issues elsewhere").
absent("P1", 'No Microsoft-led wording ("Microsoft-first", "Microsoft first", "Microsoft leads", "Microsoft-centric", "Microsoft cloud and AI")', /Microsoft[- ]first|Microsoft leads|Microsoft-centric|Microsoft cloud(,| and) (data|AI)/i);
absent("P2", 'No "Delivered in six phases" (process sections run four to six stages)', /Delivered in six phases/);
absent("P3", 'Current product names: no "Yammer", no "Azure Active Directory" except as "formerly…"', /Yammer|(?<![Ff]ormerly )Azure Active Directory/);
{
  const t = (f) => ((text.get(f) || "").match(/<title>([^<]*)<\/title>/) || [, ""])[1];
  const msTitles = pages.filter((f) => /^(About )?AptaCloud[^|]*\| Microsoft/.test(t(f))).map(rel);
  record("P4", "No home or About title tag leads with Microsoft", msTitles.length === 0, msTitles.join(", "));
}

// 17. Footer "Microsoft Azure" link (US and AU).
const footerAzure = (f) => ((text.get(f) || "").match(/<footer[\s\S]*?<\/footer>/) || [""])[0].match(/href="([^"]*)"[^>]*>\s*Microsoft Azure\s*</);
const fa = footerAzure(join(dist, "index.html"));
record("17", "Footer Microsoft Azure link goes to Azure Optimisation", usAu ? !!fa && /\/azure-optimization\/$/.test(fa[1]) : null, fa ? fa[1] : "link not found");

/* ── Browser checks (needs the build served at the region's base) ───────── */
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const desk = await b.newPage({ viewport: { width: 1440, height: 900 } });

async function servicesPromo(slug, tabName) {
  await desk.goto(url(slug), { waitUntil: "networkidle" });
  const services = desk.locator('button[id$="-services-trigger"]').first();
  await services.hover();
  await desk.waitForTimeout(300);
  if ((await services.getAttribute("aria-expanded")) !== "true") await services.click();
  if (tabName) await desk.getByRole("tab", { name: tabName, exact: true }).first().click();
  await desk.waitForTimeout(400);
  return desk.evaluate(() =>
    [...document.querySelectorAll("nav a")]
      .filter((a) => a.offsetParent && a.getBoundingClientRect().height > 0)
      .map((a) => ({ text: a.innerText.trim().replace(/\s+/g, " "), href: a.getAttribute("href") || "" })),
  );
}

// 14. Azure menu button.
if (usAu) {
  const links = await servicesPromo("data-engineering", "Azure Cloud");
  const btn = links.find((l) => /Explore Azure optimi[sz]ation/.test(l.text));
  record("14", 'Azure menu button reads "Explore Azure optimisation" and opens the Azure Optimisation page', !!btn && /\/azure-optimization\/$/.test(btn.href), btn ? `${btn.text} -> ${btn.href}` : links.map((l) => l.text).join(" | "));
  record("14", 'No "Get your cloud cost review" in the menu', !links.some((l) => /Get your cloud cost review/.test(l.text)));
} else {
  record("14", "Azure menu button", null, "not on this region's menu");
}

// 15. Services menu button off the homepage. (India and UAE: their "See how we work" button had the
// same problem, jumping to the homepage, so the same rule applies there.)
{
  const homeLabel = usAu ? "See what the workshop covers" : "See how we work";
  // The menu opens on the current page's category, so pick the AI tab (where this button lives).
  const off = await servicesPromo("data-engineering", usAu ? "Artificial Intelligence" : "AI");
  const book = off.find((l) => l.text === "Book your AI assessment");
  record("15", 'Off the homepage, the Services menu button reads "Book your AI assessment" and opens the form on the same page', !!book && book.href === "#contact", book ? book.href : off.map((l) => l.text).join(" | "));
  record("15", `Off the homepage, no "${homeLabel}" in the menu`, !off.some((l) => l.text.includes(homeLabel)));
  const on = await servicesPromo("", usAu ? "Artificial Intelligence" : "AI");
  record("15", "On the homepage, the Services menu button is unchanged", on.some((l) => l.text.includes(homeLabel)));
}

// 16. US homepage hero, second button.
if (REGION === "us") {
  await desk.goto(url(), { waitUntil: "networkidle" });
  const r = await desk.evaluate(() => {
    const hero = document.querySelector("#top");
    const a = [...(hero?.querySelectorAll("a") || [])].find((x) => /See how we work/.test(x.textContent || ""));
    const target = a && document.querySelector(a.getAttribute("href"));
    return { found: !!a, href: a?.getAttribute("href"), heading: target?.querySelector("h2")?.textContent?.trim(), old: /Explore the Microsoft platform/.test(hero?.textContent || "") };
  });
  record("16", 'Hero second button reads "See how we work" and links to the Why AptaCloud section', r.found && r.href === "#why" && !!r.heading, `${r.href} -> ${r.heading ?? "no section"}`);
  record("16", 'No "Explore the Microsoft platform"', !r.old);
} else {
  record("16", "US homepage hero second button", null, "US home only");
}

// 18. Mid-page button on service pages: after the first "Typical engagement" or process section.
const slugs = pages
  .map((f) => f.slice(dist.length + 1).replace(/\\/g, "/").replace(/\/?index\.html$/, ""))
  .filter((s) => s && !/^(404|privacy|blog\/.+|blogs\/.+)$/.test(s) && /<section[^>]+id="process"|Typical engagement/.test(text.get(join(dist, s, "index.html")) || ""));
const bad18 = [];
let checked18 = 0;
for (const slug of slugs) {
  await desk.goto(url(slug), { waitUntil: "domcontentloaded" });
  const r = await desk.evaluate(() => {
    const secs = [...document.querySelectorAll("main section")].filter((s) => !s.parentElement.closest("main section"));
    const proof = secs.findIndex((s) => s.id === "process" || /Typical engagement/.test(s.textContent || ""));
    const mid = secs.findIndex(
      (s, i) => i > 0 && s.id !== "contact" && // Not the quiet "Let's talk" text links on later banners, nor the FAQ's "Go to the form" helper.
        [...s.querySelectorAll('a[href="#contact"]')].some((a) => !/let.s talk|go to the form/i.test(a.textContent || "")),
    );
    return { proof, mid, ids: secs.map((s) => s.id) };
  });
  if (r.proof < 0) continue;
  checked18++;
  if (r.mid >= 0 && r.mid < r.proof) bad18.push(`${slug} (button in #${r.ids[r.mid]}, proof in #${r.ids[r.proof]})`);
}
record("18", `Mid-page button never sits before the first Typical engagement or process section (${checked18} pages)`, bad18.length === 0, bad18.join("; "));

// 19. Phones: full text in Why AptaCloud cards, Typical engagement stories, and "What happens next".
const phone = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const phonePages = ["", ...slugs.slice(0, 12)];
const bad19 = [];
for (const slug of phonePages) {
  await phone.goto(url(slug), { waitUntil: "networkidle" });
  const r = await phone.evaluate(() => {
    const visible = (el) => getComputedStyle(el).display !== "none" && el.getBoundingClientRect().height > 0;
    const sections = [...document.querySelectorAll("section")].filter(
      (s) => s.closest("[data-full-text]") && (s.id === "why" || s.id === "why-us" || /Why AptaCloud|Typical engagement|Why .*AptaCloud/i.test(s.textContent || "")),
    );
    const readMore = sections.flatMap((s) => [...s.querySelectorAll("label")].filter((l) => /Read more/.test(l.textContent || "") && visible(l)).map(() => s.id || "?"));
    const clamped = sections.flatMap((s) => [...s.querySelectorAll("p")].filter((p) => getComputedStyle(p).webkitLineClamp === "2").map(() => s.id || "?"));
    const contact = document.querySelector("#contact");
    const nextTitle = [...(contact?.querySelectorAll("p") || [])].find((p) => p.textContent === "What happens next");
    const nextHidden = nextTitle ? [...nextTitle.parentElement.querySelectorAll("li p")].filter((p) => !visible(p)).length : -1;
    const whySections = [...document.querySelectorAll("section")].filter((s) => s.id === "why" || s.id === "why-us" || /Typical engagement/.test(s.textContent || ""));
    const unmarked = whySections.filter((s) => !s.closest("[data-full-text]")).map((s) => s.id || "?");
    return { readMore, clamped, nextHidden, unmarked };
  });
  const name = slug || "home";
  if (r.readMore.length) bad19.push(`${name}: "Read more" in ${r.readMore.join(",")}`);
  if (r.clamped.length) bad19.push(`${name}: clamped text in ${r.clamped.join(",")}`);
  if (r.nextHidden > 0) bad19.push(`${name}: ${r.nextHidden} "What happens next" lines hidden`);
  if (r.unmarked.length) bad19.push(`${name}: section without full text: ${r.unmarked.join(",")}`);
}
record("19", `Phones show full text in Why AptaCloud, Typical engagement, and What happens next (${phonePages.length} pages at 390px)`, bad19.length === 0, bad19.join("; "));

await b.close();

/* ── Report ───────────────────────────────────────────────────────────── */
console.log(`\nClient fix list check, region ${REGION}, ${pages.length} pages\n`);
for (const r of results) console.log(`${r.status.padEnd(4)}  #${r.item.padEnd(3)} ${r.name}${r.detail ? `\n            ${r.detail}` : ""}`);
const fails = results.filter((r) => r.status === "FAIL").length;
console.log(`\n${results.filter((r) => r.status === "PASS").length} passed, ${fails} failed, ${results.filter((r) => r.status === "N/A").length} not applicable to this region`);
process.exit(fails ? 1 : 0);
