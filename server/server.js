import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";
// public
import path, { dirname } from "path";
import { fileURLToPath } from "url";
// middlewares
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, "../client/dist")));

// routes
import linkRouter from "./routes/linksRoute.js";
import authRouter from "./routes/authRoute.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import userRouter from "./routes/userRoute.js";
app.use("/api/v1/links", authMiddleware, linkRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authMiddleware, userRouter);

// frontend routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist/index.html"));
});

// errrors
import { notFound } from "./middlewares/notFound.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware.js";
app.use(notFound);
app.use(errorHandlerMiddleware);

const PORT = process.env.port || 5000;

import { connectToDB } from "./db/connect.js";
// start
try {
  await connectToDB();
  app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
} catch (error) {
  console.log(error);
}
