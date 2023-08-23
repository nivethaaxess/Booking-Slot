const connectDB = require('../DB Connection/MongoDB_Connect');
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

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


const bookedDetails = () =>{
    try{
        const {} = req.body;
    }
    catch(err){

    }
}

module.exports = {
    deanLogin , bookedDetails
  };