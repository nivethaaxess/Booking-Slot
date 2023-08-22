const mongoose = require('mongoose');


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
  
  module.exports = connectDB;