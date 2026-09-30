# SkillBridge Module Map

SkillBridge is organized as a modular monolith. Each module owns its user-facing workflow and exposes data to the matching and analytics layers through stable interfaces.

## MVP delivery status

| Module | MVP capability | Status |
| --- | --- | --- |
| Student | Skill profile, readiness, gap analysis, learning path, opportunity discovery | Interactive demo complete |
| Industry | Company onboarding, opportunity posting, skill requirements, candidate shortlisting | Interactive demo complete |
| Institution | Student cohort view, skill-gap analytics, placement readiness | Interactive demo complete |
| Faculty | Student monitoring, progress, mentoring and collaboration | Interactive demo complete |
| Smart automation | Skill mapping, gap detection, explainable opportunity match | React + Express demo logic complete |
| Opportunities | Internship, placement, training and projects catalogue | Demo listing complete |
| Collaboration | Mentorship, industry projects and research collaboration | Planned |
| Dashboards | Student readiness and momentum dashboard | Student dashboard complete |
| Security and admin | Authentication, RBAC, validation and document protection | Backend foundation planned |

## Module responsibilities

### Student

Owns student identity, academic details, skills, assessments, projects, certifications, portfolio, opportunity applications, and application status. The student dashboard is the primary entry point for the current MVP.

### Industry

Owns organization profiles and opportunity creation. Every opportunity defines skills and eligibility, then consumes matching results to discover, rank, shortlist, and manage candidates.

### Institution and Faculty

Institution accounts view cohort-level trends, readiness, internship progress, and partner activity. Faculty accounts view their assigned students, support progress, and coordinate mentorship, research, and industry connections.

### Smart Automation

Normalizes skills from profiles, projects, assessments, and resumes; compares them with requirement sets; detects gaps; recommends learning; and returns an explainable match result. A match must always show the covered skills and the missing skills.

### Opportunity and Collaboration

Holds internships, placements, training, projects, and industry programs. Collaboration is a distinct workflow for mentorship, sponsored projects, research, and institution-industry partnerships.

## Data contracts

```text
Student skill profile + assessment + portfolio
  -> normalized skill evidence
  -> SkillGapAnalysis(target role or opportunity)
  -> LearningRecommendation[]
  -> OpportunityMatch[] { score, coveredSkills, missingSkills, explanation }
  -> Application
```

```text
Industry opportunity + skills + eligibility
  -> CandidateMatch[] { score, evidence, gaps }
  -> shortlist / application decision
```

## Suggested implementation sequence

1. Persist authentication, roles, students, skills, opportunities, applications, and matches.
2. Add the industry opportunity-posting and candidate-ranking workflow.
3. Add institution analytics based on the same normalized skill and match records.
4. Add faculty monitoring, collaboration workflows, document handling, and role-based administration.
