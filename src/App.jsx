import { useState, useEffect } from "react";

const STORAGE_KEY = "destiny_iam_progress";

const phases = [
  {
    id: 1, label: "PHASE 1", title: "Foundation", weeks: "Weeks 1–4", month: "Month 1", color: "#2E74B5",
    certs: ["ISC2 CC — Pass Week 2", "Security+ Study Begins"],
    projects: ["Project 1: RBAC in Entra ID", "Project 2: Access Review Report"],
    awareness: ["ICAM / FICAM Terminology (2 hrs)"],
    apply: "Update LinkedIn + Resume Now",
    milestones: ["Register ISC2 CC at isc2.org","Bookmark Professor Messer","Book Security+ exam date","Read 15 ClearanceJobs postings","Scoring 65%+ on practice exams by Wk 4"],
    hours: "~16.5 hrs/week",
  },
  {
    id: 2, label: "PHASE 2", title: "Security+ & Core Projects", weeks: "Weeks 5–9", month: "Month 2", color: "#1E6B3C",
    certs: ["Security+ — Pass Week 7 or 8"],
    projects: ["Project 3: IAM Policy & SOP Suite", "Project 4: Conditional Access & MFA", "AD Mini-Lab (TryHackMe)"],
    awareness: ["NIST SP 800-63 Overview (3–4 hrs)"],
    apply: "SOFT LAUNCH — Apply immediately after Security+ passes",
    milestones: ["Security+ passed — update resume same day","NIST SP 800-63 executive summaries read","Project 3 policy suite complete","Project 4 Conditional Access complete","TryHackMe AD Basics room complete","ClearanceJobs profile active","5–10 applications submitted"],
    hours: "~16.5 hrs/week",
  },
  {
    id: 3, label: "PHASE 3", title: "SC-300 & GRC Capstone", weeks: "Weeks 10–14", month: "Month 3", color: "#7B5800",
    certs: ["AZ-900 Material Only (no exam)", "SC-300 Study Begins"],
    projects: ["Project 5: NIST 800-53 Gap Assessment + POA&M", "Project 6: Okta SSO Lab Begins"],
    awareness: ["SailPoint University Fundamentals (3–4 hrs)"],
    apply: "FULL LAUNCH — SC-300 in progress, projects to discuss in interviews",
    milestones: ["AZ-900 Microsoft Learn path complete","SailPoint Fundamentals complete","SC-300 Domains 1 & 2 done","Project 5 Gap Assessment + POA&M complete","Project 6 Okta lab underway","10–15 total applications active"],
    hours: "~16.5 hrs/week",
  },
  {
    id: 4, label: "PHASE 4", title: "Final Exams & Portfolio", weeks: "Weeks 15–18", month: "Month 4", color: "#4B2D8A",
    certs: ["SC-300 Exam — Pass Week 15/16", "Okta Professional Exam — Pass Week 17", "CyberArk Trustee (Awareness)"],
    projects: ["Project 6: Okta Lab Complete", "Portfolio Assembly & Polish", "Portfolio Exported as PDF"],
    awareness: ["CyberArk Trustee (2–3 hrs)"],
    apply: "POWER POSITION — All creds done, full portfolio ready, apply everywhere",
    milestones: ["SC-300 passed — resume updated same day","Okta Professional passed","CyberArk Trustee complete","All 6 projects documented","Portfolio PDF finalized","Resume updated with all credentials","Ready to apply to any IAM role"],
    hours: "~16.5 hrs/week",
  },
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

const resources = [
  {
    category: "Certifications & Study",
    color: "#2E74B5",
    items: [
      { name: "ISC2 CC — Free Course & Exam", url: "https://www.isc2.org/Certifications/CC", desc: "Register, enroll in free self-paced course, schedule exam. Do this Day 1.", phase: "Week 2", cost: "Free", type: "cert" },
      { name: "Professor Messer — Security+ Course", url: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/", desc: "Free full video course. Your primary Security+ study resource.", phase: "Weeks 2–8", cost: "Free", type: "cert" },
      { name: "Jason Dion — Security+ Practice Exams (Udemy)", url: "https://www.udemy.com/course/comptia-security-sy0-601-practice-exams/", desc: "Buy during a Udemy sale (~$15). Use for Saturday timed practice exams.", phase: "Weeks 3–8", cost: "~$15", type: "cert" },
      { name: "CompTIA Security+ Exam Registration", url: "https://www.pearsonvue.com/us/en/comptia.html", desc: "Book your exam date here. Online proctored available — test from home.", phase: "Week 7–8", cost: "$370", type: "cert" },
      { name: "Microsoft Learn — AZ-900 Path", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/", desc: "Free full learning path. Study only in Week 10 — no exam needed.", phase: "Week 10", cost: "Free", type: "cert" },
      { name: "Microsoft Learn — SC-300 Path", url: "https://learn.microsoft.com/en-us/credentials/certifications/identity-and-access-administrator/", desc: "Free official SC-300 learning path. Your primary SC-300 study resource.", phase: "Weeks 11–15", cost: "Free", type: "cert" },
      { name: "John Savill — SC-300 Study Cram (YouTube)", url: "https://www.youtube.com/results?search_query=john+savill+sc-300", desc: "Free YouTube cram. Use in the final week before the SC-300 exam.", phase: "Week 15", cost: "Free", type: "cert" },
      { name: "MeasureUp — SC-300 Practice Tests", url: "https://www.measureup.com/microsoft-practice-test-sc-300.html", desc: "Closest format to the real SC-300 exam. Use in the final 2 weeks of prep.", phase: "Weeks 14–15", cost: "~$99", type: "cert" },
      { name: "SC-300 Exam Registration (Pearson VUE)", url: "https://www.pearsonvue.com/us/en/microsoft.html", desc: "Book SC-300 exam here when scoring 80%+ on MeasureUp.", phase: "Week 15–16", cost: "$165", type: "cert" },
      { name: "Okta Training — Fundamentals & Admin Paths", url: "https://training.okta.com", desc: "Free Okta learning paths. Complete Okta Fundamentals and Administration paths for exam prep.", phase: "Weeks 13–17", cost: "Free", type: "cert" },
      { name: "Okta Professional Exam Registration", url: "https://www.webassessor.com/okta", desc: "Book Okta Professional exam here after completing training paths.", phase: "Week 17", cost: "$150", type: "cert" },
      { name: "CyberArk Trustee Certification", url: "https://www.cyberark.com/why-cyberark/education-and-training/", desc: "Free PAM awareness certification. 2–3 hours total. Enough for entry-level interviews.", phase: "Week 17", cost: "Free", type: "cert" },
    ]
  },
  {
    category: "Awareness & Required Reading",
    color: "#0D6B74",
    items: [
      { name: "SailPoint University — Identity Security Fundamentals", url: "https://university.sailpoint.com", desc: "Free. Complete the Identity Security Fundamentals learning path. 3–4 hours total.", phase: "Week 10", cost: "Free", type: "awareness" },
      { name: "NIST SP 800-63 — Digital Identity Guidelines", url: "https://pages.nist.gov/800-63-3/", desc: "Read executive summaries of all 3 volumes: 800-63A (Identity Proofing), 800-63B (Authentication), 800-63C (Federation).", phase: "Week 5", cost: "Free", type: "awareness" },
      { name: "NIST SP 800-53 Rev 5 — Security & Privacy Controls", url: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final", desc: "Download and focus on AC (Access Control) control family AC-1 through AC-25 for Project 5.", phase: "Weeks 10–13", cost: "Free", type: "awareness" },
      { name: "DoD ICAM Reference Design", url: "https://dodcio.defense.gov/Library/", desc: "Read the ICAM overview. 2 hours. Learn the exact DoD identity terminology hiring managers use.", phase: "Week 1", cost: "Free", type: "awareness" },
      { name: "FICAM Architecture — idmanagement.gov", url: "https://www.idmanagement.gov/ficam/", desc: "Federal identity management framework. Read alongside the DoD ICAM document in Week 1.", phase: "Week 1", cost: "Free", type: "awareness" },
      { name: "FedRAMP POA&M Template", url: "https://www.fedramp.gov/documents-templates/", desc: "Download and use as your format reference for the Project 5 POA&M deliverable.", phase: "Weeks 10–13", cost: "Free", type: "awareness" },
    ]
  },
  {
    category: "Lab Environments & Tools",
    color: "#1E6B3C",
    items: [
      { name: "Azure Portal — Free Tier", url: "https://portal.azure.com", desc: "All Entra ID and Azure projects live here. Confirm your free tier account is active before Week 1.", phase: "Week 1+", cost: "Free", type: "lab" },
      { name: "TryHackMe — Active Directory Basics Room", url: "https://tryhackme.com/room/winadbasics", desc: "Complete this room in Week 9. Fully browser-based — no local Windows Server install needed.", phase: "Week 9", cost: "Free*", type: "lab" },
      { name: "Okta Developer Tenant", url: "https://developer.okta.com", desc: "Sign up for a free full-featured Okta developer tenant for Project 6. Not a sandbox — full product.", phase: "Week 13+", cost: "Free", type: "lab" },
      { name: "Draw.io — Process Flow Diagrams", url: "https://draw.io", desc: "Free browser-based diagramming tool. Use for access request workflow diagrams in Projects 3 and 4.", phase: "Weeks 5–9", cost: "Free", type: "lab" },
      { name: "Anki Flashcard App", url: "https://apps.ankiweb.net", desc: "Free spaced-repetition flashcard app. Use for Security+ acronyms and definitions — review daily.", phase: "Weeks 2–8", cost: "Free", type: "lab" },
    ]
  },
  {
    category: "Job Search",
    color: "#4B2D8A",
    items: [
      { name: "ClearanceJobs.com", url: "https://www.clearancejobs.com", desc: "Primary job board for cleared candidates. Search: IAM Analyst, ISSO, Access Control Analyst, Identity Analyst. Start reading Week 1, apply Week 8.", phase: "Week 8+", cost: "Free", type: "jobs" },
      { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs", desc: "Update your headline now: Enterprise Architect | IAM | DoD | Active Secret Clearance | Security+ In Progress. Apply from Week 12.", phase: "Week 12+", cost: "Free", type: "jobs" },
      { name: "USAJobs.gov", url: "https://www.usajobs.gov", desc: "Federal direct hire positions. Slowest process but highest long-term compensation ceiling. Apply from Week 12.", phase: "Week 12+", cost: "Free", type: "jobs" },
    ]
  },
];

const buildAllKeys = () => {
  const keys = {};
  phases.forEach(p => {
    p.certs.forEach((_, i) => { keys[`cert_${p.id}_${i}`] = false; });
    p.projects.forEach((_, i) => { keys[`project_${p.id}_${i}`] = false; });
    p.milestones.forEach((_, i) => { keys[`milestone_${p.id}_${i}`] = false; });
  });
  return keys;
};

const rgbMap = { "#2E74B5": "46,116,181", "#1E6B3C": "30,107,60", "#7B5800": "123,88,0", "#4B2D8A": "75,45,138", "#0D6B74": "13,107,116" };
const rgb = (c) => rgbMap[c] || "46,116,181";
const typeLabels = { cert: "Certification", awareness: "Reading", lab: "Lab / Tool", jobs: "Job Search" };

const Checkbox = ({ checked, onChange, label, color }) => (
  <div onClick={onChange} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 8, padding: "6px 8px", borderRadius: 6, background: checked ? `rgba(${rgb(color)},0.12)` : "transparent", transition: "background 0.2s" }}>
    <div style={{ width: 18, height: 18, borderRadius: 4, border: `2px solid ${checked ? color : "#3a5a72"}`, background: checked ? color : "transparent", flexShrink: 0, marginTop: 1, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
      {checked && <div style={{ color: "#fff", fontSize: 11, fontWeight: "bold" }}>✓</div>}
    </div>
    <div style={{ fontSize: 13, color: checked ? "#e8edf5" : "#8aabb8", lineHeight: 1.5, transition: "color 0.2s" }}>{label}</div>
  </div>
);

const ProgressRing = ({ percent, color, size = 100, label }) => {
  const r = (size - 12) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={10} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={10}
          strokeDasharray={`${dash} ${circ - dash}`} strokeLinecap="round"
          transform={`rotate(-90 ${size/2} ${size/2})`} style={{ transition: "stroke-dasharray 0.6s ease" }} />
        <text x={size/2} y={size/2 + 6} textAnchor="middle" fill={color} fontSize={15} fontWeight="bold">{percent}%</text>
      </svg>
      <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.08em", textTransform: "uppercase", textAlign: "center" }}>{label}</div>
    </div>
  );
};

const LinkBtn = ({ url, label }) => (
  <a href={url} target="_blank" rel="noopener noreferrer"
    style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(46,116,181,0.15)", border: "1px solid rgba(46,116,181,0.4)", borderRadius: 6, padding: "5px 12px", fontSize: 12, color: "#7aaddb", textDecoration: "none" }}>
    🔗 {label}
  </a>
);

export default function RoadmapApp() {
  const [activeTab, setActiveTab] = useState("roadmap");
  const [expandedPhase, setExpandedPhase] = useState(null);
  const [checked, setChecked] = useState(() => {
    try { const s = localStorage.getItem(STORAGE_KEY); if (s) return { ...buildAllKeys(), ...JSON.parse(s) }; } catch {}
    return buildAllKeys();
  });

  useEffect(() => { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(checked)); } catch {} }, [checked]);
  const toggle = (key) => setChecked(prev => ({ ...prev, [key]: !prev[key] }));

  const totalCerts = phases.reduce((a, p) => a + p.certs.length, 0);
  const totalProjects = phases.reduce((a, p) => a + p.projects.length, 0);
  const totalMilestones = phases.reduce((a, p) => a + p.milestones.length, 0);
  const totalAll = totalCerts + totalProjects + totalMilestones;
  const doneCerts = Object.entries(checked).filter(([k, v]) => k.startsWith("cert_") && v).length;
  const doneProjects = Object.entries(checked).filter(([k, v]) => k.startsWith("project_") && v).length;
  const doneMilestones = Object.entries(checked).filter(([k, v]) => k.startsWith("milestone_") && v).length;
  const doneAll = doneCerts + doneProjects + doneMilestones;
  const pct = (d, t) => t === 0 ? 0 : Math.round((d / t) * 100);

  const phaseProgress = (id) => {
    const p = phases.find(x => x.id === id);
    const total = p.certs.length + p.projects.length + p.milestones.length;
    const done = p.certs.filter((_, i) => checked[`cert_${id}_${i}`]).length + p.projects.filter((_, i) => checked[`project_${id}_${i}`]).length + p.milestones.filter((_, i) => checked[`milestone_${id}_${i}`]).length;
    return { done, total, pct: pct(done, total) };
  };

  const tabs = [
    { id: "roadmap", label: "Roadmap" },
    { id: "progress", label: "My Progress" },
    { id: "projects", label: "Projects" },
    { id: "certs", label: "Credentials" },
    { id: "resources", label: "Resources & Links" },
    { id: "schedule", label: "Schedule" },
    { id: "apply", label: "When to Apply" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a0f1e 0%, #0d1a2e 50%, #0a0f1e 100%)", fontFamily: "Georgia, serif", color: "#e8edf5" }}>

      {/* HEADER */}
      <div style={{ background: "linear-gradient(180deg, rgba(30,55,100,0.95), rgba(15,30,60,0.95))", borderBottom: "1px solid rgba(46,116,181,0.4)", padding: "30px 40px 22px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#7aaddb", marginBottom: 8, textTransform: "uppercase" }}>Career Transition Roadmap</div>
              <h1 style={{ fontSize: 30, fontWeight: "normal", margin: "0 0 5px", color: "#fff" }}>Destiny Blackman</h1>
              <div style={{ fontSize: 15, color: "#a8c4e0", marginBottom: 3 }}>Enterprise Architect → IAM Analyst</div>
              <div style={{ fontSize: 12, color: "#7aaddb" }}>Active Secret Clearance · DoD Background · 18-Week Sprint</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
              {[{ label: "Progress", value: pct(doneAll, totalAll) + "%", color: "#7aaddb", hi: true }, { label: "Weeks", value: "18" }, { label: "Hrs/Wk", value: "16.5" }, { label: "Certs", value: "4" }, { label: "Projects", value: "7" }, { label: "Cost", value: "$685" }].map(s => (
                <div key={s.label} style={{ background: s.hi ? "rgba(46,116,181,0.25)" : "rgba(46,116,181,0.12)", border: `1px solid ${s.hi ? "#2E74B5" : "rgba(46,116,181,0.3)"}`, borderRadius: 8, padding: "9px 14px", textAlign: "center", minWidth: 68 }}>
                  <div style={{ fontSize: 20, fontWeight: "bold", color: s.color || "#7aaddb", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 9, color: "#8aabb8", marginTop: 3, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <div style={{ fontSize: 10, color: "#5a7a99", letterSpacing: "0.1em", textTransform: "uppercase" }}>Overall Progress</div>
              <div style={{ fontSize: 11, color: "#7aaddb" }}>{doneAll} of {totalAll} items complete</div>
            </div>
            <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct(doneAll, totalAll)}%`, background: "linear-gradient(90deg, #2E74B5, #1E6B3C)", borderRadius: 3, transition: "width 0.6s ease" }} />
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div style={{ background: "rgba(10,20,40,0.8)", borderBottom: "1px solid rgba(46,116,181,0.2)", padding: "0 40px", display: "flex", overflowX: "auto" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: "12px 18px", fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: activeTab === t.id ? "#7aaddb" : "#5a7a99", borderBottom: activeTab === t.id ? "2px solid #2E74B5" : "2px solid transparent", transition: "all 0.2s", fontFamily: "Georgia, serif", whiteSpace: "nowrap" }}>
            {t.id === "progress" ? `${t.label} · ${pct(doneAll, totalAll)}%` : t.label}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 40px" }}>

        {/* ROADMAP */}
        {activeTab === "roadmap" && (
          <div>
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 22 }}>18-Week Sprint — Click a Phase to Expand + Check Off Items</div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", height: 7, borderRadius: 4, overflow: "hidden", marginBottom: 7 }}>
                {[["#2E74B5",4],["#1E6B3C",5],["#7B5800",5],["#4B2D8A",4]].map(([c,f],i) => <div key={i} style={{ flex: f, background: c, marginRight: i<3?2:0 }} />)}
              </div>
              <div style={{ display: "flex" }}>
                {[["Wk 1–4 · Month 1",4],["Wk 5–9 · Month 2",5],["Wk 10–14 · Month 3",5],["Wk 15–18 · Month 4",4]].map(([l,f],i) => <div key={i} style={{ flex: f, fontSize: 10, color: "#5a7a99" }}>{l}</div>)}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {phases.map(phase => {
                const prog = phaseProgress(phase.id);
                return (
                  <div key={phase.id} style={{ background: "rgba(15,30,60,0.6)", border: `1px solid rgba(${rgb(phase.color)},0.4)`, borderLeft: `4px solid ${phase.color}`, borderRadius: 10, overflow: "hidden" }}>
                    <div onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)} style={{ padding: "15px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", background: expandedPhase === phase.id ? `rgba(${rgb(phase.color)},0.15)` : "transparent" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        <div style={{ background: phase.color, color: "#fff", fontWeight: "bold", fontSize: 10, letterSpacing: "0.15em", padding: "3px 9px", borderRadius: 4 }}>{phase.label}</div>
                        <div>
                          <div style={{ fontSize: 14, color: "#e8edf5" }}>{phase.title}</div>
                          <div style={{ fontSize: 11, color: "#5a7a99" }}>{phase.weeks} · {phase.month}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <div style={{ fontSize: 12, color: phase.color }}>{prog.done}/{prog.total} · {prog.pct}%</div>
                        <div style={{ width: 60, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${prog.pct}%`, background: phase.color, transition: "width 0.4s" }} />
                        </div>
                        <div style={{ color: "#5a7a99", fontSize: 14 }}>{expandedPhase === phase.id ? "▲" : "▼"}</div>
                      </div>
                    </div>
                    <div style={{ padding: "0 22px 12px", display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {phase.certs.map((c, i) => <span key={i} style={{ background: checked[`cert_${phase.id}_${i}`] ? `rgba(${rgb(phase.color)},0.22)` : "rgba(46,116,181,0.1)", border: `1px solid ${checked[`cert_${phase.id}_${i}`] ? phase.color : "rgba(46,116,181,0.25)"}`, borderRadius: 4, padding: "2px 9px", fontSize: 11, color: "#7aaddb" }}>🎓 {checked[`cert_${phase.id}_${i}`] ? "✓ " : ""}{c}</span>)}
                      {phase.projects.map((p, i) => <span key={i} style={{ background: checked[`project_${phase.id}_${i}`] ? "rgba(30,107,60,0.22)" : "rgba(30,107,60,0.1)", border: `1px solid ${checked[`project_${phase.id}_${i}`] ? "#1E6B3C" : "rgba(30,107,60,0.25)"}`, borderRadius: 4, padding: "2px 9px", fontSize: 11, color: "#5aad7a" }}>🔧 {checked[`project_${phase.id}_${i}`] ? "✓ " : ""}{p}</span>)}
                    </div>
                    {expandedPhase === phase.id && (
                      <div style={{ padding: "14px 22px 22px", borderTop: `1px solid rgba(${rgb(phase.color)},0.2)` }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                          <div>
                            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#5a7a99", textTransform: "uppercase", marginBottom: 9 }}>Certifications</div>
                            {phase.certs.map((c, i) => <Checkbox key={i} checked={!!checked[`cert_${phase.id}_${i}`]} onChange={() => toggle(`cert_${phase.id}_${i}`)} label={c} color={phase.color} />)}
                            <div style={{ marginTop: 12, fontSize: 10, letterSpacing: "0.2em", color: "#5a7a99", textTransform: "uppercase", marginBottom: 7 }}>Awareness</div>
                            {phase.awareness.map((a, i) => <div key={i} style={{ display: "flex", gap: 7, marginBottom: 5 }}><div style={{ width: 5, height: 5, borderRadius: "50%", background: "#0D6B74", marginTop: 7, flexShrink: 0 }} /><div style={{ fontSize: 12, color: "#7abfbf" }}>{a}</div></div>)}
                          </div>
                          <div>
                            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#5a7a99", textTransform: "uppercase", marginBottom: 9 }}>Projects</div>
                            {phase.projects.map((p, i) => <Checkbox key={i} checked={!!checked[`project_${phase.id}_${i}`]} onChange={() => toggle(`project_${phase.id}_${i}`)} label={p} color={phase.color} />)}
                          </div>
                          <div>
                            <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#5a7a99", textTransform: "uppercase", marginBottom: 9 }}>Milestones</div>
                            {phase.milestones.map((m, i) => <Checkbox key={i} checked={!!checked[`milestone_${phase.id}_${i}`]} onChange={() => toggle(`milestone_${phase.id}_${i}`)} label={m} color={phase.color} />)}
                            <div style={{ marginTop: 12, background: `rgba(${rgb(phase.color)},0.12)`, border: `1px solid ${phase.color}`, borderRadius: 7, padding: "10px 12px" }}>
                              <div style={{ fontSize: 12, color: "#e8edf5", lineHeight: 1.6 }}>{phase.apply}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PROGRESS */}
        {activeTab === "progress" && (
          <div>
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 26 }}>Your Progress — Saved Automatically to This Device</div>
            <div style={{ display: "flex", gap: 28, marginBottom: 36, flexWrap: "wrap", justifyContent: "center" }}>
              <ProgressRing percent={pct(doneAll, totalAll)} color="#7aaddb" size={110} label="Overall" />
              <ProgressRing percent={pct(doneCerts, totalCerts)} color="#2E74B5" size={110} label={`Certs ${doneCerts}/${totalCerts}`} />
              <ProgressRing percent={pct(doneProjects, totalProjects)} color="#1E6B3C" size={110} label={`Projects ${doneProjects}/${totalProjects}`} />
              <ProgressRing percent={pct(doneMilestones, totalMilestones)} color="#7B5800" size={110} label={`Milestones ${doneMilestones}/${totalMilestones}`} />
            </div>
            {phases.map(phase => {
              const prog = phaseProgress(phase.id);
              return (
                <div key={phase.id} style={{ background: "rgba(15,30,60,0.6)", border: `1px solid rgba(${rgb(phase.color)},0.3)`, borderLeft: `4px solid ${phase.color}`, borderRadius: 10, marginBottom: 14, overflow: "hidden" }}>
                  <div style={{ padding: "13px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", background: `rgba(${rgb(phase.color)},0.1)` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ background: phase.color, color: "#fff", fontWeight: "bold", fontSize: 10, letterSpacing: "0.12em", padding: "3px 9px", borderRadius: 4 }}>{phase.label}</div>
                      <div style={{ fontSize: 13, color: "#e8edf5" }}>{phase.title} · {phase.weeks}</div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ fontSize: 12, color: phase.color }}>{prog.done}/{prog.total}</div>
                      <div style={{ width: 80, height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${prog.pct}%`, background: phase.color, transition: "width 0.4s" }} />
                      </div>
                      <div style={{ fontSize: 12, color: phase.color, minWidth: 32 }}>{prog.pct}%</div>
                    </div>
                  </div>
                  <div style={{ padding: "14px 22px", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#5a7a99", textTransform: "uppercase", marginBottom: 9 }}>Certifications</div>
                      {phase.certs.map((c, i) => <Checkbox key={i} checked={!!checked[`cert_${phase.id}_${i}`]} onChange={() => toggle(`cert_${phase.id}_${i}`)} label={c} color={phase.color} />)}
                    </div>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#5a7a99", textTransform: "uppercase", marginBottom: 9 }}>Projects</div>
                      {phase.projects.map((p, i) => <Checkbox key={i} checked={!!checked[`project_${phase.id}_${i}`]} onChange={() => toggle(`project_${phase.id}_${i}`)} label={p} color={phase.color} />)}
                    </div>
                    <div>
                      <div style={{ fontSize: 10, letterSpacing: "0.2em", color: "#5a7a99", textTransform: "uppercase", marginBottom: 9 }}>Milestones</div>
                      {phase.milestones.map((m, i) => <Checkbox key={i} checked={!!checked[`milestone_${phase.id}_${i}`]} onChange={() => toggle(`milestone_${phase.id}_${i}`)} label={m} color={phase.color} />)}
                    </div>
                  </div>
                </div>
              );
            })}
            <div style={{ textAlign: "center", marginTop: 14 }}>
              <button onClick={() => { if (window.confirm("Reset all progress? This cannot be undone.")) { setChecked(buildAllKeys()); localStorage.removeItem(STORAGE_KEY); } }} style={{ background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, color: "#3a5a72", fontSize: 11, padding: "7px 18px", cursor: "pointer" }}>Reset all progress</button>
            </div>
          </div>
        )}

        {/* RESOURCES */}
        {activeTab === "resources" && (
          <div>
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 26 }}>All Resources & Links — Click Any Link to Open in a New Tab</div>
            {resources.map((section, si) => (
              <div key={si} style={{ marginBottom: 32 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                  <div style={{ width: 4, height: 18, background: section.color, borderRadius: 2 }} />
                  <div style={{ fontSize: 14, color: "#e8edf5" }}>{section.category}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                  {section.items.map((item, ii) => (
                    <div key={ii} style={{ background: "rgba(15,30,60,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: `3px solid ${section.color}`, borderRadius: 8, padding: "13px 16px", display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
                      <div style={{ flex: 1, minWidth: 180 }}>
                        <div style={{ fontSize: 13, color: "#e8edf5", marginBottom: 4 }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: "#6a8aa8", lineHeight: 1.6, marginBottom: 10 }}>{item.desc}</div>
                        <LinkBtn url={item.url} label="Open Resource" />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, minWidth: 110 }}>
                        <div style={{ fontSize: 12, color: item.cost === "Free" || item.cost === "Free*" ? "#5aad7a" : "#7aaddb", fontWeight: "bold" }}>{item.cost}</div>
                        <div style={{ fontSize: 9, color: section.color, border: `1px solid ${section.color}`, borderRadius: 10, padding: "2px 7px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{typeLabels[item.type]}</div>
                        <div style={{ fontSize: 10, color: "#3a5a72" }}>{item.phase}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PROJECTS */}
        {activeTab === "projects" && (
          <div>
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 26 }}>7 Portfolio Projects — Hands-On Work Across All Tools</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {allProjects.map(p => (
                <div key={p.num} style={{ background: "rgba(15,30,60,0.6)", border: `1px solid rgba(${rgb(p.color)},0.35)`, borderTop: `3px solid ${p.color}`, borderRadius: 10, padding: "18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 9 }}>
                    <div style={{ fontSize: 24, fontWeight: "bold", color: p.color, opacity: 0.4, lineHeight: 1 }}>{p.num}</div>
                    <span style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 4, padding: "2px 7px", fontSize: 10, color: "#5a7a99" }}>{p.weeks}</span>
                  </div>
                  <div style={{ fontSize: 14, color: "#e8edf5", marginBottom: 5 }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: p.color, marginBottom: 9 }}>📱 {p.platform}</div>
                  <div style={{ fontSize: 11, color: "#5a8aa0", lineHeight: 1.6 }}>{p.skills}</div>
                  <div style={{ marginTop: 10 }}>
                    <span style={{ background: `rgba(${rgb(p.color)},0.18)`, border: `1px solid ${p.color}`, borderRadius: 10, padding: "2px 9px", fontSize: 9, color: p.color, textTransform: "uppercase" }}>Phase {p.num === "AD" ? "2 / Bonus" : p.phase}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CERTS */}
        {activeTab === "certs" && (
          <div>
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 26 }}>Full Credential Stack — $685 Total · All Study Materials Free</div>
            <div style={{ marginBottom: 32, padding: "18px 0", position: "relative" }}>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "rgba(46,116,181,0.2)", transform: "translateY(-50%)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                {[["ISC2 CC","Wk 2","Free","#2E74B5"],["Security+","Wk 7–8","$370","#1E6B3C"],["AZ-900","Wk 10","Free","#7B5800"],["SailPoint","Wk 10","Free","#7B5800"],["SC-300","Wk 15–16","$165","#4B2D8A"],["Okta Pro","Wk 17","$150","#4B2D8A"],["CyberArk","Wk 17","Free","#4B2D8A"]].map(([name,week,cost,color],i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, flex: 1 }}>
                    <div style={{ fontSize: 9, color: "#5a7a99" }}>{week}</div>
                    <div style={{ width: 11, height: 11, borderRadius: "50%", background: color, border: "3px solid #0a0f1e", boxShadow: `0 0 9px ${color}`, zIndex: 1 }} />
                    <div style={{ background: "rgba(15,30,60,0.9)", border: `1px solid ${color}`, borderRadius: 5, padding: "5px 7px", textAlign: "center", maxWidth: 105 }}>
                      <div style={{ fontSize: 10, color: "#e8edf5", marginBottom: 2 }}>{name}</div>
                      <div style={{ fontSize: 10, color: cost === "Free" ? "#5aad7a" : "#7aaddb", fontWeight: "bold" }}>{cost}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { name: "ISC2 Certified in Cybersecurity (CC)", week: "Week 2", cost: "Free", color: "#2E74B5", url: "https://www.isc2.org/Certifications/CC", study: "https://www.isc2.org/Certifications/CC", why: "Quick win — free course and free exam. Register Day 1. Study alongside Security+ in Weeks 1–2.", type: "Certification" },
                { name: "CompTIA Security+", week: "Week 7–8", cost: "$370", color: "#1E6B3C", url: "https://www.pearsonvue.com/us/en/comptia.html", study: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/", why: "DoD 8570 gateway — required for almost every federal cybersecurity role. The most important cert in this plan. Triggers soft launch of applications.", type: "Certification" },
                { name: "AZ-900 (Study Material Only — No Exam)", week: "Week 10", cost: "Free", color: "#7B5800", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/", study: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/", why: "Azure orientation before SC-300. Complete the free Microsoft Learn path. No exam booking needed.", type: "Study Only" },
                { name: "SailPoint Identity Security Fundamentals", week: "Week 10", cost: "Free", color: "#0D6B74", url: "https://university.sailpoint.com", study: "https://university.sailpoint.com", why: "Entry-level awareness of the dominant federal IGA platform. 3–4 hours. Enough for interviews.", type: "Awareness" },
                { name: "MS SC-300 — Identity and Access Administrator", week: "Week 15–16", cost: "$165", color: "#4B2D8A", url: "https://www.pearsonvue.com/us/en/microsoft.html", study: "https://learn.microsoft.com/en-us/credentials/certifications/identity-and-access-administrator/", why: "The most directly relevant certification for IAM Analyst roles. Certifies everything you built in your Entra ID projects.", type: "Certification" },
                { name: "Okta Certified Professional", week: "Week 17", cost: "$150", color: "#4B2D8A", url: "https://www.webassessor.com/okta", study: "https://training.okta.com", why: "Platform breadth — shows you are not a single-vendor candidate. Project 6 lab work is your exam prep.", type: "Certification" },
                { name: "CyberArk Trustee", week: "Week 17", cost: "Free", color: "#4B2D8A", url: "https://www.cyberark.com/why-cyberark/education-and-training/", study: "https://www.cyberark.com/why-cyberark/education-and-training/", why: "PAM awareness — 2 to 3 hours total. Enough to speak to privileged access management in interviews.", type: "Awareness" },
              ].map((cert, i) => (
                <div key={i} style={{ background: "rgba(15,30,60,0.6)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: `4px solid ${cert.color}`, borderRadius: 8, padding: "14px 18px", display: "flex", gap: 18, flexWrap: "wrap" }}>
                  <div style={{ minWidth: 85, textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: cert.color, fontWeight: "bold", marginBottom: 3 }}>{cert.week}</div>
                    <div style={{ fontSize: 14, color: cert.cost === "Free" ? "#5aad7a" : "#7aaddb", fontWeight: "bold", marginBottom: 5 }}>{cert.cost}</div>
                    <div style={{ fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3a5a72", border: `1px solid ${cert.color}`, borderRadius: 3, padding: "2px 4px" }}>{cert.type}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontSize: 13, color: "#e8edf5", marginBottom: 4 }}>{cert.name}</div>
                    <div style={{ fontSize: 12, color: "#6a8aa8", lineHeight: 1.6, marginBottom: 10 }}>{cert.why}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <LinkBtn url={cert.study} label="Study Materials" />
                      <LinkBtn url={cert.url} label="Register / Book Exam" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SCHEDULE */}
        {activeTab === "schedule" && (
          <div>
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 26 }}>Weekly Study Routine — 16.5 Hours Per Week</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
              {[["Cert Study","~7.5 hrs","#2E74B5"],["Projects","~9 hrs","#1E6B3C"],["Total / Week","~16.5 hrs","#4B2D8A"],["Total / 18 Weeks","~297 hrs","#7B5800"]].map(([l,v,c]) => (
                <div key={l} style={{ background: "rgba(15,30,60,0.6)", border: "1px solid rgba(255,255,255,0.07)", borderTop: `3px solid ${c}`, borderRadius: 8, padding: "12px 18px", flex: 1, minWidth: 110 }}>
                  <div style={{ fontSize: 20, color: c, marginBottom: 3 }}>{v}</div>
                  <div style={{ fontSize: 10, color: "#5a7a99", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              {weeklySchedule.map((day, i) => (
                <div key={i} style={{ background: "rgba(15,30,60,0.6)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: 8, display: "flex", overflow: "hidden" }}>
                  <div style={{ background: day.day === "SAT" || day.day === "SUN" ? "rgba(46,116,181,0.2)" : "rgba(30,50,80,0.5)", width: 55, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: "bold", letterSpacing: "0.15em", color: day.day === "SAT" || day.day === "SUN" ? "#7aaddb" : "#4a6a85", borderRight: "1px solid rgba(255,255,255,0.04)" }}>{day.day}</div>
                  <div style={{ flex: 1, display: "flex", padding: "12px 14px", gap: 16, flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 170 }}>
                      <div style={{ fontSize: 9, color: "#2E74B5", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>Cert Study</div>
                      <div style={{ fontSize: 12, color: "#b8cde0" }}>{day.study}</div>
                    </div>
                    <div style={{ flex: 1, minWidth: 170 }}>
                      <div style={{ fontSize: 9, color: "#1E6B3C", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 3 }}>Project / Portfolio</div>
                      <div style={{ fontSize: 12, color: "#b8cde0" }}>{day.project}</div>
                    </div>
                    <div style={{ minWidth: 65, textAlign: "right" }}>
                      <div style={{ fontSize: 9, color: "#5a7a99", textTransform: "uppercase", marginBottom: 3 }}>Total</div>
                      <div style={{ fontSize: 13, color: "#7aaddb", fontWeight: "bold" }}>{day.total}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 16, background: "rgba(123,88,0,0.12)", border: "1px solid rgba(123,88,0,0.3)", borderLeft: "4px solid #7B5800", borderRadius: 8, padding: "13px 16px" }}>
              <div style={{ fontSize: 12, color: "#c4a060", lineHeight: 1.7, fontStyle: "italic" }}>Saturday rule: Do the 90-minute practice exam in the morning, take a real break of at least 60 minutes, then sit down for project work. Never blend them — fatigue will hurt both. This structure is what makes the schedule sustainable for 18 weeks.</div>
            </div>
          </div>
        )}

        {/* APPLY */}
        {activeTab === "apply" && (
          <div>
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 26 }}>Application Strategy — 3 Launch Windows</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { week: "WEEK 8", label: "Soft Launch", color: "#1E6B3C", trigger: "Security+ passed", desc: "The moment Security+ is in hand you are qualified for a significant portion of entry-level IAM Analyst postings. Your clearance plus Security+ plus your DoD background is already a competitive package.", actions: ["Apply to roles where Security+ satisfies the cert requirement","List SC-300 and Okta as 'In Progress — Expected [Month]'","Primary board: ClearanceJobs.com — search IAM Analyst, ISSO, Access Control Analyst","Target: Leidos, SAIC, Booz Allen, CACI, ManTech, Perspecta, GDIT, Noblis","Leverage network first — Seneca, Deloitte, AIS contacts move 3–4x faster than cold apps"], links: [["ClearanceJobs.com","https://www.clearancejobs.com"],["LinkedIn Jobs","https://www.linkedin.com/jobs"]] },
                { week: "WEEK 12", label: "Full Launch", color: "#2E74B5", trigger: "SC-300 in progress + 4 projects complete", desc: "Security+ passed, four completed projects, AD TryHackMe done, SC-300 in progress. You now have real work to reference by name in every interview.", actions: ["Reference projects by name — specific, real, documented work","Expand to LinkedIn Jobs and USAJobs beyond ClearanceJobs","Target 10–15 active applications total","Begin interview prep — frame DSCA audit work as applied IAM experience","Add IAM-specific language to resume based on active postings you see"], links: [["ClearanceJobs.com","https://www.clearancejobs.com"],["USAJobs.gov","https://www.usajobs.gov"],["LinkedIn Jobs","https://www.linkedin.com/jobs"]] },
                { week: "WEEK 16", label: "Power Position", color: "#4B2D8A", trigger: "SC-300 passed · Okta nearly done · Portfolio complete", desc: "SC-300 passed, Okta in final stretch, portfolio assembled. The full credential stack plus clearance plus portfolio together are rare at entry level. This is your strongest window.", actions: ["Update every active application the day SC-300 posts to your transcript","Negotiate pending offers from position of additional credential strength","Apply broadly and aggressively — this is the power window","Portfolio PDF ready to attach to every single application","Target salary: $90k–$115k entry, negotiate toward $110k–$120k with portfolio"], links: [["ClearanceJobs.com","https://www.clearancejobs.com"],["USAJobs.gov","https://www.usajobs.gov"]] },
              ].map((w, i) => (
                <div key={i} style={{ background: "rgba(15,30,60,0.6)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: `4px solid ${w.color}`, borderRadius: 10, overflow: "hidden" }}>
                  <div style={{ padding: "13px 22px", background: `rgba(${rgb(w.color)},0.12)`, display: "flex", alignItems: "center", gap: 14 }}>
                    <div style={{ background: w.color, color: "#fff", fontSize: 10, fontWeight: "bold", letterSpacing: "0.1em", padding: "3px 9px", borderRadius: 4 }}>{w.week}</div>
                    <div>
                      <div style={{ fontSize: 14, color: "#e8edf5" }}>{w.label}</div>
                      <div style={{ fontSize: 11, color: w.color }}>Trigger: {w.trigger}</div>
                    </div>
                  </div>
                  <div style={{ padding: "14px 22px" }}>
                    <div style={{ fontSize: 12, color: "#8aabb8", lineHeight: 1.7, marginBottom: 12 }}>{w.desc}</div>
                    {w.actions.map((a, j) => <div key={j} style={{ display: "flex", gap: 9, alignItems: "flex-start", marginBottom: 6 }}><div style={{ color: w.color, marginTop: 2, flexShrink: 0 }}>→</div><div style={{ fontSize: 12, color: "#b8cde0", lineHeight: 1.5 }}>{a}</div></div>)}
                    <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
                      {w.links.map(([label, url], j) => <LinkBtn key={j} url={url} label={label} />)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24 }}>
              <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 12 }}>Realistic Offer Timeline</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[["Network Referral","2–4 weeks","Fastest — prioritize Seneca, Deloitte, AIS contacts","#1E6B3C"],["ClearanceJobs Cold Apply","4–6 weeks","Cleared candidates move faster — no background check delay","#2E74B5"],["LinkedIn / General Boards","4–8 weeks","Less targeted but worth running in parallel","#7B5800"],["USAJobs Federal Direct","6–12 weeks","Slowest but highest long-term compensation ceiling","#4B2D8A"]].map(([type,time,note,color],i) => (
                  <div key={i} style={{ background: "rgba(15,30,60,0.6)", border: "1px solid rgba(255,255,255,0.05)", borderTop: `3px solid ${color}`, borderRadius: 8, padding: "13px 15px" }}>
                    <div style={{ fontSize: 12, color: "#e8edf5", marginBottom: 3 }}>{type}</div>
                    <div style={{ fontSize: 19, color, marginBottom: 5 }}>{time}</div>
                    <div style={{ fontSize: 11, color: "#5a7a99", lineHeight: 1.5 }}>{note}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ borderTop: "1px solid rgba(46,116,181,0.15)", padding: "16px 40px", textAlign: "center", fontSize: 10, color: "#3a5a72", letterSpacing: "0.1em" }}>
        DESTINY BLACKMAN · IAM ANALYST SPRINT PLAN · 18 WEEKS · START TODAY
      </div>
    </div>
  );
}
