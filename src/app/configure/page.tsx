"use client";

import { useEffect, useRef, useState } from "react";
import type { AnimationTier, BusinessType, SectionConfig, SiteConfig } from "@/lib/types";
import siteConfig from "../../../site.config";

type Tab = "theme" | "sections" | "content" | "export";
type DW = "375px" | "768px" | "100%";
type HiddenSection = SectionConfig & { hidden?: boolean };

const BUSINESS_TYPES: BusinessType[] = [
  "doctor","dentist","restaurant","salon","gym","realestate","lawyer","retail",
  "hospital","vet","bakery","pharmacy","school","hotel","events","wedding",
  "homeservice","auto","photographer","interiors","individual","nonprofit",
  "worship","petshop","jewellery","printing","catering","wellness",
  "diagnostics","construction","local",
];

const pill = (active: boolean): React.CSSProperties => ({
  padding: "5px 12px", borderRadius: 9999, border: "1px solid var(--border)", cursor: "pointer",
  fontSize: 12, background: active ? "var(--primary)" : "transparent",
  color: active ? "var(--primary-foreground)" : "var(--foreground)",
});

const iStyle: React.CSSProperties = {
  width: "100%", padding: "6px 8px", fontSize: 13, borderRadius: 6,
  border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)",
  boxSizing: "border-box",
};

const lbl: React.CSSProperties = {
  display: "block", fontSize: 11, fontWeight: 600, color: "var(--muted-foreground)",
  textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 6,
};

export default function ConfigurePage() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [ready, setReady] = useState(false);
  const [tab, setTab] = useState<Tab>("theme");
  const [accent, setAccent] = useState(siteConfig.theme.accentColor ?? "#3b82f6");
  const [tier, setTier] = useState<AnimationTier>(siteConfig.animationTier ?? "standard");
  const [sections, setSections] = useState<HiddenSection[]>(siteConfig.sections ?? []);
  const [name, setName] = useState(siteConfig.business.name);
  const [tagline, setTagline] = useState(siteConfig.business.tagline);
  const [phone, setPhone] = useState(siteConfig.business.phone);
  const [email, setEmail] = useState(siteConfig.business.email);
  const [city, setCity] = useState(siteConfig.business.city);
  const [dw, setDw] = useState<DW>("100%");

  useEffect(() => {
    const h = (e: MessageEvent) => { if (e.data?.type === "PREVIEW_READY") setReady(true); };
    window.addEventListener("message", h);
    return () => window.removeEventListener("message", h);
  }, []);

  const send = (msg: object) => iframeRef.current?.contentWindow?.postMessage(msg, "*");

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", fontFamily: "DM Sans, sans-serif" }}>
      {/* Left panel */}
      <div style={{ width: 360, flexShrink: 0, display: "flex", flexDirection: "column", background: "var(--background)", borderRight: "1px solid var(--border)", overflow: "hidden" }}>
        <div style={{ padding: "14px 20px 10px", borderBottom: "1px solid var(--border)" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--foreground)", marginBottom: 10 }}>Template Configurator</div>
          <div style={{ display: "flex", gap: 6 }}>
            {(["theme","sections","content","export"] as Tab[]).map((t) => (
              <button key={t} onClick={() => setTab(t)} style={{ ...pill(tab === t), textTransform: "capitalize", border: "none" }}>{t}</button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 18 }}>

          {tab === "theme" && <>
            <div>
              <label style={lbl}>Accent Color</label>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <input type="color" value={accent} onChange={(e) => { setAccent(e.target.value); send({ type: "ACCENT_UPDATE", accentColor: e.target.value }); }}
                  style={{ width: 40, height: 32, border: "1px solid var(--border)", borderRadius: 6, cursor: "pointer", padding: 2 }} />
                <code style={{ fontSize: 12, color: "var(--muted-foreground)" }}>{accent}</code>
              </div>
            </div>
            <div>
              <label style={lbl}>Animation Tier</label>
              <div style={{ display: "flex", gap: 6 }}>
                {(["subtle","standard","premium"] as AnimationTier[]).map((t) => (
                  <button key={t} onClick={() => { setTier(t); send({ type: "CONFIG_UPDATE", config: { animationTier: t } }); }}
                    style={{ ...pill(tier === t), textTransform: "capitalize" }}>{t}</button>
                ))}
              </div>
            </div>
            <div>
              <label style={lbl}>Business Type</label>
              <select defaultValue={siteConfig.business.type} onChange={(e) => send({ type: "CONFIG_UPDATE", config: { business: { type: e.target.value } } })}
                style={{ ...iStyle, textTransform: "capitalize" }}>
                {BUSINESS_TYPES.map((bt) => <option key={bt} value={bt}>{bt}</option>)}
              </select>
            </div>
          </>}

          {tab === "sections" && <>
            <p style={{ fontSize: 11, color: "var(--muted-foreground)", margin: 0 }}>Drag reordering coming soon</p>
            {sections.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", borderRadius: 8, background: "var(--card)", border: "1px solid var(--border)", opacity: s.hidden ? 0.45 : 1 }}>
                <span style={{ color: "var(--muted-foreground)", cursor: "grab" }}>≡</span>
                <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 7px", borderRadius: 4, background: "var(--muted)", color: "var(--muted-foreground)", textTransform: "capitalize" }}>{s.type}</span>
                <span style={{ flex: 1, fontSize: 12, color: "var(--muted-foreground)" }}>{s.variant}</span>
                <button title={s.hidden ? "Show" : "Hide"} onClick={() => {
                  const updated = sections.map((x, j) => j === i ? { ...x, hidden: !x.hidden } : x);
                  setSections(updated);
                  send({ type: "SECTION_UPDATE", sections: updated.filter((x) => !x.hidden) });
                }} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 14, padding: 2 }}>{s.hidden ? "○" : "●"}</button>
              </div>
            ))}
          </>}

          {tab === "content" && <>
            {([["Business Name", name, setName], ["Tagline", tagline, setTagline], ["Phone", phone, setPhone], ["Email", email, setEmail], ["City", city, setCity]] as [string, string, (v: string) => void][]).map(([l, v, set]) => (
              <div key={l}>
                <label style={{ ...lbl, textTransform: "none" }}>{l}</label>
                <input value={v} onChange={(e) => set(e.target.value)} style={iStyle} />
              </div>
            ))}
            <button onClick={() => send({ type: "CONFIG_UPDATE", config: { business: { name, tagline, phone, email, city } } })}
              style={{ padding: "8px 16px", borderRadius: 6, border: "none", cursor: "pointer", background: "var(--primary)", color: "var(--primary-foreground)", fontSize: 13, fontWeight: 600 }}>Apply</button>
          </>}

          {tab === "export" && <>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => {
                const p: Partial<SiteConfig> = { business: { ...siteConfig.business, name, tagline, phone, email, city }, animationTier: tier, theme: { ...siteConfig.theme, accentColor: accent }, sections };
                navigator.clipboard.writeText(JSON.stringify(p, null, 2));
              }} style={{ flex: 1, padding: "7px 12px", borderRadius: 6, border: "1px solid var(--border)", cursor: "pointer", background: "var(--card)", color: "var(--foreground)", fontSize: 12 }}>Copy site.config.ts</button>
              <button onClick={() => window.open(`/preview?config=${btoa(JSON.stringify({ tier, accent, sections }))}`, "_blank")}
                style={{ flex: 1, padding: "7px 12px", borderRadius: 6, border: "none", cursor: "pointer", background: "var(--primary)", color: "var(--primary-foreground)", fontSize: 12 }}>Open in new tab</button>
            </div>
            <pre style={{ fontSize: 11, background: "var(--muted)", borderRadius: 6, padding: 12, overflow: "auto", maxHeight: 280, color: "var(--foreground)", margin: 0 }}>
              {JSON.stringify({ tier, accent, sections: sections.map((s) => ({ type: s.type, variant: s.variant })) }, null, 2)}
            </pre>
          </>}

        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", background: "var(--muted)", overflow: "hidden" }}>
        {ready && (
          <div style={{ display: "flex", gap: 6, padding: "8px 16px", background: "var(--background)", borderBottom: "1px solid var(--border)" }}>
            {([["375px", "Mobile"], ["768px", "Tablet"], ["100%", "Desktop"]] as [DW, string][]).map(([w, l]) => (
              <button key={w} onClick={() => setDw(w)} style={{ ...pill(dw === w), fontSize: 11 }}>{l}</button>
            ))}
          </div>
        )}
        <div style={{ flex: 1, display: "flex", justifyContent: "center", overflow: "hidden", position: "relative" }}>
          {!ready && (
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "var(--muted)", color: "var(--muted-foreground)", fontSize: 14, zIndex: 10 }}>
              Loading preview...
            </div>
          )}
          <iframe ref={iframeRef} src="/preview" style={{ width: dw, height: "100%", border: "none", background: "white", transition: "width 0.2s ease" }} />
        </div>
      </div>
    </div>
  );
}
