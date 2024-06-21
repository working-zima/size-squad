const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const Types = mongoose.Types;

const UserSchema = new Schema(
  {
    _id: {
      type: String,
      default: () => String(new Types.ObjectId()),
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    genderId: {
      type: String,
      required: true,
      ref: "Gender",
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    role: {
      type: Number,
      default: 0,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    }
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model("User", UserSchema);

exports.UserModel = UserModel;
