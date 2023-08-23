const connectDB = require('../DB Connection/MongoDB_Connect');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const studentLogin = async(req,res) =>{
    const { name, universityID, password } = req.body;

  // Check if all required fields are provided
  if (!name || !universityID || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new student document
    // const newStudent = new Student({
    //   name,
    //   universityID,
    //   password
    // });

    // Save the new student document to the collection
    // await newStudent.save();

    // Create a payload for the token
    const payload = { name, universityID };
    const secretKey = crypto.randomBytes(32).toString('hex');

    console.log('Generated Secret Key:', secretKey);
    // Sign the token with the payload and secret key
    const token = jwt.sign(payload, secretKey);

    res.json({ message: 'Student registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering student', error: error.message });
  }
};



  const slotDetails = (req,res) => {
    try{

    }
    catch(err){

    }
  }


  const slotBooking = async (req,res) => {
    console.log("deanBooking called")
    console.log("req",req.body)
    const studentBookingSchema = new mongoose.Schema({
      student_uid: String,
      dean_uid: String,
      student_name: String,
      dean_name: String,
      startTime: Date,
      endTime: Date,
    });
    
    // Create a  model based on the schema
    const booked_slots = mongoose.model('booked_slots', studentBookingSchema);
    try {
        let {student_uid,dean_uid,student_name,dean_name,startTime,endTime} = req.body;       
          startTime = new Date(startTime  + 'Z');
         endTime =  new Date(endTime  + 'Z');
         const booked = new booked_slots({student_uid,dean_uid,student_name,dean_name,startTime,endTime});

        await booked.save();
        res.status(200).send({
        status : "student_slot booking successfull",
        slot:booked
    })
    } catch (error) {
      console.error('Error on student booking:', error);
    }
  }



module.exports = {
    studentLogin, 
    slotBooking
  };