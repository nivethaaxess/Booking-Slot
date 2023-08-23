
// Router/Route.js
const express = require('express');
const router = express.Router();
console.log('DINESH')

const studentData = require('../Student/Student_access');
const deanData = require('../Dean/Dean_access');

const { middleware } = require('../Middleware/middleware_check'); 



// Student API
router.post('/api/student/login', studentData.studentLogin);
// router.get('/api/slot/details', studentMiddleware, studentData.slotDetails); // Apply studentMiddleware here
router.post('/api/slot/booking',studentData.slotBook)
router.post('/api/listdean',middleware,studentData.Listdean)

// Dean API
router.post('/api/dean/login', deanData.deanLogin);
// router.get('/api/booked/slot', deanMiddleware, deanData.bookedDetails); // Apply deanMiddleware here
router.post('/api/booked/slot/details', deanData.bookedDetails); 
router.post('/api/booked/dean/available', deanData.deanAvailabilty); 

// Export the router
module.exports = router;

