import { check } from "express-validator";
import { validatorMiddleware } from "../../middleware/validateMiddleware.js";

export const getSpecificBrandRules = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];

export const createBrandRules = [
  check("name")
    .notEmpty()
    .withMessage("Brand required a name")
    .isLength({ min: 3 })
    .withMessage("Brand name is too short")
    .isLength({ max: 32 })
    .withMessage("Brand name is too long"),
  validatorMiddleware,
];

export const updateBrandRules = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];

export const deleteBrandRules = [
  check("id").isMongoId().withMessage("invalid id"),
  validatorMiddleware,
];
