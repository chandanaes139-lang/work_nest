import { Router } from "express";
import { store } from "../../config/store.js";

const router = Router();

// GET /api/v1/dashboard/overview
router.get("/overview", (_request, response) => {
  return response.json({
    activeStudents: 1248,
    placementReady: 68,
    partnerOpportunities: store.opportunities.length + 42,
    activeCollaborations: store.collaborations.length + 8,
    skillGaps: [
      { skill: "Cloud & deployment", percentage: 74 },
      { skill: "Ayush Health Informatics", percentage: 68 },
      { skill: "Data engineering", percentage: 61 },
      { skill: "System design", percentage: 48 },
      { skill: "Technical communication", percentage: 31 },
    ],
    applicationPipeline: {
      submitted: 382,
      reviewing: 126,
      shortlisted: 74,
      selected: 31,
    },
    topInDemandSkills: ["React", "JavaScript", "Docker", "AWS", "Ayush Health Informatics", "Python"],
  });
});

export default router;
