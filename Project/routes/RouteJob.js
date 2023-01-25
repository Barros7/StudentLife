const route = require('express').Router();
const ControllerJob = require('../controller/ControllerJob');

/* Routes */
route.get('/get', ControllerJob.ControllerGetJob);
route.get('/getall', ControllerJob.ControllerGetAllJob);
route.put('/update', ControllerJob.ControllerUpdateJob);
route.post('/create', ControllerJob.ControllerCreateJob);
route.delete('/delete', ControllerJob.ControllerDeleteJob);
route.put('/signcontract/:idStudent', ControllerJob.ControllerSignContractJob);

module.exports = route;