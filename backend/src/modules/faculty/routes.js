import { Router } from "express";
import { store } from "../../config/store.js";

const router = Router();

// GET /api/v1/faculty/students
router.get("/students", (_req, res) => {
  const studentsWithMetrics = store.students.map((std) => {
    const gaps = std.skills.filter((s) => (s.proficiency ?? s.score ?? 0) < 55).map((s) => s.name);
    const coveredCount = std.skills.filter((s) => (s.proficiency ?? s.score ?? 0) >= 55).length;
    const readiness = Math.min(95, Math.round(48 + (coveredCount / (std.skills.length || 1)) * 36));

    return {
      id: std.id,
      name: std.name,
      program: std.program,
      department: std.department || "Computer Science",
      cgpa: std.cgpa,
      readiness,
      skills: std.skills.map((s) => s.name),
      gaps,
      projectsCount: std.projects?.length || 0,
      needsAttention: gaps.length >= 2,
    };
  });

  return res.json(studentsWithMetrics);
});

// POST /api/v1/faculty/nudge
router.post("/nudge", (req, res) => {
  const { studentId, message, pathway } = req.body;
  const student = store.students.find((s) => s.id === studentId || s.name === studentId) || store.students[0];

  return res.json({
    message: `Mentorship nudge sent to ${student.name}.`,
    action: {
      studentName: student.name,
      recommendedPathway: pathway || "Docker & Cloud Foundations",
      note: message || "Identified high-impact gap for upcoming placement drives.",
      timestamp: new Date().toISOString(),
    },
  });
});

// GET /api/v1/faculty/collaborations
router.get("/collaborations", (_req, res) => {
  return res.json(store.collaborations);
});

export default router;
