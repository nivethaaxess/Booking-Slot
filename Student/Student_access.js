
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const mongodb = require('../DB Connection/MongoDB_Connect')
const mongoose = require('mongoose');
// const studentMiddleware = require('../Middleware/middleware_check')
require('dotenv').config();
// const connectDB = require('../DB Connection/MongoDB_Connect')
 

const studentLogin = async (req, res) => {
  const { name, uid, password } = req.body;

  try {
    // Connect to the database
    // await connectDB;  

    // Get a reference to the users collection
    const collection = mongoose.connection.collection('users'); // Change 'users' to your actual collection name

    // Check if a user with the provided name and universityID exists
    const user = await collection.findOne({ name, uid });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create a payload for the token
    const payload = { name, uid };
    // const secretKey = crypto.randomBytes(32).toString('hex');
    const secretKey = process.env.SECRET_KEY ;

    console.log('Generated Secret Key:', secretKey);
    // Sign the token with the secret key
    const token = jwt.sign(payload, secretKey);
    console.log('token=======>>>>>>>>>>>>>>>>:', token);
    res.json({ message: 'Student Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};



  const Listdean = async(req,res) => {
     console.log('users ===')
      
    try{

      const collection = mongoose.connection.collection('dean_slots');
      
      const deanInfo = await collection.findOne({})
        console.log('dean===>',deanInfo)

       if (!deanInfo) {
        return res.status(404).json({ error: 'Dean information not found' });
      }
       
      res.json(deanInfo)
    

    } 
    catch(err){
      res.status(500).json({ message: 'Error registering student', error: err.message });
    }
  }


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
    console.log("jjj",{uid: dean_uid,
      startTime: { $lte: startTime },
      endTime: { $gte: endTime },
    })
    const slotAvailability = await collection.findOne( {uid: dean_uid,
      startTime: { $lte: startTime },
      endTime: { $gte: endTime },
    });
    //

        console.log("**",slotAvailability)

    if (slotAvailability) {
      return res.status(409).json({ message: 'Slot not available' });
    }


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
    Listdean,
    slotBooking
  };