const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Types = mongoose.Types;

const GenderSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => String(new Types.ObjectId()),
    },
    gender: {
      type: String,
      required: true,
      unique: true,
    },
    size: {
      type: Array,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const GenderModel = mongoose.model("Gender", GenderSchema);

exports.GenderModel = GenderModel;