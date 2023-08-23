const connectDB = require('../DB Connection/MongoDB_Connect');
const mongoose = require('mongoose');
const moment = require('moment-timezone');

const deanBooking = async (req,res) => {
    console.log("deanBooking called")
    console.log("req",req.body)
    const adminBookingSchema = new mongoose.Schema({
      uid: String,
      name: String,
      startTime: Date,
      endTime: Date,
    });
    
    // Create a  model based on the schema
    const dean_slots = mongoose.model('dean_slots', adminBookingSchema);
    try {
        let {uid,name,startTime} = req.body;       
         startTime = new Date(startTime  + 'Z');
         const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
         const booked = new dean_slots({uid,name,startTime,endTime});

        await booked.save();
        res.status(200).send({
        status : "admin booking successfull",
        slot:booked
    })
    } catch (error) {
      console.error('Error dean booking:', error);
    }
  };

module.exports = {
 deanBooking
  };