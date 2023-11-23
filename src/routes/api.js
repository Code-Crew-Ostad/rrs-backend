const express=require('express');
const UserController = require("../controllers/UserController");
const AuthVerification = require("../middlewares/AuthVerification");
const router=express.Router();

// User
router.get('/UserLogout',AuthVerification,UserController.UserLogout);
router.post('/UserRegistration/:email',UserController.UserRegistration);
router.post('/VerifyRegistration/:email/:otp',UserController.VerifyRegistration);

module.exports = router;