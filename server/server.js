import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
const app = express();

// middlewares

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.get("/", (req, res) => {
  console.log("Hi there");
  res.send("abc");
});

// routes
import linkRouter from "./routes/linksRoute.js";
app.use("/api/v1/links", linkRouter);

// errrors

// start

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
