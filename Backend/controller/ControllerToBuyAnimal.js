const myConnectionDB = require('../config/database');

/* Buy Animal */
const ControllerBuyAnimal = ((request, response) => {
    const { price } = request.body;
    const { StudentID } = request.params;
    myConnectionDB.query(`UPDATE Students SET Money = IF(Money >= ${price}, Money - ${price}, Money) WHERE StudentID = ${StudentID}`, 
    (error, results) => {
        if(error) throw console.log(error);
        console.log(results);
    })    
});

module.exports = {
    ControllerBuyAnimal
}