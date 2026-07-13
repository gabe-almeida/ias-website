"use client";
import { useState } from "react";
import { INDUSTRIES } from "@/data/industries";
import { Svg, P } from "./icons";

export default function ContactForm({ title = "Send us a message" }: { title?: string }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="lead-form reveal"
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
    >
      <div className="row">
        <div className="fg">
          <label>First name <span className="req">*</span></label>
          <input required placeholder="Jane" />
        </div>
        <div className="fg">
          <label>Last name <span className="req">*</span></label>
          <input required placeholder="Doe" />
        </div>
      </div>
      <div className="row">
        <div className="fg">
          <label>Company <span className="req">*</span></label>
          <input required placeholder="Acme Manufacturing" />
        </div>
        <div className="fg">
          <label>Industry</label>
          <select defaultValue="">
            <option value="" disabled>Select your industry…</option>
            {INDUSTRIES.map((i) => (
              <option key={i.slug}>{i.name}</option>
            ))}
            <option>Other</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="fg">
          <label>Phone <span className="req">*</span></label>
          <input required type="tel" placeholder="(555) 123-4567" />
        </div>
        <div className="fg">
          <label>Email <span className="req">*</span></label>
          <input required type="email" placeholder="jane@acme.com" />
        </div>
      </div>
      <div className="fg">
        <label>Describe your testing need</label>
        <textarea placeholder="What are you testing, what are you trying to find out, and any turnaround needs…"></textarea>
      </div>
      <div className="fg">
        <label>Attach a file (optional)</label>
        <label className="file-drop">
          <Svg paths='<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>' /> Drop
          an SDS, spec sheet, or sample description — or click to browse
          <input type="file" hidden />
        </label>
      </div>
      <div className="form-foot">
        <button className="btn btn-primary" type="submit">
          {title} <Svg paths={P.send} sw="2.4" />
        </button>
        {sent && (
          <span
            className="sent"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#1AA563",
              fontWeight: 700,
              fontFamily: "var(--font-inter)",
              fontSize: ".9rem",
              width: "100%",
              marginTop: 6,
            }}
          >
            <Svg paths={P.check} sw="2.5" /> Thanks — your request has been received. Our lab
            team will be in touch within one business day.
          </span>
        )}
      </div>
    </form>
  );
}
