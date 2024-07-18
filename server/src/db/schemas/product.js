const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const measurementSchema = new Schema({
  measurementId: {
    type: String,
    required: true,
    ref: "Measurement"
  },
  value: {
    type: Number,
    required: true
  }
}, { _id: false });


const ProductSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => String(new Types.ObjectId())
    },
    authorId: {
      type: String,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    categoryId: {
      type: String,
      required: true,
      ref: "Category",
    },
    subCategoryId: {
      type: String,
      required: true,
      ref: "SubCategory",
    },
    genderId: {
      type: String,
      required: true,
      ref: "Gender"
    },
    sizeId: {
      type: String,
      required: true,
      ref: "Size"
    },
    fitId: {
      type: String,
      required: true,
      ref: "Fit"
    },
    measurements: [measurementSchema],
    description: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
  { versionKey : false}
)

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;