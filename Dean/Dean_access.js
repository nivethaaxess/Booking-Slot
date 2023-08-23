const mongodb = require('../DB Connection/MongoDB_Connect');
const mongoose = require('mongoose');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const deanBooking = async (req,res) => {
    console.log("deanBooking called")
    console.log("req",req.body)

    try {
        let {uid,name,startTime} = req.body;       
         startTime = new Date(startTime  + 'Z');
         const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
         const booked = new mongodb.dean_slots({uid,name,startTime,endTime});

        await booked.save();
        res.status(200).send({
        status : "admin booking successfull",
        slot:booked
    })
    } catch (error) {
      console.error('Error dean booking:', error);
    }
  };



const deanLogin = async (req, res) => {
    const { name, uid, password } = req.body;
  
    try {

      const collection = mongoose.connection.collection('users'); 

      const user = await collection.findOne({ name, uid });
  
      if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const payload = { name, uid };

      const secretKey = process.env.SECRET_KEY;

      const token = jwt.sign(payload, secretKey);
      res.json({ message: 'Dean Login successful', token });

    } catch (error) {
      res.status(500).json({ message: 'Error during login', error: error.message });
    }
  };



module.exports = {
 deanBooking , deanLogin
  };