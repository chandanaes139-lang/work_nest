import "dotenv/config";

const requiredInProduction = ["MONGODB_URI", "JWT_SECRET"];

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  mongoUri: process.env.MONGODB_URI ?? "",
  jwtSecret: process.env.JWT_SECRET ?? "development-only-secret",
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
};

export function validateEnvironment() {
  if (env.nodeEnv !== "production") return;
  const missing = requiredInProduction.filter((key) => !process.env[key]);
  if (missing.length) throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
}
