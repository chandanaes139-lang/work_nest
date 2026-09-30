import { Router } from "express";
import { store } from "../../config/store.js";
import { rankCandidates } from "../../../data_processor/matching/matcher.js";

const router = Router();

// GET /api/v1/opportunities
router.get("/", (req, res) => {
  const { type, search } = req.query;
  let results = [...store.opportunities];

  if (type) {
    results = results.filter((o) => o.type.toLowerCase() === type.toLowerCase());
  }

  if (search) {
    const s = search.toLowerCase();
    results = results.filter((o) =>
      o.role.toLowerCase().includes(s) ||
      o.company.toLowerCase().includes(s) ||
      o.requiredSkills.some((skill) => (typeof skill === "string" ? skill : skill.name).toLowerCase().includes(s))
    );
  }

  return res.json(results);
});

// GET /api/v1/opportunities/:id
router.get("/:id", (req, res) => {
  const opp = store.opportunities.find((o) => o.id === req.params.id);
  if (!opp) return res.status(404).json({ message: "Opportunity not found." });
  return res.json(opp);
});

// POST /api/v1/opportunities
router.post("/", (req, res) => {
  const { role, company, type, location, stipend, requiredSkills, eligibility, deadline, description } = req.body;
  if (!role || !company) {
    return res.status(400).json({ message: "Role and company name are required." });
  }

  const parsedSkills = Array.isArray(requiredSkills)
    ? requiredSkills
    : typeof requiredSkills === "string"
    ? requiredSkills.split(",").map((s) => s.trim()).filter(Boolean)
    : ["General"];

  const newOpp = {
    id: `opp_${Date.now()}`,
    company,
    initials: company.charAt(0).toUpperCase(),
    color: "sky",
    role,
    type: (type || "internship").toLowerCase(),
    location: location || "Remote",
    stipend: stipend || "Competitive",
    requiredSkills: parsedSkills,
    eligibility: eligibility || { minimumCgpa: 6.5, graduationYears: [2026, 2027] },
    deadline: deadline || "14 days",
    description: description || "Join our team to solve impactful challenges.",
    isPublished: true,
    createdAt: new Date().toISOString(),
  };

  store.opportunities.unshift(newOpp);

  return res.status(201).json({
    message: "Opportunity published successfully.",
    opportunity: newOpp,
  });
});

// GET /api/v1/opportunities/:id/candidates (Smart Automation candidate ranking)
router.get("/:id/candidates", (req, res) => {
  const opp = store.opportunities.find((o) => o.id === req.params.id);
  if (!opp) return res.status(404).json({ message: "Opportunity not found." });

  const ranked = rankCandidates(store.students, opp);
  return res.json({
    opportunity: { id: opp.id, role: opp.role, company: opp.company, requiredSkills: opp.requiredSkills },
    totalCandidates: ranked.length,
    candidates: ranked,
  });
});

export default router;
