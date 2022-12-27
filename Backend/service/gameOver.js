const myConnectionDB = require("../config/ConfigDatabase");

/* Check if player has life or emotion */
const gameOver = (StudentID) => {
    myConnectionDB.query(`SELECT * FROM Students WHERE StudentID = ?`, [StudentID], (error, results) => {
        if(error){
            return 'Server problem!';
        } else {

            //Decrement five to five second
            setTimeout(() => {
                myConnectionDB.query(`UPDATE Students SET Life = Life - 5`,(error, results) => {
                    if(error){
                        return 'Server problem!';
                    } else {
                        const statisticsPlayer = results;
                        if(results.Life < 1 || results.Emotion < 1){
                            myConnectionDB.query(`DELETE FROM Students WHERE StudentID = ? `, [StudentID], (error, results) => {
                                if(error){
                                    return 'Server problem!';
                                } else {
                                    const dataServer = { stateGame: 'Game Over!', statisticsPlayer, results };
                                    return dataServer;
                                };
                            });
                        };
                    };
                });
            }, 5000);

        };
    });
};

module.exports = { gameOver };