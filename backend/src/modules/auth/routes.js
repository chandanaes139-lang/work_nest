import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../users/User.js";
import { env } from "../../config/environment.js";

const router = Router();
const tokenFor = (user) => jwt.sign({ sub: user.id, role: user.role }, env.jwtSecret, { expiresIn: "7d" });

router.post("/register", async (request, response, next) => {
  try {
    const { name, email, password, role } = request.body;
    if (!name || !email || !password || !role) return response.status(400).json({ message: "Name, email, password, and role are required." });
    const passwordHash = await bcrypt.hash(password, 12);
    const user = await User.create({ name, email, passwordHash, role });
    return response.status(201).json({ token: tokenFor(user), user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) { return next(error); }
});
router.post("/login", async (request, response, next) => {
  try {
    const user = await User.findOne({ email: request.body.email?.toLowerCase() });
    if (!user || !(await bcrypt.compare(request.body.password ?? "", user.passwordHash))) return response.status(401).json({ message: "Invalid email or password." });
    return response.json({ token: tokenFor(user), user: { id: user.id, name: user.name, role: user.role } });
  } catch (error) { return next(error); }
});
export default router;
