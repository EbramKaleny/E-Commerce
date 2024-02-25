import { brandModel } from "../Models/brandModel.js";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";
import { apiError } from "../utils/apiErrorHandler.js";

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
export const getBrand = expressAsyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1;
  const skip = (page - 1) * limit;
  const brands = await brandModel.find({}).limit(limit).skip(skip);
  res.status(200).json({ results: brands.length, page, data: brands });
});

// @desc    Create Brand
// @route   POST  /api/v1/categories
// @access  Private
export const postNewBrand = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const Brand = await brandModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: Brand });
});

// @desc    Get specific Brand by id
// @route   GET /api/v1/categories/:id
// @access  Public
export const getSpecficBrand = expressAsyncHandler(
  async (req, res, next) => {
    const { id } = req.params;
    const Brand = await brandModel.findById(id);
    if (!Brand) {
      // res.status(404).json({ msg: `there is no Brand with id ${id}` });
      return next(new apiError(`there is no Brand with id ${id}`, 404));
    }
    res.status(200).json({ data: Brand });
  }
);

// @desc    Update specific Brand
// @route   PUT /api/v1/categories/:id
// @access  Private
export const updateBrand = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name,} = req.body;
  const Brand = await brandModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name)},
    { new: true }
  );
  if (!Brand) {
    return next(new apiError(`there is no Brand with id ${id}`, 404));
  }
  res.status(200).json({ data: Brand });
});

// @desc    Delete specific Brand
// @route   DELETE /api/v1/categories/:id
// @access  Private
export const deleteBrand = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const Brand = await brandModel.findByIdAndDelete(id);
  if (!Brand) {
    return next(new apiError(`there is no Brand with id ${id}`, 404));
  }
  res.status(204).json({ msg: "Brand deleted" });
});
