const myConnectionDB = require('../config/ConfigDatabase');

/* Buy job */
const ControllerSignContract = ((request, response) => {
    const { price } = request.body;
    myConnectionDB.query(`UPDATE Students SET Money = IF(Money >= ${price}, Money - ${price}, Money) WHERE StudentID = ${StudentID}`, 
    (error, results) => {
        if(error) throw console.log(error);
        console.log(results);
    });
});

/* Insert new job */
const ControllerCreateJob = ((request, response) => {
    const { username, email, password, age = 18, life = 100, emotion = 100, money = 500, level = 0 } = request.body;
    const createPlayer = `INSERT INTO Students SET ?`;
    myConnectionDB.query(createPlayer, {username, email, password: functionHansh(password), age, life, emotion, money, level}, (error, results) => {
        if(error) {
            response.status(401).json({message: 'Error when trying create a new player'});
        } else {
            response.status(200).json(results);
        };
    });
});

/* Get all jobs */
const ControllerGetAllJob = ((request, response) => {
    myConnectionDB.query(`SELECT * FROM Students;`, (error, results) => {
        if(error) {
            response.status(401).json({message: 'Error when trying to get all player'});
        } else {
            response.status(200).json(results)
        };
    });
});

/* Get job */
const ControllerGetJob = ((request, response) => {
    const {IdStudent} = request.params;
    myConnectionDB.query('SELECT * FROM Students WHERE StudentID = ?' , [parseInt(IdStudent)], (error, results) => {
        if(error) {
            response.status(401).json({message: 'Error when trying to get player by ID'});
        } else {
            response.status(200).json(results)
        };
    });
});

/* Update job */
const ControllerUpdateJob = ((request, response) => {

});

/* Delete job */
const ControllerDeleteJob = ((request, response) => {
    const {IdStudent} = request.params;
    myConnectionDB.query('DELETE FROM Students WHERE StudentID = ?', [parseInt(IdStudent)], (error, results) => {
        if(error) {
            response.status(401).json({message: 'Error when trying to delete player!'});
        } else {
            response.json({ results, message: 'Player deleted successfully!' });
        };
    });
});

module.exports = { 
    ControllerSignContract,
    ControllerCreateJob,
    ControllerGetJob,
    ControllerGetAllJob,
    ControllerDeleteJob,
    ControllerUpdateJob
};