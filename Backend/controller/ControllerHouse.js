const myConnectionDB = require('../config/ConfigDatabase');
const { StatusCodes } = require('http-status-codes');

/* Buy house */
const ControllerBuyHouse = ((request, response) => {
    const { price } = request.body;
    myConnectionDB.query(`UPDATE Houses SET Money = IF(Money >= ${price}, Money - ${price}, Money) WHERE StudentID = ${StudentID}`, 
    (error, results) => {
        if(error) throw console.log(error);
        console.log(results);
    })    
});

/* Insert new house */
const ControllerCreateHouse = ((request, response) => {
    const { username, email, password, age = 18, life = 100, emotion = 100, money = 500, level = 0 } = request.body;
    const createPlayer = `INSERT INTO Houses SET ?`;
    myConnectionDB.query(createPlayer, {username, email, password: functionHansh(password), age, life, emotion, money, level}, (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying create a new player'});
        } else {
            response.status(StatusCodes.CREATED).json(results);
        };
    });
});

/* Get all houses */
const ControllerGetAllHouse = ((request, response) => {
    myConnectionDB.query(`SELECT * FROM Houses;`, (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to get all player'});
        } else {
            response.status(StatusCodes.OK).json(results)
        };
    });
});

/* Get house by ID*/
const ControllerGetHouse = ((request, response) => {
    const {IdStudent} = request.params;
    myConnectionDB.query('SELECT * FROM Houses WHERE StudentID = ?' , [parseInt(IdStudent)], (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to get player by ID'});
        } else {
            response.status(StatusCodes.OK).json(results)
        };
    });
});

/* Update house */
const ControllerUpdateHouse = ((request, response) => {

});

/* Delete house */
const ControllerDeleteHouse = ((request, response) => {
    const {IdStudent} = request.params;
    myConnectionDB.query('DELETE FROM Houses WHERE StudentID = ?', [parseInt(IdStudent)], (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to delete player!'});
        } else {
            response.status(StatusCodes.OK).json({ results, message: 'Player deleted successfully!' });
        };
    });
});

module.exports = { 
    ControllerBuyHouse,
    ControllerCreateHouse,
    ControllerGetHouse,
    ControllerGetAllHouse,
    ControllerDeleteHouse,
    ControllerUpdateHouse
};