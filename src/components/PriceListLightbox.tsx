"use client";

/**
 * PriceListLightbox — opens the full price list as an inline modal image instead
 * of navigating to a new tab, so the user keeps their scroll position and any
 * catalog filter state on the underlying page.
 *
 * WHY an image (not the PDF directly): a rendered WebP displays identically in
 * every browser (including mobile, where some Android stock viewers download
 * instead of embedding a PDF). The text-searchable PDF stays available as a
 * "Download PDF" link inside the modal — image is the quick view, PDF is the
 * source of truth for copy/search/print.
 *
 * WHEN used: the "View Full Price List (PDF)" button on /pricing and on industry
 * detail pages, plus the inline "View Price List ↗" link in the catalog foot.
 *
 * The image asset is generated from the PDF by `npm run regen:pricelist`
 * (scripts/regen-price-list-image.py) — rerun it whenever the PDF is updated,
 * or the image will silently go stale.
 */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Arrow } from "./icons";

type Props = {
  /** Trigger button label. */
  label?: string;
  /** Trigger className — "btn btn-ghost" for the big button, "plb-link" for the inline text link. */
  className?: string;
  /** Node after the label (Arrow for buttons, "↗" for the inline link). */
  trailing?: React.ReactNode;
  /** PDF url — used for the in-modal "Download" fallback. */
  pdfHref?: string;
  /** Rendered price-list image. */
  imageSrc?: string;
  imageAlt?: string;
};

const DEFAULTS = {
  pdfHref: "/assets/ias-price-list.pdf",
  imageSrc: "/assets/ias-price-list.webp",
  imageAlt: "IAS full price list — flat per-test pricing for all analyses",
};

export default function PriceListLightbox({
  label = "View Full Price List (PDF)",
  className = "btn btn-ghost",
  trailing,
  pdfHref = DEFAULTS.pdfHref,
  imageSrc = DEFAULTS.imageSrc,
  imageAlt = DEFAULTS.imageAlt,
}: Props) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Body scroll lock + Esc-to-close while open. Restores overflow + focus on close.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
      triggerRef.current?.focus();
    };
  }, [open]);

  const onBackdrop = useCallback((e: React.MouseEvent) => {
    // Only close when clicking the overlay itself, not the panel it contains.
    if (e.target === e.currentTarget) setOpen(false);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={className}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
      >
        {label}
        {trailing !== undefined ? trailing : <Arrow />}
      </button>

      {open && (
        <div className="plb-overlay" onClick={onBackdrop}>
          <div
            className="plb-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Full price list"
          >
            <div className="plb-head">
              <span className="plb-title">Full Price List</span>
              <div className="plb-actions">
                <a
                  className="plb-dl"
                  href={pdfHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                >
                  Download PDF <Arrow />
                </a>
                <button
                  ref={closeRef}
                  type="button"
                  className="plb-close"
                  aria-label="Close price list"
                  onClick={() => setOpen(false)}
                >
                  {/* inline X — keeps this client component free of new icon deps */}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="plb-scroll">
              {/*
                Plain <img> (not next/image) on purpose: we want the natural
                full-resolution render with CSS zoom + native pinch-zoom, not
                next/image's responsive sizing which would downscale the dense
                tabular text. The asset is static under /public.
              */}
              <img
                src={imageSrc}
                alt={imageAlt}
                className={zoomed ? "plb-img plb-img-zoom" : "plb-img"}
                onClick={() => setZoomed((z) => !z)}
                loading="lazy"
                decoding="async"
              />
            </div>

            <div className="plb-foot">
              <button
                type="button"
                className="plb-zoom-btn"
                onClick={() => setZoomed((z) => !z)}
              >
                {zoomed ? "Zoom out" : "Zoom in"}
              </button>
              <span className="plb-hint">
                Tap the image to {zoomed ? "zoom out" : "zoom in"} · pinch to zoom on mobile
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
