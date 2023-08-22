const express = require('express');
const bodyParser = require('body-parser');
const connectionDB = require('./DB Connection/MongoDB_Connect') 
const app = express();
const Routes = require('./Router/Route')


app.use(bodyParser.json());

app.use('/',Routes)
// Connect to MongoDB
connectionDB();

// ... Rest of your code ...

const port = 3005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
