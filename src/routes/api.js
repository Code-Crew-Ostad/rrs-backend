const express=require('express');
const UserController = require("../controllers/UserController");
const AuthVerification = require("../middlewares/AuthVerification");
const router=express.Router();

// User
router.get('/UserLogout',AuthVerification,UserController.UserLogout);
router.get('/UserLogin/:email',UserController.UserLogin);
router.get('/VerifyLogin/:email/:otp',UserController.VerifyLogin);

module.exports = router;