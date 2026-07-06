"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Ports the legacy reveal-on-scroll: adds `.in` to `.reveal` elements as they enter view. */
export default function RevealInit() {
  const pathname = usePathname();
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      // threshold 0 = reveal as soon as any part enters the viewport, so a tall
      // item only peeking at the fold edge on load isn't stranded invisible
      // until the user scrolls.
      { threshold: 0 }
    );
    els.forEach((el) => {
      if (!el.classList.contains("in")) io.observe(el);
    });
    return () => io.disconnect();
  }, [pathname]);
  return null;
}
