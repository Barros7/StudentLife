const session = require('express-session');
const express = require('express');
const api = express();
const server = require('http').createServer(api);
const io = require('socket.io')(server);
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

//Enviroment variables
const { HOSTNAME_SERVER, PORT_SERVER, secret} = process.env;

/* Midllewars */
api.use(cors());
api.use(express.json()); //Parse the incomming request with json
api.use(express.urlencoded({ extended:false })); //url encode for get data form
api.use((request, response, next)=>{
    if (!request.session)
        response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

/* Import routes from folder routes */
api.use('/', require('./routes/RouteAuth'));
api.use('/house', require('./routes/RouteHouse'));
//api.use('/job', require('./routes/RouteJob'));
api.use('/university', require('./routes/RouteUniversity'));

api.use(express.static('public'));

api.listen(PORT_SERVER, () => {
    console.log(`Server running on port ${HOSTNAME_SERVER}:${PORT_SERVER}`);
});
