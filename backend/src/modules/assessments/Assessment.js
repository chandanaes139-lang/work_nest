import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({ title: { type: String, required: true }, skill: { type: String, required: true }, description: String, questions: [{ prompt: String, options: [String], answer: String }], isActive: { type: Boolean, default: true } }, { timestamps: true });
export default mongoose.model("Assessment", assessmentSchema);
