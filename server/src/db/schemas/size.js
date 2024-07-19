const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Types = mongoose.Types;

const SizeSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => String(new Types.ObjectId()),
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      ref: "Gender"
    },
    type: {
      type: String,
      required: true,
    }
  },
  { timestamps: true },
  { versionKey : false }
)

const SizeModel = mongoose.model("Size", SizeSchema);

exports.SizeModel = SizeModel;