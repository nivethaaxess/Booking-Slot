 const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const Routes = require('./Router/Route')


app.use(bodyParser.json());


const dbconnection = require('./DB Connection/MongoDB_Connect')
dbconnection.connectDB()


app.use('/',Routes)  
// Connect to MongoDB

  
// ... Rest of your code ...

const port = 3007;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

