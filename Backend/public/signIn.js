/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      Form login
««««««««««««««««««««««««««««««««««««««««««««*/
function formLogin(){
  
  background(backgroundImageRegisterAndLogin);

  const COLORTEXT = color('#ffffff');
  const COLORINPUT = color('#374592');
  const COLORBUTTONLOGIN = color('#000D4F');

  //Style input last name
  usernameInput = createInput('', 'text');
  usernameInput.style('background-color', COLORINPUT);
  usernameInput.size(380,30);
  usernameInput.position(width/2,height/2.1);

  //Style input password
  passwordInput = createInput('', 'password');
  passwordInput.style('background-color', COLORINPUT);
  passwordInput.size(380,30);
  passwordInput.position(width/2,height/1.8);

  //Style button login
  loginBTN = createButton('Login');
  loginBTN.style('background-color', COLORBUTTONLOGIN);
  loginBTN.style('color', COLORTEXT);
  loginBTN.style('font-size', 130 + '%');
  loginBTN.position(button_registerLogin_position_x, button_registerLogin_position_y);
  loginBTN.size(250, 40);
  if(mouseX > button_registerLogin_position_x && mouseX <= button_registerLogin_position_x)
  loginBTN.mousePressed(doLogin);

  // Button go to login screen
  goToLoginScreenBTN = createButton('Sign Up here!');
  goToLoginScreenBTN.style('background-color', COLORBUTTONLOGIN);
  goToLoginScreenBTN.style('color', COLORTEXT);
  goToLoginScreenBTN.style('font-size', 125 + '%');
  goToLoginScreenBTN.position(10,10);
  goToLoginScreenBTN.size(150, 50);
  goToLoginScreenBTN.mousePressed(function(){
    scene = 2;
  });
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
        httpPost('/signin','json', userData, (respostaServidor) => {
          if (respostaServidor.statusCode === 403){
            changeScreen = 0;
          } else {
            homeScene();
          }
      });
    }
  }
  