const myConnectionDB = require('../config/ConfigDatabase');

/* Payment university */
const ControllerSignContract = ((request, response) => {
    const { price } = request.body;
    myConnectionDB.query(`UPDATE Faculties SET Money = IF(Money >= ${price}, Money - ${price}, Money) WHERE StudentID = ${StudentID}`, 
    (error, results) => {
        if(error) throw console.log(error);
        console.log(results);
    });
});

/* Insert new university */
const ControllerCreateUniversity = ((request, response) => {
    const { username, email, password, age = 18, life = 100, emotion = 100, money = 500, level = 0 } = request.body;
    const createPlayer = `INSERT INTO Faculties SET ?`;
    myConnectionDB.query(createPlayer, {username, email, password: functionHansh(password), age, life, emotion, money, level}, (error, results) => {
        if(error) {
            response.status(401).json({message: 'Error when trying create a new player'});
        } else {
            response.status(200).json(results);
        };
    });
});

/* Get all university */
const ControllerGetAllUniversity = ((request, response) => {
    myConnectionDB.query(`SELECT * FROM Faculties;`, (error, results) => {
        if(error) {
            response.status(401).json({message: 'Error when trying to get all player'});
        } else {
            response.status(200).json(results)
        };
    });
});

/* Get university by Id */
const ControllerGetUniversity = ((request, response) => {
    const {FacultyID} = request.params;
    myConnectionDB.query('SELECT * FROM Faculties WHERE FacultyID = ?' , [parseInt(FacultyID)], (error, results) => {
        if(error) {
            response.status(401).json({message: 'Error when trying to get player by ID'});
        } else {
            response.status(200).json(results)
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
            response.status(401).json({message: 'Error when trying to delete player!'});
        } else {
            response.json({ results, message: 'Player deleted successfully!' });
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