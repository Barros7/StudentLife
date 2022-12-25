const ControllerFood = require('../controller/ControllerToBuyAnimal');

const route = require('express').Router();

/* Routes */
route.post('/buyanimal', ControllerFood.ControllerBuyAnimal);

module.exports = route;