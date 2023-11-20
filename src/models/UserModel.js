const mongoose =require('mongoose');
const DataSchema=mongoose.Schema({
        
        firstName:{type:String,lowercase:true,required:false, default:""},
        lastName:{type:String,lowercase:true,required:false,default:""},
        mobileNo:{type:String,required:false,unique:true,default:""},
        restaurantOwner:{type:Boolean, required: true, default: false},
        email:{type:String,lowercase:true,required:true,unique:true},
        otp:{type:String,required:true},
    },
    {timestamps:true,versionKey:false}
)
const UserModel=mongoose.model('users',DataSchema);
module.exports=UserModel;