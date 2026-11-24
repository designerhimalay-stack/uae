// Blog index (client designer pointers, 2026-11-20: "the current design is not working; propose a
// fresh layout"). The live blog's cover images carry their own text, so the layout leads with type:
//  • Latest: the newest article large, beside an "Also new" list of the next four.
//  • All articles: topics and search in a sticky sidebar, beside rows of articles (cover, meta,
//    title, excerpt, reading time), ten at a time with "Show more". Phones: topics wrap as chips.
// Each article opens its page on this site (/blog/<slug>/).

import { useMemo, useState } from "react";
import { Photo } from "@/components/ui/Photo";
import { Reveal } from "@/components/ui/Reveal";
import { REGION } from "@/brand/regions";
import { INDEX_POSTS as POSTS, POST_META, postImage, postUrl, type Post } from "@/data/blog";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "../Icon";
import { toneProps, type Tone } from "../tone";
import sec from "../Section.module.css";
import s from "./BlogIndex.module.css";

const TOPICS: { id: string; label: string; test: (x: Post) => boolean }[] = [
  { id: "insurance", label: "Insurance", test: (x) => /insurance/i.test(x.category) || /insurance|insurer|carrier/i.test(x.title) },
  { id: "oilgas", label: "Oil & Gas", test: (x) => /oil/i.test(x.title) || /oil/i.test(x.category) },
  { id: "construction", label: "Construction", test: (x) => /construction|contractor/i.test(x.title) || /construction/i.test(x.category) },
  { id: "ai", label: "AI", test: (x) => /\bAI\b|artificial/i.test(x.category) },
  { id: "modernisation", label: "Modernisation", test: (x) => /moderni[sz]ation/i.test(x.category) && !/insurance/i.test(x.category) },
  { id: "data", label: "Data", test: (x) => /data|power bi/i.test(x.category) },
  { id: "azure", label: "Azure", test: (x) => /azure/i.test(x.category) },
  { id: "microsoft", label: "Microsoft", test: (x) => /dynamics|sharepoint|microsoft 365/i.test(x.category) },
];

const FEATURED = 5;
const PAGE = 10;
const fmt = (iso: string) => new Date(`${iso}T00:00:00`).toLocaleDateString(REGION.lang, { day: "numeric", month: "long", year: "numeric" });

function Meta({ post, minutes }: { post: Post; minutes?: boolean }) {
  const m = POST_META[post.slug]?.minutes;
  return (
    <p className={s.meta}>
      <span className={s.cat}>{post.category}</span>
      <span aria-hidden="true">·</span>
      <span>{fmt(post.date)}</span>
      {minutes && m ? (
        <>
          <span aria-hidden="true">·</span>
          <span>{m} min read</span>
        </>
      ) : null}
    </p>
  );
}

export function BlogIndex({ tone }: { tone: Tone }) {
  const [topic, setTopic] = useState("all");
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState(PAGE);

  const [lead, ...next] = POSTS.slice(0, FEATURED);
  const filtering = topic !== "all" || query.trim() !== "";
  const counts = useMemo(() => Object.fromEntries(TOPICS.map((t) => [t.id, POSTS.filter(t.test).length])), []);
  const list = useMemo(() => {
    const t = TOPICS.find((x) => x.id === topic);
    const q = query.trim().toLowerCase();
    // Unfiltered, the archive starts after the five featured articles; a filter searches everything.
    return (filtering ? POSTS : POSTS.slice(FEATURED)).filter((x) => (!t || t.test(x)) && (!q || x.title.toLowerCase().includes(q) || x.category.toLowerCase().includes(q)));
  }, [topic, query, filtering]);

  const pick = (id: string) => {
    setTopic(id);
    setShown(PAGE);
  };

  return (
    <section id="articles" {...toneProps(tone)}>
      <div className={sec.container}>
        {/* Latest */}
        <div className={s.latest}>
          <Reveal y={28} duration={1} className={s.leadCell}>
            <a href={postUrl(lead.slug)} className={cn(s.lead, "photo-host")}>
              <div className={s.leadCover}>
                <Photo src={postImage(lead.slug)} alt="" tone="color" priority sizes="(min-width: 1200px) 660px, (min-width: 1024px) 55vw, 92vw" className={s.photo} />
              </div>
              <p className={s.kicker}>Latest article</p>
              <Meta post={lead} minutes />
              <h2 className={s.leadTitle}>{lead.title}</h2>
              {POST_META[lead.slug]?.excerpt && <p className={s.leadExcerpt}>{POST_META[lead.slug].excerpt}</p>}
              <span className={s.read}>
                Read the article
                <ArrowUpRight />
              </span>
            </a>
          </Reveal>
          <Reveal y={28} duration={1} delay={0.08} className={s.alsoCell}>
            <p className={s.alsoTitle}>Also new</p>
            <ul className={s.alsoList}>
              {next.map((p) => (
                <li key={p.slug}>
                  <a href={postUrl(p.slug)} className={cn(s.also, "photo-host")}>
                    <div className={s.alsoThumb}>
                      <Photo src={postImage(p.slug)} alt="" tone="color" sizes="120px" className={s.photo} />
                    </div>
                    <div>
                      <Meta post={p} />
                      <h3 className={s.alsoName}>{p.title}</h3>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* All articles */}
        <div className={s.browse}>
          <aside className={s.side}>
            <div className={s.sticky}>
              <label className={s.search}>
                <svg viewBox="0 0 16 16" aria-hidden="true">
                  <circle cx="7" cy="7" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  <path d="m10.5 10.5 3.25 3.25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <input
                  type="search"
                  placeholder="Search articles"
                  aria-label="Search articles"
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShown(PAGE);
                  }}
                />
              </label>
              <p className={s.sideTitle}>Topics</p>
              <div className={s.topics} role="group" aria-label="Filter by topic">
                <button type="button" className={cn(s.topic, topic === "all" && s.topicOn)} aria-pressed={topic === "all"} onClick={() => pick("all")}>
                  All articles
                  <span className={s.count}>{POSTS.length}</span>
                </button>
                {TOPICS.filter((t) => counts[t.id] > 0).map((t) => (
                  <button key={t.id} type="button" className={cn(s.topic, topic === t.id && s.topicOn)} aria-pressed={topic === t.id} onClick={() => pick(t.id)}>
                    {t.label}
                    <span className={s.count}>{counts[t.id]}</span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className={s.results}>
            <p className={s.found} aria-live="polite">
              {filtering ? `${list.length} ${list.length === 1 ? "article" : "articles"}` : "More articles"}
            </p>
            {list.length === 0 ? (
              <p className={s.empty}>No articles match. Try another topic, or a shorter search.</p>
            ) : (
              <ul className={s.rows}>
                {list.slice(0, shown).map((p) => (
                  <li key={p.slug}>
                    <a href={postUrl(p.slug)} className={cn(s.row, "photo-host")}>
                      <div className={s.rowThumb}>
                        <Photo src={postImage(p.slug)} alt="" tone="color" sizes="(min-width: 810px) 220px, 112px" className={s.photo} />
                      </div>
                      <div className={s.rowBody}>
                        <Meta post={p} minutes />
                        <h3 className={s.rowTitle}>{p.title}</h3>
                        {POST_META[p.slug]?.excerpt && <p className={s.rowExcerpt}>{POST_META[p.slug].excerpt}</p>}
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            )}
            {list.length > shown && (
              <button type="button" className={s.more} onClick={() => setShown((n) => n + PAGE)}>
                Show more articles
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
