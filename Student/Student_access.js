
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const users = require('../DB Connection/MongoDB_Connect')
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
         console.log('trymethod')  
       const {} = req.body
          console.log('req',req.body)
       const user = await users.findOne({uid,password})
        console,log('user',user)

       if(!user)
       {
        return res.status(401).json({ error: 'Invalid credentials' });
       }

       const deanInfo = await dean_slots.findOne({})
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


  const slotBook = (req,res) => {
    try{
        const {} = req.body;
    }
    catch(err){

    }
  }



module.exports = {
    studentLogin,
    Listdean,
    slotBook
  };