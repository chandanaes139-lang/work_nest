import mongoose from "mongoose";

const opportunitySchema = new mongoose.Schema({
  industry: { type: mongoose.Schema.Types.ObjectId, ref: "Industry", required: true },
  type: { type: String, enum: ["internship", "placement", "training", "project", "program"], required: true },
  title: { type: String, required: true }, description: { type: String, required: true }, location: String, isRemote: { type: Boolean, default: false },
  requiredSkills: [{ name: { type: String, required: true }, minimumProficiency: { type: Number, default: 55 }, required: { type: Boolean, default: true } }],
  eligibility: { minimumCgpa: Number, graduationYears: [Number], notes: String },
  applicationDeadline: Date, isPublished: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("Opportunity", opportunitySchema);
