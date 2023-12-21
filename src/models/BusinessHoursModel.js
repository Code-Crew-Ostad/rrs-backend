const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the business hours
const businessHoursSchema = new Schema({
  day: {
    type: String,
    enum: ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
});

// Define a schema for the business entity
const businessSchema = new Schema({
  rest_id: {
    //type: mongoose.Schema.Types.ObjectId,
    type: String,
    required: true,
  },
  // Assuming an array of business hours for each day
  businessHours: [businessHoursSchema],
});

// Create a model using the schema
module.exports = mongoose.model('BusinessHours', businessSchema);


