import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema({
  opportunity: { type: mongoose.Schema.Types.ObjectId, ref: "Opportunity", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true },
  status: { type: String, enum: ["draft", "submitted", "reviewing", "shortlisted", "rejected", "selected", "withdrawn"], default: "draft" },
  coverNote: String, submittedAt: Date,
}, { timestamps: true });
applicationSchema.index({ opportunity: 1, student: 1 }, { unique: true });
export default mongoose.model("Application", applicationSchema);
