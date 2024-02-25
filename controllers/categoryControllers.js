import { CategoryModel } from "../Models/categoryModel.js";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";
import { apiError } from "../utils/apiErrorHandler.js";

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
export const getCategory = expressAsyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).limit(limit).skip(skip);
  res.status(200).json({ results: categories.length, page, data: categories });
});

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
export const postNewCategory = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
export const getSpecficCategory = expressAsyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const category = await CategoryModel.findById(id);
    if (!category) {
      // res.status(404).json({ msg: `there is no category with id ${id}` });
      return next(new apiError(`there is no category with id ${id}`, 404));
    }
    res.status(200).json({ data: category });
  }
);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
export const updateCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await CategoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name)},
    { new: true }
  );
  if (!category) {
    return next(new apiError(`there is no category with id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private
export const deleteCategory = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await CategoryModel.findByIdAndDelete(id);
  if (!category) {
    return next(new apiError(`there is no category with id ${id}`, 404));
  }
  res.status(204).json({ msg: "category deleted" });
});
