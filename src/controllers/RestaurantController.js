const RestaurantModel = require("../models/RestaurantModel");
const cloudinary = require('cloudinary').v2;
const mongoose =require('mongoose');

async function handleUpload(file) {
    const res = await cloudinary.uploader.upload(file, {
        resource_type: "auto",
        folder: "get-rest",
    });
    return res;
    }

//Create a Restaurant with Image
exports.saveRestaurantWithImage = async (req, res, next)=>{
    
        try { 
            
            let cldRes ="";
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            let p_id =req.body.image_public_id
            if(req.body.userID===""){
                req.body.userID = new mongoose.Types.ObjectId();
                //Image upload prepartion
                const b64 = Buffer.from(req.file.buffer).toString("base64");
                let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
                cldRes = await handleUpload(dataURI);
                //End of Image upload prepartion
            }
            else{
                await cloudinary.uploader.destroy(p_id);
                console.log("removed");
                cldRes = await handleUpload(dataURI);
                console.log("inserted");
            }
            
            
            //const result = await cloudinary.uploader.upload(req.file.buffer.toString('base64'));
            //const result = await cloudinary.uploader.upload(req.file.path);

            // Data Upload Preparation
            const { secure_url, public_id } = cldRes;           
            //const newRestaurant = new RestaurantModel(req.body);
            console.log(req.body)
            console.log(cldRes)
            //newRestaurant._
            req.body.image = secure_url;
            req.body.image_public_id = public_id;
            //const savedReataurant = await newRestaurant.save();
            //const branchId = ObjectId.Parse(req.body.branchId);
            const savedRestaurant = await RestaurantModel.updateOne({_id:req.body.userID}, {$set:req.body}, {upsert:true});
            //const savedRestaurant = await RestaurantModel.updateOne({_id:req.body.userID}, {$set:req.body}, {upsert:true});
            res.status(200).json({status:"success", message:"Changes Saved!", data:savedRestaurant})
        } catch (error) {
            next(error)
        }
}
//Create a Restaurant with out Image
exports.saveRestaurantWithOutImage = async (req, res, next)=>{ 
    try { 
        console.log(req.body);
        if(req.body.userID===""){
            req.body.userID = new mongoose.Types.ObjectId();
        }
        console.log(req.body);
        const savedRestaurant = await RestaurantModel.updateOne({_id:req.body.userID}, {$set:req.body}, {upsert:true});
        //const savedRestaurant = await RestaurantModel.updateOne({_id:req.body.userID}, {$set:req.body}, {upsert:true});
        res.status(200).json({status:"success", message:"Changes Saved!", data:savedRestaurant})
    } catch (error) {
        next(error)
    }
}
//Update a Restaurant
exports.updateRestaurant = async(req, res, next)=>{    
    try {
            const filter = {_id:req.body._id};
            const query ={$set:{name:req.body.name, 
                                image:req.body.image, 
                                mobileNo:req.body.mobileNo, 
                                cuisineType:req.body.cuisineType,
                                detailAddress:req.body.detailAddress,
                                area:req.body.area,
                                description:req.body.description,
                                longitude:req.body.longitude,
                                latitude:req.body.latitude,
                            }}
            const updatedRestaurant = await RestaurantModel.updateOne(filter, query);
            res.status(200).json(updatedRestaurant)
    } catch (error) {
        next(error)
    }
}
//Get a Restaurant by _id
exports.getRestaurantById = async(req, res, next)=>{
    try {
        const restId = req.body._id;
        const restaurantInfo = await RestaurantModel.findById(restId);
        res.status(200).json(restaurantInfo);
    } catch (error) {
        next(error)
    }
}
//Get a Restaurant by email
exports.getMainRestaurantByEmail = async (req, res, next)=>{
    try {
        const email = req.body.email;
        const result = await RestaurantModel.find({email:email, isBranch:false})
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }

}
//Get all Restaurant by email
exports.getRestaurantsByEmail = async (req, res, next)=>{
    try {
        const allRestaurantInfo = await RestaurantModel.find({email:req.body.email}).select({"_id":1, "name":1, "isBranch":1})
        res.status(200).json(allRestaurantInfo);
    } catch (error) {
        next(error)
    }
}
//Get all Restaurant Branches by email
exports.getRestaurantBranchesByEmail = async (req, res, next)=>{
    try {
        const allRestaurantInfo = await RestaurantModel.find({email:req.body.email, isBranch:true})
        res.status(200).json(allRestaurantInfo);
    } catch (error) {
        next(error)
    }
}
//Get all Restaurants
exports.getAllRestaurants = async (req, res, next)=>{
    try {
        const allRestaurantInfo = await RestaurantModel.find();
        res.status(200).json(allRestaurantInfo)
    } catch (error) {
        next(error)
    }
}
//Get all Restaurant by Area
exports.getRestaurantsByArea = async (req, res, next)=>{
    try {
        const allrestaurantInfo  = await RestaurantModel.find({area:req.body.area});
        const totalDoc  = await RestaurantModel.find({area:req.body.area}).count();
        res.status(200).json(allrestaurantInfo,totalDoc)
    } catch (error) {
        next(error)
    }
}