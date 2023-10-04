import { body, param, validationResult } from "express-validator";
import { BadRequest, NotFound, Unauthorized } from "../errors/customErrors.js";
import mongoose from "mongoose";
import Link from "../models/Link.js";
import User from "../models/User.js";

const validationLayer = (chain) => [
  chain,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      if (errorMessages[0].startsWith("No")) {
        throw new NotFound(errorMessages);
      }
      throw new BadRequest(errorMessages);
    }
    next();
  },
];

export const addLinkValidation = validationLayer([
  body("url")
    .notEmpty()
    .withMessage("url can not be empty.")
    .isLength({ min: 10 })
    .withMessage("So short for a complete link !"),
  body("platform").notEmpty().withMessage("platform can not be empty."),
]);

export const idParamValidation = validationLayer([
  param("id").custom(async (id, { req }) => {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) throw new Error("Invalid mongoDB id !");
    const actualLink = await Link.findById(id);
    const {
      user: { userId },
    } = req;
    if (userId !== actualLink.createdBy.toString()) {
      throw new Unauthorized("Not authorized !");
    }
    if (!actualLink) throw new Error(`No link with the id of : ${id}`);
  }),
]);

export const userRegisterValidation = validationLayer([
  body("name").notEmpty().withMessage("Name file can not be empty!"),
  body("lastName").notEmpty().withMessage("Lastname can not be empty!"),
  body("devRole").notEmpty().withMessage("Role can not be empty!"),
  body("password")
    .notEmpty()
    .withMessage("Password can not be empty!")
    .isLength({ min: 8 })
    .withMessage("Password can not be less then 8 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email can not be empty!")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const isEmailExisting = await User.findOne({ email });
      if (isEmailExisting) throw new BadRequest("Email already in use!");
    }),
]);

export const userLoginValidation = validationLayer([
  body("password")
    .notEmpty()
    .withMessage("Password can not be empty!")
    .isLength({ min: 8 })
    .withMessage("Password can not be less then 8 characters"),
  body("email")
    .notEmpty()
    .withMessage("Email can not be empty!")
    .isEmail()
    .withMessage("Invalid email format"),
]);

export const userUpdateValidation = validationLayer([
  body("name").notEmpty().withMessage("Name file can not be empty!"),
  body("lastName").notEmpty().withMessage("Lastname can not be empty!"),
  body("email")
    .notEmpty()
    .withMessage("Email can not be empty!")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email, { req }) => {
      const isEmailExisting = await User.findOne({ email });
      if (isEmailExisting && isEmailExisting._id.toString() !== req.user.userId)
        throw new BadRequest("Email already in use!");
    }),
  body("devRole").notEmpty().withMessage("Role can not be empty!"),
]);
