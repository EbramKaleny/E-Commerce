import { subCategoryModel } from "../Models/subCategoryModel.js";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";
import { apiError } from "../utils/apiErrorHandler.js";

export const getSubCategory = expressAsyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 2;
  const skip = (page - 1) * limit;
  const subCategories = await subCategoryModel.find({}).limit(limit).skip(skip);
  res
    .status(200)
    .json({ results: subCategories.length, page, data: subCategories });
});

export const postNewSubCategory = expressAsyncHandler(async (req, res) => {
  const { name, mainCategory } = req.body;
  const subCategory = await subCategoryModel.create({
    name,
    slug: slugify(name),
    mainCategory,
  });
  res.status(201).json({ data: subCategory });
});

export const getSpecficSubCategory = expressAsyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const subCategory = await subCategoryModel.findById(id);
    if (!subCategory) {
      return next(new apiError(`there is no SubCategory with id ${id}`, 404));
    }
    res.status(200).json({ data: subCategory });
  }
);

export const updateSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const subCategory = await subCategoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!subCategory) {
    return next(new apiError(`there is no SubCategory with id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

export const deleteSubCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await subCategoryModel.findByIdAndDelete(id);
  if (!subCategory) {
    return next(new apiError(`there is no SubCategory with id ${id}`, 404));
  }
  res.status(204).json({ msg: "SubCategory deleted" });
});
