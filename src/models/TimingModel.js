const mongoose = require('mongoose')
const TimingSchema = mongoose.Schema({
    restId: {type:mongoose.Schema.Types.ObjectId, required:true},
    // saturday:{type:String},
    // sunday:{type:String},
    // monday:{type:String},
    // tuesday:{type:String},
    // wednesday:{type:String},
    // thursday:{type:String},
    // friday:{type:String},

    saturday:{type:String},
    sunday:{type:String},
    monday:{type:String},
    tuesday:{type:String},
    wednesday:{type:String},
    thursday:{type:String},
    friday:{type:String},
},
{timestamps: true, versionKey: false}
)
module.exports = mongoose.model("timings", TimingSchema);