import mongoose from "mongoose";

const skillSchema = new mongoose.Schema({ name: { type: String, required: true, unique: true }, canonicalName: { type: String, required: true, unique: true }, category: String }, { timestamps: true });
export default mongoose.model("Skill", skillSchema);
