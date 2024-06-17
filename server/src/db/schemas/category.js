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
    subCategories: {
      type: Array,
      required: true,
    },
    measurements: {
      type: Array,
      required: true,
    }
  },
  {
    timestamps: true,
  }
)

const CategoryModel = mongoose.model("Category", CategorySchema);

exports.CategoryModel = CategoryModel;