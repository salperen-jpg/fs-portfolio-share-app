import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    url: String,
    name: String,
  },
  { timestamps: true }
);

export default mongoose.model("Link", linkSchema);
