const session = require('express-session');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

//Enviroment variables
const { HOSTNAME_SERVER, PORT_SERVER, secret} = process.env;
const server = express();

/* Midllewars */
server.use(cors());
server.use(express.json()); //Parse the incomming request with json
server.use(express.urlencoded({ extended:false })); //url encode for get data form
server.use(session({ secret, resave: true, saveUninitialized: true })); 

//function for clear cache after logout
server.use((request, response, next)=>{
    if (!request.session)
        response.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

/* Import routes from folder routes */
server.use('/', require('./routes/RouteAuth'));
server.use('/', require('./routes/RouteFood'));
server.use('house/', require('./routes/RouteHouse'));
//server.use('job/', require('./routes/RouteJob'));
server.use('university/', require('./routes/RouteUniversity'));

server.listen(PORT_SERVER, () => {
    console.log(`Server running on port ${HOSTNAME_SERVER}:${PORT_SERVER}`);
});
