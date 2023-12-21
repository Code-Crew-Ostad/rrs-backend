const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    firstName: { type: String,  required: false, default: "" },
    lastName: { type: String,  required: false, default: "" },
    mobile: { type: String, required: false, default: "" },
    userType: { type: String, required: true },
    email: { type: String, lowercase: true, required: true, unique: true },
    password: { type: String, required: false, default: null },
    otp: { type: String, required:false, default:null },
  },
  { timestamps: true, versionKey: false }
);
const UserModel = mongoose.model("users", DataSchema);
module.exports = UserModel;
