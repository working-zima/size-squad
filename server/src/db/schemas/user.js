const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    gender: {
      type: String,
      required: false,
      ref: "Gender",
    },
    height: {
      type: Number,
      required: false,
    },
    weight: {
      type: Number,
      required: false,
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
  { timestamps: true },
  { versionKey: false }
);

UserSchema.plugin(mongoosePaginate);

const UserModel = mongoose.model("User", UserSchema);

exports.UserModel = UserModel;
