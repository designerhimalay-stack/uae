// App suite (live "Why Microsoft 365?"): the apps grouped by what they do.
// Each group is a card sized to its number of apps (a bento that packs
// itself): the category label on top, then the app icons in white plates with
// their names. Icons pop in group by group and lift on hover.

import { asset } from "@/brand/brand";
import { Reveal } from "@/components/ui/Reveal";
import type { Block } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { Icon } from "../Icon";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Suite.module.css";

type SuiteBlock = Extract<Block, { kind: "suite" }>;

export function Suite({ block, tone }: { block: SuiteBlock; tone: Tone }) {
  // Phones: groups of 1-2 apps sit two to a row; 3+ apps take the row. If the
  // small groups come out odd, a two-app group closes the grid on its own row
  // (never a lone single app in a wide box).
  const small = block.groups.filter((g) => g.apps.length <= 2);
  const closer = small.length % 2 === 1 ? [...small].reverse().find((g) => g.apps.length === 2) ?? small[small.length - 1] : null;
  return (
    <section id={block.id ?? "suite"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "center"} tag={block.tag} icon={<Icon id={block.icon ?? "layers"} />} heading={block.heading} lead={block.lead} />
        <div className={s.bento}>
          {block.groups.map((g, gi) => (
            <Reveal
              key={g.label}
              y={24}
              duration={0.9}
              delay={(gi % 4) * 0.06}
              className={cn(s.group, g.apps.length > 2 && s.wide, g === closer && s.closer)}
              style={{ ["--apps" as string]: g.apps.length }}
            >
              <p className={s.label}>{g.label}</p>
              <ul className={s.apps}>
                {g.apps.map((a) => (
                  <li key={a.name} className={s.app}>
                    <span className={s.plate}>
                      <img src={asset(a.icon)} alt="" loading="lazy" decoding="async" className={s.icon} />
                    </span>
                    <span className={s.name}>{a.name}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
