import { Router } from "express";
const router = Router();
router.get("/overview", (_request, response) => response.json({ activeStudents: 1248, placementReady: 68, partnerOpportunities: 46, skillGaps: [{ skill: "Cloud & deployment", percentage: 74 }, { skill: "Data engineering", percentage: 61 }, { skill: "System design", percentage: 48 }] }));
export default router;
