import { Unauthenticated } from "../errors/customErrors.js";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new Unauthenticated("Unauthenticated");
  }
  try {
    const { userId, role } = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId, role };
    next();
  } catch (error) {
    throw new Unauthenticated("Unauthenticated");
  }
};

export default authMiddleware;
