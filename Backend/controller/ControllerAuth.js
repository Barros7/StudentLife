const MyConnectionDB = require("../config/ConfigDatabase");
const functionHansh = require('../service/passwordHash');

const ControllerHome = (request, response) => {
    if(req.session.loggedin){
        response.json({ message: request.session });
    } else {
        response.json({ login: false, name: 'Deve iniciar sessão!' });
    }
};

/* Authentication login */
const ControllerSignIn = (request, response) => {
    const { email, password } = request.body;
    if(email && password){
        let verifyUser = "SELECT * FROM Students WHERE Email = ? AND Password = ?";
        MyConnectionDB.query(verifyUser, [email, functionHansh(password)], (error, results) => {
            if(results.length === 0 || !(functionHansh(password) === results[0].Password)){
              response.json({ message: "Username or Password incorrect", statusCode: 403 });
            } else {
                request.session.loggedin = true;
                request.session = results[0];
                res.json({ "session": request.session });
            };
        });
    };
};

/* Insert new player on the database */
const ControllerCreatePlayer = (request, response) => {
    const { username, email, password, age = 18, life = 100, emotion = 100, money = 500, level = 0 } = request.body;
    const createPlayer = `INSERT INTO Students SET ?`;
    MyConnectionDB.query(createPlayer, {username, email, password: functionHansh(password), age, life, emotion, money, level}, (error, result) => {
        if(error) throw error
        response.status(201).json({ message: "Player created successfully!"})
    });
};

/* Update all data of user */
const ControllerUpdatePlayer = (request, response) => {
    const { username, email, password, age, life, emotion, money } = request.body;
    const StudentId = request.params.UserID;
    const updatePlayer = `UPDATE Students SET ? Username = ?, Email = ?, Password = ?, Age = ?, Life = ?, Emotion = ?, Money = ? WHERE StudentID = ${StudentId}`;
    myConnectionDB.query(updatePlayer, [username, email, password, age, life, emotion, money],
    (error, results) => {
        if(error) throw response.status(401).json({ message: 'Please, try again!'});
        response.status(200).json({ message: results});
    });
};

const ControllerGetAllPlayers = (_, response) => {
    MyConnectionDB.query(`SELECT * FROM Students;`, (error, results) => {
        if(error) throw response.status(401).json(error);
        response.status(200).json(results)
    });
};

const ControllerGetPlayer = (request, response) => {
    const {IdStudent} = request.params;
    MyConnectionDB.query(`SELECT * FROM Students WHERE StudentID = ${IdStudent}`, (error, results) => {
        if(error) throw response.status(200).json(error);
        response.status(200).json(results)
    });
};

const ControllerDeletePlayer = (request, response) => {
    const {IdStudent} = request.params.UserID;
    MyConnectionDB.query(`DELETE * FROM Students WHERE IdStudent = ${IdStudent}`, (error, results) => {
        if(error) throw error;
        response.json({
            results,
            message: 'Player deleted successfully!'
        });
    });
};

module.exports = {
    ControllerHome,
    ControllerSignIn,
    ControllerCreatePlayer,
    ControllerUpdatePlayer,
    ControllerGetAllPlayers,
    ControllerGetPlayer,
    ControllerDeletePlayer
}