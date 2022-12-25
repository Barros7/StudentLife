const myConnectionDB = require('../config/database');

/* Buy house */
const ControllerSignContract = ((request, response) => {
    const { price } = request.body;
    myConnectionDB.query(`UPDATE Students SET Money = IF(Money >= ${price}, Money - ${price}, Money) WHERE StudentID = ${StudentID}`, 
    (error, results) => {
        if(error) throw console.log(error);
        console.log(results);
    });
});

module.exports = { ControllerSignContract };