import mongoose from "mongoose";

const institutionSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, name: { type: String, required: true },
  domain: { type: String, unique: true, sparse: true }, city: String, state: String,
}, { timestamps: true });

export default mongoose.model("Institution", institutionSchema);
