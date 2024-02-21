import mongoose from "mongoose";

const subCategoruSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: [true, "subCategory name must be unique"],
      required: [true, "sibCategory name is required"],
      maxlength: [32, "subCategory name is too long"],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    mainCategory: {
      type: mongoose.Schema.ObjectId,
      ref: "category",
      required: [true, "must specify the main category"],
    },
  },
  { timestamps: true }
);

export const subCategoryModel = mongoose.model("SubCategory", subCategoruSchema);
