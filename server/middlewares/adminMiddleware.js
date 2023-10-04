import { Unauthorized } from "../errors/customErrors.js";

export const accessPermission = (req, res, next) => {
  console.log("here");
  if (req.user.role !== "admin") throw new Unauthorized("unauthorized");
  next();
};
