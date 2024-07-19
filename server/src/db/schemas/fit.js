const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Types = mongoose.Types;

const FitSchema = new Schema(
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

const FitModel = mongoose.model("Fit", FitSchema);

exports.FitModel = FitModel;