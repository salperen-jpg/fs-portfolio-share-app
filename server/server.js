import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
const app = express();
import { body, validationResult } from "express-validator";
// middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.post("/person", body("person").notEmpty(), (req, res) => {
  const error = validationResult(req);
  console.log(error);
  res.send("abc");
});

// routes
import linkRouter from "./routes/linksRoute.js";

app.use("/api/v1/links", linkRouter);

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
