 const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const dbconnection = require('./DB Connection/MongoDB_Connect')
dbconnection.connectDB()







