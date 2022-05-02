let usernameInput;
let passwordInput;
let loginBTN;

//Form login
function form_login(){
  
  const colorInput = color('#374592');
  const colorButtonLogin = color('#000D4F');
  const colorText = color('#ffffff');

  //Style input email or username
  usernameInput = createInput('');
  usernameInput.style('background-color', colorInput);
  usernameInput.size(250,30);
  usernameInput.position(width/2.5,height/2.4);

  //Style input password
  passwordInput = createInput('');
  passwordInput.style('background-color', colorInput);
  passwordInput.size(250,30);
  passwordInput.position(width/2.5,height/2);

  //Style button login
  loginBTN = createButton('Login');
  loginBTN.style('background-color', colorButtonLogin);
  loginBTN.style('color', colorText);
  loginBTN.style('font-size', 130 + '%');
  loginBTN.position(width/2.3,height/1.76);
  loginBTN.size(150, 40)
  loginBTN.mousePressed(doLogin)
}

//Login user function
function doLogin(){
  username = usernameInput.value();
  password = passwordInput.value();

  let userData = {
    "username": username,
    "password": password
  }
  if (userData.username == "" || typeof(userData.username) != 'string' || userData.password == ""){
    alert("Username or Password wrong!");
    form_register();
  } 
  else {
      httpPost('/auth','json', userData, (respostaServidor) => {
        Id_Student = respostaServidor[0].Id_Student;
        alert(Id_Student);  
        register();
        //loadSave()
        //firstScene=true;
    });
  }
}

//Initial scene / login and register
function homeScene(){
  push()
  textAlign(CENTER);
  textSize(50*((windowHeight/2*windowWidth/3.5)/100000))
  text("StudentLife",windowWidth/2 ,windowHeight*0.18);
  fill("#b2652f")
  textSize(49*((windowHeight/2*windowWidth/3.5)/100000))
  text("StudentLife",windowWidth/2 ,windowHeight*0.18);
  pop()

  textSize(12*((windowHeight/2*windowWidth/3.5)/100000))
  text("Username",windowWidth/2.5 ,windowHeight*0.41 );
  textSize(12*((windowHeight/2*windowWidth/3.5)/100000))
  text("Email",windowWidth/2.5 ,windowHeight*0.32 );
  textSize(12*((windowHeight/2*windowWidth/3.5)/100000))
  text("Password",windowWidth/2.5 ,windowHeight*0.50);
  pop()
}
