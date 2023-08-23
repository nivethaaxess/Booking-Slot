
// Router/Route.js
const express = require('express');
const router = express.Router();

const studentData = require('../Student/Student_access');
const deanData = require('../Dean/Dean_access');

const { middleware } = require('../Middleware/middleware_check'); 

//create user API
router.post('/createUser', deanData.createUser);

// Student API
router.post('/api/student/login', studentData.studentLogin);
router.post('/api/booked/dean/available', deanData.deanAvailabilty); 
router.post('/studentBooking',middleware,studentData.slotBooking)

// Dean API
 router.post('/api/dean/login', deanData.deanLogin);
 router.post('/deanBooking',middleware, deanData.deanBooking); 
router.post('/api/booked/slot/details', deanData.bookedDetails); 



// Export the router
module.exports = router;

