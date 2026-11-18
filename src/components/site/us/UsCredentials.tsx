// US credentials band: the live aptacloud.com counters (20+ years, 300+
// clients, 200+ engineers, 4 delivery locations) and the partner logos in one
// grey band under the hero, in place of the AU home's About cards and its
// separate Partners section. Numbers count in when the band enters the view.

import { animate, useInView } from "@/lib/motion";
import { useEffect, useRef, useState } from "react";
import { BRAND, asset } from "@/brand/brand";
import { Reveal } from "@/components/ui/Reveal";
import s from "./UsCredentials.module.css";

const STATS = [
  { value: 20, suffix: "+", label: "Years of experience" },
  { value: 300, suffix: "+", label: "Clients served" },
  { value: 200, suffix: "+", label: "Engineers" },
  { value: 4, suffix: "", label: "Delivery locations" },
];

function Count({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  // The real value ships in the HTML; it only counts in if it starts off screen.
  const [n, setN] = useState(value);
  const [armed, setArmed] = useState(false);
  useEffect(() => {
    const r = ref.current?.getBoundingClientRect();
    if (r && r.top > innerHeight && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setArmed(true);
      setN(0);
    }
  }, []);
  useEffect(() => {
    if (!armed || !inView) return;
    const c = animate(0, value, { duration: 1.1, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [armed, inView, value]);
  return (
    <span ref={ref} className={s.number} aria-label={`${value}${suffix}`}>
      {n}
      <span className={s.suffix}>{suffix}</span>
    </span>
  );
}

export function UsCredentials() {
  return (
    <section id="credentials" data-theme="light" className={s.section}>
      <div className={s.container}>
        <Reveal y={24} duration={1} amount={0.3} className={s.head}>
          <p className={s.kicker}>{BRAND.name} in numbers</p>
          <h2 className={s.heading}>Senior AI and cloud specialists, headquartered in Richardson, Texas.</h2>
        </Reveal>

        <dl className={s.stats}>
          {STATS.map((st, i) => (
            <Reveal key={st.label} y={24} duration={0.9} delay={i * 0.06} className={s.stat}>
              <dt className={s.label}>{st.label}</dt>
              <dd className={s.value}>
                <Count value={st.value} suffix={st.suffix} />
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal y={20} duration={0.9} delay={0.1} className={s.partners}>
          <p className={s.partnersLabel}>Technology partners</p>
          <ul className={s.logos}>
            <li>
              <img className={s.logo} src={asset("/images/partners/microsoft.svg")} alt="Microsoft" />
            </li>
            <li>
              <span className={s.wordmark} role="img" aria-label="Anthropic">
                Anthropic
              </span>
            </li>
            <li>
              <img className={`${s.logo} ${s.aws}`} src={asset("/images/partners/aws.svg")} alt="AWS" />
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

export default UsCredentials;
