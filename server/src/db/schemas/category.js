const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Types = mongoose.Types;

const CategorySchema = new Schema(
  {
    _id: {
      type: String,
      default: () => String(new Types.ObjectId()),
    },
    category: {
      type: String,
      required: true,
      unique: true,
    },
    subCategories: [{
      type: String,
      required: true,
      ref: "SubCategory"
    }],
    measurements: {
      type: Array,
      required: true,
    }
  },
  { timestamps: true },
  { versionKey : false }
)

const CategoryModel = mongoose.model("Category", CategorySchema);

exports.CategoryModel = CategoryModel;