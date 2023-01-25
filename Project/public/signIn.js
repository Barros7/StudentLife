/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      Form login
««««««««««««««««««««««««««««««««««««««««««««*/

function formLogin(){
  background(backgroundForm);
  
  //Style input last name
  emailInput = createInput('', 'email');
  emailInput.attribute('placeholder', 'Enter your email');
  emailInput.style('color', 'white');
  emailInput.style('background-color', '#374592');
  emailInput.size(380,30);
  emailInput.position(705,320);
  
  //Style input password
  passwordInput = createInput('', 'password');
  passwordInput.attribute('placeholder', 'Enter your password');
  passwordInput.style('color', 'white');
  passwordInput.style('background-color', '#374592');
  passwordInput.size(380,30);
  passwordInput.position(705,370);
  
  // Button register
  buttonRegister = createButton('Login');
  buttonRegister.style('borderRadius', '10px');
  buttonRegister.style('border', 'none');
  buttonRegister.style('fontSize', '100%');
  buttonRegister.style('fontWeight', 'bold');
  buttonRegister.mouseOver( () => { buttonRegister.style('border', '1px #374592 solid'); });
  buttonRegister.mouseOut( () => { buttonRegister.style('border', 'none'); });
  buttonRegister.size(360,40);
  buttonRegister.position(725/1,420/1);
  buttonRegister.mousePressed(doLogin);
  
  // Button change to register
  buttonChangeToSignUpScreen = createButton('Go register!');
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
    formRegister();
  });
};
  
/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
              Login user function
««««««««««««««««««««««««««««««««««««««««««««*/
function doLogin(){
  const dataUser = { email: emailInput.value(), password: passwordInput.value() };

  fetch('/signin', {
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
      if(dataServer.message === 'Welcome!'){
        localStorage.setItem("ID", parseInt(dataServer.results[0].StudentID));
        removeElements();
        scene = 2;
        homePage();
        getAllData(localStorage.getItem("ID"));
      }
    }).catch((erro) => {
      console.error(erro);
    });
};
