const router = require('express').Router();
const connectionDB = require('../../database/db');  //invoke database conection

//Route for buy house
router.get('/buyhouse',(req,res)=>{
    req.session.loggedin = true;
    let id=1 //req.params.userID;
    
    connectionDB.query("SELECT * FROM buy_food WHERE Id_Student='" + id + "';", (err,result) => {
        if(err) throw err;
        res.send(result);
    });
});

//Route for list of house bought
router.get('/housebought',(req,res)=>{
    let id=1 //req.params.userID;
    
    connectionDB.query("SELECT * From Houses JOIN Students ON Houses.Id_House = Students.Id_Student ='" + id + "';", (err,result) => {
        if(err) throw err;
        res.send(result);
    });
});


module.exports = router;