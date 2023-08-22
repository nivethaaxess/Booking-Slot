const mongoose = require('mongoose');
const express = require('express');
const app = express();

const port = 3005;


  const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://admin:admin@atlascluster.lllsis7.mongodb.net/?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('Connected to MongoDB');
      app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });

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
  try {
    const user = new User({ id, password });
    await user.save();
    console.log('User saved:', user);
  } catch (error) {
    console.error('Error saving user:', error);
  }
};

module.exports = { connectDB, User, createUser };



