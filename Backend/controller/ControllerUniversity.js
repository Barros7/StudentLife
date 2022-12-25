const myConnectionDB = require('../config/ConfigDatabase');

/* Buy house */
const ControllerPayUniversity = ((request, response) => {
    const { price } = request.body;
    myConnectionDB.query(`UPDATE Students SET Money = IF(Money >= ${price}, Money - ${price}, Money) WHERE StudentID = ${StudentID}`, 
    (error, results) => {
        if(error) {
            response.status(401).json({ messageUniversity: 'Oh, no! Unable to register!' });
        } else {
            myConnectionDB.query(`INSERT INTO Universoties`)
        }
    })    
});

module.exports = {
    ControllerPayUniversity,
}