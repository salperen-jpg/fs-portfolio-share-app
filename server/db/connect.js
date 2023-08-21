import mongoose from "mongoose";

export const connectToDB = () => {
  return mongoose.connect(process.env.MONGO_URI);
};
