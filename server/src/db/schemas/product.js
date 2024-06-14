const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const MeasurementsSchema = new Schema({
  totalLength: {
    type: Number,
    required: true
  },
  shoulderWidth: {
    type: Number,
    required: true
  },
  chestWidth: {
    type: Number,
    required: true
  },
  sleeveLength: {
    type: Number,
    required: true
  }
});

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
    categoryId: {
      type: String,
      required: true,
      ref: "Category",
    },
    subCategory: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    measurements: {
      type: MeasurementsSchema,
      required: true,
    },
    fitId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    }
  },
  { timestamps: true }
)

const ProductModel = mongoose.model("product", ProductSchema);

module.exports = ProductModel;