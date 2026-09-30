import { Router } from "express";
import Opportunity from "./Opportunity.js";
import { requireAuth, requireRole } from "../../middleware/auth.js";

const router = Router();
router.get("/", async (request, response, next) => { try { const filter = request.query.type ? { type: request.query.type, isPublished: true } : { isPublished: true }; return response.json(await Opportunity.find(filter).populate("industry", "name website").sort({ createdAt: -1 })); } catch (error) { return next(error); } });
router.post("/", requireAuth, requireRole("industry", "admin"), async (request, response, next) => { try { return response.status(201).json(await Opportunity.create(request.body)); } catch (error) { return next(error); } });
export default router;
