import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    url: String,
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Link", linkSchema);
