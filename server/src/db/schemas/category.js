const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Types = mongoose.Types;

const CategorySchema = new Schema(
  {
    _id: {
      type: String,
      default: () => String(new Types.ObjectId()),
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
      ref: "Type"
    },
    subCategories: [{
      type: String,
      required: true,
      ref: "SubCategory"
    }],
    measurements: [{
      type: String,
      required: true,
      ref: "Measurement"
    }]
  },
  { timestamps: true },
  { versionKey : false }
)

const CategoryModel = mongoose.model("Category", CategorySchema);

exports.CategoryModel = CategoryModel;