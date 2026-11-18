// Where do the fixed construction lines (layout/ConstructionLines) show through?
// Samples points down each rule's x position over the whole page (desktop, 1440px) and
// reports the top-level section at every point where nothing opaque covers the rule.
//   node tools/audit/linesaudit.mjs <slug>...    (serve the build first; REGION picks the base)
import { chromium } from "playwright-core";
import { BASE } from "../region/base.mjs";

const slugs = process.argv.slice(2);
const b = await chromium.launch({ executablePath: process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe" });
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
let total = 0;
for (const slug of slugs) {
  await p.goto(`http://localhost:4321${BASE}${slug === "/" ? "" : `${slug}/`}`, { waitUntil: "networkidle" });
  const hits = await p.evaluate(async () => {
    const layer = [...document.querySelectorAll("body > div[aria-hidden='true']")].find((d) => getComputedStyle(d).position === "fixed");
    if (!layer || getComputedStyle(layer).display === "none") return ["no construction lines"];
    const xs = [...layer.querySelectorAll(":scope > div > div")].map((r) => r.getBoundingClientRect().left + 0.5);
    const opaque = (el) => {
      const c = getComputedStyle(el);
      return (c.backgroundColor !== "rgba(0, 0, 0, 0)" && !c.backgroundColor.endsWith(", 0)")) || c.backgroundImage !== "none";
    };
    const main = document.querySelector("main");
    const found = new Set();
    const H = document.documentElement.scrollHeight;
    for (let y0 = 0; y0 < H; y0 += 600) {
      window.scrollTo(0, y0);
      await new Promise((r) => setTimeout(r, 30));
      for (let dy = 20; dy < 600; dy += 40) {
        for (const x of xs) {
          let el = document.elementFromPoint(x, dy);
          if (!el || el.closest("nav, header, footer")) continue;
          let covered = false;
          for (let e = el; e && e !== document.body && e !== document.documentElement; e = e.parentElement) {
            if (opaque(e)) { covered = true; break; }
          }
          if (!covered) {
            let top = el; while (top.parentElement && top.parentElement !== main && top.parentElement !== document.body) top = top.parentElement;
            const sec = top.querySelector?.("section") && top.tagName !== "SECTION" ? top.querySelector("section") : top;
            found.add(`${sec.tagName.toLowerCase()}#${sec.id || "?"}`);
          }
        }
      }
    }
    return [...found];
  });
  total += hits.length;
  console.log(`${hits.length ? "LINES " : "clean "} ${slug}${hits.length ? `  ${hits.join(", ")}` : ""}`);
}
console.log(`\n${total ? `${total} section(s) show the lines` : "No section shows the construction lines"}`);
await b.close();
