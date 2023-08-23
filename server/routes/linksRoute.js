import { Router } from "express";
import {
  addLink,
  deleteLink,
  getLinks,
  getSingleLink,
  updateLink,
} from "../controllers/linksController.js";
import {
  addLinkValidation,
  idParamValidation,
} from "../middlewares/validationLayer.js";

const router = Router();

router.route("/").get(getLinks).post(addLinkValidation, addLink);
router
  .route("/:id")
  .get(idParamValidation, getSingleLink)
  .patch(idParamValidation, updateLink)
  .delete(idParamValidation, deleteLink);

export default router;
