"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { IAS_TESTS } from "@/data/tests";
import { Svg } from "./icons";

const CATS: { key: string; label: string }[] = [
  { key: "all", label: "All" },
  { key: "water", label: "Water & Liquids" },
  { key: "solid", label: "Solids & Materials" },
  { key: "bio", label: "Biological" },
  { key: "package", label: "Packages & Scans" },
];

export default function PricingCatalog() {
  const [cat, setCat] = useState("all");
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const query = q.trim().toLowerCase();
    return IAS_TESTS.filter(
      (t) =>
        (cat === "all" || t[2] === cat) &&
        (!query || t[0].toLowerCase().includes(query) || t[3].toLowerCase().includes(query))
    );
  }, [cat, q]);

  return (
    <div className="catalog reveal">
      <div className="catalog-tools">
        <div className="search">
          <Svg paths='<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>' />
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search 100+ tests — e.g. lead, PFAS, endotoxin, SEM…"
          />
        </div>
        <div className="filters">
          {CATS.map((c) => (
            <button
              key={c.key}
              className={`chip${cat === c.key ? " active" : ""}`}
              onClick={() => setCat(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>
      <div className="table-scroll">
        <table className="cat">
          <thead>
            <tr>
              <th>Test / Analysis</th>
              <th>Category</th>
              <th className="r">Price</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((t, i) => {
              const call = t[1] === "Call";
              return (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: "var(--navy)" }}>{t[0]}</td>
                  <td style={{ color: "var(--slate)", fontSize: ".85rem" }}>{t[3]}</td>
                  <td className={`price${call ? " call" : ""}`}>
                    {call ? "Call for quote" : t[1]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {rows.length === 0 && (
          <div className="no-res">
            No tests match your search.{" "}
            <Link href="/contact" style={{ color: "var(--blue)", fontWeight: 700 }}>
              Contact the lab
            </Link>{" "}
            for custom or non-listed work.
          </div>
        )}
      </div>
      <div className="catalog-foot">
        <span>
          Standard turnaround shown · Bottles &amp; submission materials included · Rush
          available at additional cost
        </span>
        <span>
          Need volume or account pricing?{" "}
          <Link href="/contact" style={{ color: "var(--blue)", fontWeight: 700 }}>
            Request a quote →
          </Link>
        </span>
      </div>
    </div>
  );
}
