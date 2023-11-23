const {UserRegisterService,VerifyRegisterService} = require("../services/UserService");

exports.UserRegistration=async (req,res)=>{
    let result=  await UserRegisterService(req)
    return res.status(200).json(result)
}

exports.VerifyRegistration=async (req,res)=>{
    let result=  await VerifyRegisterService(req);
    if(result['status']==="success"){

        let cookieOption={
            expires  : new Date(Date.now()+24*60*60*1000),
            httpOnly : false
        }

        res.cookie('token', result['token'],cookieOption)
        return res.status(200).json(result)
    }
    else{
        return res.status(200).json(result)
    }
}


exports.UserLogout=async (req,res)=>{
    let cookieOption={
        expires  : new Date(Date.now()-24*60*60*1000),
        httpOnly : false
    }
    res.cookie('token', "",cookieOption);
    return res.status(200).json({status:"success"})
}




