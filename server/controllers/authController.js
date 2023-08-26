import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import jwt from "jsonwebtoken";
import { Unauthenticated } from "../errors/customErrors.js";

const register = async (req, res) => {
  const isFirstEntry = (await User.countDocuments()) === 0;
  if (isFirstEntry) req.body.role = "admin";
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

const login = async (req, res) => {
  const loginUser = await User.findOne({ email: req.body.email });

  const isValidUser =
    loginUser && (await comparePassword(req.body.password, loginUser.password));

  if (!isValidUser) throw new Unauthenticated("invalid credentials");

  // create JWT
  const token = jwt.sign(
    { userId: loginUser._id, role: loginUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + oneDay),
  });

  res.status(StatusCodes.OK).json({ msg: "Logged in" });
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "Logged out" });
};

export { register, login, logout };
