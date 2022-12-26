const myConnectionDB = require('../config/ConfigDatabase');
const { StatusCodes } = require('http-status-codes');

/* Payment university */
const ControllerSignContract = ((request, response) => {
    const { price } = request.body;
    myConnectionDB.query(`UPDATE Faculties SET Money = IF(Money >= ${price}, Money - ${price}, Money) WHERE StudentID = ${StudentID}`, 
    (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying pay the faculty'});
        } else {
            response.status(StatusCodes.CREATED).json(results);
        };
    });
});

/* Insert new university */
const ControllerCreateUniversity = ((request, response) => {
    const { faculty, fee, level } = request.body;
    const createPlayer = `INSERT INTO Faculties SET ?`;
    myConnectionDB.query(createPlayer, {faculty, fee, level}, (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying create a new faculty'});
        } else {
            response.status(StatusCodes.CREATED).json(results);
        };
    });
});

/* Get all university */
const ControllerGetAllUniversity = ((request, response) => {
    myConnectionDB.query(`SELECT * FROM Faculties;`, (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to get all player'});
        } else {
            response.status(StatusCodes.OK).json(results)
        };
    });
});

/* Get university by Id */
const ControllerGetUniversity = ((request, response) => {
    const {FacultyID} = request.params;
    myConnectionDB.query('SELECT * FROM Faculties WHERE FacultyID = ?' , [parseInt(FacultyID)], (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to get player by ID'});
        } else {
            response.status(StatusCodes.OK).json(results)
        };
    });
});

/* Update university */
const ControllerUpdateUniversity = ((request, response) => {

});

/* Delete university */
const ControllerDeleteUniversity = ((request, response) => {
    const {FacultyID} = request.params;
    myConnectionDB.query('DELETE FROM Faculties WHERE FacultyID = ?', [parseInt(FacultyID)], (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to delete player!'});
        } else {
            response.status(StatusCodes.OK).json({ results, message: 'Player deleted successfully!' });
        };
    });
});

module.exports = { 
    ControllerSignContract,
    ControllerCreateUniversity,
    ControllerGetUniversity,
    ControllerGetAllUniversity,
    ControllerDeleteUniversity,
    ControllerUpdateUniversity
};