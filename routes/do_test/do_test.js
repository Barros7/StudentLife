const router = require('express').Router();
const connectionDB = require('../../database/db');  //invoke database conection

router.get('/eat',(req,res)=>{

    let id=1 //req.params.userID;
    
    connectionDB.query("SELECT * FROM buy_food WHERE Id_Student='" + id + "';", (err,result) => {
        if(err) throw err;
        res.send(result);
    });
});

module.exports = router;
