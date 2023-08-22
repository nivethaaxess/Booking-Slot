 const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const Routes = require('./Router/Route')


app.use(bodyParser.json());

app.use('/',Routes);


const dbconnection = require('./DB Connection/MongoDB_Connect')
dbconnection.connectDB()

const port = 3005;

   app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
      });

