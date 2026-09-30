import mongoose from "mongoose";

const recommendationSchema = new mongoose.Schema({ student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, skill: String, title: String, provider: String, url: String, estimatedHours: Number, rationale: String }, { timestamps: true });
export default mongoose.model("Recommendation", recommendationSchema);
