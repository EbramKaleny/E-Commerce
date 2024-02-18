import express from "express";
import * as controllers from "../controllers/categoryControllers.js";

const router = express.Router();

router
  .route("/")
  .get(controllers.getCategory)
  .post(controllers.postNewCategory);
router
  .route("/:id")
  .get(controllers.getSpecficCategory)
  .put(controllers.updateCategory)
  .delete(controllers.deleteCategory);

export { router };
