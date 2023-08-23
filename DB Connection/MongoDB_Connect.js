const mongoose = require('mongoose');


  const connectDB = async () => {
    try {
      await mongoose.connect(`mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@atlascluster.lllsis7.mongodb.net/?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });


    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  };


const userSchema = new mongoose.Schema({
  uid: String,
  password: String,
  profile : String,
  name :String

});
const user = mongoose.model('User', userSchema);

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


module.exports = { connectDB,user,booked_slots,dean_slots };



