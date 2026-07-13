"use client";
import { useState } from "react";
import { INDUSTRIES } from "@/data/industries";
import { SITE } from "@/lib/site";
import { Svg, P } from "./icons";

type Status = "idle" | "sending" | "sent" | "error";

// Public lead form used across the site (get-started, contact, CTA bands).
// On submit it POSTs the fields to Payload's REST endpoint for the
// `submissions` collection (POST /api/submissions), which persists the lead to
// the admin panel and fires the email-notify hook. Real sending/success/error
// states so the confirmation the visitor sees is truthful — the submission
// genuinely went through.
export default function ContactForm({ title = "Send us a message" }: { title?: string }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const fd = new FormData(form);
    setStatus("sending");
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: fd.get("firstName"),
          lastName: fd.get("lastName"),
          company: fd.get("company"),
          industry: fd.get("industry") || undefined,
          phone: fd.get("phone"),
          email: fd.get("email"),
          message: fd.get("message") || undefined,
          website: fd.get("website") || undefined, // honeypot
        }),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  // Once submitted successfully, replace the form with a clean confirmation
  // rather than leaving a re-submittable form under a success banner.
  if (status === "sent") {
    return (
      <div className="lead-form reveal" role="status" aria-live="polite" style={{ textAlign: "center", padding: "2.5rem 1rem" }}>
        <div style={{ color: "#1AA563", display: "inline-flex", marginBottom: 14 }}>
          <Svg paths={P.check} sw="2.5" size={44} />
        </div>
        <h3 style={{ margin: "0 0 8px", fontFamily: "var(--font-inter)" }}>Request received</h3>
        <p style={{ margin: 0, color: "var(--muted, #556)" }}>
          Thanks — your request has landed with our lab team. We&rsquo;ll be in touch within one
          business day. Have an SDS or spec sheet? Email it to{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we&rsquo;ll match it to your request.
        </p>
      </div>
    );
  }

  return (
    <form className="lead-form reveal" onSubmit={handleSubmit}>
      <div className="row">
        <div className="fg">
          <label>First name <span className="req">*</span></label>
          <input name="firstName" required placeholder="Jane" />
        </div>
        <div className="fg">
          <label>Last name <span className="req">*</span></label>
          <input name="lastName" required placeholder="Doe" />
        </div>
      </div>
      <div className="row">
        <div className="fg">
          <label>Company <span className="req">*</span></label>
          <input name="company" required placeholder="Acme Manufacturing" />
        </div>
        <div className="fg">
          <label>Industry</label>
          <select name="industry" defaultValue="">
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
          <input name="phone" required type="tel" placeholder="(555) 123-4567" />
        </div>
        <div className="fg">
          <label>Email <span className="req">*</span></label>
          <input name="email" required type="email" placeholder="jane@acme.com" />
        </div>
      </div>
      <div className="fg">
        <label>Describe your testing need</label>
        <textarea name="message" placeholder="What are you testing, what are you trying to find out, and any turnaround needs…"></textarea>
      </div>
      <p className="file-hint" style={{ margin: "-2px 0 4px", fontSize: ".82rem", color: "var(--muted, #667)" }}>
        Have an SDS, spec sheet, or sample description? Email it to{" "}
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a> and we&rsquo;ll match it to your request.
      </p>
      {/* Honeypot: hidden from users; bots that fill it are rejected server-side. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
      />
      <div className="form-foot">
        <button className="btn btn-primary" type="submit" disabled={status === "sending"}>
          {status === "sending" ? "Sending…" : title} <Svg paths={P.send} sw="2.4" />
        </button>
        {status === "error" && (
          <span
            role="alert"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              color: "#C0392B",
              fontWeight: 600,
              fontFamily: "var(--font-inter)",
              fontSize: ".9rem",
              width: "100%",
              marginTop: 6,
            }}
          >
            Something went wrong sending your request. Please try again or email{" "}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
          </span>
        )}
      </div>
    </form>
  );
}
