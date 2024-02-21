import express from "express";
import * as controllers from "../controllers/subCategoryControllers.js";
import * as validators from "../utils/validators/subCategoryValidators.js";

const router = express.Router();

router
  .route("/subcategories/")
  .get(controllers.getSubCategory)
  .post(validators.createSubCategoryRules, controllers.postNewSubCategory);

router
  .route("/subcategories/:id")
  .get(
    validators.getSpecificSubCategoryRules,
    controllers.getSpecficSubCategory
  )
  .put(validators.updateSubCategoryRules, controllers.updateSubCategory)
  .delete(validators.deleteSubCategoryRules, controllers.deleteSubCategory);

export { router };
