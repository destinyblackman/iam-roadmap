import { useState } from "react";

const phases = [
  {
    id: 1,
    label: "PHASE 1",
    title: "Foundation",
    weeks: "Weeks 1–4",
    month: "Month 1",
    color: "#2E74B5",
    light: "#EAF2FB",
    border: "#2E74B5",
    certs: ["ISC2 CC — Pass Week 2", "Security+ Study Begins"],
    projects: ["Project 1: RBAC in Entra ID", "Project 2: Access Review Report"],
    awareness: ["ICAM / FICAM Terminology (2 hrs)"],
    apply: "Update LinkedIn + Resume Now",
    applyColor: "#1F3864",
    milestones: [
      "Register ISC2 CC at isc2.org",
      "Bookmark Professor Messer",
      "Book Security+ exam date",
      "Read 15 ClearanceJobs postings",
      "Scoring 65%+ on practice exams by Wk 4",
    ],
    hours: "~16.5 hrs/week",
  },
  {
    id: 2,
    label: "PHASE 2",
    title: "Security+ & Core Projects",
    weeks: "Weeks 5–9",
    month: "Month 2",
    color: "#1E6B3C",
    light: "#E8F5EE",
    border: "#1E6B3C",
    certs: ["Security+ — Pass Week 7 or 8 ✓"],
    projects: ["Project 3: IAM Policy & SOP Suite", "Project 4: Conditional Access & MFA", "AD Mini-Lab (TryHackMe)"],
    awareness: ["NIST SP 800-63 Overview (3–4 hrs)"],
    apply: "SOFT LAUNCH — Apply immediately after Security+ passes",
    applyColor: "#1E6B3C",
    milestones: [
      "Security+ passed — update resume same day",
      "NIST SP 800-63 executive summaries read",
      "Project 3 policy suite complete",
      "Project 4 Conditional Access complete",
      "TryHackMe AD Basics room complete",
      "ClearanceJobs profile active",
      "5–10 applications submitted",
    ],
    hours: "~16.5 hrs/week",
  },
  {
    id: 3,
    label: "PHASE 3",
    title: "SC-300 & GRC Capstone",
    weeks: "Weeks 10–14",
    month: "Month 3",
    color: "#7B5800",
    light: "#FFF8E6",
    border: "#7B5800",
    certs: ["AZ-900 Material Only (no exam)", "SC-300 Study Begins"],
    projects: ["Project 5: NIST 800-53 Gap Assessment + POA&M", "Project 6: Okta SSO Lab Begins"],
    awareness: ["SailPoint University Fundamentals (3–4 hrs)"],
    apply: "FULL LAUNCH — SC-300 in progress, projects to discuss in interviews",
    applyColor: "#7B5800",
    milestones: [
      "AZ-900 Microsoft Learn path complete",
      "SailPoint Fundamentals complete",
      "SC-300 Domains 1 & 2 done",
      "Project 5 Gap Assessment + POA&M complete",
      "Project 6 Okta lab underway",
      "10–15 total applications active",
    ],
    hours: "~16.5 hrs/week",
  },
  {
    id: 4,
    label: "PHASE 4",
    title: "Final Exams & Portfolio",
    weeks: "Weeks 15–18",
    month: "Month 4",
    color: "#4B2D8A",
    light: "#F0EBF9",
    border: "#4B2D8A",
    certs: ["SC-300 Exam — Pass Week 15/16 ✓", "Okta Professional Exam — Pass Week 17 ✓", "CyberArk Trustee (Awareness)"],
    projects: ["Project 6: Okta Lab Complete", "Portfolio Assembly & Polish", "Portfolio Exported as PDF"],
    awareness: ["CyberArk Trustee (2–3 hrs)"],
    apply: "POWER POSITION — All creds done, full portfolio ready, apply everywhere",
    applyColor: "#4B2D8A",
    milestones: [
      "SC-300 passed — resume updated same day",
      "Okta Professional passed",
      "CyberArk Trustee complete",
      "All 6 projects documented",
      "Portfolio PDF finalized",
      "Resume updated with all credentials",
      "Ready to apply to any IAM role",
    ],
    hours: "~16.5 hrs/week",
  },
];

const allCerts = [
  { name: "ISC2 CC", week: "Wk 2", cost: "Free", color: "#2E74B5", phase: 1 },
  { name: "CompTIA Security+", week: "Wk 7–8", cost: "$370", color: "#1E6B3C", phase: 2 },
  { name: "AZ-900 (Study Only)", week: "Wk 10", cost: "Free", color: "#7B5800", phase: 3 },
  { name: "SailPoint Fundamentals", week: "Wk 10", cost: "Free", color: "#7B5800", phase: 3 },
  { name: "MS SC-300", week: "Wk 15–16", cost: "$165", color: "#4B2D8A", phase: 4 },
  { name: "Okta Professional", week: "Wk 17", cost: "$150", color: "#4B2D8A", phase: 4 },
  { name: "CyberArk Trustee", week: "Wk 17", cost: "Free", color: "#4B2D8A", phase: 4 },
];

const allProjects = [
  { num: "01", name: "RBAC Implementation", platform: "Azure Entra ID", weeks: "Wk 1–3", phase: 1, color: "#2E74B5", skills: "Least Privilege · Role Design · Access Matrix" },
  { num: "02", name: "Access Review Report", platform: "Entra ID + Word", weeks: "Wk 3–5", phase: 1, color: "#2E74B5", skills: "User Lifecycle · Access Certification · Audit Docs" },
  { num: "03", name: "IAM Policy & SOP Suite", platform: "Word + Draw.io", weeks: "Wk 5–7", phase: 2, color: "#1E6B3C", skills: "Policy Writing · SOPs · Federal Standards" },
  { num: "04", name: "Conditional Access & MFA", platform: "Azure Entra ID", weeks: "Wk 7–9", phase: 2, color: "#1E6B3C", skills: "Zero Trust · MFA · DoD Mandate Alignment" },
  { num: "AD", name: "Active Directory Mini-Lab", platform: "TryHackMe", weeks: "Wk 9", phase: 2, color: "#0D6B74", skills: "On-Prem AD · Hybrid Identity · Domain Concepts" },
  { num: "05", name: "NIST 800-53 Gap Assessment", platform: "NIST SP 800-53 + Word", weeks: "Wk 10–13", phase: 3, color: "#7B5800", skills: "GRC · Risk Rating · POA&M · CMMC Readiness" },
  { num: "06", name: "Okta SSO & Lifecycle Lab", platform: "Okta Developer Tenant", weeks: "Wk 13–16", phase: 4, color: "#4B2D8A", skills: "SSO · SAML · Lifecycle Management · Platform Breadth" },
];

const weeklySchedule = [
  { day: "MON", study: "60 min — Video lessons", project: "30 min — Project work", total: "90 min" },
  { day: "TUE", study: "60 min — Chapter reading", project: "30 min — Project work", total: "90 min" },
  { day: "WED", study: "30 min — Anki review", project: "90 min — Lab session", total: "120 min" },
  { day: "THU", study: "60 min — Video lessons", project: "30 min — Portfolio docs", total: "90 min" },
  { day: "FRI", study: "45 min — Practice quiz", project: "45 min — Portfolio writing", total: "90 min" },
  { day: "SAT", study: "90 min — Full practice exam + BREAK", project: "2 hrs — Project work", total: "3.5 hrs" },
  { day: "SUN", study: "30 min — Light review (optional)", project: "2 hrs — Project / Portfolio", total: "2.5 hrs" },
];

export default function RoadmapApp() {
  const [activeTab, setActiveTab] = useState("roadmap");
  const [expandedPhase, setExpandedPhase] = useState(null);

  const tabs = [
    { id: "roadmap", label: "Roadmap" },
    { id: "projects", label: "Projects" },
    { id: "certs", label: "Credentials" },
    { id: "schedule", label: "Weekly Schedule" },
    { id: "apply", label: "When to Apply" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0f1e 0%, #0d1a2e 50%, #0a0f1e 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#e8edf5",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(180deg, rgba(30,55,100,0.95) 0%, rgba(15,30,60,0.95) 100%)",
        borderBottom: "1px solid rgba(46,116,181,0.4)",
        padding: "36px 40px 28px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(46,116,181,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(30,107,60,0.08) 0%, transparent 50%)",
          pointerEvents: "none",
        }} />
        <div style={{ position: "relative", maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#7aaddb", marginBottom: 8, textTransform: "uppercase" }}>
                Career Transition Roadmap
              </div>
              <h1 style={{
                fontSize: 34, fontWeight: "normal", margin: "0 0 6px",
                color: "#ffffff", letterSpacing: "0.02em", lineHeight: 1.1,
              }}>
                Destiny Blackman
              </h1>
              <div style={{ fontSize: 16, color: "#a8c4e0", marginBottom: 4 }}>
                Enterprise Architect → IAM Analyst
              </div>
              <div style={{ fontSize: 13, color: "#7aaddb", letterSpacing: "0.05em" }}>
                Active Secret Clearance &nbsp;·&nbsp; DoD Background &nbsp;·&nbsp; 18-Week Sprint
              </div>
            </div>
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              {[
                { label: "Total Weeks", value: "18" },
                { label: "Hrs / Week", value: "16.5" },
                { label: "Certifications", value: "4" },
                { label: "Projects", value: "7" },
                { label: "Total Cost", value: "$685" },
              ].map(s => (
                <div key={s.label} style={{
                  background: "rgba(46,116,181,0.15)",
                  border: "1px solid rgba(46,116,181,0.3)",
                  borderRadius: 8,
                  padding: "12px 18px",
                  textAlign: "center",
                  minWidth: 80,
                }}>
                  <div style={{ fontSize: 24, fontWeight: "bold", color: "#7aaddb", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: "#8aabb8", marginTop: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        background: "rgba(10,20,40,0.8)",
        borderBottom: "1px solid rgba(46,116,181,0.2)",
        padding: "0 40px",
        display: "flex", gap: 0,
        maxWidth: "100%",
        overflowX: "auto",
      }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
            background: "none", border: "none", cursor: "pointer",
            padding: "14px 24px",
            fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase",
            color: activeTab === t.id ? "#7aaddb" : "#5a7a99",
            borderBottom: activeTab === t.id ? "2px solid #2E74B5" : "2px solid transparent",
            transition: "all 0.2s",
            fontFamily: "Georgia, serif",
            whiteSpace: "nowrap",
          }}>{t.label}</button>
        ))}
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 40px" }}>

        {/* ROADMAP TAB */}
        {activeTab === "roadmap" && (
          <div>
            <div style={{ fontSize: 12, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 28 }}>
              18-Week Sprint — 4 Phases — Start Today
            </div>

            {/* Timeline bar */}
            <div style={{ marginBottom: 40, position: "relative" }}>
              <div style={{ display: "flex", height: 8, borderRadius: 4, overflow: "hidden", marginBottom: 8 }}>
                {[
                  { color: "#2E74B5", flex: 4, label: "Phase 1" },
                  { color: "#1E6B3C", flex: 5, label: "Phase 2" },
                  { color: "#7B5800", flex: 5, label: "Phase 3" },
                  { color: "#4B2D8A", flex: 4, label: "Phase 4" },
                ].map((p, i) => (
                  <div key={i} style={{ flex: p.flex, background: p.color, marginRight: i < 3 ? 2 : 0 }} />
                ))}
              </div>
              <div style={{ display: "flex" }}>
                {[
                  { flex: 4, label: "Wk 1–4", sub: "Month 1" },
                  { flex: 5, label: "Wk 5–9", sub: "Month 2" },
                  { flex: 5, label: "Wk 10–14", sub: "Month 3" },
                  { flex: 4, label: "Wk 15–18", sub: "Month 4" },
                ].map((p, i) => (
                  <div key={i} style={{ flex: p.flex, fontSize: 11, color: "#5a7a99", paddingRight: 8 }}>
                    {p.label} · {p.sub}
                  </div>
                ))}
              </div>
            </div>

            {/* Phase cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {phases.map(phase => (
                <div key={phase.id} style={{
                  background: "rgba(15,30,60,0.6)",
                  border: `1px solid rgba(${phase.id === 1 ? "46,116,181" : phase.id === 2 ? "30,107,60" : phase.id === 3 ? "123,88,0" : "75,45,138"},0.4)`,
                  borderLeft: `4px solid ${phase.color}`,
                  borderRadius: 10,
                  overflow: "hidden",
                }}>
                  {/* Phase header */}
                  <div
                    onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)}
                    style={{
                      padding: "18px 24px",
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      cursor: "pointer",
                      background: expandedPhase === phase.id ? `rgba(${phase.id === 1 ? "46,116,181" : phase.id === 2 ? "30,107,60" : phase.id === 3 ? "123,88,0" : "75,45,138"},0.15)` : "transparent",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                      <div style={{
                        background: phase.color,
                        color: "#fff", fontWeight: "bold",
                        fontSize: 11, letterSpacing: "0.15em",
                        padding: "4px 10px", borderRadius: 4,
                        whiteSpace: "nowrap",
                      }}>{phase.label}</div>
                      <div>
                        <div style={{ fontSize: 16, color: "#e8edf5", fontWeight: "normal" }}>{phase.title}</div>
                        <div style={{ fontSize: 12, color: "#5a7a99" }}>{phase.weeks} &nbsp;·&nbsp; {phase.month}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                      <div style={{
                        background: `rgba(${phase.id === 1 ? "46,116,181" : phase.id === 2 ? "30,107,60" : phase.id === 3 ? "123,88,0" : "75,45,138"},0.2)`,
                        border: `1px solid ${phase.color}`,
                        borderRadius: 20, padding: "3px 12px",
                        fontSize: 11, color: phase.color,
                        letterSpacing: "0.05em",
                      }}>{phase.hours}</div>
                      <div style={{ color: "#5a7a99", fontSize: 18 }}>{expandedPhase === phase.id ? "▲" : "▼"}</div>
                    </div>
                  </div>

                  {/* Phase summary (always visible) */}
                  <div style={{ padding: "0 24px 16px", display: "flex", gap: 12, flexWrap: "wrap" }}>
                    {phase.certs.map((c, i) => (
                      <span key={i} style={{
                        background: "rgba(46,116,181,0.12)", border: "1px solid rgba(46,116,181,0.3)",
                        borderRadius: 4, padding: "3px 10px", fontSize: 12, color: "#7aaddb",
                      }}>🎓 {c}</span>
                    ))}
                    {phase.projects.map((p, i) => (
                      <span key={i} style={{
                        background: "rgba(30,107,60,0.12)", border: "1px solid rgba(30,107,60,0.3)",
                        borderRadius: 4, padding: "3px 10px", fontSize: 12, color: "#5aad7a",
                      }}>🔧 {p}</span>
                    ))}
                  </div>

                  {/* Expanded detail */}
                  {expandedPhase === phase.id && (
                    <div style={{ padding: "0 24px 24px", borderTop: `1px solid rgba(${phase.id === 1 ? "46,116,181" : phase.id === 2 ? "30,107,60" : phase.id === 3 ? "123,88,0" : "75,45,138"},0.2)`, paddingTop: 20 }}>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                        <div>
                          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#5a7a99", textTransform: "uppercase", marginBottom: 10 }}>Certifications</div>
                          {phase.certs.map((c, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                              <div style={{ width: 6, height: 6, borderRadius: "50%", background: phase.color, marginTop: 6, flexShrink: 0 }} />
                              <div style={{ fontSize: 13, color: "#b8cde0", lineHeight: 1.4 }}>{c}</div>
                            </div>
                          ))}
                          {phase.awareness.map((a, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#0D6B74", marginTop: 6, flexShrink: 0 }} />
                              <div style={{ fontSize: 13, color: "#7abfbf", lineHeight: 1.4 }}>{a}</div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#5a7a99", textTransform: "uppercase", marginBottom: 10 }}>Milestones</div>
                          {phase.milestones.map((m, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 8 }}>
                              <div style={{ fontSize: 11, color: phase.color, marginTop: 2, flexShrink: 0 }}>✓</div>
                              <div style={{ fontSize: 13, color: "#b8cde0", lineHeight: 1.4 }}>{m}</div>
                            </div>
                          ))}
                        </div>
                        <div>
                          <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#5a7a99", textTransform: "uppercase", marginBottom: 10 }}>Application Status</div>
                          <div style={{
                            background: `rgba(${phase.id === 1 ? "46,116,181" : phase.id === 2 ? "30,107,60" : phase.id === 3 ? "123,88,0" : "75,45,138"},0.15)`,
                            border: `1px solid ${phase.color}`,
                            borderRadius: 8, padding: "14px 16px",
                          }}>
                            <div style={{ fontSize: 13, color: "#e8edf5", lineHeight: 1.6 }}>{phase.apply}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROJECTS TAB */}
        {activeTab === "projects" && (
          <div>
            <div style={{ fontSize: 12, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 28 }}>
              7 Portfolio Projects — Hands-On Work Across All Tools
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {allProjects.map(p => (
                <div key={p.num} style={{
                  background: "rgba(15,30,60,0.6)",
                  border: `1px solid rgba(${p.phase === 1 ? "46,116,181" : p.phase === 2 ? "30,107,60" : p.phase === 3 ? "123,88,0" : "75,45,138"},0.35)`,
                  borderTop: `3px solid ${p.color}`,
                  borderRadius: 10, padding: "20px",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{
                      fontSize: 28, fontWeight: "bold", color: p.color,
                      opacity: 0.4, lineHeight: 1, fontFamily: "Georgia, serif",
                    }}>{p.num}</div>
                    <span style={{
                      background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 4, padding: "2px 8px", fontSize: 11, color: "#5a7a99",
                    }}>{p.weeks}</span>
                  </div>
                  <div style={{ fontSize: 15, color: "#e8edf5", marginBottom: 6, lineHeight: 1.3 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: p.color, marginBottom: 12, opacity: 0.85 }}>📱 {p.platform}</div>
                  <div style={{ fontSize: 11, color: "#5a8aa0", lineHeight: 1.6 }}>{p.skills}</div>
                  <div style={{ marginTop: 12 }}>
                    <span style={{
                      background: `rgba(${p.phase === 1 ? "46,116,181" : p.phase === 2 ? "30,107,60" : p.phase === 3 ? "123,88,0" : "75,45,138"},0.2)`,
                      border: `1px solid ${p.color}`,
                      borderRadius: 12, padding: "2px 10px",
                      fontSize: 10, color: p.color, letterSpacing: "0.08em", textTransform: "uppercase",
                    }}>Phase {p.phase === 2 && p.num === "AD" ? "2 / Bonus" : p.phase}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTS TAB */}
        {activeTab === "certs" && (
          <div>
            <div style={{ fontSize: 12, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 28 }}>
              Full Credential Stack — $685 Total for Paid Certs
            </div>

            {/* Timeline visual */}
            <div style={{ marginBottom: 40, position: "relative", padding: "20px 0" }}>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "rgba(46,116,181,0.2)", transform: "translateY(-50%)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                {allCerts.map((cert, i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, flex: 1 }}>
                    <div style={{ fontSize: 10, color: "#5a7a99", textAlign: "center" }}>{cert.week}</div>
                    <div style={{
                      width: 14, height: 14, borderRadius: "50%",
                      background: cert.color, border: "3px solid #0a0f1e",
                      boxShadow: `0 0 12px ${cert.color}`,
                      zIndex: 1,
                    }} />
                    <div style={{
                      background: "rgba(15,30,60,0.9)",
                      border: `1px solid ${cert.color}`,
                      borderRadius: 6, padding: "8px 10px",
                      textAlign: "center", maxWidth: 120,
                    }}>
                      <div style={{ fontSize: 11, color: "#e8edf5", lineHeight: 1.3, marginBottom: 4 }}>{cert.name}</div>
                      <div style={{ fontSize: 11, color: cert.cost === "Free" ? "#5aad7a" : "#7aaddb", fontWeight: "bold" }}>{cert.cost}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cert detail cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { name: "ISC2 Certified in Cybersecurity (CC)", week: "Week 2", cost: "Free", color: "#2E74B5", where: "isc2.org", why: "Quick win credential — on resume fast. Free course and free exam. Study alongside Security+ in Weeks 1–2.", type: "Certification" },
                { name: "CompTIA Security+", week: "Week 7–8", cost: "$370", color: "#1E6B3C", where: "pearsonvue.com", why: "DoD 8570 gateway credential — required for almost every federal cybersecurity role. The single most important cert in this plan. Triggers your soft launch of job applications.", type: "Certification" },
                { name: "AZ-900 Material Only", week: "Week 10", cost: "Free", color: "#7B5800", where: "learn.microsoft.com", why: "Azure orientation before SC-300. No exam needed — SC-300 already implies this knowledge. Complete the free Microsoft Learn path in Week 10.", type: "Study Only" },
                { name: "SailPoint Identity Security Fundamentals", week: "Week 10", cost: "Free", color: "#0D6B74", where: "university.sailpoint.com", why: "Entry-level awareness of the dominant federal IGA platform. 3–4 hours. Enough to answer 'are you familiar with SailPoint?' confidently in interviews.", type: "Awareness" },
                { name: "MS SC-300 Identity Administrator", week: "Week 15–16", cost: "$165", color: "#4B2D8A", where: "pearsonvue.com", why: "The most directly relevant certification for IAM Analyst roles. Certifies everything you built in your Entra ID projects. Transforms your application profile.", type: "Certification" },
                { name: "Okta Certified Professional", week: "Week 17", cost: "$150", color: "#4B2D8A", where: "webassessor.com/okta", why: "Platform breadth — shows you are not a single-vendor candidate. Pairs with SC-300 to signal you understand IAM as a discipline. Project 6 is your exam prep.", type: "Certification" },
                { name: "CyberArk Trustee", week: "Week 17", cost: "Free", color: "#4B2D8A", where: "cyberark.com/training", why: "PAM awareness — 2 to 3 hours. Enough to speak intelligently about privileged access management when it comes up in interviews. Entry-level does not require more than this.", type: "Awareness" },
              ].map((cert, i) => (
                <div key={i} style={{
                  background: "rgba(15,30,60,0.6)",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderLeft: `4px solid ${cert.color}`,
                  borderRadius: 8, padding: "16px 20px",
                  display: "flex", alignItems: "flex-start", gap: 20,
                }}>
                  <div style={{ minWidth: 80, textAlign: "center" }}>
                    <div style={{ fontSize: 12, color: cert.color, fontWeight: "bold", marginBottom: 4 }}>{cert.week}</div>
                    <div style={{ fontSize: 13, color: cert.cost === "Free" ? "#5aad7a" : "#7aaddb", fontWeight: "bold" }}>{cert.cost}</div>
                    <div style={{
                      marginTop: 6, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "#3a5a72", border: `1px solid ${cert.color}`, borderRadius: 3,
                      padding: "2px 4px",
                    }}>{cert.type}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: "#e8edf5", marginBottom: 4 }}>{cert.name}</div>
                    <div style={{ fontSize: 12, color: "#5a7a99", marginBottom: 8 }}>Register at: {cert.where}</div>
                    <div style={{ fontSize: 12, color: "#8aabb8", lineHeight: 1.6 }}>{cert.why}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCHEDULE TAB */}
        {activeTab === "schedule" && (
          <div>
            <div style={{ fontSize: 12, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 28 }}>
              Weekly Study Routine — 16.5 Hours Per Week
            </div>

            {/* Total breakdown */}
            <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
              {[
                { label: "Cert Study", hours: "~7.5 hrs", color: "#2E74B5" },
                { label: "Projects", hours: "~9 hrs", color: "#1E6B3C" },
                { label: "Total / Week", hours: "~16.5 hrs", color: "#4B2D8A" },
                { label: "Total / 18 Weeks", hours: "~297 hrs", color: "#7B5800" },
              ].map(s => (
                <div key={s.label} style={{
                  background: "rgba(15,30,60,0.6)",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderTop: `3px solid ${s.color}`,
                  borderRadius: 8, padding: "14px 20px", flex: 1, minWidth: 120,
                }}>
                  <div style={{ fontSize: 22, color: s.color, marginBottom: 4 }}>{s.hours}</div>
                  <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Day cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {weeklySchedule.map((day, i) => (
                <div key={i} style={{
                  background: "rgba(15,30,60,0.6)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 8,
                  display: "flex", alignItems: "stretch",
                  overflow: "hidden",
                }}>
                  <div style={{
                    background: day.day === "SAT" || day.day === "SUN" ? "rgba(46,116,181,0.2)" : "rgba(30,50,80,0.5)",
                    width: 60, flexShrink: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontWeight: "bold", letterSpacing: "0.15em",
                    color: day.day === "SAT" || day.day === "SUN" ? "#7aaddb" : "#4a6a85",
                    borderRight: "1px solid rgba(255,255,255,0.05)",
                  }}>{day.day}</div>
                  <div style={{ flex: 1, display: "flex", padding: "14px 16px", gap: 20, flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: 10, color: "#2E74B5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Cert Study</div>
                      <div style={{ fontSize: 13, color: "#b8cde0" }}>{day.study}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <div style={{ fontSize: 10, color: "#1E6B3C", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Project / Portfolio</div>
                      <div style={{ fontSize: 13, color: "#b8cde0" }}>{day.project}</div>
                    </div>
                    <div style={{ minWidth: 80, textAlign: "right" }}>
                      <div style={{ fontSize: 10, color: "#5a7a99", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Total</div>
                      <div style={{ fontSize: 14, color: "#7aaddb", fontWeight: "bold" }}>{day.total}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              marginTop: 20, background: "rgba(123,88,0,0.12)",
              border: "1px solid rgba(123,88,0,0.3)", borderLeft: "4px solid #7B5800",
              borderRadius: 8, padding: "14px 18px",
            }}>
              <div style={{ fontSize: 13, color: "#c4a060", lineHeight: 1.7, fontStyle: "italic" }}>
                Saturday rule: Do the 90-minute practice exam in the morning, take a real break of at least 60 minutes, then sit down for project work. Never blend them without a break — fatigue will hurt both. This structure is what makes the schedule sustainable for 18 consecutive weeks.
              </div>
            </div>
          </div>
        )}

        {/* APPLY TAB */}
        {activeTab === "apply" && (
          <div>
            <div style={{ fontSize: 12, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 28 }}>
              Application Strategy — 3 Launch Windows
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[
                {
                  week: "WEEK 8", label: "Soft Launch", color: "#1E6B3C",
                  trigger: "Security+ passed",
                  description: "The moment Security+ is in hand you are qualified on paper for a significant portion of entry-level IAM Analyst postings. Your clearance plus Security+ plus your DoD background is already a competitive package.",
                  actions: [
                    "Apply to roles where Security+ satisfies the cert requirement",
                    "List SC-300 and Okta as 'In Progress — Expected [Month]'",
                    "Primary board: ClearanceJobs.com — search IAM Analyst, ISSO, Access Control Analyst",
                    "Target: Leidos, SAIC, Booz Allen, CACI, ManTech, Perspecta, GDIT, Noblis",
                    "Leverage network first — Seneca, Deloitte, AIS contacts move 3–4x faster than cold apps",
                  ],
                },
                {
                  week: "WEEK 12", label: "Full Launch", color: "#2E74B5",
                  trigger: "SC-300 in progress, 4 projects complete",
                  description: "Security+ passed, four completed projects, AD TryHackMe done, and SC-300 actively in progress. This is your strongest pre-SC-300 position. You now have real work to reference in interviews.",
                  actions: [
                    "Reference projects by name in interviews — specific, real, documented work",
                    "Expand to LinkedIn Jobs and USAJobs beyond ClearanceJobs",
                    "Target 10–15 active applications total",
                    "Begin interview prep — frame DSCA audit work as applied IAM experience",
                    "Add IAM-specific language to resume based on active job postings you see",
                  ],
                },
                {
                  week: "WEEK 16", label: "Power Position", color: "#4B2D8A",
                  trigger: "SC-300 passed, Okta nearly done, portfolio complete",
                  description: "SC-300 passed, Okta Professional in final stretch, portfolio assembled. This is your strongest possible application position. The full credential stack, clearance, and portfolio together are rare at entry level.",
                  actions: [
                    "Update every active application the day SC-300 posts",
                    "Negotiate any pending offers from position of additional credential strength",
                    "Apply broadly and aggressively — this is the power window",
                    "Portfolio PDF ready to attach to every application",
                    "Target salary range: $90k–$115k entry, negotiate toward $110k–$120k with portfolio",
                  ],
                },
              ].map((window, i) => (
                <div key={i} style={{
                  background: "rgba(15,30,60,0.6)",
                  border: `1px solid rgba(255,255,255,0.08)`,
                  borderLeft: `4px solid ${window.color}`,
                  borderRadius: 10, overflow: "hidden",
                }}>
                  <div style={{
                    padding: "16px 24px",
                    background: `rgba(${i === 0 ? "30,107,60" : i === 1 ? "46,116,181" : "75,45,138"},0.12)`,
                    display: "flex", alignItems: "center", gap: 16,
                  }}>
                    <div style={{
                      background: window.color, color: "#fff",
                      fontSize: 11, fontWeight: "bold", letterSpacing: "0.1em",
                      padding: "4px 10px", borderRadius: 4,
                    }}>{window.week}</div>
                    <div>
                      <div style={{ fontSize: 16, color: "#e8edf5" }}>{window.label}</div>
                      <div style={{ fontSize: 12, color: window.color }}>Trigger: {window.trigger}</div>
                    </div>
                  </div>
                  <div style={{ padding: "16px 24px" }}>
                    <div style={{ fontSize: 13, color: "#8aabb8", lineHeight: 1.7, marginBottom: 16 }}>{window.description}</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {window.actions.map((a, j) => (
                        <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <div style={{ color: window.color, marginTop: 3, flexShrink: 0 }}>→</div>
                          <div style={{ fontSize: 13, color: "#b8cde0", lineHeight: 1.5 }}>{a}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Offer timeline */}
            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 12, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
                Realistic Offer Timeline
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { type: "Network Referral", time: "2–4 weeks", note: "Fastest — prioritize Seneca, Deloitte, AIS contacts", color: "#1E6B3C" },
                  { type: "ClearanceJobs Cold Apply", time: "4–6 weeks", note: "Cleared candidates move faster — no background check delay", color: "#2E74B5" },
                  { type: "LinkedIn / General Boards", time: "4–8 weeks", note: "Less targeted for your profile but worth running in parallel", color: "#7B5800" },
                  { type: "USAJobs Federal Direct", time: "6–12 weeks", note: "Slowest process but highest long-term compensation ceiling", color: "#4B2D8A" },
                ].map((o, i) => (
                  <div key={i} style={{
                    background: "rgba(15,30,60,0.6)",
                    border: `1px solid rgba(255,255,255,0.06)`,
                    borderTop: `3px solid ${o.color}`,
                    borderRadius: 8, padding: "14px 16px",
                  }}>
                    <div style={{ fontSize: 13, color: "#e8edf5", marginBottom: 4 }}>{o.type}</div>
                    <div style={{ fontSize: 18, color: o.color, marginBottom: 6 }}>{o.time}</div>
                    <div style={{ fontSize: 12, color: "#5a7a99", lineHeight: 1.5 }}>{o.note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        borderTop: "1px solid rgba(46,116,181,0.15)",
        padding: "20px 40px",
        textAlign: "center",
        fontSize: 11, color: "#3a5a72", letterSpacing: "0.1em",
      }}>
        DESTINY BLACKMAN &nbsp;·&nbsp; IAM ANALYST SPRINT PLAN &nbsp;·&nbsp; 18 WEEKS &nbsp;·&nbsp; START TODAY
      </div>
    </div>
  );
}
