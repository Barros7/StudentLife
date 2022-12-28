/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
Form register
««««««««««««««««««««««««««««««««««««««««««««*/
function formRegister(){
    background(backgroundImageRegisterAndLogin);
    const COLORTEXT = color('#ffffff');
    const BACKGROUNDCOLORINPUT = color('#374592');
    const COLORBUTTONLOGIN = color('#000D4F');
  
    //Style input username
    emailInput = createInput('', 'text');
    emailInput.style('background-color', BACKGROUNDCOLORINPUT);
    emailInput.style('color', COLORTEXT);
    emailInput.size(380,30);
    emailInput.position(width/2,height/2.5);
  
    //Style input e-mail
    usernameInput = createInput('', 'text');
    usernameInput.style('background-color', BACKGROUNDCOLORINPUT);
    usernameInput.style('color', COLORTEXT);
    usernameInput.size(380,30);
    usernameInput.position(width/2,height/2.1);
  
    //Style input password
    passwordInput = createInput('', 'password');
    passwordInput.style('background-color', BACKGROUNDCOLORINPUT);
    passwordInput.style('color', COLORTEXT);
    passwordInput.size(380,30);
    passwordInput.position(width/2,height/1.8);
  
    registerBTN = createButton('Registar');
    registerBTN.style('background-color', COLORBUTTONLOGIN);
    registerBTN.style('color', COLORTEXT);
    registerBTN.style('font-size', 125 + '%');
    registerBTN.position(button_registerLogin_position_x,button_registerLogin_position_y);
    registerBTN.size(250, 40);
    registerBTN.mousePressed(doRegister);
  
    // Button go to login screen
    goToLoginScreenBTN = createButton('Login here!');
    goToLoginScreenBTN.style('background-color', COLORBUTTONLOGIN);
    goToLoginScreenBTN.style('color', COLORTEXT);
    goToLoginScreenBTN.style('font-size', 125 + '%');
    goToLoginScreenBTN.position(10,10);
    goToLoginScreenBTN.size(150, 50);
    goToLoginScreenBTN.mousePressed(function(){
      scene = 1;
    });
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