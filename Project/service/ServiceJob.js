const MyConnectionDB = require("../config/ConfigDatabase");

/* Check if the player has a job */
const ServiceCheckHaveJob = (email) => {
    MyConnectionDB.query(`SELECT * FROM Students WHERE Email = ?`, [email], (error, results) => {
        if(error){
            return 'Employment verification problem!';
        } else {
            if(results.CompanyID < 1 || results.CompanyID == 0){
                return false;
            } else {
                return true;
            };
        };
    });
};

module.exports = {
    ServiceCheckHaveJob,
}