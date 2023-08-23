const mongodb = require('../DB Connection/MongoDB_Connect');
const mongoose = require('mongoose');

const moment = require('moment-timezone');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const deanBooking = async (req, res) => {
    console.log("deanBooking called")

    console.log("req",req.body)

    try {
        let {uid,name,startTime} = req.body;       
         startTime = new Date(startTime  + 'Z');
         const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
         const booked = new mongodb.dean_slots({uid,name,startTime,endTime});


        await booked.save();
        res.status(200).send({
            status: "admin booking successfull",
            slot: booked
        })
    } catch (error) {
        console.error('Error dean booking:', error);
    }
};



const deanLogin = async (req, res) => {
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
        const secretKey = crypto.randomBytes(32).toString('hex');


        console.log('Generated Secret Key:', secretKey);
        // Sign the token with the secret key
        const token = jwt.sign(payload, secretKey);
        console.log('token=======>>>>>>>>>>>>>>>>:', token);
        res.json({ message: 'Dean Login successful', token });
    } catch (error) {
        res.status(500).json({ message: 'Error during login', error: error.message });
    }
};



const bookedDetails = async (req, res) => {
    const { dean_name } = req.body;

    try {
        // Find pending sessions using the BookedSlot model
        const collection = mongoose.connection.collection('booked_slots');

        const pendingSessionsCursor = collection.find({ dean_name });

        const pendingSessions = [];

        await pendingSessionsCursor.forEach(doc => {
            pendingSessions.push(doc);
        });

        const convertedArray = pendingSessions;
        console.log('convertedArray=======>>>>>>>>>>>>>>>>:', convertedArray);

        const currentDate = new Date();

        // Filter sessions based on current date and endTime
        const filteredSessions = pendingSessions.filter(session => {
            const sessionEndTime = new Date(session.endTime);
            return currentDate < sessionEndTime;
        });

        console.log("Filtered Sessions:", filteredSessions);



        res.json({ filteredSessions });
    } catch (error) {
        console.error('Error fetching pending sessions:', error);
        res.status(500).json({ message: 'Error fetching pending sessions', error: error.message });
    }
}



const deanAvailabilty = async(req,res) => {
   
    try{
      const collection = mongoose.connection.collection('dean_slots');
       
      const allSessionsCursor = collection.find();
      const allSessions = [];
      
      await allSessionsCursor.forEach(doc => {
        allSessions.push(doc);
      });
      
      const result = {
        pendingSessions: allSessions
      };

      console.log('allSessions============>>>>>>>>>>>>>>',allSessions)

      const currentDate = new Date();

      // Filter sessions based on current date and endTime
      const filteredSessions = allSessions.filter(session => {
          const sessionEndTime = new Date(session.endTime);
          return currentDate < sessionEndTime;
      });

      console.log("Filtered Sessions:", filteredSessions);
      
      res.json(filteredSessions);
    }
    catch(err){
        console.error('Error fetching pending sessions:', error);
        res.status(500).json({ message: 'Error fetching pending sessions', error: error.message });
    }
  }




module.exports = {
    deanBooking, deanLogin, bookedDetails,deanAvailabilty

};

