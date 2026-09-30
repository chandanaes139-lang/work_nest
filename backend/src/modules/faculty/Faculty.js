import mongoose from "mongoose";

const facultySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  institution: { type: mongoose.Schema.Types.ObjectId, ref: "Institution" }, department: String, designation: String,
  assignedStudents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Student" }],
}, { timestamps: true });

export default mongoose.model("Faculty", facultySchema);
