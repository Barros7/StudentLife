const myConnectionDB = require('../config/ConfigDatabase');
const { StatusCodes } = require('http-status-codes');

/* Buy house */
const ControllerBuyHouse = ((request, response) => {
    const { price, idService } = request.body;
    const { id } = request.params;
    myConnectionDB.query(`UPDATE Students SET Money = IF(Money >= ${price}, Money - ${price}, Money) WHERE StudentID = ${id}`, 
    (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({results});
        } else {
            myConnectionDB.query(`UPDATE Houses SET StudentID = ${id} WHERE IdHouses = ${idService}`,[id],(error, results) => {
                if(error){
                    response.status(StatusCodes.BAD_REQUEST).json({ message: 'No system!'});
                } else {
                    response.status(StatusCodes.OK).json({results});
                };
            });
        };
    });
});

/* Insert new house */
const ControllerCreateHouse = ((request, response) => {
    const { image, price, tipology } = request.body;
    console.log(request.body);
    myConnectionDB.query(`INSERT INTO Houses (Image, Price, Tipology) VALUES ('${image}','${price}','${tipology}')`, (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error, message: 'Error when trying create a new player'});
        } else {
            response.status(StatusCodes.CREATED).json(results);
        };
    });
});

/* Get all houses */
const ControllerGetAllHouse = ((_, response) => {
    myConnectionDB.query(`SELECT * FROM Houses;`, (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to get all player'});
        } else {
            response.status(StatusCodes.OK).json(results)
        };
    });
});

/* Get house by ID*/
const ControllerGetHouse = ((request, response) => {
    const {IdStudent} = request.params;
    myConnectionDB.query('SELECT * FROM Houses WHERE StudentID = ?' , [parseInt(IdStudent)], (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to get player by ID'});
        } else {
            response.status(StatusCodes.OK).json(results)
        };
    });
});

/* Update house */
const ControllerUpdateHouse = ((request, response) => {

});

/* Delete house */
const ControllerDeleteHouse = ((request, response) => {
    const {IdStudent} = request.params;
    myConnectionDB.query('DELETE FROM Houses WHERE StudentID = ?', [parseInt(IdStudent)], (error, results) => {
        if(error) {
            response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Error when trying to delete player!'});
        } else {
            response.status(StatusCodes.OK).json({ results, message: 'Player deleted successfully!' });
        };
    });
});

module.exports = { 
    ControllerBuyHouse,
    ControllerCreateHouse,
    ControllerGetHouse,
    ControllerGetAllHouse,
    ControllerDeleteHouse,
    ControllerUpdateHouse
};