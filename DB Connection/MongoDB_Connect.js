const mongoose = require('mongoose');
const express = require('express');
const app = express();


  const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://admin:admin@atlascluster.lllsis7.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
      //  createUser("student4",111,"student","student4")
      // listUsers()

    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };

  
// db.js




// Function to create and save a user document
const createUser = async (uid, password,profile,name) => {

  console.log("createUser")
  // Define a schema for the user collection
const userSchema = new mongoose.Schema({
  uid: String,
  password: String,
  profile : String,
  name :String

});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);
  try {
    console.log("***",{ uid, password,profile,name})
    const user = new User({ uid, password,profile,name});
    await user.save();
    console.log('User saved:', user);
  } catch (error) {
    console.error('Error saving user:', error);
  }
};


const listUsers = async () => {
  try {
    const users = await User.find();
    console.log('List of users:', users);
  } catch (error) {
    console.error('Error listing users:', error);
  }
};

module.exports = { connectDB };



