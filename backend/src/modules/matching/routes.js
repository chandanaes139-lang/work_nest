import { Router } from "express";
import { analyzeMatch, rankCandidates } from "../../../data_processor/matching/matcher.js";
import { store } from "../../config/store.js";

const router = Router();

// POST /api/v1/matches/analyze
router.post("/analyze", (request, response) => {
  const { studentSkills = [], requiredSkills = [], options = {} } = request.body;
  if (!Array.isArray(studentSkills) || !Array.isArray(requiredSkills)) {
    return response.status(400).json({ message: "studentSkills and requiredSkills must be arrays." });
  }
  return response.json(analyzeMatch(studentSkills, requiredSkills, options));
});

// POST /api/v1/matches/rank-candidates
router.post("/rank-candidates", (request, response) => {
  const { opportunity, candidates } = request.body;
  const candidatePool = candidates || store.students;
  if (!opportunity) {
    return response.status(400).json({ message: "opportunity definition is required." });
  }
  return response.json(rankCandidates(candidatePool, opportunity));
});

export default router;
