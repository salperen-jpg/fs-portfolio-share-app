import { body, validationResult } from "express-validator";
import { BadRequest } from "../errors/customErrors.js";

const validationLayer = (chain) => [
  chain,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      console.log(errorMessages);
      throw new BadRequest(errorMessages);
    }
    next();
  },
];

export const addLinkValidation = validationLayer([
  body("url").notEmpty().withMessage("url can not be empty."),
  body("name").notEmpty().withMessage("name can not be empty."),
]);
