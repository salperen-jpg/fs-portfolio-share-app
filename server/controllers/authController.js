import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import jwt from "jsonwebtoken";

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

  const isPasswordsMatched = await comparePassword(
    req.body.password,
    loginUser.password
  );
  console.log(isPasswordsMatched);

  // create JWT
  const token = jwt.sign(
    { userId: loginUser._id, role: loginUser.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES,
    }
  );

  console.log(token);

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    expires: new Date(Date.now() + oneDay),
  });

  res.status(StatusCodes.OK).json({ msg: "Logged in" });
};

export { register, login };
