const myConnectionDB = require("../config/ConfigDatabase");

/* Subtract health and emotion of player */
const subtractHealthAndEmotion = (percentLife, percentEmotion) => {
    myConnectionDB.query(`UPDATE Students SET Life = Life - ${percentLife}, Emotion = Emotion - ${percentEmotion} WHERE StudentID = ${StudentID}`, 
    (error, results) => {
        if(error) {
            response.status(401).json({ messageUniversity: 'Oh, no! Unable to register!' });
        } else {
            myConnectionDB.query(`INSERT INTO Universities`);
        };
    });    
};

/* Check all info of player */
const checkPlayer = (email) => {
    myConnectionDB.query(`SELECT * FROM Students WHERE Email = ?`, [email], (error, results) => {
        if(error){
            return 'Money verification error!!!';
        } else {
            /* Check if money is less than five, if true, subtract two value life and three value emotion */
            if(results.Money < 5){
                setInterval( () => {
                    subtractHealthAndEmotion(2,3);
                }, 5000);
            };
        };
    });
};

module.exports = {
    subtractHealthAndEmotion,
    checkPlayer
}