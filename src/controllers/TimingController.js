const BusinessHoursModel = require('../models/BusinessHoursModel');
const TimingModel = require('../models/TimingModel')

exports.saveTimings = async (req, res, next)=>{
    try { 
        console.log(req.body);
        // if(req.body.userID===""){
        //     req.body.userID = new mongoose.Types.ObjectId();
        // }
        const savedTimings = await TimingModel.updateOne({_id:req.body._id}, {$set:req.body}, {upsert:true});
        //const savedRestaurant = await RestaurantModel.updateOne({_id:req.body.userID}, {$set:req.body}, {upsert:true});
        res.status(200).json({status:"success", message:"Changes Saved!", data:savedTimings})
    } catch (error) {
        next(error)
    }
}

exports.saveBusinessHours = async (req, res, next)=>{
    try {
        
        const newBusiness = new BusinessHoursModel(req.body);
        //console.log(newBusiness)
        //const savedTimings = await BusinessHours.updateOne({rest_id:req.body.rest_id}, {$set: {rest_id:req.body.rest_id, businessHours:req.body.businessHours}}, {upsert:true});
        newBusiness.save();
        
        console.log(savedTimings)
        res.status(200).json({status:"success", message:"Changes Saved"});
        } catch (error) {
            next(error);
        }
    };
