const mongoose = require("mongoose");
const RestaurantSchema = mongoose.Schema({
  _id:{type:mongoose.Schema.Types.ObjectId,required:true},
  name: {type: String, required: true,},
  image: {type: String, default: null,},
  image_public_id: {type: String, default: null,},
  mobileNo: {type: String,default: null,},
  cuisineType: {type: String},
  detailAddress: {type: String,default: null,},
  area: {type: String,default: null,},
  description: {type: String,default: null,},
  longitude: {type: String,default: null,},
  latitude: {type: String,default: null,},
  email:{type:String, required:true},
  isBranch: {type: Boolean, default: false},
  isActive: {type: Boolean, default:true}
  },
  {timestamps: true, versionKey: false}
);

module.exports = mongoose.model("Restaurants", RestaurantSchema);
