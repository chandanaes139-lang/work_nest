import cors from "cors";
import express from "express";
import { env } from "./config/environment.js";
import { errorHandler, notFoundHandler } from "./middleware/errors.js";

import authRouter from "./modules/auth/routes.js";
import studentRouter from "./modules/students/routes.js";
import assessmentRouter from "./modules/assessments/routes.js";
import opportunityRouter from "./modules/opportunities/routes.js";
import applicationRouter from "./modules/applications/routes.js";
import matchingRouter from "./modules/matching/routes.js";
import facultyRouter from "./modules/faculty/routes.js";
import institutionRouter from "./modules/institution/routes.js";
import collaborationRouter from "./modules/collaboration/routes.js";
import dashboardRouter from "./modules/analytics/routes.js";

const app = express();

const allowedOrigins = env.clientUrl ? env.clientUrl.split(",").map((url) => url.trim()) : ["*"];
app.use(cors({ origin: allowedOrigins.includes("*") ? "*" : allowedOrigins, credentials: true }));
app.use(express.json({ limit: "5mb" }));

// Route registrations
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/students", studentRouter);
app.use("/api/v1/assessments", assessmentRouter);
app.use("/api/v1/opportunities", opportunityRouter);
app.use("/api/v1/applications", applicationRouter);
app.use("/api/v1/matches", matchingRouter);
app.use("/api/v1/faculty", facultyRouter);
app.use("/api/v1/institution", institutionRouter);
app.use("/api/v1/collaboration", collaborationRouter);
app.use("/api/v1/dashboard", dashboardRouter);

app.get("/health", (_request, response) =>
  response.json({
    status: "ok",
    service: "skillbridge-api",
    version: "1.0.0",
    theme: "Smart Automation - Ministry of Ayush",
  })
);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
