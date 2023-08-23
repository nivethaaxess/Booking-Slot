const mongoose = require('mongoose');
const express = require('express');
const app = express();


  const connectDB = async () => {
    try {
      await mongoose.connect(`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@atlascluster.lllsis7.mongodb.net/?retryWrites=true&w=majority`, {
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

const studentBookingSchema = new mongoose.Schema({
  student_uid: String,
  dean_uid: String,
  student_name: String,
  dean_name: String,
  startTime: Date,
  endTime: Date,
});

// Create the booked_slots model based on the schema
const booked_slots = mongoose.model('booked_slots', studentBookingSchema);

const adminBookingSchema = new mongoose.Schema({
  uid: String,
  name: String,
  startTime: Date,
  endTime: Date,
});

// Create a  model based on the schema
const dean_slots = mongoose.model('dean_slots', adminBookingSchema);


module.exports = { connectDB,booked_slots,dean_slots };



