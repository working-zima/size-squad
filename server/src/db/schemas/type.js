const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Types = mongoose.Types;

const TypeSchema = new Schema(
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
);

const TypeModel = mongoose.model("Type", TypeSchema);

exports.TypeModel = TypeModel;