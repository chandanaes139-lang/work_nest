import mongoose from "mongoose";
import { env } from "./environment.js";

export async function connectDatabase() {
  if (!env.mongoUri) {
    console.warn("MONGODB_URI is not configured. API is running in demo mode.");
    return false;
  }
  await mongoose.connect(env.mongoUri);
  console.info("Connected to MongoDB.");
  return true;
}
