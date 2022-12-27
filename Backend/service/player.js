 /* Sign contract of job */
const ControllerSignContract = ((CompanyID, StudentID) => {
    myConnectionDB.query(`UPDATE Students SET CompanyID = ${CompanyID} WHERE StudentID = ${StudentID}`, 
    (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to sign contrat'});
        } else {
            response.status(StatusCodes.OK).json(results);
        };
    });
});

