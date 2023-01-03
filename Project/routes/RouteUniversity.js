const ControllerUniversity = require('../controller/ControllerUniversity');

const route = require('express').Router();

/* Routes university */
route.get('/get/:FacultyID', ControllerUniversity.ControllerGetUniversity);
route.get('/getall', ControllerUniversity.ControllerGetAllUniversity);
route.put('/update:/FacultyID', ControllerUniversity.ControllerUpdateUniversity);
route.post('/create', ControllerUniversity.ControllerCreateUniversity);
route.delete('/delete/:FacultyID', ControllerUniversity.ControllerDeleteUniversity);
route.post('/payuniversity', ControllerUniversity.ControllerSignContract);

module.exports = route;