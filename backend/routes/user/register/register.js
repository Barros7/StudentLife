const router = require('express').Router();
const csprng = require('csprng');             //Include csprng variables for strong passsword
const sha = require('sha.js');             //Include sha variables for strong passsword
const connectionDB = require('../../../database/db');  //invoke database conection

//register
router.get('/register', (req, res) => {
    //res.render('register');
  });
  
  //Create register of user
  router.post('/register', async (req, res)=>{
    //received values from frontend and save in variables
    const academicLevel = req.body.level;
    const age = req.body.age;
    const email = req.body.email;
    const emotionUser = req.body.emotion;
    const lifeUser = req.body.life;
    const moneyUser = req.body.money;
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const salary = req.body.salary;
    const image = req.body.image;

    //verify if username or password is empty
    (username == '' || password == '') ? console.log("Username or Password required!"):
    sha256 = sha('sha256');
    passwordSalt = csprng(256, 36);
    passwordSalt = sha256.update(passwordSalt).digest('hex');
    sha256 = sha('sha256');
    passwordHash = sha256.update(password + passwordSalt).digest('hex');
    console.log(req.body)
    console.log("passwordHash " + passwordHash)
    //Save the values on database
    connectionDB.query('INSERT INTO students SET ? ', {
      Academic_Level: academicLevel,
      Age: age,
      Email: email,
      Emotion: emotionUser,
      Life: lifeUser,
      Money: moneyUser,
      Name: name,
      Password: passwordHash,
      salt: passwordSalt,
      Salary: salary,
      Image: image,
      Id_House: 1,
      Id_Company: 1,
      Id_Course: 1,
      Id_Status: 1,
      Username: username
    }, async(error, results) =>{
      if(error){
        console.log(error);
      }else{
        console.log("Successfully registered");
      }
    });
});

module.exports = router;
  