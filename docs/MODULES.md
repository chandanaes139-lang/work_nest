# SkillBridge Module Map

SkillBridge is organized as a modular monolith. Each module owns its user-facing workflow and exposes data to the matching and analytics layers through stable interfaces.

## Hackathon Delivery Status (All 9 Modules Complete)

| Module | Core Capability | Status |
| --- | --- | --- |
| **1. Student** | Skill profile, dynamic readiness index, skill map, assessment runner, resume extractor, application tracking | **Complete** |
| **2. Industry** | Company onboarding, opportunity posting with live match preview, candidate discovery, candidate drawer, application pipeline | **Complete** |
| **3. Institution** | Cohort readiness telemetry, department drilldowns, curriculum skill-gap analytics, partner invitations, report exports | **Complete** |
| **4. Faculty** | Assigned mentee monitoring, readiness tracking, targeted pathway nudges, office hour scheduling, collaboration queue | **Complete** |
| **5. Smart Automation** | NLP skill extraction, resume parser, explainable matching, learning recommendation engine | **Complete** |
| **6. Opportunities** | Internships, placements, training, projects, and fellowship catalogue with multi-filter search | **Complete** |
| **7. Collaboration** | Academia ↔ Industry joint research, project proposals, student enrollment, and Ayush innovation hub | **Complete** |
| **8. Dashboards** | Custom-tailored role dashboards for Student, Industry, Institution, and Faculty with live analytics | **Complete** |
| **9. Security & Admin** | JWT auth, bcrypt hashing, RBAC middleware, hybrid storage (Mongoose + offline in-memory fallback) | **Complete** |

---

## Module Responsibilities

### 1. Student
Owns student identity, academic details, skills, assessments, projects, certifications, portfolio, opportunity applications, and 4-stage application status (`Submitted` $\rightarrow$ `Reviewing` $\rightarrow$ `Shortlisted` $\rightarrow$ `Selected`).

### 2. Industry
Owns organization profiles, opportunity creation with eligibility cutoffs, candidate discovery with live skill matching, candidate shortlisting drawers, and hiring decisions.

### 3. Institution and Faculty
Institution accounts view cohort-level trends, readiness, internship progress, and partner activity. Faculty accounts view their assigned students, support progress, send targeted pathway nudges, and coordinate joint research.

### 4. Smart Automation Layer
- **Skill Extraction:** Canonical taxonomy mapping software, cloud, and specialized Ayush health informatics competencies.
- **Resume Parser:** Transforms raw resumes and projects into structured candidate evidence.
- **Explainable Matcher:** Evaluates covered competencies, missing gaps, and batch/CGPA eligibility.
- **Learning Recommendations:** Generates prioritized "NOW / NEXT / THEN" milestones.

### 5. Collaboration & Opportunities
Holds internships, placements, training, capstones, and joint academia-industry research projects (e.g. AI diagnostic frameworks and herbal supply chain traceability).
