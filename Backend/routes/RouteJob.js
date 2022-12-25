const ControllerJob = require('../controller/ControllerJob');
const route = require('express').Router();

/* Routes */
route.get('/get', ControllerJob.ControllerGetJob);
route.get('/getall', ControllerJob.ControllerGetAllJob);
route.put('/update', ControllerJob.ControllerUpdateJob);
route.post('/create', ControllerJob.ControllerCreateJob);
route.delete('/delete', ControllerJob.ControllerDeleteJob);
route.post('/signcontract', ControllerJob.ControllerSignContract);

module.exports = route;