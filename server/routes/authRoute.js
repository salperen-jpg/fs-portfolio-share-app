import { Router } from "express";
import { login, register } from "../controllers/authController.js";
import {
  userLoginValidation,
  userRegisterValidation,
} from "../middlewares/validationLayer.js";

const router = Router();

router.route("/register").post(userRegisterValidation, register);
router.route("/login").post(userLoginValidation, login);

export default router;
