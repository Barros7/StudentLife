const ControllerJob = require('../controller/ControllerJob');

const route = require('express').Router();

/* Routes */
route.post('/create', ControllerJob.ControllerCreateJob);
route.get('/getall', ControllerJob.ControllerGetAllJobs);
route.get('/get', ControllerJob.ControllerGetJob);
route.put('/update', ControllerJob.ControllerUpdateJob);
route.delete('/delete', ControllerJob.ControllerDeleteJob);

module.exports = route;