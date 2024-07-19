const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const measurementSchema = new Schema({
  _id: {
    type: String,
    required: true,
    ref: "Measurement"
  },
  name: {
    type: String,
    required: true,
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
    author: {
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
    category: {
      type: String,
      required: true,
      ref: "Category",
    },
    subCategory: {
      type: String,
      required: true,
      ref: "SubCategory",
    },
    gender: {
      type: String,
      required: true,
      ref: "Gender"
    },
    size: {
      type: String,
      required: true,
      ref: "Size"
    },
    fit: {
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