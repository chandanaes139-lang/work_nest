import cors from "cors";
import express from "express";
import { env } from "./config/environment.js";
import { errorHandler, notFoundHandler } from "./middleware/errors.js";
import authRouter from "./modules/auth/routes.js";
import opportunityRouter from "./modules/opportunities/routes.js";
import matchingRouter from "./modules/matching/routes.js";
import dashboardRouter from "./modules/analytics/routes.js";

const app = express();

app.use(cors({ origin: env.clientUrl.split(",").map((url) => url.trim()), credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/opportunities", opportunityRouter);
app.use("/api/v1/matches", matchingRouter);
app.use("/api/v1/dashboard", dashboardRouter);
app.get("/health", (_request, response) => response.json({ status: "ok", service: "skillbridge-api" }));
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
