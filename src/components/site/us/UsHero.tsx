// US home hero (the global site). Built on the live aptacloud.com home's
// four-slide carousel (AI ROI · Azure · Dynamics · modernised apps), shown as
// a calm, editorial composition instead of a slider: the brand promise over a
// Dallas skyline at night, the lead and actions on one row, and the four
// pillars as glass cards along the foot. Distinct from the AU hero (no
// console, no ticker). Phones: pillars two-up.

import { BRAND, PRIMARY_CTA, asset } from "@/brand/brand";
import { localPhoto } from "@/brand/regions";
import { Button } from "@/components/ui/Button";
import { Photo } from "@/components/ui/Photo";
import { PillTag } from "@/components/ui/PillTag";
import { LineReveal, Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/service/Icon";
import type { IconId } from "@/data/services/types";
import s from "./UsHero.module.css";

const PHOTO = localPhoto("/images/photos/hero-developer.jpg", "", "62% 50%");

const PILLARS: { title: string; text: string; href: string; icon: IconId }[] = [
  { title: "Artificial intelligence", text: "Find where AI pays off, then prove it on your data.", href: asset("/ai-consulting/"), icon: "spark" },
  // Positioning order: AI, modernisation, Azure, then the Microsoft stack.
  { title: "Modernised applications", text: "Legacy systems turned into software that grows with you.", href: asset("/application-modernization/"), icon: "code" },
  { title: "Microsoft Azure", text: "Secure, scalable, resilient cloud infrastructure.", href: asset("/azure-hosting/"), icon: "cloud" },
  { title: "Dynamics 365", text: "Finance, operations, and field teams on one platform.", href: asset("/services/microsoft/microsoft-dynamics-365/"), icon: "layers" },
];

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UsHero() {
  return (
    <section id="top" className={s.hero}>
      <Reveal trigger="mount" delay={0.1} duration={1.4} y={0} className={s.backdrop}>
        <Photo src={PHOTO.src} alt="" sizes="100vw" priority position={PHOTO.position} className={s.photo} />
        <div className={s.fade} aria-hidden="true" />
      </Reveal>

      <div className={s.inner}>
        <Reveal trigger="mount" delay={0.05}>
          <PillTag
            icon={
              <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M10 17.25s5.25-4.6 5.25-9a5.25 5.25 0 0 0-10.5 0c0 4.4 5.25 9 5.25 9Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                <circle cx="10" cy="8.25" r="1.9" stroke="currentColor" strokeWidth="1.25" />
              </svg>
            }
          >
            Microsoft-certified · Richardson, Texas
          </PillTag>
        </Reveal>

        <LineReveal as="h1" trigger="mount" startDelay={0.05} className={s.title}>
          <span>Your path to measurable</span>
          <span className={s.accent}>AI ROI.</span>
        </LineReveal>

        <Reveal trigger="mount" delay={0.15} duration={0.8} className={s.row}>
          <p className={s.lead}>{BRAND.valueProp}</p>
          <div className={s.actions}>
            <Button label={PRIMARY_CTA.label} href={PRIMARY_CTA.href} variant="primary" />
            <a href="#why" className={s.link}>
              See how we work
              <Arrow />
            </a>
          </div>
        </Reveal>

        <div className={s.pillars}>
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} trigger="mount" delay={0.25 + i * 0.06} duration={0.8} className={s.cell}>
              <a className={s.pillar} href={p.href}>
                <span className={s.icon}>
                  <Icon id={p.icon} />
                </span>
                <span className={s.pillarTitle}>{p.title}</span>
                <span className={s.pillarText}>{p.text}</span>
                <span className={s.go} aria-hidden="true">
                  <Arrow />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default UsHero;
