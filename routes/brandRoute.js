import express from "express";
import * as controllers from "../controllers/brandControllers.js";
import * as validators from "../utils/validators/brandValidator.js";
// import {router as subCategoryRoute} from './subCategoryRoute.js';

const router = express.Router();
// router.use("/:categoryId/subCategories", subCategoryRoute);

router
  .route("/")
  .get(controllers.getBrand)
  .post(validators.createBrandRules, controllers.postNewBrand);
router
  .route("/:id")
  .get(validators.getSpecificBrandRules, controllers.getSpecficBrand)
  .put(validators.updateBrandRules, controllers.updateBrand)
  .delete(validators.deleteBrandRules, controllers.deleteBrand);

export { router };
