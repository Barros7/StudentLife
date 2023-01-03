const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

const { user, host, password, database } = process.env;
const MyConnectionDB = mysql.createConnection({
    user,
    host,
    password,
    database
});

MyConnectionDB.connect((error) => {
    if(error) {
        console.error('Erro to trying database connect');
    } else {
        console.error('Database connected!');
    }
});

module.exports = MyConnectionDB;
