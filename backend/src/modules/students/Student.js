import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" },
  enrollmentNumber: String,
  program: String,
  department: String,
  graduationYear: Number,
  cgpa: Number,
  skills: [{ name: { type: String, required: true }, proficiency: { type: Number, min: 0, max: 100, required: true }, evidence: String, verifiedAt: Date }],
  projects: [{ title: String, description: String, repositoryUrl: String, liveUrl: String }],
  certifications: [{ title: String, issuer: String, credentialUrl: String, issuedOn: Date }],
  resumeUrl: String,
  portfolioUrl: String,
}, { timestamps: true });

export default mongoose.model("Student", studentSchema);
