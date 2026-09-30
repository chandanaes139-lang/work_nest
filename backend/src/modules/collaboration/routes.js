import { Router } from "express";
import { store } from "../../config/store.js";

const router = Router();

// GET /api/v1/collaboration
router.get("/", (_req, res) => {
  return res.json(store.collaborations);
});

// POST /api/v1/collaboration
router.post("/", (req, res) => {
  const { title, type, partners, description, leadFaculty } = req.body;
  if (!title || !description) {
    return res.status(400).json({ message: "Title and description are required." });
  }

  const newCollab = {
    id: `collab_${Date.now()}`,
    title,
    type: type || "Industry-Academia Project",
    partners: Array.isArray(partners) ? partners : [partners || "Nexus University", "Industry Partner"],
    leadFaculty: leadFaculty || "Prof. Sunita Rao",
    studentsInvolved: 0,
    status: "Proposals Open",
    description,
    createdAt: new Date().toISOString(),
  };

  store.collaborations.unshift(newCollab);

  return res.status(201).json({
    message: "Collaboration initiative launched successfully.",
    collaboration: newCollab,
  });
});

// POST /api/v1/collaboration/:id/join
router.post("/:id/join", (req, res) => {
  const collab = store.collaborations.find((c) => c.id === req.params.id);
  if (!collab) {
    return res.status(404).json({ message: "Collaboration not found." });
  }

  collab.studentsInvolved += 1;
  return res.json({
    message: `You have joined the "${collab.title}" initiative. The faculty mentor has been notified.`,
    collaboration: collab,
  });
});

export default router;
