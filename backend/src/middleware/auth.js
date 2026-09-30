import jwt from "jsonwebtoken";
import { env } from "../config/environment.js";

export function requireAuth(request, response, next) {
  const token = request.headers.authorization?.replace("Bearer ", "");
  if (!token) return response.status(401).json({ message: "Authentication required." });
  try { request.user = jwt.verify(token, env.jwtSecret); return next(); }
  catch { return response.status(401).json({ message: "Invalid or expired session." }); }
}

export function requireRole(...roles) {
  return (request, response, next) => roles.includes(request.user?.role) ? next() : response.status(403).json({ message: "You do not have access to this action." });
}
