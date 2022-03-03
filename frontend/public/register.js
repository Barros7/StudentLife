
//Variables of user
let academicLevel = 1;
let emotionUser = 100;
let age = 18;
let level = 1
let lifeUser = 100;
let salary = 500;
let moneyUser = 500;
let image;

//Form register
function form_register(){
  emailInput = createInput('');
  emailInput.size(250,30);
  emailInput.position(width/2.5,height/3.1);

  usernameInput = createInput('');
  usernameInput.size(250,30);
  usernameInput.position(width/2.5,height/2.4);

  passwordInput = createInput('');
  passwordInput.size(250,30);
  passwordInput.position(width/2.5,height/2);

  registerBTN = createButton('Registar');
  registerBTN.position(width/2.3,height/1.58);
  registerBTN.size(150, 25);
  registerBTN.mousePressed(doRegister)
}

//Register user function
function doRegister(){
  
  emailInput.remove();
  usernameInput.remove();
  passwordInput.remove();
  login.remove();
  registerBTN.remove();
  
  email = emailInput.value();
  username = usernameInput.value();
  password = passwordInput.value();
  
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
    httpPost('/register','json', userData ,(respostaServidor)=>{
      Id_Student  = respostaServidor[0].Id_Student;
      alert(respostaServidor[0].Id_Student)

      loadSave()

      firstScene=true;
    });
  }
}