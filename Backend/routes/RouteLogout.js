const { logOut } = require("../controller/ControllerLogOut");
const route = require('express').Router();

route.get('/logout', logOut);