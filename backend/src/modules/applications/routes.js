import { Router } from "express";
import { store } from "../../config/store.js";
import { analyzeMatch } from "../../../data_processor/matching/matcher.js";

const router = Router();

// GET /api/v1/applications/my (Student application tracker)
router.get("/my", (req, res) => {
  const student = store.students[0];
  const apps = store.applications.filter((a) => a.studentId === student.id);
  return res.json(apps);
});

// POST /api/v1/applications/apply
router.post("/apply", (req, res) => {
  const { opportunityId, coverNote } = req.body;
  const student = store.students[0];

  const opp = store.opportunities.find((o) => o.id === opportunityId);
  if (!opp) {
    return res.status(404).json({ message: "Opportunity not found." });
  }

  const existing = store.applications.find(
    (a) => a.studentId === student.id && a.opportunityId === opportunityId
  );
  if (existing) {
    return res.status(400).json({ message: "You have already applied for this opportunity." });
  }

  // Calculate live explainable match score
  const match = analyzeMatch(student.skills, opp.requiredSkills, {
    studentCgpa: student.cgpa,
    minimumCgpa: opp.eligibility?.minimumCgpa,
    studentGradYear: student.graduationYear,
    graduationYears: opp.eligibility?.graduationYears,
  });

  const newApplication = {
    id: `app_${Date.now()}`,
    studentId: student.id,
    studentName: student.name,
    program: student.program,
    opportunityId: opp.id,
    role: opp.role,
    company: opp.company,
    coverNote: coverNote || "",
    status: "submitted",
    appliedAt: new Date().toISOString().split("T")[0],
    matchScore: match.score,
    coveredSkills: match.coveredSkills,
    missingSkills: match.missingSkills,
  };

  store.applications.unshift(newApplication);

  return res.status(201).json({
    message: `Application submitted successfully for ${opp.role} at ${opp.company}.`,
    application: newApplication,
    match,
  });
});

// GET /api/v1/applications/opportunity/:opportunityId (Industry applicant review)
router.get("/opportunity/:opportunityId", (req, res) => {
  const applicants = store.applications.filter((a) => a.opportunityId === req.params.opportunityId);
  return res.json(applicants);
});

// PATCH /api/v1/applications/:id/status
router.patch("/:id/status", (req, res) => {
  const { status } = req.body;
  const allowed = ["draft", "submitted", "reviewing", "shortlisted", "selected", "rejected"];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: `Invalid status. Must be one of: ${allowed.join(", ")}` });
  }

  const app = store.applications.find((a) => a.id === req.params.id);
  if (!app) {
    return res.status(404).json({ message: "Application not found." });
  }

  app.status = status;
  return res.json({ message: `Application status updated to ${status}.`, application: app });
});

export default router;
