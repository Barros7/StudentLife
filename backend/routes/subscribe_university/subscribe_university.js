const router = require('express').Router();

//Subscribe in university
router.post('/register/university', async(req, res) => {
    //received values from frontend and save in variables
    const academicLevel = req.body.level;
    const age = req.body.age;
    const emotionUser = req.body.emotion;
    const lifeUser = req.body.life;
    const moneyUser = req.body.money;
    const name = req.body.name;
    const noteTest = req.body.note;
    const salary = req.body.salary;
    const image = req.body.image;
  
    //verify if user authenticate
    
      //Save the values on database
      connectionDB.query('INSERT INTO students SET ? ', {
        Age: age,
        Emotion: emotionUser,
        Level: academicLevel,
        Life: lifeUser,
        Money: moneyUser,
        Note: noteTest,
        Name: name,
        Salary: salary,
        Image: image,
      }, async(error, results) =>{
        if(error){
          console.log(error);
        }else{
          console.log("Successfully registered");
        }
      });
    });
    
module.exports = router;
