const ControllerFood = require('../controller/ControllerToBuyFood');

const route = require('express').Router();

/* Routes */
route.post('/buyfood', ControllerFood.ControllerBuyFood);

module.exports = route;