const mongoose = require('mongoose');
const express = require('express');
const app = express();

// const port = 3007;


  const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://admin:admin@atlascluster.lllsis7.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');

    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };

  // db.js


// Define a schema for the user collection
const userSchema = new mongoose.Schema({
  id: String,
  password: String,
});

// Create a User model based on the schema
const User = mongoose.model('User', userSchema);

// Function to create and save a user document
const createUser = async (id, password) => {
  console.log("createUser")
  try {
    const user = new User({ id, password });
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



