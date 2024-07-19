const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Types = mongoose.Types;

const GenderSchema = new Schema(
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
  },
  {
    timestamps: true,
    versionKey : false
  }
)

const GenderModel = mongoose.model("Gender", GenderSchema);

exports.GenderModel = GenderModel;