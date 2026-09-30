import { Router } from "express";
import { analyzeMatch } from "../../utils/matching.js";

const router = Router();
router.post("/analyze", (request, response) => { const { studentSkills = [], requiredSkills = [] } = request.body; if (!Array.isArray(studentSkills) || !Array.isArray(requiredSkills)) return response.status(400).json({ message: "studentSkills and requiredSkills must be arrays." }); return response.json(analyzeMatch(studentSkills, requiredSkills)); });
export default router;
