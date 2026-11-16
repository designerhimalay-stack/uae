// Card copy on phones: two lines, then "Read more" opens it in place. A hidden
// checkbox and its label do the toggle, so it works before (and without)
// hydration. Desktop shows the full text and hides the control. Inside a card
// that is itself a link, `link` shows the label only: the card opens the page.
// Once hydrated, the control hides itself when the copy already fits in two
// lines, so "Read more" never appears with nothing more to read.

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import s from "./ReadMore.module.css";

export function ReadMore({
  children,
  className,
  link = false,
  min = 50,
}: {
  children: string;
  className?: string;
  link?: boolean;
  /** Shorter copy fits in about two lines, so it stays as plain text. */
  min?: number;
}) {
  const id = useId();
  const text = useRef<HTMLParagraphElement>(null);
  const toggle = useRef<HTMLInputElement>(null);
  const [fits, setFits] = useState(false);

  useEffect(() => {
    const p = text.current;
    if (!p || link) return;
    const check = () => {
      if (toggle.current?.checked) return; // open: the clamp is off, so nothing to measure
      setFits(p.scrollHeight <= p.clientHeight + 1);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(p);
    return () => ro.disconnect();
  }, [link]);

  if (children.length <= min) return <p className={className}>{children}</p>;
  if (link) {
    return (
      <>
        <p className={cn(className, s.clamp)}>{children}</p>
        <span className={s.more} aria-hidden="true">
          Read more
        </span>
      </>
    );
  }
  return (
    <>
      <input ref={toggle} type="checkbox" id={id} className={s.toggle} aria-label="Show the full text" hidden={fits} />
      <p ref={text} className={cn(className, s.clamp)}>{children}</p>
      <label htmlFor={id} className={s.more} aria-hidden="true" style={fits ? { display: "none" } : undefined}>
        <span className={s.open}>Read more</span>
        <span className={s.less}>Show less</span>
      </label>
    </>
  );
}
