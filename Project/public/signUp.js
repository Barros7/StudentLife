/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
Form register
««««««««««««««««««««««««««««««««««««««««««««*/

function formRegister(){
  background(backgroundRegister);

  //Style input username
  emailInput = createInput('', 'text');
  emailInput.style('background-color', '#374592');
  emailInput.style('color', '#ffffff');
  emailInput.size(380,30);
  emailInput.position(705,height/2.5);
  
  //Style input e-mail
  usernameInput = createInput('', 'text');
  usernameInput.style('background-color', '#374592');
  usernameInput.style('color', '#ffffff');
  usernameInput.size(380,30);
  usernameInput.position(705,320);
  
  //Style input password
  passwordInput = createInput('', 'password');
  passwordInput.style('background-color', '#374592');
  passwordInput.style('color', '#ffffff');
  passwordInput.size(380,30);
  passwordInput.position(705,height/1.8);
  
  push();
    fill(50);
    text(mouseX + "," + mouseY, 540, 368, 70, 80);
    textSize(30);
  pop();

  if(mouseX >= 17 && mouseY >= 12 && mouseX <= 255 && mouseY <= 87){
    push();
      noFill();
      strokeWeight(3);
      stroke("#CC00FF");
      rect(17, 13, 237, 75, 10);
    pop();

    if(mouseIsPressed){
      removeElements();
      scene = 1;
    };
  };

  if(mouseX >= 725 && mouseY >= 430 && mouseX <= 1080 && mouseY <= 475){
    push();
      noFill();
      strokeWeight(3);
      stroke("#CC00FF");
      rect(725, 429, 355, 44, 10);
    pop();
  };
};
  
  
/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      Register user function
««««««««««««««««««««««««««««««««««««««««««««*/

function doRegister(){
  let email = emailInput.value();
  let username = usernameInput.value();
  let password = passwordInput.value();

  httpPost('/register','json', {email, username, password} ,(responseServer)=>{
    Id_Student  = responseServer[0].Id_Student;
    alert(responseServer[0].Id_Student)
    homeScene();
  });
};