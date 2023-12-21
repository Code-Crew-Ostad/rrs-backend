const RestaurantModel = require("../models/RestaurantModel");
const UserModel = require("../models/UserModel")
const SendEmailUtility = require("../utility/SendEmail");
const {EncodeToken} = require("../utility/TokenHelper");
const bcrypt = require("bcrypt")

exports.UserRegistration= async (req, res, next)=>{
    try {

        //Generating OTP
        let genCode=Math.floor(100000 + Math.random() * 900000);
        let emailText="Your verification code is "+genCode;
        //Saving the user
        // const newUser = new UserModel({...req.body, otp:genCode})
        // await newUser.save();

        
        const savedUser = await UserModel.updateOne({otp:genCode}, {$set:req.body}, {upsert:true});
        //Sending Email
        await SendEmailUtility(req.body.email,emailText,"PIN Email Verification");
        res.status(200).json({status:"success", message:"A 6 digit code has been sent to your email", data:savedUser})
    } catch (error) {
        next(error)
    }
}

exports.VerifyRegistration= async (req,res, next)=>{
    try {
        
        let email=req.body.email;
        let otp=req.body.otp;
        let password = req.body.password
        //------------
        //console.log(req.body)
        // Hashing the password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // if(otp==="0"){
        //     return res.status(500).json({status:"fail", message:"Something Went Wrong"});
        // }
        // else {
            let total=await UserModel.find({email: email, otp: otp}).count('total');
            //------------
            //console.log(total)

            if(total !== 1){
                return res.status(500).json({status:"fail", message:"Something Went Wrong"});
            }else{
                
                let user_id=await UserModel.find({email: email, otp: otp}).select({'_id':1,'userType':1})
                let token= EncodeToken(email,user_id[0]['_id'].toString())
                const result =await UserModel.updateOne({email:email}, {$set:{otp:'0', password:hash}}, {upsert:true})
                //------------
                //console.log(result)
                //Cookie Creation    
                if(result['matchedCount'] == 1){
                    let cookieOption={
                    expires  : new Date(Date.now()+24*60*60*1000),
                    httpOnly : false
                    }
                    res.cookie('token', token,cookieOption)
                }
                return res.status(200).json({status:"success", message:"Valid OTP", token:token, type:user_id[0]['userType'], email:email})
            }
        // } 
    } catch (error) {
            next(error)
    }


}

exports.UserLogin= async (req, res, next)=>{
    try {

        let email=req.body.email;
        let password = req.body.password

        let total=await UserModel.find({email: email}).count('total');
        if(total===1){
            let hashedPassword = await UserModel.find({email: email}, {'password':1, 'userType':1, 'firstName':1, 'lastName':1});
            let restId = await RestaurantModel.find({email: email, isBranch: false}).select("_id");
            if(restId =="")
            {
                restId =0
            }else{
                restId = restId[0]._id;
            }
            
            // dehashing the password
            console.log(password);
            console.log(hashedPassword[0].password);
            const match = await bcrypt.compare(password, hashedPassword[0].password);
            const type = hashedPassword[0].userType;
            const firstName = hashedPassword[0].firstName;
            const lastName = hashedPassword[0].lastName;
            console.log(type)
            console.log(match)
            if(match){
                let user_id=await UserModel.find({email: email}).select('_id')
                console.log(user_id)    
                let token= EncodeToken(email,user_id[0]['_id'].toString())

                let cookieOption={
                    expires  : new Date(Date.now()+24*60*60*1000),
                    httpOnly : false
                    }
                    res.cookie('token', token,cookieOption)
               // }
                return res.status(200).json({status:"success", message:"login successful", token:token, data:{type:type, email:email, firstName:firstName, lastName:lastName, id:restId}})
            }
            else{
                return res.status(200).json({status:"fail", message:"Wrong Credentials!"})
            }
            
        }else{
            return res.status(200).json({status:"fail", message:"You are not registered!"})
        } 
        
    } catch (error) {
        next(error)
    }
}

exports.UserLogout= async (req,res)=>{
    let cookieOption={
        expires  : new Date(Date.now()-24*60*60*1000),
        httpOnly : false
    }
    res.cookie('token', "",cookieOption);
    return res.status(200).json({status:"success"})
}




