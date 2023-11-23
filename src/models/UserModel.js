const mongoose =require('mongoose');
const DataSchema=mongoose.Schema({
        
        firstName:{type:String,lowercase:true,required:false, default:""},
        lastName:{type:String,lowercase:true,required:false,default:""},
        mobileNo:{type:String,required:false,unique:true,default:""},
        userType:{type:String, required: true},
        email:{type:String,lowercase:true,required:true,unique:true},
        password:{type:String,required:true,default:""},
        otp:{type:String,required:true},
    },
    {timestamps:true,versionKey:false}
)
const UserModel=mongoose.model('users',DataSchema);
module.exports=UserModel;