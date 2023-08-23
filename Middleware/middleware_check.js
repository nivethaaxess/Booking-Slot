 
 const jwt = require('jsonwebtoken');
 require('dotenv').config();

 const middleware = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY ;
  let token = req.header('Authorization');
  console.log('token2----->',token)
    
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
      const   bearerToken =  token.split(" ");
         token = bearerToken[1] 
         console.log("help1")
    jwt.verify(token,secretKey , (err, decoded) => {
      if (err) {
        console.log("eeee",err)
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }
      console.log("dece",decoded )
      // req.student = decoded; // Store the decoded student information for later use
      next(); // Proceed to the next middleware or route handler
    });
  };
  

  
  module.exports = { middleware};
  