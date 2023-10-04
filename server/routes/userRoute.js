import { Router } from "express";
import { admin, getUser, updateUser } from "../controllers/userController.js";
import { userUpdateValidation } from "../middlewares/validationLayer.js";
import { accessPermission } from "../middlewares/adminMiddleware.js";
import upload from "../middlewares/multerMiddleware.js";

const router = Router();

router.route("/getUser").get(getUser);
router
  .route("/updateUser")
  .patch(upload.single("avatar"), userUpdateValidation, updateUser);
router.route("/admin").get([accessPermission, admin]);

export default router;
