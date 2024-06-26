const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Types = mongoose.Types;

const SubCategorySchema = new Schema(
  {
    _id: {
      type: String,
      default: () => String(new Types.ObjectId()),
    },
    subCategory: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
  { versionKey : false }
)

const SubCategoryModel = mongoose.model("SubCategory", SubCategorySchema);

exports.SubCategoryModel = SubCategoryModel;