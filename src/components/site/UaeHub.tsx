// AptaCloud UAE (UAE home only), in the slot the US site gives to Global
// presence. The old /uae/ site sold on local compliance (PDPL, FTA, WPS) with
// no UAE office, so this section is about the rules and where data lives:
// HomeHead, then a bento: a tall Abu Dhabi photo card with Azure's two UAE
// regions under it, beside a 2 × 2 grid of rule cards.
// Phones: the photo card on top, the rule cards two-up under it.

import { asset } from "@/brand/brand";
import { Reveal } from "@/components/ui/Reveal";
import { ReadMore } from "@/components/ui/ReadMore";
import { HomeHead } from "./HomeHead";
import s from "./UaeHub.module.css";

const HEADING = "Built around UAE rules, hosted in the UAE.";
const LEAD =
  "We set up AI, data, and cloud around the UAE's data protection and reporting rules, on Azure regions in Dubai and Abu Dhabi.";

const RULES = [
  {
    code: "PDPL",
    title: "Personal data protection",
    text: "Federal Decree-Law No. 45 of 2021. We map where personal data lives and moves before anything goes live.",
  },
  {
    code: "DIFC and ADGM",
    title: "Free zone data rules",
    text: "The Dubai and Abu Dhabi financial free zones have their own data protection laws. We design for the one you operate under.",
  },
  {
    code: "FTA",
    title: "VAT and tax invoices",
    text: "Dynamics 365 finance set up for UAE VAT returns and tax invoices to Federal Tax Authority requirements.",
  },
  {
    code: "WPS",
    title: "Payroll reporting",
    text: "Salary data prepared in the Wage Protection System format straight from your HR and finance systems.",
  },
];

/** Azure regions in the UAE (Microsoft's published regions). */
const AZURE_REGIONS = [
  { name: "UAE North", city: "Dubai" },
  { name: "UAE Central", city: "Abu Dhabi" },
];

function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 17.25s5.25-4.6 5.25-9a5.25 5.25 0 0 0-10.5 0c0 4.4 5.25 9 5.25 9Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
      <circle cx="10" cy="8.25" r="1.9" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function UaeHub() {
  return (
    <section id="uae" data-theme="light" className={s.section}>
      <div className={s.container}>
        <HomeHead tag="AptaCloud UAE" icon={<PinIcon />} heading={HEADING} lead={LEAD} />

        <div className={s.bento}>
          <Reveal y={28} duration={0.9} className={s.feature}>
            <article className={s.photoCard}>
              <span className={s.photoFrame}>
                <img
                  className={s.photo}
                  src={asset("/images/photos/regions/uae/abu-dhabi.jpg")}
                  alt="The Etihad Towers on the Abu Dhabi waterfront"
                  loading="lazy"
                  decoding="async"
                />
              </span>
              <div className={s.regions}>
                <p className={s.regionsHead}>
                  <img src={asset("/images/flags/ae.svg")} alt="" width={24} height={18} className={s.flag} />
                  Azure regions in the UAE
                </p>
                <ul className={s.regionList}>
                  {AZURE_REGIONS.map((r) => (
                    <li key={r.name} className={s.region}>
                      <span className={s.regionName}>{r.name}</span>
                      <span className={s.regionCity}>{r.city}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </Reveal>

          <div className={s.rules}>
            {RULES.map((r, i) => (
              <Reveal key={r.code} y={28} duration={0.9} delay={0.06 * (i + 1)} className={s.cell}>
                <article className={s.rule}>
                  <span className={s.code}>{r.code}</span>
                  <div className={s.ruleBody}>
                    <h3 className={s.ruleTitle}>{r.title}</h3>
                    <ReadMore className={s.text}>{r.text}</ReadMore>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UaeHub;
