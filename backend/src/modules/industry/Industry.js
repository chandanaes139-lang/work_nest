import mongoose from "mongoose";

const industrySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  name: { type: String, required: true }, website: String, description: String, city: String, verifiedAt: Date,
}, { timestamps: true });

export default mongoose.model("Industry", industrySchema);
