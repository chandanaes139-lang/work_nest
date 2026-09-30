import { Router } from "express";
import { store } from "../../config/store.js";
import { extractSkillsFromText } from "../../../data_processor/skill_extraction/extractor.js";
import { parseResume } from "../../../data_processor/resume_parser/parser.js";
import { generateLearningRecommendations } from "../../../data_processor/recommendation/engine.js";

const router = Router();

// GET /api/v1/students/profile
router.get("/profile", (req, res) => {
  const student = store.students[0];
  return res.json(student);
});

// PUT /api/v1/students/profile
router.put("/profile", (req, res) => {
  const student = store.students[0];
  const { name, program, cgpa, graduationYear } = req.body;
  if (name) student.name = name;
  if (program) student.program = program;
  if (cgpa) student.cgpa = Number(cgpa);
  if (graduationYear) student.graduationYear = Number(graduationYear);

  return res.json({ message: "Profile updated successfully.", student });
});

// POST /api/v1/students/skills (Add or update skill score with evidence)
router.post("/skills", (req, res) => {
  const { name, proficiency, evidence, category } = req.body;
  if (!name) return res.status(400).json({ message: "Skill name is required." });

  const student = store.students[0];
  const existing = student.skills.find((s) => s.name.toLowerCase() === name.toLowerCase());

  if (existing) {
    existing.proficiency = proficiency !== undefined ? Number(proficiency) : Math.min(95, existing.proficiency + 10);
    if (evidence) existing.evidence = evidence;
  } else {
    student.skills.push({
      name,
      proficiency: Number(proficiency) || 60,
      category: category || "General",
      evidence: evidence || "Self-assessed",
    });
  }

  return res.status(200).json({
    message: `Updated skill confidence for ${name}`,
    skills: student.skills,
  });
});

// POST /api/v1/students/projects (Add project with auto skill extraction)
router.post("/projects", (req, res) => {
  const { title, description, githubUrl, liveUrl } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  const detected = extractSkillsFromText(description + " " + title);
  const detectedNames = detected.map((s) => s.name);

  const newProject = {
    id: `prj_${Date.now()}`,
    title,
    description,
    githubUrl: githubUrl || "",
    liveUrl: liveUrl || "",
    skills: detectedNames,
  };

  const student = store.students[0];
  student.projects.push(newProject);

  // Automatically integrate newly detected skills into student profile
  detected.forEach((det) => {
    const existing = student.skills.find((s) => s.name.toLowerCase() === det.name.toLowerCase());
    if (existing) {
      existing.proficiency = Math.min(95, Math.max(existing.proficiency, det.confidence));
    } else {
      student.skills.push({
        name: det.name,
        proficiency: det.confidence,
        category: det.category,
        evidence: `Extracted from project "${title}"`,
      });
    }
  });

  return res.status(201).json({
    message: "Project added and skills extracted automatically.",
    project: newProject,
    extractedSkills: detected,
    updatedSkills: student.skills,
  });
});

// POST /api/v1/students/parse-resume (Smart Automation Resume Extraction)
router.post("/parse-resume", (req, res) => {
  const { resumeText } = req.body;
  if (!resumeText) {
    return res.status(400).json({ message: "Resume text content is required." });
  }

  const parsed = parseResume(resumeText);
  return res.json({
    message: "Resume parsed successfully.",
    parsed,
  });
});

// GET /api/v1/students/recommendations
router.get("/recommendations", (req, res) => {
  const student = store.students[0];
  const targetReqs = req.query.targets ? req.query.targets.split(",") : ["Docker", "AWS"];
  const recs = generateLearningRecommendations(student.skills, targetReqs);

  return res.json({
    studentId: student.id,
    recommendations: recs,
  });
});

export default router;
