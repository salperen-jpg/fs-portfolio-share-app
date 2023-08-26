import { Router } from "express";
import { getUser, updateUser } from "../controllers/userController.js";
import { userUpdateValidation } from "../middlewares/validationLayer.js";

const router = Router();

router.route("/getUser").get(getUser);
router.route("/updateUser").patch(userUpdateValidation, updateUser);

export default router;
