const jwt = require("jsonwebtoken");
require("dotenv").config();

const middleware = (req, res, next) => {
  const secretKey = process.env.SECRET_KEY;
  let token = req.header("Authorization");


  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const bearerToken = token.split(" ");
  token = bearerToken[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.log("err", err);
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    // req.student = decoded; // Store the decoded student information for later use
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = { middleware };
