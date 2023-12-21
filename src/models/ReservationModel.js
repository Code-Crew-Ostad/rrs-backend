const mongoose = require('mongoose');
const ReservationSchema = mongoose.Schema({
    _id:{type: mongoose.Schema.Types.ObjectId, required: true},
    reqs_date:{type: Date},
    reqs_id:{type:String},
    resv_date:{type: String},
    start_time:{type: String},
    end_time:{type: String},
    guests:{type:Number},
    status:{type:String},
    user_email: {type: String, required: true},
    user_name:{type:String},
    rest_Id:{type:mongoose.Schema.Types.ObjectId, required: true}
}) 

module.exports = mongoose.model("reservations",ReservationSchema);