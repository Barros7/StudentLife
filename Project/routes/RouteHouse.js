const ControllerHouse = require('../controller/ControllerHouse');
const route = require('express').Router();

/* Routes */
route.get('/get', ControllerHouse.ControllerGetHouse);
route.get('/getall', ControllerHouse.ControllerGetAllHouse);
route.put('/update', ControllerHouse.ControllerUpdateHouse);
route.post('/create', ControllerHouse.ControllerCreateHouse);
route.delete('/delete', ControllerHouse.ControllerDeleteHouse);
route.post('/rent-house/:id', ControllerHouse.ControllerBuyHouse);

module.exports = route;