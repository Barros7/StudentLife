const express = require('express');
const server = express();
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

//Enviroment variables
const { HOSTNAME_SERVER, PORT_SERVER, secret} = process.env;

/* Midllewars */
server.use(cors());
server.use(express.json()); //Parse the incomming request with json
server.use(express.urlencoded({ extended:false })); //url encode for get data form

server.use((request, response, next)=>{
    if (!request.session)
        response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

server.use(express.static('public'));

/* Import routes from folder routes */
server.use('/', require('./routes/RouteAuth'));
server.use('/house', require('./routes/RouteHouse'));
server.use('/job', require('./routes/RouteJob'));
server.use('/university', require('./routes/RouteUniversity'));

server.listen(PORT_SERVER, () => {
    console.log(`Server running on port ${HOSTNAME_SERVER}:${PORT_SERVER}`);
});