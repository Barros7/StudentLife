const ControllerBuyHouse = require('../controller/ControllerToBuyHouse');

const route = require('express').Router();

/* Routes */
route.post('/buyhouse', ControllerBuyHouse.ControllerBuyHouse);

module.exports = route;