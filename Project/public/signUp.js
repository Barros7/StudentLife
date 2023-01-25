/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
Form register
««««««««««««««««««««««««««««««««««««««««««««*/

function formRegister(){
  background(backgroundForm);

  // Input e-mail address
  emailInput = createInput('', 'email');
  emailInput.attribute('placeholder', 'Enter your email address');
  emailInput.style('color', 'white');
  emailInput.style('background-color', '#374592');
  emailInput.size(380,30);
  emailInput.position(705,320);

  // Input username
  usernameInput = createInput('', 'text');
  usernameInput.attribute('placeholder', 'Enter your username');
  usernameInput.style('color', 'white');
  usernameInput.style('background-color', '#374592');
  usernameInput.size(380,30);
  usernameInput.position(705,270);
  
  // Input password
  passwordInput = createInput('', 'password');
  passwordInput.attribute('placeholder', 'Enter your password');
  passwordInput.style('color', 'white');
  passwordInput.style('background-color', '#374592');
  passwordInput.size(380,30);
  passwordInput.position(705,370);
  
  // Button register
  buttonRegister = createButton('Register');
  buttonRegister.style('borderRadius', '10px');
  buttonRegister.style('fontSize', '100%');
  buttonRegister.style('fontWeight', 'bold');
  buttonRegister.style('border', 'none');
  buttonRegister.mouseOver( () => { buttonRegister.style('border', '1px #374592 solid'); });
  buttonRegister.mouseOut( () => { buttonRegister.style('border', 'none'); });
  buttonRegister.size(360,40);
  buttonRegister.position(725,420);
  buttonRegister.mousePressed(doRegister);

  // Button change to login
  buttonChangeToSignUpScreen = createButton('Go login!');
  buttonChangeToSignUpScreen.style('borderRadius', '10px');
  buttonChangeToSignUpScreen.style('border', 'none');
  buttonChangeToSignUpScreen.style('fontSize', '100%');
  buttonChangeToSignUpScreen.style('fontWeight', 'bold');
  buttonChangeToSignUpScreen.mouseOver( () => { buttonChangeToSignUpScreen.style('border', '1px #374592 solid'); });
  buttonChangeToSignUpScreen.mouseOut( () => { buttonChangeToSignUpScreen.style('border', 'none'); });
  buttonChangeToSignUpScreen.size(150,60);
  buttonChangeToSignUpScreen.position(10/1,20/1);
  buttonChangeToSignUpScreen.mousePressed( () => {
    sonOpenClick.play();
    removeElements();
    formLogin();
  });
};
  
  
/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      Register user function
««««««««««««««««««««««««««««««««««««««««««««*/

function doRegister(){
  dataUser = { email: emailInput.value(), username: usernameInput.value(), password: passwordInput.value() };

  fetch('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dataUser)
  }).then((response) => {
      if (response) {
        return response.json();
      } else {
        throw new Error('Erro ao enviar dados para o servidor');
      }
    }).then((dataServer) => {
      if(dataServer.affectedRows > 0){
        removeElements();
        formLogin();
      }
    }).catch((erro) => {
      console.error(erro);
    });
};