const connectDB = require('../DB Connection/MongoDB_Connect');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');


const studentLogin = async(req,res) =>{
    const { name, universityID, password } = req.body;

  // Check if all required fields are provided
  if (!name || !universityID || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Create a new student document
    // const newStudent = new Student({
    //   name,
    //   universityID,
    //   password
    // });

    // Save the new student document to the collection
    // await newStudent.save();

    // Create a payload for the token
    const payload = { name, universityID };
    const secretKey = crypto.randomBytes(32).toString('hex');

    console.log('Generated Secret Key:', secretKey);
    // Sign the token with the payload and secret key
    const token = jwt.sign(payload, secretKey);

    res.json({ message: 'Student registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error registering student', error: error.message });
  }
};



  const Listdean = async(req,res) => {
     console.log('users ===')
    try{
         console.log('trymethod')  
       const {uid,password} = req.body
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