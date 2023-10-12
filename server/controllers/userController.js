import { StatusCodes } from "http-status-codes";
import User from "../models/User.js";
import Link from "../models/Link.js";
import cloudinary from "cloudinary";
import { promises as fs } from "fs";
import { formatImage } from "../middlewares/multerMiddleware.js";

const getUser = async (req, res) => {
  const user = await User.findById(req.user.userId);
  const userPassExcluded = user.excludePass();
  res.status(StatusCodes.OK).json({ user: userPassExcluded });
};

const updateUser = async (req, res) => {
  const objectUser = { ...req.body };
  delete objectUser.password;

  if (req.file) {
    const file = formatImage(req.file);
    const response = await cloudinary.v2.uploader.upload(file);
    objectUser.avatar = response.secure_url;
    objectUser.avatarPublicId = response.public_id;
  }
  const user = await User.findByIdAndUpdate(req.user.userId, objectUser);

  if (req.file && user.avatarPublicId) {
    await cloudinary.v2.uploader.destroy(user.avatarPublicId);
  }

  res.status(StatusCodes.OK).json({ msg: "updated" });
};

const admin = async (req, res) => {
  const users = await User.countDocuments();
  const links = await Link.countDocuments();
  res.status(StatusCodes.OK).json({ users, links });
};

export { getUser, updateUser, admin };
