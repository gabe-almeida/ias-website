"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NAV_ITEMS, SITE } from "@/lib/site";
import { INDUSTRIES } from "@/data/industries";
import { Svg, P, Phone } from "./icons";

function activeKey(pathname: string): string {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/industries")) return "industries";
  const seg = "/" + pathname.split("/")[1];
  const hit = NAV_ITEMS.find((n) => n.href === seg);
  if (hit) return hit.key;
  // sub-pages that live under Services in the legacy nav
  if (["/qa-programs", "/custom-testing", "/get-started"].includes(seg)) return "services";
  return "";
}

export default function Nav() {
  const pathname = usePathname();
  const active = activeKey(pathname);
  const [open, setOpen] = useState(false); // mobile menu
  const [megaOpen, setMegaOpen] = useState(false); // mobile accordion
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    addEventListener("scroll", onScroll);
    return () => removeEventListener("scroll", onScroll);
  }, []);

  // close menus on route change
  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}`} id="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="brand">
          <Image
            src="/assets/ias-logo.png"
            alt="Industrial Analytical Services"
            width={200}
            height={50}
            priority
            style={{ height: 50, width: "auto" }}
          />
        </Link>
        <nav className={`nav-links${open ? " open" : ""}`} id="navLinks">
          {NAV_ITEMS.map((item) =>
            item.key === "industries" ? (
              <div
                key={item.key}
                className={`nav-item has-mega${megaOpen ? " open" : ""}`}
              >
                <div className="nav-row">
                  <Link
                    href={item.href}
                    className={`nav-top${active === "industries" ? " active" : ""}`}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </Link>
                  <button
                    className="mega-toggle"
                    type="button"
                    aria-label="Show industries"
                    aria-expanded={megaOpen}
                    onClick={() => setMegaOpen((v) => !v)}
                  >
                    <Svg paths={P.chevron} />
                  </button>
                </div>
                <div className="mega">
                  <div className="mega-grid">
                    {INDUSTRIES.map((ind) => (
                      <Link
                        key={ind.slug}
                        className="mega-link"
                        href={`/industries/${ind.slug}`}
                        onClick={() => setOpen(false)}
                      >
                        <span className="mi">
                          <Svg paths={ind.icon} />
                        </span>
                        <span className="mt">{ind.name}</span>
                      </Link>
                    ))}
                  </div>
                  <Link className="mega-foot" href="/industries" onClick={() => setOpen(false)}>
                    View all industries <Svg paths={P.arrow} sw="2.4" />
                  </Link>
                </div>
              </div>
            ) : (
              <Link
                key={item.key}
                href={item.href}
                className={active === item.key ? "active" : undefined}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            )
          )}
        </nav>
        <div className="nav-cta">
          <a href={SITE.phoneHref} className="nav-phone">
            <Phone /> {SITE.phone}
          </a>
          <Link href="/get-started" className="btn btn-primary btn-sm">
            Submit a Sample
          </Link>
          <button
            className="burger"
            id="burger"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
}
