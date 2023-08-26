import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";

const getUser = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const userPassExcluded = user.excludePass();
  res.status(StatusCodes.OK).json({ user: userPassExcluded });
};

const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.user.userId, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ msg: "updated" });
};

export { getUser, updateUser };
