
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongodb = require('../DB Connection/MongoDB_Connect')
const mongoose = require('mongoose');
require('dotenv').config();
 

const studentLogin = async (req, res) => {
  const { name, uid, password } = req.body;

  try {

    const collection = mongoose.connection.collection('users'); 

    const user = await collection.findOne({ name, uid });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const payload = { name, uid };
    // const secretKey = crypto.randomBytes(32).toString('hex');
    const secretKey = process.env.SECRET_KEY ;

    const token = jwt.sign(payload, secretKey);
    
    res.json({ message: 'Student Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};





  const slotBooking = async (req,res) => {
    console.log("deanBooking called")
    console.log("req",req.body)

     try {
     let {student_uid,dean_uid,student_name,dean_name,startTime,endTime} = req.body;

     startTime = new Date(startTime+ 'Z');
    endTime = new Date(endTime+ 'Z');
    //
    const collection = mongoose.connection.collection('dean_slots'); // Change 'users' to your actual collection name

    // Check if a user with the provided name and universityID exists
    // console.log("jjj",{uid: dean_uid,
    //   startTime: { $lte: startTime },
    //   endTime: { $gte: endTime },
    // })
    // const slotAvailability = await collection.findOne( {uid: dean_uid,
    //   startTime: { $lte: startTime },
    //   endTime: { $gte: endTime },
    // });
    // //

    //     console.log("**",slotAvailability)

    // if (slotAvailability) {
    //   return res.status(409).json({ message: 'Slot not available' });
    // }


    const booked = new mongodb.booked_slots({student_uid,dean_uid,student_name,dean_name,startTime,endTime});
      
       await booked.save();
       res.status(200).send({
       status : "student_slot booking successfull",
       slot:booked
       })
      } catch (error) {
       console.error('Error on student booking:', error);
       }
  };



module.exports = {
    studentLogin,
    slotBooking
  };