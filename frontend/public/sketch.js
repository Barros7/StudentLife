var changeScreen = 2;

let button_registerLogin_position_x = 700;
let button_registerLogin_position_y = 450;

//Credencials variables
let emailInput, usernameInput, passwordInput;

//Variables of user
let academicLevel = 1;
let emotionUser = 100;
let age = 18;
let level = 1
let lifeUser = 100;
let salary = 500;
let moneyUser = 500;
let image;

function preload(){
  background_image_login = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1651455915/background_oackyg.jpg");
  background_image_register = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1651455915/background_oackyg.jpg");
  background_image_start = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1657015987/StudentLife_Poster_tmpgtr.png");
}

function mousePressed(){
  if (mouseX >= button_registerLogin_position_x && mouseX <= (button_registerLogin_position_x + 1) &&
  mouseY >= button_registerLogin_position_y && mouseY >= (button_registerLogin_position_y + 1)){
    homeScene();
    
  }
}

function setup(){
  let canvas = createCanvas(700, 500);
  canvas.position(300,100);
  if(changeScreen == undefined){
    formLogin();
  } else if (changeScreen == 1){
    formRegister();
  } else if (changeScreen == 2) {
    homeScene();
  }
}

function draw(){

}

/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
Form register
««««««««««««««««««««««««««««««««««««««««««««*/
function formRegister(){
  background(background_image_register);
  const COLORTEXT = color('#ffffff');
  const BACKGROUNDCOLORINPUT = color('#374592');
  const COLORBUTTONLOGIN = color('#000D4F');

  emailInput = createInput('', 'text');
  emailInput.style('background-color', BACKGROUNDCOLORINPUT);
  emailInput.style('color', COLORTEXT);
  emailInput.size(250,30);
  emailInput.position(width/2.5,height/3.1);

  //Style input email or username
  usernameInput = createInput('', 'text');
  usernameInput.style('background-color', BACKGROUNDCOLORINPUT);
  usernameInput.style('color', COLORTEXT);
  usernameInput.size(250,30);
  usernameInput.position(width/2.5,height/2.4);

  //Style input password
  passwordInput = createInput('', 'password');
  passwordInput.style('background-color', BACKGROUNDCOLORINPUT);
  passwordInput.style('color', COLORTEXT);
  passwordInput.size(250,30);
  passwordInput.position(width/2.5,height/2);

  registerBTN = createButton('Registar');
  registerBTN.style('background-color', COLORBUTTONLOGIN);
  registerBTN.style('color', COLORTEXT);
  registerBTN.style('font-size', 125 + '%');
  registerBTN.position(button_registerLogin_position_x,button_registerLogin_position_y);
  registerBTN.size(150, 25);
  registerBTN.mousePressed(doRegister);
}

/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      Register user function
««««««««««««««««««««««««««««««««««««««««««««*/

function doRegister(){
  let email = emailInput.value();
  let username = usernameInput.value();
  let password = passwordInput.value();

  emailInput.remove();
  usernameInput.remove();
  passwordInput.remove();
  registerBTN.remove();
  
  let userData = {
    "age": age,
    "emotion":emotionUser,
    "email":email,
    "level":academicLevel,
    "life":lifeUser,
    "money":moneyUser,
    "name":"name",
    "password":password,
    "salary":salary,
    "image":"image",
    "username":username,
  }

  if (userData.username == "" || userData.username.length < 5 || typeof(userData.username) != 'string'){
    alert("Username must be longer than 5 characters");
  }
  else if (userData.email == "" || userData.email.length < 5 ){
    alert("Email must be longer than 5 characters!");
  }
  else if (userData.password == "" || userData.password.length < 6){
    alert("Password must be longer than 6 characters!");
  }
  else {
    httpPost('/register','json', userData ,(responseServer)=>{
      Id_Student  = responseServer[0].Id_Student;
      alert(responseServer[0].Id_Student)
      homeScene(); //If register user, call function homeScene;
    });
  }
}

/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      Form login
««««««««««««««««««««««««««««««««««««««««««««*/
function formLogin(){
  background(background_image_login);

  const COLORTEXT = color('#ffffff');
  const COLORINPUT = color('#374592');
  const COLORBUTTONLOGIN = color('#000D4F');

  //Style input email or username
  usernameInput = createInput('', 'text');
  usernameInput.style('background-color', COLORINPUT);
  usernameInput.size(250,30);
  usernameInput.position(width - 50,height - 150);

  //Style input password
  passwordInput = createInput('', 'password');
  passwordInput.style('background-color', COLORINPUT);
  passwordInput.size(250,30);
  passwordInput.position(width - 50,height - 100);

  //Style button login
  loginBTN = createButton('Login');
  loginBTN.style('background-color', COLORBUTTONLOGIN);
  loginBTN.style('color', COLORTEXT);
  loginBTN.style('font-size', 130 + '%');
  loginBTN.position(button_registerLogin_position_x, button_registerLogin_position_y);
  loginBTN.size(150, 40);
  if(mouseX > button_registerLogin_position_x && mouseX <= button_registerLogin_position_x)
  loginBTN.mousePressed(doLogin);
}

/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      Login user function
««««««««««««««««««««««««««««««««««««««««««««*/
function doLogin(){
  let username = usernameInput.value();
  let password = passwordInput.value();
  let userData = {
    "username": username,
    "password": password
  }
  if (userData.username == "" || typeof(userData.username) != 'string' || userData.password == ""){
    alert("Username or Password wrong!");
  } 
  else {
      httpPost('/auth','json', userData, (respostaServidor) => {
        if (respostaServidor.statusCode === 403){
          changeScreen = 0;
        } else {
          homeScene();
          changeScreen = 2;
        }
    });
  }
}

/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      Main page after login
««««««««««««««««««««««««««««««««««««««««««««*/
function homeScene(){
  background(background_image_start);
}

/*
  function preload(){
    backgroundImage = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1651455915/background_oackyg.jpg");
  }
*/


function university(){
  
  background(25,54,87);
  
  rect(55,10,100,30,20); // life
  rect(190,10,100,30,20); // emotion
  rect(330,10,100,30,20); // money

  rect(50,60,380,60,20); // status player

  rect(50,130,150,100,20); // status player
  rect(50,240,150,100,20); // status player
  rect(50,350,150,100,20); // status player
  rect(50,460,150,100,20); // status player
  
  rect(50,570,150,85,20); // status player
  rect(210,570,150,85,20); // status player
  rect(370,570,150,85,20); // status player
  rect(530,570,150,85,20); // status player
}

//Marketplace function
function marketplace(){
  rect(50,60,380,60,20); // status player

  rect(50,130,150,100,20); // status player
  rect(50,240,150,100,20); // status player
  rect(50,350,150,100,20); // status player
  rect(50,460,150,100,20); // status player
  rect(50,570,150,100,20); // status player
  
  rect(210,570,150,100,20); // status player
  rect(370,570,150,100,20); // status player
  rect(530,570,150,100,20); // status player
}

// let counter;
// function setup() {
//   createCanvas(400, 400);
//   counter = new Count(0,100)
//   counter.start();
// }

// function draw() {
//   background(0);
//   let middle = height/2;
//   let sVal = counter.s;
//   let Progress = map(sVal,0,100,0,100);
  
//   fill(255,0,0);
//   textSize(20);
//   textFont('monospace')
//   let txt = text(sVal + '%', 55, middle * 0.9 + 36);
  
//   rect(0,middle,Progress,20,15)
//   stroke(0,255,0)
//   noFill();
//   rect(0,middle,150,20,15)
  
//   if (floor(random(500)) == 100) {
//     counter.reset();
//   }
  
// }

// class Count{
//   constructor(s,w){
//     this.s = s
//     this.w = w
//     this.p = createP('')
//   }
//   start(){
//     if (!this.done) {
//       setInterval(() => this.counter(),this.w)
//     }
//   }
//   counter(){
//     if(this.s > 0){
//       this.s --
//       this.p.html(this.s)
//     }
//   }
//   reset(){
//     this.s = 100
//   }
// }