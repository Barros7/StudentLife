const express = require("express");             //Include express dependence on node modules.
const path = require('path');
const dotEnv = require("dotenv");               //Include dotenv variables for sensetive information.
const sha = require('sha.js');             //Include sha variables for strong passsword
const bodyParser = require("body-parser");      //Include body-parser dependence 
const session = require("express-session");     //Invoke express-session module for validate user session
const connectionDB = require('./database/db');  //invoke database conection
const port = 3000;

dotEnv.config({path: './env/.env'}); //Location directory enviroment variables

const app = express();

//Use database
connectionDB.query('USE studentlife');

//url encode for get data form
app.use(express.urlencoded({
  extended:false
}));

app.use(express.json());

app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
})); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.use(express.static('../frontend/public'))

//================= Routes ====================

//Login
app.get('/login', (req, res)=>{
  res.statusCode = 200;
  //res.render('login');
});

//Logout
app.get('/logout', (req, res)=>{
  req.session.destroy(()=>{
    res.redirect('/');
  });
});

//Authenticate
app.post('/auth', async(req, res)=>{
  const username = req.body.username;
  const password = req.body.password;
  
  if(username && password){
    connectionDB.query('SELECT * FROM students WHERE Username = ? or Email = ?', [username, username], async (error, results, fields)=>{
      if (results.length > 0){
        let sha256 = sha('sha256');
        let passwordSalt = results[0].salt;
        let passwordHash = sha256.update(password + passwordSalt).digest('hex');
        if(results.length == 0 || !(passwordHash == results[0].Password)){
          console.log("Username or Password incorrect");
          res.json({
            message: "Username or Password incorrect"
          });
        }
        else{
          req.session.loggedin = true;
          req.session.Age = results[0].Age;
          req.session.Life = results[0].Life;
          req.session.Money = results[0].Money;
          req.session.Salary = results[0].Salary;
          req.session.Emotion = results[0].Emotion;
          req.session.Username = results[0].Username;
          req.session.Id_Student = results[0].Id_Student;
          req.session.Academic_Level = results[0].Academic_Level;
  
          res.json({
            "age":req.session.Age,
            "life":req.session.Life,
            "money":req.session.Money,
            "salary":req.session.Salary,
            "emotion":req.session.Emotion,
            "username":req.session.Username,
            "id_stundent":req.session.Id_Student,
            "academic_level":req.session.Academic_Level,
          });
          console.log(req.session);
        }
        res.end();
      }
      else {
        console.log("User not found");
          res.json({
            message: "User not found"
          });
      }
    });
  }
  else{
    res.send('Please, enter correct username and password!');
    res.end();
  }
});

//auth
app.get('/', (req, res)=>{
  if(req.session.loggedin){
    res.status(200).json({
      login: true,
      name: req.session.Name
    });
  }
  else{
    res.json({
      login: false,
      name: 'Deve iniciar sessão!'
    });
  }
});

//inport file from route folder
const userRoutes = require('./routes/user/register/register');
const animalRoutes = require('./routes/buy_animal/buy_animal');
const carRoutes = require('./routes/buy_car/buy_car');
const companyRoutes = require('./routes/buy_company/buy_company');
const eatRoutes = require('./routes/buy_eat/buy_eat');
const houseRoutes = require('./routes/buy_house/buy_house');
const testRoutes = require('./routes/do_test/do_test');
const universityRoutes = require('./routes/subscribe_university/subscribe_university');
app.use('/', userRoutes);
app.use('/', animalRoutes);
app.use('/', carRoutes);
app.use('/', companyRoutes);
app.use('/', eatRoutes);
app.use('/', houseRoutes);
app.use('/', testRoutes);
app.use('/', universityRoutes);

app.get('/food',(req,res)=>{
  let id = req.session.Id_Student;
  req.session.loggedin = true;
  
  connectionDB.query("SELECT * FROM buy_food WHERE Id_Student='" + id + "';", (err,result) => {
      if(err) throw err;
      res.send(result);
  });
});

//function for clear cache after logout
app.use((req, res, next)=>{
  if (!req.Name)
      res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
