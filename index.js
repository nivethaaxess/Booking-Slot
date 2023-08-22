 const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const Routes = require('./Router/Route')


app.use(bodyParser.json());


const dbconnection = require('./DB Connection/MongoDB_Connect')
dbconnection.connectDB()

