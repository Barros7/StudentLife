const  ControllerPlayer  = require('../controller/ControllerAuth');
const route = require('express').Router();

/* Routes */
route.put('/', ControllerPlayer.ControllerHome);
route.post('/signup', ControllerPlayer.ControllerCreatePlayer);
route.post('/signin', ControllerPlayer.ControllerSignIn);
route.get('/getallplayer', ControllerPlayer.ControllerGetAllPlayers);
route.get('/getplayer/:idStudent', ControllerPlayer.ControllerGetPlayer);
route.put('/updateplayer/:IdStudent', ControllerPlayer.ControllerUpdatePlayer);
route.delete('/deleteplayer/:IdStudent', ControllerPlayer.ControllerDeletePlayer);

module.exports = route;