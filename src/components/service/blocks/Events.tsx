// Events: the next event as a feature card (photo, dates, venue, what we will be there for, and
// links to its page and the organiser's registration), then past events as photo cards. Every
// event links to its own page (/events/<slug>/) (client, 2026-11-20). Dates are ISO in the data.

import { asset } from "@/brand/brand";
import { REGION } from "@/brand/regions";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import type { Block, CompanyEvent } from "@/data/services/types";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Icon } from "../Icon";
import { SectionHead } from "../SectionHead";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./Events.module.css";

type EventsBlock = Extract<Block, { kind: "events" }>;

const day = (iso: string) => new Date(`${iso}T00:00:00`);
const month = (d: Date) => d.toLocaleDateString(REGION.lang, { month: "long" });

/** "3–4 November 2026", or "30 March – 1 April 2026" across months. */
export function dateRange(start: string, end: string) {
  const a = day(start);
  const b = day(end);
  if (start === end) return `${a.getDate()} ${month(a)} ${a.getFullYear()}`;
  if (a.getMonth() === b.getMonth()) return `${a.getDate()}–${b.getDate()} ${month(a)} ${a.getFullYear()}`;
  return `${a.getDate()} ${month(a)} – ${b.getDate()} ${month(b)} ${b.getFullYear()}`;
}

export const eventUrl = (e: CompanyEvent) => asset(`/events/${e.slug}/`);

/** Has the event finished (its last day is before today)? */
export function isPast(e: CompanyEvent) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return day(e.end) < today;
}

/** One past event as a photo card linking to its page. */
export function EventCard({ e, i = 0, wide = false }: { e: CompanyEvent; i?: number; wide?: boolean }) {
  return (
    <Reveal y={24} duration={0.8} delay={(i % 3) * 0.06} className={cn(s.cell, wide && s.wide)}>
      <a href={eventUrl(e)} className={cn(s.card, "photo-host")}>
        <div className={s.thumb}>
          <Photo src={e.photo.src} alt={e.photo.alt} position={e.photo.position} tone="color" sizes="(min-width: 1200px) 380px, (min-width: 810px) 45vw, 46vw" className={s.photo} />
        </div>
        <div className={s.cardBody}>
          <p className={s.cardDate}>{dateRange(e.start, e.end)}</p>
          <h3 className={s.cardName}>{e.name}</h3>
          <p className={s.cardCity}>{e.city}</p>
          <span className={s.cardMore}>
            View event
            <ArrowUpRight />
          </span>
        </div>
      </a>
    </Reveal>
  );
}

export function Events({ block, tone }: { block: EventsBlock; tone: Tone }) {
  // A finished event moves to the past list on its own.
  const next = block.next && !isPast(block.next) ? block.next : undefined;
  const past = next || !block.next ? block.past : [block.next, ...block.past];
  // With nothing coming up, a forward-looking heading ("Where to meet us next.") would promise an event that is not there.
  const heading = next ? block.heading : "Events we have taken part in.";
  return (
    <section id={block.id ?? "events"} {...toneProps(tone)}>
      <div className={sec.container}>
        <SectionHead variant={block.head ?? "split"} tag={block.tag} icon={<Icon id={block.icon ?? "clock"} />} heading={heading} lead={block.lead} />

        {next && (
          <Reveal y={32} duration={1.1}>
            <article className={s.next}>
              <div className={s.media}>
                <Photo src={next.photo.src} alt={next.photo.alt} position={next.photo.position} tone="color" sizes="(min-width: 1200px) 560px, 92vw" className={s.photo} />
              </div>
              <div className={s.body}>
                <p className={s.kicker}>
                  <span className={s.dot} aria-hidden="true" />
                  Next event
                </p>
                <p className={s.date}>{dateRange(next.start, next.end)}</p>
                <h3 className={s.name}>{next.name}</h3>
                <p className={s.venue}>
                  <Icon id="target" />
                  {next.venue}
                </p>
                <p className={s.text}>{next.text}</p>
                <div className={s.links}>
                  <a href={eventUrl(next)} className={s.link}>
                    Event details
                    <ArrowUpRight />
                  </a>
                  {next.register && (
                    <a href={next.register} className={s.link} target="_blank" rel="noopener noreferrer">
                      Register with the organiser
                      <ArrowUpRight />
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        )}

        {past.length > 0 && (
          <div className={s.past}>
            {next && <p className={s.pastHead}>Past events</p>}
            <div className={cn(s.cards, sec.rail)}>
              {past.map((e, i) => (
                // Rows of three; when the count leaves a gap, the first cards pair up wider (5 = 2 + 3, 4 = 2 + 2).
                <EventCard key={e.slug} e={e} i={i} wide={i < (past.length % 3 === 2 ? 2 : past.length % 3 === 1 ? 4 : 0)} />
              ))}
            </div>
          </div>
        )}

        {block.all && (
          <a href={block.all} className={s.all}>
            All events
            <ArrowUpRight />
          </a>
        )}
      </div>
    </section>
  );
}
