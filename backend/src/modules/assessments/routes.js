import { Router } from "express";
import { store } from "../../config/store.js";

const router = Router();

// GET /api/v1/assessments
router.get("/", (_req, res) => {
  const list = store.assessments.map(({ id, skill, title, estimatedMinutes, questions }) => ({
    id,
    skill,
    title,
    estimatedMinutes,
    questionCount: questions.length,
  }));
  return res.json(list);
});

// GET /api/v1/assessments/:id
router.get("/:id", (req, res) => {
  const assessment = store.assessments.find((a) => a.id === req.params.id || a.skill.toLowerCase() === req.params.id.toLowerCase());
  if (!assessment) {
    return res.status(404).json({ message: "Assessment not found." });
  }

  // Send questions without revealing correct answer index to client
  const clientQuestions = assessment.questions.map((q) => ({
    id: q.id,
    prompt: q.prompt,
    options: q.options,
  }));

  return res.json({
    id: assessment.id,
    skill: assessment.skill,
    title: assessment.title,
    questions: clientQuestions,
  });
});

// POST /api/v1/assessments/:id/submit
router.post("/:id/submit", (req, res) => {
  const assessment = store.assessments.find((a) => a.id === req.params.id || a.skill.toLowerCase() === req.params.id.toLowerCase());
  if (!assessment) {
    return res.status(404).json({ message: "Assessment not found." });
  }

  const { answers = {} } = req.body;
  let correctCount = 0;

  assessment.questions.forEach((q) => {
    if (answers[q.id] === q.correctIndex) {
      correctCount += 1;
    }
  });

  const percentage = assessment.questions.length ? Math.round((correctCount / assessment.questions.length) * 100) : 0;
  // Calculate proficiency score: baseline 60 + percentage * 0.35
  const awardedProficiency = Math.min(95, Math.max(40, Math.round(55 + (percentage * 0.38))));

  // Update student's skill in store
  const student = store.students[0];
  const existingSkill = student.skills.find((s) => s.name.toLowerCase() === assessment.skill.toLowerCase());
  if (existingSkill) {
    existingSkill.proficiency = awardedProficiency;
    existingSkill.evidence = `Verified via assessment "${assessment.title}" (${percentage}% correct)`;
  } else {
    student.skills.push({
      name: assessment.skill,
      proficiency: awardedProficiency,
      category: "Verified",
      evidence: `Verified via assessment "${assessment.title}" (${percentage}% correct)`,
    });
  }

  return res.json({
    message: "Assessment scored successfully.",
    skill: assessment.skill,
    score: percentage,
    correctCount,
    totalQuestions: assessment.questions.length,
    newProficiency: awardedProficiency,
    updatedSkills: student.skills,
  });
});

export default router;
