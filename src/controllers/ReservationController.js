const ReservationModel = require("../models/ReservationModel")

exports.makeReservation = async (req, res, next)=>{
    try { 
        console.log(req.body);
        if(req.body.reqs_id===""){
            let randomNum =Math.floor(100000 + Math.random() * 900000);
            let dateNow = Date.now().toString();
            req.body.reqs_id = dateNow.slice(5,10) + randomNum;
            console.log(randomNum);
            console.log(req.body.reqs_id);
        }
        console.log(req.body);
        const makeReservaion = await ReservationModel.updateOne({reqs_id:req.body.reqs_id}, {$set:req.body}, {upsert:true});
        res.status(200).json({status:"success", message:"Reservation request sent!", data:makeReservaion})
    } catch (error) {
        next(error)
    }
}
//Get all Reservations By User
exports.getAllReservationsUser = async (req, res, next)=>{
    try {
        console.log(req.body)
        const allReservations = await ReservationModel.find({user_email:req.body.email}).sort({"_id":-1});
        res.status(200).json(allReservations)
    } catch (error) {
        next(error)
    }
}
//Get Reservation by Restaurant ID
exports.getReservationsByRestId = async (req, res, next)=>{
    try {
        console.log(req.body)
        const allReservations = await ReservationModel.find({rest_Id:req.body.rest_Id}).sort({"_id":-1});
        res.status(200).json(allReservations)
    } catch (error) {
        next(error)
    }
}