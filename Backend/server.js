const session = require('express-session');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

//Enviroment variables
const port = process.env.PORT_SERVER;
const host = process.env.HOSTNAME_SERVER;

const server = express();

/* Midllewars */
server.use(cors());
server.use(express.json());

/* Import routes from folder routes */
server.use('/', require('./routes/RouteAuth'));
server.use('/', require('./routes/RouteFood'));
server.use('house/', require('./routes/RouteHouse'));
//server.use('job/', require('./routes/RouteJob'));
server.use('university/', require('./routes/RouteUniversity'));

server.listen(port, () => {
    console.log(`Server running on port ${host}:${port}`);
});
