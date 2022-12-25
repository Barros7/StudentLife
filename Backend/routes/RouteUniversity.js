const ControllerUniversity = require('../controller/ControllerUniversity');

const route = require('express').Router();

/* Routes */
route.post('/pay', ControllerUniversity.ControllerPayUniversity);


module.exports = route;