import { Router } from "express";
import { store } from "../../config/store.js";

const router = Router();

// GET /api/v1/institution/analytics
router.get("/analytics", (_req, res) => {
  const totalStudents = store.students.length + 1245; // Demo cohort scale
  const placementReadyPct = 68;

  const departmentBreakdown = [
    { department: "Computer Science & Eng", students: 480, readyPct: 76, topGap: "Cloud & DevOps" },
    { department: "Information Technology", students: 360, readyPct: 72, topGap: "System Design" },
    { department: "Health & Ayush Informatics", students: 210, readyPct: 69, topGap: "Clinical Data Standards" },
    { department: "Data Science & AI", students: 198, readyPct: 64, topGap: "Model Deployment" },
  ];

  const skillGaps = [
    { skill: "Cloud & Deployment (Docker/AWS)", gapPercentage: 74, affectedCount: 924 },
    { skill: "Ayush Health Informatics & ABDM", gapPercentage: 68, affectedCount: 846 },
    { skill: "Data Engineering & Analytics", gapPercentage: 61, affectedCount: 760 },
    { skill: "System Design & Microservices", gapPercentage: 48, affectedCount: 598 },
    { skill: "Technical Communication", gapPercentage: 31, affectedCount: 386 },
  ];

  const pipeline = {
    submitted: 382,
    reviewing: 126,
    shortlisted: 74,
    selected: 31,
  };

  return res.json({
    institution: "Nexus University & Ayush Research Institute",
    activeStudents: totalStudents,
    placementReadyPercentage: placementReadyPct,
    partnerCount: store.opportunities.length + 42,
    departmentBreakdown,
    skillGaps,
    pipeline,
  });
});

// GET /api/v1/institution/students
router.get("/students", (_req, res) => {
  return res.json(store.students);
});

// POST /api/v1/institution/invite-partner
router.post("/invite-partner", (req, res) => {
  const { companyName, contactEmail, programType } = req.body;
  if (!companyName || !contactEmail) {
    return res.status(400).json({ message: "Company name and contact email are required." });
  }

  return res.status(200).json({
    message: `Invitation successfully dispatched to ${companyName} (${contactEmail}) for ${programType || "Campus Placement & Internship Collaboration"}.`,
    partnerInvite: {
      companyName,
      contactEmail,
      status: "Invited",
      sentAt: new Date().toISOString(),
    },
  });
});

export default router;
