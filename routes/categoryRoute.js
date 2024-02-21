import express from "express";
import * as controllers from "../controllers/categoryControllers.js";
import * as validators from "../utils/validators/categoryValidator.js";

const router = express.Router();

router
  .route("/")
  .get(controllers.getCategory)
  .post(validators.createCategoryRules,controllers.postNewCategory);
router
  .route("/:id")
  .get(validators.getSpecificCategoryRules, controllers.getSpecficCategory)
  .put(validators.updateCategoryRules, controllers.updateCategory)
  .delete(validators.deleteCategoryRules, controllers.deleteCategory);

export { router };
