import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import cookieParser from "cookie-parser";
// middlewares
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/api/test", (req, res) => {
  res.status(200).json({ msg: "Test" });
});

// routes
import linkRouter from "./routes/linksRoute.js";
import authRouter from "./routes/authRoute.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import userRouter from "./routes/userRoute.js";
app.use("/api/v1/links", authMiddleware, linkRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user", authMiddleware, userRouter);

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
