const express = require('express');
const bodyParser = require('body-parser');
const connectionDB = require('./DB Connection/MongoDB_Connect') 
const app = express();
const Routes = require('./Router/Route')


app.use(bodyParser.json());

<<<<<<< HEAD

=======
app.use('/',Routes)
>>>>>>> 047f3c687a92187cfa658a0d3f86bb599e318ff3
// Connect to MongoDB
connectionDB();

  
// ... Rest of your code ...

const port = 3005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
