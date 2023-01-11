/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      Form login
««««««««««««««««««««««««««««««««««««««««««««*/

function formLogin(){
  background(backgroundLogin);
  
  //Style input last name
  usernameInput = createInput('', 'email');
  usernameInput.attribute('placeholder', 'Enter your email');
  usernameInput.style('color', 'white');
  usernameInput.style('background-color', '#374592');
  usernameInput.size(380,30);
  usernameInput.position(705,320);
  
  //Style input password
  passwordInput = createInput('', 'password');
  passwordInput.attribute('placeholder', 'Enter your password');
  passwordInput.style('color', 'white');
  passwordInput.style('background-color', '#374592');
  passwordInput.size(380,30);
  passwordInput.position(705,370);

  fill(20);
  
  // Button to do login
  if(mouseX >= 725 && mouseY >= 430 && mouseX <= 1080 && mouseY <= 475){
    push();
      noFill();
      strokeWeight(3);
      stroke("#CC00FF");
      rect(725, 429, 355, 44, 10);
    pop();
    
    if(mouseIsPressed){
      sonOpenClick.play();
      removeElements();
      scene = 3;
    };
  };
  
  // Button to change scene to display register
  if(mouseX >= 17 && mouseY >= 12 && mouseX <= 255 && mouseY <= 87){
    push();
      noFill();
      strokeWeight(3);
      stroke("#CC00FF");
      rect(17, 13, 237, 75, 10);
    pop();
    
    if(mouseIsPressed){
      sonOpenClick.play();
      removeElements();
      scene = 2;
    };
  };
  text(mouseX + "," + mouseY, 540, 368, 70, 80);
  textSize(30);
};
  
/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
              Login user function
««««««««««««««««««««««««««««««««««««««««««««*/
function doLogin(){
  let username = usernameInput.value();
  let password = passwordInput.value();
  const dataUser = { username, password };

  httpPost(`${url}/signin`,'json', dataUser, (respostaServidor) => {
    if (respostaServidor.statusCode === 403){
      changeScreen = 3;
    } else {
      homeScene();
    };
  });
};
