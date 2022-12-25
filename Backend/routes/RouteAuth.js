const  ControllerPlayer  = require('../controller/ControllerAuth');

const route = require('express').Router();

/* Routes */
route.get('', ControllerPlayer.ControllerHome);
route.post('/signup', ControllerPlayer.ControllerCreatePlayer);
route.post('/signin', ControllerPlayer.ControllerSignIn);
route.put('/updateplayer', ControllerPlayer.ControllerUpdatePlayer);
route.get('/getallplayer', ControllerPlayer.ControllerGetAllPlayers);
route.get('/getplayer/:IdStudent', ControllerPlayer.ControllerGetPlayer);
route.delete('/deleteplayer', ControllerPlayer.ControllerDeletePlayer);

module.exports = route;