const express = require("express");
const UserController = require("../controllers/UserController");
const AuthVerification = require("../middlewares/AuthVerification");
const RestaurantController = require("../controllers/RestaurantController")
const ReservationController = require("../controllers/ReservationController")
const TimingController = require('../controllers/TimingController')

const router = express.Router();
const multer = require("multer");

// var storage = multer.diskStorage({ 
//     destination: (req, file, cb) => { 
//         cb(null, 'uploads/') 
//     }, 
//     filename: (req, file, cb) => { 
//         //cb(null, file.fieldname + '-' + Date.now()) 
//         cb(null, Date.now()+file.originalname) 
//     } 
// }); 
// const upload = multer({ storage: storage });


//------------ Set up Multer for handling file uploads
const storage = multer.memoryStorage(); // Use memory storage for handling files
const upload = multer({ storage: storage });


// User
router.get("/UserLogout", AuthVerification, UserController.UserLogout);
router.post("/UserRegistration", UserController.UserRegistration);
router.post("/VerifyRegistration", UserController.VerifyRegistration);
router.post("/UserLogin", UserController.UserLogin);

//Restaurant
router.post("/saveRestaurantwImage", upload.single("image"), RestaurantController.saveRestaurantWithImage);
router.post("/saveRestaurantwoImage", RestaurantController.saveRestaurantWithOutImage);
// router.post("/createRestaurant", upload.single("myPhoto"), async (req, res, next)=>{
//     try {          
//         //const _id = new mongoose.Types.ObjectId();
//         const newRestaurant = new RestaurantModel(req.body);
//         console.log(req.body);
//         console.log(req.file);
//         const savedReataurant = await newRestaurant.save();
//         res.status(200).json(savedReataurant)
//     } catch (error) {
//         next(error)
//     }
// })
router.post("/updateRestaurant", RestaurantController.updateRestaurant);
router.post("/getRestaurantById", RestaurantController.getRestaurantById);
router.post("/getMainRestaurantByEmail", RestaurantController.getMainRestaurantByEmail);
router.post("/getRestaurantsByEmail", RestaurantController.getRestaurantsByEmail);
router.post("/getRestaurantsBranchesByEmail", RestaurantController.getRestaurantBranchesByEmail);
router.get("/getAllRestaurants", RestaurantController.getAllRestaurants);
router.get("/getRestaurantsByArea", RestaurantController.getRestaurantsByArea);

//Reservation
router.post("/makeReservation", ReservationController.makeReservation);
router.post("/getAllReservationsUser", ReservationController.getAllReservationsUser);
router.post("/getReservationsByRestId", ReservationController.getReservationsByRestId);

//Timings
router.post("/saveTimings", TimingController.saveTimings);
router.post("/saveBusinessHours", TimingController.saveBusinessHours);
module.exports = router;
