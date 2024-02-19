import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/validateMiddleware.js";

export const getSpecificCategoryRules = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];

export const createCategoryRules = [
  check("name")
    .notEmpty()
    .withMessage("category required a name")
    .isLength({ min: 3 })
    .withMessage("category name is too short")
    .isLength({ max: 32 })
    .withMessage("category name is too long"),
  validatorMiddleware,
];

export const updateCategoryRules = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];

export const deleteCategoryRules = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];
