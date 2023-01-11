const ControllerUniversity = require('../controller/ControllerUniversity');

const route = require('express').Router();

/* Routes university */
route.get('/get/:FacultyID', ControllerUniversity.ControllerGetUniversity);
route.post('/create', ControllerUniversity.ControllerCreateUniversity);
route.get('/getall', ControllerUniversity.ControllerGetAllUniversity);
route.put('/update:/FacultyID', ControllerUniversity.ControllerUpdateUniversity);
route.delete('/delete/:FacultyID', ControllerUniversity.ControllerDeleteUniversity);
route.post('/pay-university', ControllerUniversity.ControllerPaymentUniversity);

module.exports = route;