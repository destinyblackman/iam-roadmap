import { useState, useEffect } from "react";

const STORAGE_KEY = "destiny_iam_progress_v5";

const phases = [
  {
    id: 1,
    label: "PHASE 1",
    title: "ISC2 CC + Okta Foundation",
    weeks: "Weeks 1–2",
    month: "March 2026",
    color: "#2E74B5",
    deadline: null,
    certs: ["ISC2 CC — Pass by end of Week 2", "Okta Fundamentals Learning Path — Begin Day 1"],
    projects: ["Project 1: Okta Identity Foundation Lab"],
    awareness: ["DoD ICAM + FICAM Terminology Reading (2 hrs) — Day 1"],
    apply: "Update LinkedIn headline and resume now — do not wait.",
    milestones: [
      "Day 1: Enroll in ISC2 CC at isc2.org — start Module 1 immediately",
      "Day 1: Activate Okta grant — complete Okta Fundamentals Unit 1 (Org Setup)",
      "Day 1: Read DoD ICAM overview and FICAM architecture — 2 hrs total",
      "Day 3: ISC2 CC Modules 2–3 complete (Business Continuity, Access Controls)",
      "Day 3: Okta Fundamentals Units 2–3 complete (Users, Groups, Directory Integration)",
      "Day 5: Project 1 — Okta org directory built, departments and groups configured",
      "Day 6: ISC2 CC Modules 4–5 complete (Network Security, Security Operations)",
      "Day 6: Okta Fundamentals Units 4–5 complete (Authentication Policies, MFA)",
      "Day 8: Project 1 — MFA policies enforced, password policy configured, design doc drafted",
      "Day 9: ISC2 CC full practice exam — score 80%+ on two consecutive attempts",
      "ISC2 CC EXAM PASSED — Week 2",
      "Week 2: Project 1 — design document complete, all screenshots taken, write-up done",
    ],
    hours: "~16.5 hrs/week",
  },
  {
    id: 2,
    label: "PHASE 2",
    title: "Okta Professional + Lifecycle Automation",
    weeks: "Weeks 3–7",
    month: "April–Early May 2026",
    color: "#0D6B74",
    deadline: "⚠️ Okta Professional — Hard Deadline May 10",
    certs: ["Okta Professional — Sit by Week 7 (May 10 hard deadline)", "Security+ Study — Begins Week 3"],
    projects: ["Project 2: User Lifecycle Automation with Okta Workflows"],
    awareness: ["NIST SP 800-63 Executive Summaries (800-63A, B, C) — Week 6"],
    apply: "SOFT LAUNCH — Apply immediately after Okta Professional passes. ISC2 CC + Okta Professional + Active Secret Clearance is a competitive entry package.",
    milestones: [
      "Week 3: Okta Professional learning path Units 1–3 complete (Lifecycle Management, Provisioning, App Integration)",
      "Week 3: Security+ study started — Professor Messer Threats and Attacks domain begun",
      "Week 3: Project 2 — new hire provisioning workflow built in Okta Workflows, tested end-to-end",
      "Week 4: Okta Professional learning path Units 4–6 complete (SSO, SAML, Access Policies)",
      "Week 4: Project 2 — role change mid-lifecycle workflow built and tested",
      "Week 5: Okta Professional learning path Units 7–9 complete (Reporting, Troubleshooting, API)",
      "Week 5: Project 2 — offboarding workflow built, account deactivation and app revocation tested",
      "Week 6: All Okta learning path content complete — practice and review in your Okta org",
      "Week 6: NIST SP 800-63 executive summaries read (800-63A, B, and C)",
      "Week 6: Project 2 — all three workflows documented with screenshots and business rule explanations",
      "Week 7: Okta Professional practice assessment — score 75%+",
      "OKTA PROFESSIONAL EXAM PASSED — by May 10",
      "Week 7: Security+ — first full Jason Dion timed practice exam, baseline score recorded",
    ],
    hours: "~16.5 hrs/week",
  },
  {
    id: 3,
    label: "PHASE 3",
    title: "Security+ Exam + SSO Integration Project",
    weeks: "Weeks 8–11",
    month: "May–June 2026",
    color: "#1E6B3C",
    deadline: null,
    certs: ["Security+ — Pass Week 10 or 11", "Okta Admin — Path activated, Units 1–3 complete"],
    projects: ["Project 3: SAML + OIDC SSO App Integration"],
    awareness: ["SailPoint University Identity Security Fundamentals (3–4 hrs) — Week 11"],
    apply: "FULL LAUNCH — Security+ passed. ISC2 CC + Okta Professional + Security+ + Active Secret Clearance. Apply aggressively on ClearanceJobs, LinkedIn, and USAJobs.",
    milestones: [
      "Week 8: Security+ — review two weakest domains, rebuild Anki deck for those topics",
      "Week 8: Security+ — Jason Dion practice exam, score 75%+",
      "Week 8: Okta Administrator cert — activate second grant window, begin Administrator learning path Units 1–3",
      "Week 8: Project 3 — first SAML app integration configured in Okta, login flow tested",
      "Week 9: Security+ — Jason Dion practice exam, score 78%+",
      "Week 9: Project 3 — OIDC app integration configured, tested, and compared to SAML flow",
      "Week 9: Project 3 — SAML assertion captured and attribute mapping documented",
      "Week 10: Security+ — third practice exam, score 80%+ — book exam immediately",
      "Week 10: Project 3 — troubleshooting runbook written (5 most common SAML/OIDC errors)",
      "SECURITY+ EXAM PASSED — Week 10 or 11",
      "Week 11: Project 3 — full write-up complete, GitHub repo created with all documentation",
      "Week 11: Okta Administrator cert — learning path Units 4–6 complete (Advanced Policies, Hooks, Workflows)",
      "Week 11: SailPoint University Fundamentals complete",
      "Week 11: Resume and LinkedIn updated same day Security+ posts",
    ],
    hours: "~16.5 hrs/week",
  },
  {
    id: 4,
    label: "PHASE 4",
    title: "SC-300 + Okta Administrator + Core IAM Projects",
    weeks: "Weeks 12–16",
    month: "June–July 2026",
    color: "#7B5800",
    deadline: null,
    certs: ["SC-300 — Study and Exam by Week 16", "Okta Administrator — Exam within 90-day window"],
    projects: [
      "Project 4: Hybrid Identity — AD + Entra ID RBAC + Access Review",
      "Project 5: NIST 800-53 AC + IA Gap Assessment + POA&M",
      "Project 6: PowerShell + Microsoft Graph API Automation",
    ],
    awareness: ["CyberArk Trustee + PAM Demo — Week 15 Saturday block (verify PAM Demo at training.cyberark.com first)"],
    apply: "POWER POSITION — SC-300 in progress, Okta Administrator done, 6 projects complete. Negotiate any pending offers from strength.",
    milestones: [
      "Week 12: TryHackMe AD Basics room complete — all tasks done, notes written",
      "Week 12: SC-300 Domain 1 complete — Implement Identities in Entra ID",
      "Week 12: Okta Administrator cert — learning path Units 7–9 complete, practice assessment begun",
      "Week 12: Project 4 — hybrid identity architecture diagram drafted in Draw.io (AD + Entra Connect + Okta)",
      "Week 13: SC-300 Domain 2 complete — Implement Authentication and Access Management",
      "Week 13: Project 4 — RBAC structure designed and built in Entra ID, AD group sync documented",
      "Week 13: Project 4 — access review complete, findings report written with risk ratings and remediation",
      "Week 13: Okta Administrator cert — practice assessment score 75%+, exam booked at Pearson VUE",
      "Week 14: SC-300 Domain 3 complete — Implement Access Management for Apps",
      "Week 14: Project 5 — gap assessment started, AC and IA controls being rated",
      "Week 14: Project 6 — Script 1 and 2 written and tested (user export + inactive account detection)",
      "OKTA ADMINISTRATOR EXAM PASSED — Week 14 or 15",
      "Week 15: SC-300 Domain 4 complete — Plan and Implement Identity Governance",
      "Week 15: Project 5 — gap assessment complete, all controls rated and risk-scored",
      "Week 15: Project 5 — POA&M complete, access request intake sample added, executive summary written",
      "Week 15: Project 6 — Script 3 and 4 written and tested (privileged role report + privilege escalation detection)",
      "Week 15: Project 6 — Script 5 written and tested (sign-in log analysis + incident summary report)",
      "Week 15: CyberArk Trustee complete — Pearson VUE test center",
      "Week 15: CyberArk PAM Demo complete if verified as valid credential",
      "Week 16: All 5 PowerShell scripts pushed to public GitHub repo with README",
      "Week 16: MeasureUp SC-300 practice test — score 75%+",
      "Week 16: MeasureUp SC-300 practice test — score 80%+ on two consecutive — book exam",
      "SC-300 EXAM PASSED — Week 16",
    ],
    hours: "~16.5 hrs/week",
  },
  {
    id: 5,
    label: "PHASE 5",
    title: "Portfolio Assembly + Full Application Push",
    weeks: "Weeks 17–18",
    month: "July 2026",
    color: "#4B2D8A",
    deadline: null,
    certs: ["All credentials complete — ISC2 CC, Okta Professional, Okta Administrator, Security+, SC-300, CyberArk Trustee"],
    projects: ["Portfolio Assembly — All 6 Projects", "Portfolio Exported as PDF", "Professional Bridge Narrative Written"],
    awareness: ["Final resume polish — IAM Admin, Analyst, and Engineer language throughout"],
    apply: "FULL POWER — 6 credentials, 6 projects, Active Secret Clearance, full portfolio. Apply to IAM Admin, Analyst, and Engineer roles. Negotiate hard. Target $90k–$120k.",
    milestones: [
      "Week 17: Project 1 portfolio page complete — Okta org screenshots, design decisions, MFA policies documented",
      "Week 17: Project 2 portfolio page complete — all 3 workflow diagrams, screenshots, and business rule explanations",
      "Week 17: Project 3 portfolio page complete — SAML vs OIDC comparison, troubleshooting runbook, GitHub link",
      "Week 17: Project 4 portfolio page complete — AD architecture diagram, RBAC docs, access review report attached",
      "Week 17: Project 5 portfolio page complete — gap assessment workbook, POA&M, access request intake, executive summary",
      "Week 17: Project 6 portfolio page complete — all 5 scripts documented, GitHub repo linked with README",
      "Week 17: Professional Bridge narrative written — 2 paragraphs connecting EA and DSCA audit work to IAM, mentions SailPoint and CyberArk awareness",
      "Week 17: Message sent to 5 contacts at Seneca, Deloitte, or AIS — letting them know you are making a move",
      "Week 18: Portfolio formatted — cover page, table of contents, consistent layout across all 6 projects",
      "Week 18: Resume finalized — all credentials listed, IAM Admin/Analyst/Engineer skills, Microsoft Graph API called out",
      "Week 18: LinkedIn updated — all credentials added, About section rewritten with IAM focus across all three roles",
      "Week 18: Portfolio exported as PDF and test-opened to confirm clean formatting",
      "Week 18: 5 targeted applications submitted with portfolio attached",
    ],
    hours: "~16.5 hrs/week",
  },
];

const allProjects = [
  {
    num: "01",
    name: "Okta Identity Foundation Lab",
    platform: "Okta Org (Grant Tenant)",
    weeks: "Wk 1–2",
    phase: 1,
    color: "#2E74B5",
    skills: "Directory Structure · Group Management · MFA Enforcement · Password Policy · Platform Administration",
    desc: "Build your Okta org from scratch as you complete the Okta Fundamentals learning path. Configure a directory structure for a fictional DoD contractor org — departments, user groups by role and function, profile attributes. Enforce MFA enrollment policies and a compliant password policy. Set up at least one app integration with SSO. Document every design decision in a written configuration overview explaining what you built, why you structured it that way, and how it enforces least privilege. This project runs in parallel with your Fundamentals learning — each unit you study, you immediately implement in your org. Deliverable: configured Okta org + design document with screenshots.",
  },
  {
    num: "02",
    name: "User Lifecycle Automation — Okta Workflows",
    platform: "Okta Workflows",
    weeks: "Wk 3–6",
    phase: 2,
    color: "#0D6B74",
    skills: "Joiner-Mover-Leaver · Automated Provisioning · Deprovisioning · Access Governance · No-Code Automation",
    desc: "Build three automated lifecycle workflows using Okta Workflows — the no-code automation engine inside your Okta org. Workflow 1: new hire provisioning that automatically assigns groups and app access based on department attribute. Workflow 2: role change that modifies access mid-lifecycle when a user's title or department changes. Workflow 3: offboarding that triggers on manager request, deactivates the account, revokes all app sessions, and logs the event. Document each workflow with a flow diagram, screenshots of the full configuration, and a written explanation of the business rule it enforces and what the access risk is without it. This is the highest-frequency daily task in every IAM Admin and Analyst role. Deliverable: 3 working Workflows + documentation package.",
  },
  {
    num: "03",
    name: "SAML + OIDC SSO App Integration",
    platform: "Okta + SAML/OIDC Test Apps",
    weeks: "Wk 8–11",
    phase: 3,
    color: "#1E6B3C",
    skills: "SAML 2.0 · OIDC · OAuth 2.0 · Attribute Mapping · Federation · SSO Troubleshooting",
    desc: "Configure SSO integrations for two applications in your Okta org — one using SAML 2.0 and one using OIDC/OAuth 2.0. For the SAML integration: capture the SAML assertion, document the full attribute mapping, and test both SP-initiated and IdP-initiated login flows. For the OIDC integration: configure the authorization code flow, document the token structure, and test login. Write a side-by-side comparison of SAML vs OIDC covering when you would choose each protocol and why. Build a troubleshooting runbook covering the five most common errors for each protocol — this is what an IAM Engineer is expected to produce and reference. Push all documentation to a public GitHub repo. Deliverable: two working SSO integrations + protocol comparison doc + troubleshooting runbook + GitHub repo.",
  },
  {
    num: "04",
    name: "Hybrid Identity — AD + Entra ID RBAC + Access Review",
    platform: "TryHackMe + Azure Entra ID + Draw.io",
    weeks: "Wk 12–13",
    phase: 4,
    color: "#7B5800",
    skills: "Active Directory · Hybrid Identity · Entra Connect · RBAC · Least Privilege · Access Certification · Privilege Creep · Audit Reporting",
    desc: "This project covers the full hybrid identity picture that most federal DoD environments run. Part 1 — AD Foundation: Complete the TryHackMe Active Directory Basics room (6–8 hrs). Learn domain structure, OUs, GPOs, and group management. Build a Draw.io architecture diagram showing how on-prem AD syncs to Entra ID via Entra Connect in a fictional DoD contractor environment — which system owns what, how the sync relationship works, where authentication decisions are made, and how LDAP fits in. Part 2 — RBAC Design: Using SC-300 Domain 1 and 2 knowledge, design and implement a full RBAC structure in Entra ID for three departments and two privilege tiers. Mirror the on-prem AD group structure so the hybrid sync relationship is documented end to end. Assign roles using least-privilege principles with written business justification for every assignment. Part 3 — Access Review: Conduct a simulated quarterly access review — evaluate all role assignments against current business need, flag over-provisioned accounts and privilege creep, and produce a formal access certification report with findings, risk ratings, and remediation actions. This is the most common audit deliverable an IAM Analyst produces. Deliverable: AD architecture diagram + hybrid identity design doc + RBAC documentation + access review report.",
  },
  {
    num: "05",
    name: "NIST 800-53 AC + IA Gap Assessment + POA&M",
    platform: "Excel + Word",
    weeks: "Wk 14–15",
    phase: 4,
    color: "#7B5800",
    skills: "GRC · NIST 800-53 · Risk Rating · POA&M · AC Controls · IA Controls · Access Request Process · CMMC · FedRAMP · Audit Support",
    desc: "Perform a formal gap assessment against two NIST SP 800-53 Rev 5 control families — AC (Access Control) and IA (Identification and Authentication) — for a simulated DoD contractor system. Rate each control: Implemented, Partially Implemented, or Not Implemented. Risk-score all gaps using High, Medium, Low framework. Build a formal Plan of Action and Milestones (POA&M) using the FedRAMP template — every gap gets an owner, a milestone, a remediation action, and a target completion date. Add a simulated access request intake section: create a sample access request form, document the approval chain, record the access decision with justification, and show the audit trail entry. This demonstrates the full request-to-approval-to-audit lifecycle that IAM Analysts manage daily. Write a one-page executive summary for a CISO audience explaining the overall risk posture. This project maps directly to your DSCA audit experience and will be your strongest interview talking point for federal roles. Deliverable: gap assessment Excel workbook + POA&M document + access request intake sample + executive summary.",
  },
  {
    num: "06",
    name: "PowerShell + Microsoft Graph API Automation",
    platform: "PowerShell + Microsoft Graph API + GitHub",
    weeks: "Wk 15–16",
    phase: 4,
    color: "#4B2D8A",
    skills: "PowerShell · Microsoft Graph API · Automation · Access Reporting · Incident Detection · Log Analysis · Scripting · GitHub",
    desc: "Write five practical PowerShell scripts that use the Microsoft Graph API to automate real IAM tasks. Script 1: export all Entra ID users with role assignments and last sign-in date to a formatted CSV — the most common access review prep task. Script 2: identify and disable accounts inactive for 90+ days — automated dormant account remediation. Script 3: generate a report of all users assigned to privileged roles (Global Admin, Privileged Role Admin, etc.) — a standard audit deliverable. Script 4: detect accounts that received new privileged role assignments in the last 30 days — simulated privilege escalation detection. Script 5: pull Entra ID sign-in logs, flag failed authentication attempts and suspicious login patterns, and produce a formatted incident summary report — this is what IAM Analysts do when an access alert fires. Comment every script thoroughly. Push all five to a public GitHub repo with a README explaining the business use case for each. This is the skill that separates you from every other entry-level candidate. Deliverable: 5 working scripts + GitHub repo with README.",
  },
];

const weeklySchedule = [
  { day: "MON", study: "60 min — Video lessons, follow syllabus", project: "30 min — Project work", total: "90 min" },
  { day: "TUE", study: "60 min — Chapter reading and notes", project: "30 min — Project work", total: "90 min" },
  { day: "WED", study: "30 min — Anki review or light reading", project: "90 min — Hands-on lab session", total: "120 min" },
  { day: "THU", study: "60 min — Video lessons continued", project: "30 min — Portfolio documentation", total: "90 min" },
  { day: "FRI", study: "45 min — 20-question quiz + Anki review", project: "45 min — Portfolio writing", total: "90 min" },
  { day: "SAT", study: "90 min — Full timed practice exam then BREAK", project: "2 hrs — Project work (afternoon)", total: "3.5 hrs" },
  { day: "SUN", study: "30 min — Light review (optional, afternoon only)", project: "2 hrs — Project or portfolio", total: "2.5 hrs" },
];

const resources = [
  {
    category: "Certifications & Study",
    color: "#2E74B5",
    items: [
      { name: "ISC2 CC — Free Course & Exam", url: "https://www.isc2.org/Certifications/CC", desc: "Register Day 1. Free self-paced course and free exam. Complete in Weeks 1–2.", phase: "Week 1–2", cost: "Free", type: "cert" },
      { name: "Okta Training — Grant Program Learning Paths", url: "https://training.okta.com", desc: "Activate your grant Day 1. Complete Okta Fundamentals then Administration paths. 60-day deadline for Professional voucher — May 10.", phase: "Weeks 1–7", cost: "Free (Grant)", type: "cert" },
      { name: "Okta Professional Exam Registration", url: "https://www.webassessor.com/okta", desc: "Book and sit exam by May 10 (Week 7). Use your grant voucher — do not pay out of pocket.", phase: "By Week 7", cost: "Free (Voucher)", type: "cert" },
      { name: "Okta Admin Exam Registration", url: "https://www.webassessor.com/okta", desc: "Sit within 90 days after Okta Professional passes. Second free voucher from grant program.", phase: "Week 14–15", cost: "Free (Voucher)", type: "cert" },
      { name: "Professor Messer — Security+ SY0-701 Course", url: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/", desc: "Free full video course. Begin Week 3. Primary Security+ study resource.", phase: "Weeks 3–10", cost: "Free", type: "cert" },
      { name: "Jason Dion — Security+ Practice Exams (Udemy)", url: "https://www.udemy.com/course/comptia-security-sy0-601-practice-exams/", desc: "Buy during a Udemy sale (~$15). Use for all Saturday timed practice exams.", phase: "Weeks 5–10", cost: "~$15", type: "cert" },
      { name: "CompTIA Security+ Exam Registration", url: "https://www.pearsonvue.com/us/en/comptia.html", desc: "Book your exam when scoring 80%+ on three consecutive Dion exams. Online proctored available.", phase: "Week 10–11", cost: "$370", type: "cert" },
      { name: "Microsoft Learn — AZ-900 Path (Study Only)", url: "https://learn.microsoft.com/en-us/credentials/certifications/azure-fundamentals/", desc: "Free learning path. Study only — no exam needed. Complete before SC-300 begins.", phase: "Week 11", cost: "Free", type: "cert" },
      { name: "Microsoft Learn — SC-300 Path", url: "https://learn.microsoft.com/en-us/credentials/certifications/identity-and-access-administrator/", desc: "Free official SC-300 learning path. Primary SC-300 study resource.", phase: "Weeks 12–16", cost: "Free", type: "cert" },
      { name: "John Savill — SC-300 Study Cram (YouTube)", url: "https://www.youtube.com/results?search_query=john+savill+sc-300", desc: "Free YouTube cram session. Use in the final week before the SC-300 exam.", phase: "Week 15–16", cost: "Free", type: "cert" },
      { name: "MeasureUp — SC-300 Practice Tests", url: "https://www.measureup.com/microsoft-practice-test-sc-300.html", desc: "Closest format to the real SC-300 exam. Use in the final 2 weeks of prep.", phase: "Weeks 15–16", cost: "~$99", type: "cert" },
      { name: "SC-300 Exam Registration", url: "https://www.pearsonvue.com/us/en/microsoft.html", desc: "Book SC-300 exam when scoring 80%+ on two consecutive MeasureUp tests.", phase: "Week 16", cost: "$165", type: "cert" },
      { name: "CyberArk Trustee Certification", url: "https://www.cyberark.com/why-cyberark/education-and-training/", desc: "PAM concepts and privileged access risk awareness. Now requires in-person Pearson VUE testing center. Book in advance.", phase: "Week 15", cost: "Free*", type: "cert" },
      { name: "CyberArk PAM Demo Certified", url: "https://training.cyberark.com", desc: "Hands-on CyberArk product walkthrough. Verify at training.cyberark.com that this results in a verifiable credential before scheduling. If confirmed, complete same session as Trustee in Week 15. Note: all CyberArk exams now require in-person Pearson VUE testing center.", phase: "Week 15", cost: "Free*", type: "cert" },
    ]
  },
  {
    category: "Awareness & Required Reading",
    color: "#0D6B74",
    items: [
      { name: "DoD ICAM Reference Design", url: "https://dodcio.defense.gov/Library/", desc: "Read the ICAM overview — 2 hours. Learn the exact DoD identity terminology. Do this Day 1.", phase: "Day 1", cost: "Free", type: "awareness" },
      { name: "FICAM Architecture — idmanagement.gov", url: "https://www.idmanagement.gov/ficam/", desc: "Federal identity management framework. Read alongside DoD ICAM on Day 1.", phase: "Day 1", cost: "Free", type: "awareness" },
      { name: "NIST SP 800-63 — Digital Identity Guidelines", url: "https://pages.nist.gov/800-63-3/", desc: "Read executive summaries of 800-63A (Identity Proofing), 800-63B (Authentication), 800-63C (Federation). Week 6.", phase: "Week 6", cost: "Free", type: "awareness" },
      { name: "NIST SP 800-207 — Zero Trust Architecture", url: "https://csrc.nist.gov/publications/detail/sp/800-207/final", desc: "Read for Project 5. Maps Conditional Access policies to Zero Trust principles.", phase: "Week 14", cost: "Free", type: "awareness" },
      { name: "SailPoint University — Identity Security Fundamentals", url: "https://university.sailpoint.com", desc: "Free. Complete Identity Security Fundamentals learning path. 3–4 hours. Week 11.", phase: "Week 11", cost: "Free", type: "awareness" },
      { name: "NIST SP 800-53 Rev 5 — AC + IA Control Families", url: "https://csrc.nist.gov/publications/detail/sp/800-53/rev-5/final", desc: "Download and focus on AC (Access Control) and IA (Identification and Authentication) control families for Project 7.", phase: "Week 15–16", cost: "Free", type: "awareness" },
      { name: "FedRAMP POA&M Template", url: "https://www.fedramp.gov/documents-templates/", desc: "Download and use as your POA&M format template for Project 7.", phase: "Week 15–16", cost: "Free", type: "awareness" },
    ]
  },
  {
    category: "Lab Environments & Tools",
    color: "#1E6B3C",
    items: [
      { name: "Okta Developer Tenant", url: "https://developer.okta.com", desc: "Sign up for a free full-featured Okta developer tenant. Use for Project 3 advanced SSO work if needed alongside your grant org.", phase: "Week 8+", cost: "Free", type: "lab" },
      { name: "Azure Portal — Free Tier", url: "https://portal.azure.com", desc: "All Entra ID projects live here. Confirm your free tier account is active before Week 12.", phase: "Week 12+", cost: "Free", type: "lab" },
      { name: "TryHackMe — Active Directory Basics Room", url: "https://tryhackme.com/room/winadbasics", desc: "Complete in Week 12. Browser-based — no local install needed. 6–8 hours.", phase: "Week 12", cost: "Free*", type: "lab" },
      { name: "Draw.io — Diagrams", url: "https://draw.io", desc: "Free browser-based diagramming. Use for hybrid architecture diagram, SOP process flows, and workflow diagrams.", phase: "Weeks 6–15", cost: "Free", type: "lab" },
      { name: "Anki Flashcard App", url: "https://apps.ankiweb.net", desc: "Free spaced-repetition flashcards. Use for Security+ acronyms and definitions — review daily.", phase: "Weeks 3–11", cost: "Free", type: "lab" },
      { name: "GitHub", url: "https://github.com", desc: "Create a public repo for Project 3 documentation and Project 8 PowerShell scripts. Makes your work tangible to hiring managers.", phase: "Week 11+", cost: "Free", type: "lab" },
      { name: "Microsoft Graph Explorer", url: "https://developer.microsoft.com/en-us/graph/graph-explorer", desc: "Browser-based tool to test Microsoft Graph API queries before writing PowerShell. Use to prototype Project 8 scripts.", phase: "Week 16", cost: "Free", type: "lab" },
    ]
  },
  {
    category: "Job Search",
    color: "#4B2D8A",
    items: [
      { name: "ClearanceJobs.com", url: "https://www.clearancejobs.com", desc: "Primary job board. Search: IAM Analyst, Identity Analyst, ISSO, Access Control Analyst. Apply after Okta Professional passes — Week 7.", phase: "Week 7+", cost: "Free", type: "jobs" },
      { name: "LinkedIn Jobs", url: "https://www.linkedin.com/jobs", desc: "Update your headline now. Expand applications here from Week 11 after Security+ passes.", phase: "Week 11+", cost: "Free", type: "jobs" },
      { name: "USAJobs.gov", url: "https://www.usajobs.gov", desc: "Federal direct hire. Slowest process but highest long-term compensation ceiling.", phase: "Week 11+", cost: "Free", type: "jobs" },
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
  allProjects.forEach(p => { keys[`pj_done_${p.num}`] = false; });
  return keys;
};

const rgbMap = {
  "#2E74B5": "46,116,181", "#1E6B3C": "30,107,60", "#7B5800": "123,88,0",
  "#4B2D8A": "75,45,138", "#0D6B74": "13,107,116"
};
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
        <text x={size/2} y={size/2 + 6} textAnchor="middle" fill={color} fontSize={14} fontWeight="bold">{percent}%</text>
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
  const doneProj8 = allProjects.filter(p => checked[`pj_done_${p.num}`]).length;

  const phaseProgress = (id) => {
    const p = phases.find(x => x.id === id);
    const total = p.certs.length + p.projects.length + p.milestones.length;
    const done = p.certs.filter((_, i) => checked[`cert_${id}_${i}`]).length
      + p.projects.filter((_, i) => checked[`project_${id}_${i}`]).length
      + p.milestones.filter((_, i) => checked[`milestone_${id}_${i}`]).length;
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
              <div style={{ fontSize: 11, letterSpacing: "0.3em", color: "#7aaddb", marginBottom: 8, textTransform: "uppercase" }}>Career Transition Roadmap — Updated March 2026</div>
              <h1 style={{ fontSize: 30, fontWeight: "normal", margin: "0 0 5px", color: "#fff" }}>Destiny Blackman</h1>
              <div style={{ fontSize: 15, color: "#a8c4e0", marginBottom: 3 }}>Enterprise Architect → IAM Admin · Analyst · Engineer</div>
              <div style={{ fontSize: 12, color: "#7aaddb" }}>Active Secret Clearance · DoD Background · 18-Week Sprint · Okta Grant Active</div>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
              {[
                { label: "Progress", value: pct(doneAll, totalAll) + "%", color: "#7aaddb", hi: true },
                { label: "Weeks", value: "18" },
                { label: "Certs", value: "6" },
                { label: "Projects", value: "8" },
                { label: "Okta Deadline", value: "May 10", color: "#e8927a", hi: true },
              ].map(s => (
                <div key={s.label} style={{ background: s.hi ? "rgba(46,116,181,0.25)" : "rgba(46,116,181,0.12)", border: `1px solid ${s.hi ? (s.color || "#2E74B5") : "rgba(46,116,181,0.3)"}`, borderRadius: 8, padding: "9px 14px", textAlign: "center", minWidth: 78 }}>
                  <div style={{ fontSize: s.label === "Okta Deadline" ? 14 : 20, fontWeight: "bold", color: s.color || "#7aaddb", lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 9, color: "#8aabb8", marginTop: 3, letterSpacing: "0.1em", textTransform: "uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "rgba(180,60,40,0.12)", border: "1px solid rgba(200,80,60,0.4)", borderRadius: 8, padding: "10px 16px", marginBottom: 14, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 18 }}>⚠️</div>
            <div style={{ fontSize: 13, color: "#e8927a" }}><strong>Okta Grant Deadline:</strong> Okta Professional exam must be sat by <strong>May 10, 2026</strong>. That is 60 days from March 11. Begin Okta learning paths today.</div>
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <div style={{ fontSize: 10, color: "#5a7a99", letterSpacing: "0.1em", textTransform: "uppercase" }}>Overall Progress</div>
              <div style={{ fontSize: 11, color: "#7aaddb" }}>{doneAll} of {totalAll} items complete</div>
            </div>
            <div style={{ height: 5, background: "rgba(255,255,255,0.08)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${pct(doneAll, totalAll)}%`, background: "linear-gradient(90deg, #2E74B5, #0D6B74, #1E6B3C, #7B5800)", borderRadius: 3, transition: "width 0.6s ease" }} />
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
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 22 }}>5 Phases · 18 Weeks · 6 Credentials · 8 Projects · Click Any Phase to Expand</div>
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", height: 7, borderRadius: 4, overflow: "hidden", marginBottom: 7 }}>
                {[["#2E74B5",2],["#0D6B74",5],["#1E6B3C",4],["#7B5800",5],["#4B2D8A",2]].map(([c,f],i) => (
                  <div key={i} style={{ flex: f, background: c, marginRight: i < 4 ? 2 : 0 }} />
                ))}
              </div>
              <div style={{ display: "flex" }}>
                {[["Wk 1–2",2],["Wk 3–7 · May 10 ⚠️",5],["Wk 8–11",4],["Wk 12–16",5],["Wk 17–18",2]].map(([l,f],i) => (
                  <div key={i} style={{ flex: f, fontSize: 10, color: i === 1 ? "#e8927a" : "#5a7a99" }}>{l}</div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {phases.map(phase => {
                const prog = phaseProgress(phase.id);
                return (
                  <div key={phase.id} style={{ background: "rgba(15,30,60,0.6)", border: `1px solid rgba(${rgb(phase.color)},0.4)`, borderLeft: `4px solid ${phase.color}`, borderRadius: 10, overflow: "hidden" }}>
                    <div onClick={() => setExpandedPhase(expandedPhase === phase.id ? null : phase.id)} style={{ padding: "15px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", background: expandedPhase === phase.id ? `rgba(${rgb(phase.color)},0.15)` : "transparent" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                        <div style={{ background: phase.color, color: "#fff", fontWeight: "bold", fontSize: 10, letterSpacing: "0.15em", padding: "3px 9px", borderRadius: 4 }}>{phase.label}</div>
                        <div>
                          <div style={{ fontSize: 14, color: "#e8edf5" }}>{phase.title}</div>
                          <div style={{ fontSize: 11, color: "#5a7a99" }}>{phase.weeks} · {phase.month}</div>
                        </div>
                        {phase.deadline && <div style={{ fontSize: 11, color: "#e8927a", background: "rgba(180,60,40,0.15)", border: "1px solid rgba(200,80,60,0.4)", borderRadius: 4, padding: "2px 8px" }}>{phase.deadline}</div>}
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
                            {phase.awareness.length > 0 && <>
                              <div style={{ marginTop: 12, fontSize: 10, letterSpacing: "0.2em", color: "#5a7a99", textTransform: "uppercase", marginBottom: 7 }}>Awareness</div>
                              {phase.awareness.map((a, i) => <div key={i} style={{ display: "flex", gap: 7, marginBottom: 5 }}><div style={{ width: 5, height: 5, borderRadius: "50%", background: "#0D6B74", marginTop: 7, flexShrink: 0 }} /><div style={{ fontSize: 12, color: "#7abfbf" }}>{a}</div></div>)}
                            </>}
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
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 20 }}>Your Progress — Saved Automatically</div>
            <div style={{ background: "rgba(180,60,40,0.12)", border: "1px solid rgba(200,80,60,0.4)", borderRadius: 8, padding: "10px 16px", marginBottom: 22, display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ fontSize: 16 }}>⚠️</div>
              <div style={{ fontSize: 12, color: "#e8927a" }}>Okta Professional hard deadline: <strong>May 10, 2026</strong>. Begin Okta learning paths today if you have not already.</div>
            </div>
            <div style={{ display: "flex", gap: 24, marginBottom: 32, flexWrap: "wrap", justifyContent: "center" }}>
              <ProgressRing percent={pct(doneAll, totalAll)} color="#7aaddb" size={110} label="Overall" />
              <ProgressRing percent={pct(doneCerts, totalCerts)} color="#2E74B5" size={110} label={`Certs ${doneCerts}/${totalCerts}`} />
              <ProgressRing percent={pct(doneProjects, totalProjects)} color="#1E6B3C" size={110} label={`Phase Items ${doneProjects}/${totalProjects}`} />
              <ProgressRing percent={pct(doneProj8, allProjects.length)} color="#7B5800" size={110} label={`Projects ${doneProj8}/${allProjects.length}`} />
              <ProgressRing percent={pct(doneMilestones, totalMilestones)} color="#0D6B74" size={110} label={`Milestones ${doneMilestones}/${totalMilestones}`} />
            </div>
            {phases.map(phase => {
              const prog = phaseProgress(phase.id);
              return (
                <div key={phase.id} style={{ background: "rgba(15,30,60,0.6)", border: `1px solid rgba(${rgb(phase.color)},0.3)`, borderLeft: `4px solid ${phase.color}`, borderRadius: 10, marginBottom: 12, overflow: "hidden" }}>
                  <div style={{ padding: "13px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", background: `rgba(${rgb(phase.color)},0.1)` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ background: phase.color, color: "#fff", fontWeight: "bold", fontSize: 10, padding: "3px 9px", borderRadius: 4 }}>{phase.label}</div>
                      <div style={{ fontSize: 13, color: "#e8edf5" }}>{phase.title}</div>
                      {phase.deadline && <div style={{ fontSize: 10, color: "#e8927a" }}>⚠️ May 10</div>}
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

        {/* PROJECTS */}
        {activeTab === "projects" && (
          <div>
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 26 }}>8 Portfolio Projects — Real IAM Analyst + Engineer Work · Check Off When Complete</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {allProjects.map(p => {
                const doneKey = `pj_done_${p.num}`;
                const isDone = !!checked[doneKey];
                return (
                  <div key={p.num} style={{ background: "rgba(15,30,60,0.6)", border: `1px solid rgba(${rgb(p.color)},${isDone ? "0.7" : "0.35"})`, borderLeft: `4px solid ${p.color}`, borderRadius: 10, padding: "18px 22px", transition: "all 0.3s" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                        <div style={{ fontSize: 26, fontWeight: "bold", color: p.color, opacity: 0.35, lineHeight: 1, minWidth: 38 }}>{p.num}</div>
                        <div>
                          <div style={{ fontSize: 15, color: isDone ? "#5aad7a" : "#e8edf5", marginBottom: 3 }}>{isDone ? "✓ " : ""}{p.name}</div>
                          <div style={{ fontSize: 11, color: p.color }}>📱 {p.platform} · {p.weeks}</div>
                        </div>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ background: `rgba(${rgb(p.color)},0.15)`, border: `1px solid ${p.color}`, borderRadius: 10, padding: "2px 9px", fontSize: 9, color: p.color, textTransform: "uppercase" }}>Phase {p.num === "AD" ? "4" : p.phase}</span>
                        <div onClick={() => toggle(doneKey)} style={{ cursor: "pointer", width: 28, height: 28, borderRadius: 6, border: `2px solid ${isDone ? "#5aad7a" : "#3a5a72"}`, background: isDone ? "rgba(30,107,60,0.3)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s", flexShrink: 0 }}>
                          {isDone && <div style={{ color: "#5aad7a", fontSize: 14, fontWeight: "bold" }}>✓</div>}
                        </div>
                      </div>
                    </div>
                    <div style={{ fontSize: 12, color: "#7a9ab8", lineHeight: 1.8, marginBottom: 12 }}>{p.desc}</div>
                    <div style={{ fontSize: 11, color: "#4a6a80", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: 10 }}>{p.skills}</div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CERTS */}
        {activeTab === "certs" && (
          <div>
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 22 }}>6 Credentials — Okta + Microsoft + CompTIA + CyberArk</div>
            <div style={{ background: "rgba(180,60,40,0.12)", border: "1px solid rgba(200,80,60,0.4)", borderRadius: 8, padding: "10px 16px", marginBottom: 20, display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ fontSize: 16 }}>⚠️</div>
              <div style={{ fontSize: 12, color: "#e8927a" }}>Okta Professional must be sat by <strong>May 10, 2026</strong>. Begin learning paths today.</div>
            </div>
            <div style={{ marginBottom: 28, padding: "16px 0", position: "relative" }}>
              <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "rgba(46,116,181,0.2)", transform: "translateY(-50%)" }} />
              <div style={{ display: "flex", justifyContent: "space-between", position: "relative", flexWrap: "wrap", gap: 8 }}>
                {[["ISC2 CC","Wk 2","Free","#2E74B5"],["Okta Pro","Wk 7","Free*","#0D6B74"],["Security+","Wk 10–11","$370","#1E6B3C"],["Okta Admin","Wk 14–15","Free*","#7B5800"],["CyberArk","Wk 15","Free*","#7B5800"],["SC-300","Wk 16","$165","#4B2D8A"]].map(([name,week,cost,color],i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, flex: 1, minWidth: 90 }}>
                    <div style={{ fontSize: 9, color: i === 1 ? "#e8927a" : "#5a7a99", textAlign: "center" }}>{week}</div>
                    <div style={{ width: 11, height: 11, borderRadius: "50%", background: color, border: "3px solid #0a0f1e", boxShadow: `0 0 9px ${color}`, zIndex: 1 }} />
                    <div style={{ background: "rgba(15,30,60,0.9)", border: `1px solid ${color}`, borderRadius: 5, padding: "5px 7px", textAlign: "center", maxWidth: 110 }}>
                      <div style={{ fontSize: 10, color: "#e8edf5", marginBottom: 2 }}>{name}</div>
                      <div style={{ fontSize: 10, color: cost.includes("Free") ? "#5aad7a" : "#7aaddb", fontWeight: "bold" }}>{cost}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { name: "ISC2 Certified in Cybersecurity (CC)", week: "Weeks 1–2", cost: "Free", color: "#2E74B5", study: "https://www.isc2.org/Certifications/CC", exam: "https://www.isc2.org/Certifications/CC", why: "Register Day 1. Free 15-hour self-paced course and free exam. Your ISC2 background in access controls and security operations maps directly to the CC domains. Knock it out in under 2 weeks.", type: "Certification" },
                { name: "Okta Professional", week: "By May 10 — Hard Deadline", cost: "Free (Grant Voucher)", color: "#0D6B74", study: "https://training.okta.com", exam: "https://www.webassessor.com/okta", why: "Your Okta grant gives you a free Professional voucher if you sit within 60 days of March 11. Complete the Fundamentals and Administration learning paths, practice in your org, score 75%+ on the practice assessment, then book and sit by May 10.", type: "Certification" },
                { name: "CompTIA Security+", week: "Weeks 3–11 — Exam Week 10 or 11", cost: "$370", color: "#1E6B3C", study: "https://www.professormesser.com/security-plus/sy0-701/sy0-701-video/sy0-701-comptia-security-plus-course/", exam: "https://www.pearsonvue.com/us/en/comptia.html", why: "DoD 8570 gateway — required for almost every federal cybersecurity role. Start study Week 3. Book exam when scoring 80%+ on three consecutive Jason Dion practice exams.", type: "Certification" },
                { name: "Okta Administrator", week: "Weeks 8–14 — Exam Week 14 or 15", cost: "Free (Second Grant Voucher)", color: "#7B5800", study: "https://training.okta.com", exam: "https://www.webassessor.com/okta", why: "Once Okta Professional passes your grant resets — 90 days of free Admin learning path access and a second free voucher. Activate Week 8, study alongside Security+, sit the exam Week 14 or 15 at a Pearson VUE center.", type: "Certification" },
                { name: "CyberArk Trustee + PAM Demo Certified", week: "Week 15 — Saturday block", cost: "Free* (Pearson VUE in-person)", color: "#7B5800", study: "https://training.cyberark.com", exam: "https://www.cyberark.com/why-cyberark/education-and-training/", why: "Two free CyberArk credentials covering PAM concepts and hands-on product walkthrough. Note: as of Nov 2025 all CyberArk exams require in-person Pearson VUE testing. Book a test center in advance. Verify PAM Demo Certified is a verifiable credential at training.cyberark.com before scheduling.", type: "Awareness Cert" },
                { name: "MS SC-300 — Identity and Access Administrator", week: "Weeks 12–16 — Exam Week 16", cost: "$165", color: "#4B2D8A", study: "https://learn.microsoft.com/en-us/credentials/certifications/identity-and-access-administrator/", exam: "https://www.pearsonvue.com/us/en/microsoft.html", why: "The most directly relevant cert for IAM Analyst and Engineer roles. By Week 12 your Entra ID projects will have already covered most of the exam content. Use MeasureUp practice tests in the final two weeks.", type: "Certification" },
              ].map((cert, i) => (
                <div key={i} style={{ background: "rgba(15,30,60,0.6)", border: "1px solid rgba(255,255,255,0.07)", borderLeft: `4px solid ${cert.color}`, borderRadius: 8, padding: "14px 18px", display: "flex", gap: 18, flexWrap: "wrap" }}>
                  <div style={{ minWidth: 90, textAlign: "center" }}>
                    <div style={{ fontSize: 10, color: cert.color, fontWeight: "bold", marginBottom: 3 }}>{cert.week.split("—")[0].trim()}</div>
                    <div style={{ fontSize: 12, color: cert.cost.includes("Free") ? "#5aad7a" : "#7aaddb", fontWeight: "bold", marginBottom: 5 }}>{cert.cost}</div>
                    <div style={{ fontSize: 8, letterSpacing: "0.1em", textTransform: "uppercase", color: "#3a5a72", border: `1px solid ${cert.color}`, borderRadius: 3, padding: "2px 4px" }}>{cert.type}</div>
                  </div>
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ fontSize: 13, color: "#e8edf5", marginBottom: 4 }}>{cert.name}</div>
                    {cert.week.includes("Hard Deadline") && <div style={{ fontSize: 11, color: "#e8927a", marginBottom: 6 }}>⚠️ May 10, 2026 hard deadline</div>}
                    <div style={{ fontSize: 12, color: "#6a8aa8", lineHeight: 1.7, marginBottom: 10 }}>{cert.why}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <LinkBtn url={cert.study} label="Study Materials" />
                      <LinkBtn url={cert.exam} label="Register / Book Exam" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* RESOURCES */}
        {activeTab === "resources" && (
          <div>
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 26 }}>All Resources & Links — Click Any Link to Open</div>
            {resources.map((section, si) => (
              <div key={si} style={{ marginBottom: 30 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 4, height: 18, background: section.color, borderRadius: 2 }} />
                  <div style={{ fontSize: 14, color: "#e8edf5" }}>{section.category}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {section.items.map((item, ii) => (
                    <div key={ii} style={{ background: "rgba(15,30,60,0.6)", border: "1px solid rgba(255,255,255,0.06)", borderLeft: `3px solid ${section.color}`, borderRadius: 8, padding: "12px 16px", display: "flex", alignItems: "flex-start", gap: 14, flexWrap: "wrap" }}>
                      <div style={{ flex: 1, minWidth: 180 }}>
                        <div style={{ fontSize: 13, color: "#e8edf5", marginBottom: 4 }}>{item.name}</div>
                        <div style={{ fontSize: 12, color: "#6a8aa8", lineHeight: 1.6, marginBottom: 10 }}>{item.desc}</div>
                        <LinkBtn url={item.url} label="Open Resource" />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, minWidth: 110 }}>
                        <div style={{ fontSize: 12, color: item.cost.includes("Free") ? "#5aad7a" : "#7aaddb", fontWeight: "bold" }}>{item.cost}</div>
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

        {/* SCHEDULE */}
        {activeTab === "schedule" && (
          <div>
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 26 }}>Weekly Study Routine — 16.5 Hours Per Week</div>
            <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              {[["Cert Study","~7.5 hrs","#2E74B5"],["Projects","~9 hrs","#1E6B3C"],["Total / Week","~16.5 hrs","#4B2D8A"],["Total / 18 Weeks","~297 hrs","#7B5800"]].map(([l,v,c]) => (
                <div key={l} style={{ background: "rgba(15,30,60,0.6)", border: "1px solid rgba(255,255,255,0.07)", borderTop: `3px solid ${c}`, borderRadius: 8, padding: "12px 18px", flex: 1, minWidth: 110 }}>
                  <div style={{ fontSize: 20, color: c, marginBottom: 3 }}>{v}</div>
                  <div style={{ fontSize: 10, color: "#5a7a99", letterSpacing: "0.1em", textTransform: "uppercase" }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(13,107,116,0.12)", border: "1px solid rgba(13,107,116,0.4)", borderLeft: "4px solid #0D6B74", borderRadius: 8, padding: "12px 16px", marginBottom: 14 }}>
              <div style={{ fontSize: 12, color: "#7abfbf", lineHeight: 1.7 }}>
                <strong>Weeks 1–7:</strong> Wednesday lab days and Sunday blocks are shared between Okta learning paths and project work. Okta paths take priority to meet the May 10 deadline. Project work shifts to evenings once Okta Professional passes.
              </div>
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
            <div style={{ marginTop: 14, background: "rgba(123,88,0,0.12)", border: "1px solid rgba(123,88,0,0.3)", borderLeft: "4px solid #7B5800", borderRadius: 8, padding: "12px 16px" }}>
              <div style={{ fontSize: 12, color: "#c4a060", lineHeight: 1.7, fontStyle: "italic" }}>Saturday rule: Do the 90-minute practice exam in the morning, take a real break of at least 60 minutes, then sit down for project work. Never blend them. This is what makes 18 weeks sustainable.</div>
            </div>
          </div>
        )}

        {/* APPLY */}
        {activeTab === "apply" && (
          <div>
            <div style={{ fontSize: 11, color: "#5a7a99", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 26 }}>Application Strategy — 3 Launch Windows</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { week: "WEEK 7", label: "Soft Launch", color: "#0D6B74", trigger: "Okta Professional passed — by May 10", desc: "ISC2 CC + Okta Professional + Active Secret Clearance is a genuinely competitive entry package. Do not wait for Security+. Apply now on ClearanceJobs and list Security+ and SC-300 as In Progress.", actions: ["Apply immediately on ClearanceJobs.com — search IAM Analyst, Identity Analyst, ISSO","List Security+ as In Progress — Expected June 2026 and SC-300 as In Progress — Expected July 2026","Target: Leidos, SAIC, Booz Allen, CACI, ManTech, Perspecta, GDIT, Noblis","Contact Seneca, Deloitte, and AIS network first — referrals move 3–4x faster than cold applications","Frame DSCA audit work as applied IAM experience in every cover letter and interview"], links: [["ClearanceJobs.com","https://www.clearancejobs.com"],["LinkedIn Jobs","https://www.linkedin.com/jobs"]] },
                { week: "WEEK 11", label: "Full Launch", color: "#1E6B3C", trigger: "Security+ passed — 3 projects complete", desc: "ISC2 CC + Okta Professional + Security+ + 3 portfolio projects + Active Secret Clearance. Apply aggressively on all three boards. You now have real work to reference by name in every interview.", actions: ["Security+ posted — update resume and LinkedIn the same day","Expand to LinkedIn Jobs and USAJobs in addition to ClearanceJobs","Target 10–15 active applications across all boards","Reference projects 1, 2, and 3 by name in interviews with specific outcomes","Frame DSCA audit work — process owners, access gaps, approval chains — as direct IAM experience"], links: [["ClearanceJobs.com","https://www.clearancejobs.com"],["USAJobs.gov","https://www.usajobs.gov"],["LinkedIn Jobs","https://www.linkedin.com/jobs"]] },
                { week: "WEEK 16", label: "Power Position", color: "#4B2D8A", trigger: "SC-300 passed · All 6 credentials · 8 projects · Full portfolio", desc: "Six credentials including two Okta certs, Security+, SC-300, and CyberArk. Eight portfolio projects covering every core IAM technical domain. Active Secret Clearance. This combination at entry level is exceptionally rare.", actions: ["Update every active application the day SC-300 posts","Negotiate any pending offers from full credential and portfolio strength","Attach portfolio PDF to every application","GitHub repo with PowerShell scripts linked on resume and LinkedIn","Target salary: $90k–$115k entry, negotiate toward $110k–$120k with full stack","SailPoint IGA and CyberArk PAM awareness explicitly mentioned in bridge narrative"], links: [["ClearanceJobs.com","https://www.clearancejobs.com"],["USAJobs.gov","https://www.usajobs.gov"]] },
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
                {[["Network Referral","2–4 weeks","Seneca, Deloitte, AIS contacts first — fastest path","#1E6B3C"],["ClearanceJobs Cold Apply","4–6 weeks","Cleared candidates move faster — no background check delay","#2E74B5"],["LinkedIn / General Boards","4–8 weeks","Less targeted but worth running in parallel from Week 11","#7B5800"],["USAJobs Federal Direct","6–12 weeks","Slowest process but highest long-term compensation ceiling","#4B2D8A"]].map(([type,time,note,color]) => (
                  <div key={type} style={{ background: "rgba(15,30,60,0.6)", border: "1px solid rgba(255,255,255,0.05)", borderTop: `3px solid ${color}`, borderRadius: 8, padding: "13px 15px" }}>
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
        DESTINY BLACKMAN · IAM ADMIN · ANALYST · ENGINEER SPRINT PLAN · UPDATED MARCH 2026 · 18 WEEKS
      </div>
    </div>
  );
}
