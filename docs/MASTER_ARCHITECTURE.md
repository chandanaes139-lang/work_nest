# SkillBridge — Master Architecture & Specification

**PS Number:** 26044  
**Problem Statement No.:** 44  
**Organization:** Ministry of Ayush  
**Category:** Software  
**Theme:** Smart Automation  
**Title:** Portal for Academia – Industry Collaboration for Skill Mapping, Internships and Placement

---

## 1. Executive Summary

**SkillBridge** is a unified academia–industry collaboration and smart automation platform engineered to bridge the gap between academic curriculum competencies and real-world industry/research requirements. 

Unlike conventional job boards or static placement portals, SkillBridge functions as an active skill intelligence loop:

$$\text{Assess} \longrightarrow \text{Map Skills} \longrightarrow \text{Identify Skill Gaps} \longrightarrow \text{Targeted Learning} \longrightarrow \text{Build Evidence} \longrightarrow \text{Explainable Match} \longrightarrow \text{Internship / Placement}$$

---

## 2. The 9 Core Modules

```
                         SKILLBRIDGE
                              │
  ┌──────────┬──────────┬─────┴────┬──────────┬──────────┐
  │          │          │          │          │          │
Student   Industry  Institution  Faculty  Automation  Opportunity
  │          │          │          │          │          │
  └──────────┴──────────┼──────────┴──────────┴──────────┘
                        │
             ┌──────────┴──────────┐
             │                     │
       Collaboration      Security & Admin
```

### Module 1: Student Module
* **Registration & Authentication:** Secure multi-role access with profile configuration.
* **Skill Profile & Dynamic Skill Map:** Real-time visualization of categorized competencies (Frontend, Backend, DevOps, Databases, Ayush Health Informatics).
* **Skill Assessment Engine:** Proctored quizzes calculating objective confidence scores.
* **Skill Gap Analysis:** Highlights exact missing requirements for dream career roles.
* **Targeted Learning Roadmap:** Prioritized "NOW / NEXT / THEN" milestones with curated labs.
* **Projects & Certifications:** Structured repository linking code repositories and credential evidence.
* **Smart Resume Extractor:** Automated parsing of resumes and project documents to populate skill evidence.
* **Applications & Live Tracker:** 4-stage transparent progress visualizer (`Submitted` $\rightarrow$ `Reviewing` $\rightarrow$ `Shortlisted` $\rightarrow$ `Selected`).

### Module 2: Industry Module
* **Company Onboarding:** Host organization verification, domain categorization, and profile management.
* **Opportunity Creator:** Post internships, full-time placements, fellowships, and sponsored capstones with required skills, eligibility criteria (CGPA, batches), stipend, and deadlines.
* **Candidate Discovery Engine:** Live candidate search and skill-based ranking.
* **Explainable Shortlisting:** Candidate drawer showing covered skills, missing gaps, and academic merit before extending interview invites.
* **Applicant Pipeline Management:** Direct review and status progression of student submissions.

### Module 3: Institution Module
* **Cohort Readiness Dashboard:** Telemetry tracking placement-ready percentages across academic cohorts.
* **Department Filtering:** Drill down by Computer Science, Information Technology, Ayush & Health Informatics, Data Science.
* **Curriculum Skill Gap Analytics:** Aggregated gap heatmaps showing institutional deficits (e.g., 74% gap in Cloud, 68% in Ayush digital standards).
* **Industry Outreach & Partner Invites:** Automated dispatching of collaboration invitations to prospective recruiting and research organizations.
* **Exportable Reports:** Instant generation of executive cohort intelligence reports.

### Module 4: Faculty / Academia Module
* **Mentee Monitoring:** Real-time tracking of assigned student cohorts and readiness indices.
* **Targeted Mentorship Nudges:** One-click dispatch of learning pathways to students facing identified skill gaps.
* **Office Hour Scheduler:** Group check-in coordination directly linked to student milestones.
* **Joint Research Queue:** Direct discovery of industry-sponsored research slots.

### Module 5: Smart Automation & AI Module
* **Skill Extractor (`data_processor/skill_extraction/`):** Natural Language keyword and alias extraction with canonical taxonomy mapping (covering software engineering, cloud, and specialized Ayush health informatics).
* **Resume Parser (`data_processor/resume_parser/`):** Extracts contact details, education degrees, CGPA, and project summaries.
* **Explainable Matching Engine (`data_processor/matching/`):** Computes match percentages (0–100%), covered vs missing skills, and checks eligibility criteria.
* **Learning Recommendation Engine (`data_processor/recommendation/`):** Generates milestone-driven learning steps and project ideas for missing competencies.

### Module 6: Opportunity Module
* **Diverse Opportunity Typology:** Full support for Internships, Placements, Training programs, and Sponsored Capstones.
* **Search & Filter:** Multi-criteria filtering by category, location mode (Remote/Hybrid/Onsite), and skill keywords.
* **Eligibility Enforcement:** Batch year and CGPA cutoffs verified against student profile.

### Module 7: Collaboration Module
* **Academia ↔ Industry Innovation Hub:** Joint R&D initiatives between universities, Ayush research centers, and tech companies.
* **Collaborative Project Proposals:** Open calls for student participation in national digital health missions, herb provenance tracking, and AI diagnostic frameworks.

### Module 8: Dashboard & Analytics
* **Role-Tailored Perspectives:** Distinct customized dashboard experiences for Students, Recruiters, Institution Directors, and Faculty Mentors.
* **Momentum & Engagement Metrics:** Weekly activity trackers, application distribution funnels, and skill coverage dials.

### Module 9: Security & Administration
* **Authentication:** JWT session management with bcrypt hashing.
* **Role-Based Access Control (RBAC):** Strict boundary enforcement across `student`, `industry`, `institution`, `faculty`, and `admin`.
* **Hybrid Storage Architecture:** Native Mongoose persistence when MongoDB is connected, paired with in-memory store fallback for reliable offline demos.

---

## 3. Data Contracts & Architecture

```
Student Profile (Skills + Projects + Assessments)
    │
    ▼
Skill Extractor & Normalizer
    │
    ▼
Explainable Matcher <─── Industry Brief (Required Skills + Eligibility)
    │
    ├──> Match Score (%)
    ├──> Covered Competencies [✓]
    ├──> Missing Skill Gaps [!]
    └──> Eligibility Verification
    │
    ▼
Learning Recommendation Engine
    │
    └──> Actionable Pathway (NOW / NEXT / THEN)
```

---

## 4. Key API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/register` | Register new user with designated role |
| `POST` | `/api/v1/auth/login` | Authenticate user & issue JWT |
| `GET` | `/api/v1/students/profile` | Retrieve student profile & skill map |
| `POST` | `/api/v1/students/skills` | Add/update verified skill evidence |
| `POST` | `/api/v1/students/projects` | Add project with auto skill extraction |
| `POST` | `/api/v1/students/parse-resume` | Smart Automation resume extraction |
| `GET` | `/api/v1/students/recommendations` | Get personalized learning pathways |
| `GET` | `/api/v1/assessments` | List proctored skill assessments |
| `POST` | `/api/v1/assessments/:id/submit` | Auto-grade quiz & recalculate proficiency |
| `GET` | `/api/v1/opportunities` | Browse opportunities with search & filters |
| `POST` | `/api/v1/opportunities` | Post industry opportunity brief |
| `GET` | `/api/v1/opportunities/:id/candidates` | Smart candidate ranking for role |
| `POST` | `/api/v1/applications/apply` | Apply to opportunity & compute match |
| `GET` | `/api/v1/applications/my` | Retrieve student application statuses |
| `PATCH` | `/api/v1/applications/:id/status` | Update applicant hiring pipeline status |
| `GET` | `/api/v1/institution/analytics` | Cohort gap analytics & pipeline stats |
| `POST` | `/api/v1/institution/invite-partner` | Invite external partner organization |
| `GET` | `/api/v1/faculty/students` | Retrieve assigned mentees with gaps |
| `POST` | `/api/v1/faculty/nudge` | Send targeted learning pathway nudge |
| `GET` | `/api/v1/collaboration` | List joint academia-industry projects |
| `POST` | `/api/v1/collaboration` | Propose joint research collaboration |
