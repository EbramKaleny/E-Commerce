import express from "express";
import * as controllers from "../controllers/subCategoryControllers.js";
import * as validators from "../utils/validators/subCategoryValidators.js";

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(controllers.getSubCategory)
  .post(validators.createSubCategoryRules, controllers.postNewSubCategory);

router
  .route("/:id")
  .get(
    validators.getSpecificSubCategoryRules,
    controllers.getSpecficSubCategory
  )
  .put(validators.updateSubCategoryRules, controllers.updateSubCategory)
  .delete(validators.deleteSubCategoryRules, controllers.deleteSubCategory);

export { router };
