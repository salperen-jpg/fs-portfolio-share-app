import { Router } from "express";
import {
  addLink,
  deleteLink,
  getLinks,
  getSingleLink,
  updateLink,
} from "../controllers/linksController.js";
import { addLinkValidation } from "../middlewares/validationLayer.js";

const router = Router();

router.route("/").get(getLinks).post(addLinkValidation, addLink);
router.route("/:id").get(getSingleLink).patch(updateLink).delete(deleteLink);

export default router;
