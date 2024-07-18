const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Types = mongoose.Types;

const MeasurementSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => String(new Types.ObjectId()),
    },
    measurement: {
      type: String,
      required: true,
      unique: true,
    }
  },
  { timestamps: true },
  { versionKey : false }
)

const MeasurementModel = mongoose.model("Measurement", MeasurementSchema);

exports.MeasurementModel = MeasurementModel;