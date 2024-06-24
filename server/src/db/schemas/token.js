const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Types = mongoose.Types;

const TokenSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => String(new Types.ObjectId()),
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    accessToken: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const TokenModel = mongoose.model("Token", TokenSchema);

exports.TokenModel = TokenModel;