import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/validateMiddleware.js";

export const getSpecificSubCategoryRules = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];

export const createSubCategoryRules = [
  check("name")
    .notEmpty()
    .withMessage("subCategory required a name")
    .isLength({ min: 1 })
    .withMessage("subCategory name is required")
    .isLength({ max: 32 })
    .withMessage("subCategory name is too long"),
  check("mainCategory")
    .notEmpty()
    .withMessage("sub category must belong to main category")
    .isMongoId()
    .withMessage("invalid main category id"),
  validatorMiddleware,
];

export const updateSubCategoryRules = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];

export const deleteSubCategoryRules = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];
