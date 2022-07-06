const mysql = require("mysql"); //Include mysql dependence on node modules.

const connectionDB = mysql.createConnection({
    database: process.env.DATABASE,
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
  });
  
  connectionDB.connect( (error) => {
    if (error){
        console.log('Connection failed! ' + error);
        return;
    }
    console.log("Connected database!");
  });

  module.exports = connectionDB;
