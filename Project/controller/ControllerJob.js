const myConnectionDB = require('../config/ConfigDatabase');
const { StatusCodes } = require('http-status-codes');

/* Insert new job */
const ControllerCreateJob = ((request, response) => {
    const { Company, Image, Value, WorkTime } = request.body;
    const createPlayer = `INSERT INTO Companies SET ?`;
    myConnectionDB.query(createPlayer, { Company, Image, Value, WorkTime }, (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying create a new player'});
        } else {
            response.status(StatusCodes.CREATED).json(results);
        };
    });
});

/* Get all jobs */
const ControllerGetAllJob = ((request, response) => {
    myConnectionDB.query(`SELECT * FROM Students;`, (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to get all player'});
        } else {
            response.status(StatusCodes.OK).json(results)
        };
    });
});

/* Get job */
const ControllerGetJob = ((request, response) => {
    const {IdStudent} = request.params;
    myConnectionDB.query('SELECT * FROM Students WHERE StudentID = ?' , [parseInt(IdStudent)], (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to get player by ID'});
        } else {
            response.status(StatusCodes.OK).json(results)
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
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to delete player!'});
        } else {
            response.status(StatusCodes.OK).json({ results, message: 'Player deleted successfully!' });
        };
    });
});

module.exports = { 
    ControllerCreateJob,
    ControllerGetJob,
    ControllerGetAllJob,
    ControllerDeleteJob,
    ControllerUpdateJob
};