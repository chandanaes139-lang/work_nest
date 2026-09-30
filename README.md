# SkillBridge

> **Portal for Academia – Industry Collaboration for Skill Mapping, Internships and Placement**  
> **Problem Statement No.:** 44 (PS #26044) | **Organization:** Ministry of Ayush | **Theme:** Smart Automation

---

## 🌟 Overview

**SkillBridge** is an intelligent, multi-stakeholder ecosystem connecting **Students ↔ Institutions ↔ Faculty ↔ Industry**. It moves beyond conventional job boards by creating a continuous skill intelligence loop:

$$\text{Assess} \longrightarrow \text{Map Skills} \longrightarrow \text{Identify Skill Gaps} \longrightarrow \text{Targeted Learning} \longrightarrow \text{Build Evidence} \longrightarrow \text{Explainable Match} \longrightarrow \text{Opportunity}$$

---

## 🚀 Key Features by User Role

### 🎓 1. Student Workspace
- **Dynamic Skill Map & Industry Readiness Dial:** Categorized view of competencies (Frontend, Backend, DevOps, Databases, Ayush Health Informatics).
- **Smart Automation Resume & Portfolio Extractor:** Paste or upload resume text/project briefs to auto-extract normalized skills, categories, and confidence scores.
- **Proctored Skill Assessments:** Interactive quizzes (Docker, AWS, Ayush Digital Health) with automatic proficiency recalculation.
- **Explainable Opportunity Matching:** Every opportunity card highlights covered skills in green (**✓**) and missing gaps in orange (**Gap**).
- **4-Stage Application Tracker:** Transparent pipeline stepper (`Submitted` $\rightarrow$ `Reviewing` $\rightarrow$ `Shortlisted` $\rightarrow$ `Selected`).

### 🏢 2. Industry Workspace
- **Opportunity Brief Creator:** Post internships, placements, fellowships, and sponsored projects with live candidate match previews.
- **Candidate Discovery & Smart Ranking:** Filter candidates by competencies, view detailed match analysis drawers, and shortlist candidates.
- **Application Pipeline Management:** Review student applications and transition hiring decisions.

### 🏛️ 3. Institution Workspace
- **Cohort Readiness Telemetry:** Real-time metrics across 1,200+ students and multiple academic tracks.
- **Curriculum Skill Gap Analytics:** Deficit tracking in high-demand domains (Cloud & DevOps, Ayush digital standards, Data engineering).
- **Industry Outreach & Partner Invites:** Automated dispatching of collaboration invitations.
- **Exportable Cohort Reports:** Downloadable executive intelligence summaries.

### 👨‍🏫 4. Faculty Workspace
- **Assigned Mentee Monitoring:** Cohort readiness tracking with identified skill gap indicators.
- **Targeted Mentorship Nudges:** Dispatch curated learning pathways directly to students with gaps.
- **Office Hour Scheduler:** Integrated check-in coordination.
- **Academia-Industry Collaboration Queue:** Joint research calls with Ministry of Ayush and tech partners.

### 🤖 5. Smart Automation & AI Layer
- **Skill Extractor (`backend/data_processor/skill_extraction/`):** Canonical NLP taxonomy mapping technical and Ayush informatics terms.
- **Resume Parser (`backend/data_processor/resume_parser/`):** Contact, education, CGPA, and project extraction.
- **Explainable Matcher (`backend/data_processor/matching/`):** Computes match percentage and verifies eligibility.
- **Recommendation Engine (`backend/data_processor/recommendation/`):** Generates milestone-driven learning steps ("NOW / NEXT / THEN").

---

## 🛠️ Tech Stack

- **Frontend:** React 19, Vite, Lucide Icons, Vanilla CSS (Design-system grounded)
- **Backend:** Node.js (ES modules), Express, JWT, Bcrypt
- **Persistence:** Mongoose (MongoDB Atlas) + Automatic in-memory fallback for offline judging demos
- **Testing:** Node.js native test runner (`node --test`)

---

## ⚡ Quickstart

### 1. Run Backend Tests
```powershell
cd backend
npm test
```

### 2. Start Backend Server
```powershell
cd backend
npm start
# Listens on http://localhost:5000 (Falls back gracefully to in-memory demo store if MongoDB is offline)
```

### 3. Start Frontend Client
```powershell
cd frontend
npm run dev
# Open http://localhost:5173
```

---

## 📚 Documentation
- [Master Architecture & System Specification](docs/MASTER_ARCHITECTURE.md)
- [Hackathon Pitch & Live Demo Guide](docs/HACKATHON_PITCH.md)
- [Module Map](docs/MODULES.md)
