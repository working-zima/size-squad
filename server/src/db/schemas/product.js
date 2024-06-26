const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Types = mongoose.Types;

const MeasurementsSchema = new Schema({
  _id: {
    type: String,
    default: () => String(new Types.ObjectId())
    // Object("66730b58c6c859c336b846c8")를 "66730b58c6c859c336b846c8" 형태로
  },
  totalLength: {
    type: Number,
    required: false
  },
  shoulderWidth: {
    type: Number,
    required: false
  },
  chestWidth: {
    type: Number,
    required: false
  },
  sleeveLength: {
    type: Number,
    required: false
  },
  waistWidth: {
    type: Number,
    required: false
  },
  hipWidth: {
    type: Number,
    required: false
  },
  thighWidth: {
    type: Number,
    required: false
  },
  rise: {
    type: Number,
    required: false
  },
  hemWidth: {
    type: Number,
    required: false
  }
});

const ProductSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => String(new Types.ObjectId())
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
    authorId: {
      type: String,
      required: true,
      ref: "User",
    },
    brand: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    genderId: {
      type: String,
      required: true,
      ref: "Gender"
    },
    size: {
      type: String,
      required: true,
    },
    fitId: {
      type: String,
      required: true,
      ref: "Fit"
    },
    measurements: {
      type: MeasurementsSchema,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false
    }
  },
  { timestamps: true },
  { versionKey : false}
)

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;