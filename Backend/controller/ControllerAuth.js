const MyConnectionDB = require("../config/ConfigDatabase");
const functionHansh = require('../service/passwordHash');

const ControllerHome = (request, response) => {
    response.status(200).json({ message: "Student Life Game for Web!"});
};

/* Authentication login */
const ControllerSignIn = (request, response) => {
    const { email, password } = request.body;
    if(email && password){
        let verifyUser = "SELECT * FROM Students WHERE Email = ? AND Password = ?";
        MyConnectionDB.query(verifyUser, [email, functionHansh(password)], (error, results) => {
            if(error){
                response.status(401).json({ message: 'Error when trying to login. Please, try again later!'});
            } else {
                if(results.length === 0 || !(functionHansh(password) === results[0].Password)){
                  response.status(403).json({ message: "Username or Password incorrect"});
                } else {
                    response.status(200).json({ message: "Welcome!"});
                };
            };
        });
    };
};

/* Insert new player on the database */
const ControllerCreatePlayer = (request, response) => {
    const { username, email, password, age = 18, life = 100, emotion = 100, money = 500, level = 0 } = request.body;
    const createPlayer = `INSERT INTO Students SET ?`;
    MyConnectionDB.query(createPlayer, {username, email, password: functionHansh(password), age, life, emotion, money, level}, (error, results) => {
        if(error) {
            response.status(401).json({message: 'Error when trying create a new player'});
        } else {
            response.status(200).json(results);
        };
    });
};

/* Update all data of user */
const ControllerUpdatePlayer = (request, response) => {
    const { username, email, password, age, life, emotion, money } = request.body;
    const StudentId = request.params;
    const updatePlayer = `UPDATE Students SET Username = ?, Email = ?, Password = ?, Age = ?, Life = ?, Emotion = ?, Money = ? WHERE StudentID = ${StudentId}`;
    MyConnectionDB.query(updatePlayer, [username, email, password, age, life, emotion, money], (error, results) => {
        if(error) {
            response.status(401).json({message: 'Error when trying to update data player'});
        } else {
            response.status(200).json(results);
        };
    });
};

/* Get all player */
const ControllerGetAllPlayers = (_, response) => {
    MyConnectionDB.query(`SELECT * FROM Students;`, (error, results) => {
        if(error) {
            response.status(401).json({message: 'Error when trying to get all player'});
        } else {
            response.status(200).json(results)
        };
    });
};

/* Get player by your ID */
const ControllerGetPlayer = (request, response) => {
    const {IdStudent} = request.params;
    MyConnectionDB.query('SELECT * FROM Students WHERE StudentID = ?' , [parseInt(IdStudent)], (error, results) => {
        if(error) {
            response.status(401).json({message: 'Error when trying to get player by ID'});
        } else {
            response.status(200).json(results)
        };
    });
};

/* Delete player by ID */
const ControllerDeletePlayer = (request, response) => {
    const {IdStudent} = request.params;
    MyConnectionDB.query('DELETE FROM Students WHERE StudentID = ?', [parseInt(IdStudent)], (error, results) => {
        if(error) {
            response.status(401).json({message: 'Error when trying to delete player!'});
        } else {
            response.json({ results, message: 'Player deleted successfully!' });
        };
    });
};

/* Export functions */
module.exports = {
    ControllerHome,
    ControllerSignIn,
    ControllerCreatePlayer,
    ControllerUpdatePlayer,
    ControllerGetAllPlayers,
    ControllerGetPlayer,
    ControllerDeletePlayer
}