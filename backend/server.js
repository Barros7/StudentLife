const EXPRESS = require("express"); //Include express dependence on node modules.
const PATH = require('path'); //Include path module for working with file and directory.
const DOT_ENV = require("dotenv"); //Include dotenv variables for sensetive information.
const SHA = require('sha.js'); //Include sha variables for hash calculate (strong passsword).
const BODY_PARSER = require("body-parser"); //Include body-parser dependence.
const SESSION = require("express-session"); //Invoke express-session module for validate user session.
const CONNECTION_DATABASE = require('./database/db'); //Invoke database conection.
const PORT = 3000; 

DOT_ENV.config({PATH: './env/.env'}); //Location directory enviroment variables.

const app = EXPRESS();

//Use database
CONNECTION_DATABASE.query('USE studentlife');

//url encode for get data form
app.use(EXPRESS.urlencoded({
  extended:false
}));

app.use(EXPRESS.json());

app.use(SESSION({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
})); 

// parse application/x-www-form-urlencoded
app.use(BODY_PARSER.urlencoded({ extended: false }))
 
// parse application/json
app.use(BODY_PARSER.json())

app.use(EXPRESS.static('../frontend/public'))

/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
                  Routes
««««««««««««««««««««««««««««««««««««««««««««*/

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
  const USERNAME = req.body.username;
  const PASSWORD = req.body.password;

  if(USERNAME && PASSWORD){
    CONNECTION_DATABASE.query('SELECT * FROM students WHERE Username = ?', [USERNAME], async (error, results, fields)=>{
      let sha256 = SHA('sha256');
      let passwordSalt = results[0].salt;
      let passwordHash = sha256.update(PASSWORD + passwordSalt).digest('hex');
      
      console.log(results[0].Password);
      console.log(passwordHash);

      if(results.length === 0 || !(passwordHash == results[0].Password)){
        console.log("Username or Password incorrect");
        res.json({
          message: "Username or Password incorrect",
          statusCode: 403
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
          "age": req.session.Age,
          "life": req.session.Life,
          "money": req.session.Money,
          "salary": req.session.Salary,
          "emotion": req.session.Emotion,
          "username": req.session.Username,
          "id_stundent": req.session.Id_Student,
          "academic_level": req.session.Academic_Level,
        });
        console.log(req.session);
      }
      res.end();
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
const USER_ROUTES = require('./routes/user/register/register');
const ANIMAL_ROUTES = require('./routes/buy_animal/buy_animal');
const CAR_ROUTES = require('./routes/buy_car/buy_car');
const COMPANY_ROUTES = require('./routes/buy_company/buy_company');
const EAT_ROUTES = require('./routes/buy_eat/buy_eat');
const HOUSE_ROUTES = require('./routes/buy_house/buy_house');
const UNIVERSITY_ROUTES = require('./routes/subscribe_university/subscribe_university');
const TEST_ROUTES = require('./routes/do_test/do_test');

app.use('/', USER_ROUTES);
app.use('/', ANIMAL_ROUTES);
app.use('/', CAR_ROUTES);
app.use('/', COMPANY_ROUTES);
app.use('/', EAT_ROUTES);
app.use('/', HOUSE_ROUTES);
app.use('/', TEST_ROUTES);
app.use('/', UNIVERSITY_ROUTES);

app.get('/food',(req,res)=>{
  let id = req.session.Id_Student;
  req.session.loggedin = true;
  
  CONNECTION_DATABASE.query("SELECT * FROM buy_food WHERE Id_Student='" + id + "';", (err,result) => {
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

app.listen(PORT, () => {
  console.log("Server started on url: "+ "http://localhost:" + PORT);
});
