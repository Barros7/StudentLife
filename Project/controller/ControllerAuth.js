const myConnectionDB = require("../config/ConfigDatabase");
const functionHansh = require('../service/passwordHash');
const { StatusCodes } = require('http-status-codes');

/* Authentication login */
const ControllerSignIn = (request, response) => {
    
    const { email, password } = request.body;
    if(email && password){
        let verifyUser = "SELECT * FROM Students WHERE Email = ? AND Password = ?";
        myConnectionDB.query(verifyUser, [email, functionHansh(password)], (error, results) => {
            if(error){
                response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error when trying to login. Please, try again later!'});
            } else {
                if(results.length === 0 || !(functionHansh(password) === results[0].Password)){
                  response.status(StatusCodes.UNAUTHORIZED).json({ message: "Username or Password incorrect"});
                } else {
                    response.status(StatusCodes.OK).json({ message: "Welcome!"});
                };
            };
        });
    };
};

/* Insert new player on the database */
const ControllerCreatePlayer = (request, response) => {
    const { username, email, password, age = 18, life = 100, emotion = 100, money = 500, level = 0 } = request.body;
    const createPlayer = `INSERT INTO Students SET ?`;
    myConnectionDB.query(createPlayer, {username, email, password: functionHansh(password), age, life, emotion, money, level}, (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying create a new player'});
        } else {
            response.status(StatusCodes.CREATED).json(results);
        };
    });
};

/* Update all data of user */
const ControllerUpdatePlayer = (request, response) => {
    const { username, email, password, age, life, emotion, money } = request.body;
    const StudentId = request.params;
    const updatePlayer = `UPDATE Students SET Username = ?, Email = ?, Password = ?, Age = ?, Life = ?, Emotion = ?, Money = ? WHERE StudentID = ${StudentId}`;
    myConnectionDB.query(updatePlayer, [username, email, password, age, life, emotion, money], (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to update data player'});
        } else {
            response.status(StatusCodes.OK).json(results);
        };
    });
};

/*  
    const ControllerGetPlayer = (request, response) => {
        const {IdStudent} = request.params;
        let decrement = `CREATE TRIGGER decrement_life AFTER INSERT ON Students FOR EACH ROW BEGIN UPDATE Students SET Life = Life - 1 WHERE StudentID = 1; END`
        
        myConnectionDB.query(decrement, (error, message) => {
            if(error){
                console.log(error);
            }
            console.log(message)
            response.json({message})
        });
    }
*/

/* Get all player */
const ControllerGetAllPlayers = (_, response) => {
    myConnectionDB.query(`SELECT * FROM Students;`, (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to get all player'});
        } else {
            response.status(StatusCodes.OK).json(results)
        };
    });
};

/* Get player by your ID */
const ControllerGetPlayer = (request, response) => {
    const {IdStudent} = request.params;
    myConnectionDB.query('SELECT * FROM Students WHERE StudentID = ?' , [parseInt(IdStudent)], (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to get player by ID'});
        } else {
            response.status(StatusCodes.OK).json(results)
        };
    });
};

/* Delete player by ID */
const ControllerDeletePlayer = (request, response) => {
    const {IdStudent} = request.params;
    myConnectionDB.query('DELETE FROM Students WHERE StudentID = ?', [parseInt(IdStudent)], (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to delete player!'});
        } else {
            response.status(StatusCodes.OK).json({ results, message: 'Player deleted successfully!' });
        };
    });
};

/* Export functions */
module.exports = {
    ControllerSignIn,
    ControllerCreatePlayer,
    ControllerUpdatePlayer,
    ControllerGetAllPlayers,
    ControllerGetPlayer,
    ControllerDeletePlayer
};