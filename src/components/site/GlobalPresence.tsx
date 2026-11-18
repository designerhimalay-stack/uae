// Global presence (US home only: the global site). Pill tag | heading whose
// words fill from grey to ink as it scrolls + muted lead; then one card per
// regional site: a photo of the country above its name, where we work there,
// the local time (set after mount so the server HTML never disagrees), and a
// link to that site. The card for the site you are on says so instead.
// Phones: a 2×2 grid, copy clamped to two lines with Read more.

import { useEffect, useState } from "react";
import { asset } from "@/brand/brand";
import { REGION, REGIONS, REGION_ORDER, regionHome } from "@/brand/regions";
import { Reveal } from "@/components/ui/Reveal";
import { ReadMore } from "@/components/ui/ReadMore";
import { cn } from "@/lib/utils";
import { HomeHead } from "./HomeHead";
import s from "./GlobalPresence.module.css";

const HEADING = "Headquartered in Texas. Working across four regions.";
const LEAD =
  "One team and one way of working, led by senior AI and cloud specialists. Delivery runs from the United States, Mexico, and India, with a dedicated site for each region we serve.";

function useNow() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(t);
  }, []);
  return now;
}

const timeIn = (d: Date, timeZone: string) =>
  d.toLocaleTimeString(REGION.lang, { hour: "numeric", minute: "2-digit", timeZone }).replace(/\s?(am|pm)/i, (m) => ` ${m.trim().toLowerCase()}`);

function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M2.75 10h14.5M10 2.75c2 2.1 3 4.5 3 7.25s-1 5.15-3 7.25c-2-2.1-3-4.5-3-7.25s1-5.15 3-7.25Z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

function Arrow() {
  return (
    <svg className={s.arrow} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M4 12 12 4M5.5 4H12v6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function GlobalPresence() {
  const now = useNow();
  return (
    <section id="global-presence" data-theme="light" className={s.section}>
      <div className={s.container}>
        <HomeHead tag="Global presence" icon={<GlobeIcon />} heading={HEADING} lead={LEAD} />

        <div className={s.grid}>
          {REGION_ORDER.map((id, i) => {
            const r = REGIONS[id];
            const here = id === REGION.id;
            const body = (
              <>
                <span className={s.photoFrame}>
                  <img
                    className={s.photo}
                    src={asset(r.card.photo.src)}
                    alt={r.card.photo.alt}
                    style={r.card.photo.position ? { objectPosition: r.card.photo.position } : undefined}
                    loading="lazy"
                    decoding="async"
                  />
                </span>
                <span className={s.body}>
                  <span className={s.top}>
                    <img src={asset(`/images/flags/${r.flag}.svg`)} alt="" width={24} height={18} className={s.flag} />
                    <span className={s.country}>{r.label}</span>
                    <span className={s.time} aria-label={now ? `Local time ${timeIn(now, r.card.timeZone)}` : undefined}>
                      {now ? timeIn(now, r.card.timeZone) : " "}
                    </span>
                  </span>
                  <span className={s.place}>{r.card.place}</span>
                  <ReadMore className={s.text} link={!here}>
                    {r.card.text}
                  </ReadMore>
                  <span className={cn(s.link, here && s.here)}>
                    {here ? "You are on this site" : `Visit the ${r.code} site`}
                    {!here && <Arrow />}
                  </span>
                </span>
              </>
            );
            return (
              <Reveal key={id} y={28} duration={0.9} delay={i * 0.07} className={s.cell}>
                {here ? (
                  <div className={s.card}>{body}</div>
                ) : (
                  <a className={cn(s.card, s.cardLink)} href={regionHome(r)} hrefLang={r.lang}>
                    {body}
                  </a>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default GlobalPresence;
