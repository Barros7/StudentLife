const myConnectionDB = require('../config/ConfigDatabase');

/* Buy house */
const ControllerBuyHouse = ((request, response) => {
    const { price } = request.body;
    myConnectionDB.query(`UPDATE Students SET Money = IF(Money >= ${price}, Money - ${price}, Money) WHERE StudentID = ${StudentID}`, 
    (error, results) => {
        if(error) throw console.log(error);
        console.log(results);
    })    
});

module.exports = {
    ControllerBuyHouse,
}