const express = require('express');
const bodyParser = require('body-parser');
const connectionDB = require('./DB Connection/MongoDB_Connect') 
const app = express();
app.use(bodyParser.json());


// Connect to MongoDB
connectionDB();

  
// ... Rest of your code ...

const port = 3005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
