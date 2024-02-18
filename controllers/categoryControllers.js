import { CategoryModel } from "../Models/categoryModel.js";
import slugify from "slugify";
import expressAsyncHandler from "express-async-handler";

export const getCategory = expressAsyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 1;
  const skip = (page - 1) * limit;
  const categories = await CategoryModel.find({}).limit(limit).skip(skip);
  res.status(200).json({ results: categories.length, page, data: categories });
});

export const postNewCategory = expressAsyncHandler(async (req, res, next) => {
  const { name } = req.body;
  const category = await CategoryModel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

export const getSpecficCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const category = await CategoryModel.findById(id);
  if (!category) {
    res.status(404).json({ msg: `there is no category with id ${id}` });
  }
  res.status(200).json({ data: category });
});

export const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await CategoryModel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    res.status(404).json({ msg: `there is no category with id ${id}` });
  }
  res.status(200).json({ data: category });
});

export const deleteCategory = expressAsyncHandler(async (req, res) => {
  const {id} = req.params
  const category = await CategoryModel.findByIdAndDelete(id)
  if (!category) {
    res.status(404).json({ msg: `there is no category with id ${id}` });
  }
  res.status(204).json({ msg: "category deleted"});
  
})
