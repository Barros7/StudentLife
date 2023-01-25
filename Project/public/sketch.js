const url = 'http://localhost:8000';

// Variable to state control
let scene = 0;
let forms = 0;
let mailBox = 0;

let username, age, life, emotion, money;

// Variables image
let imageFormJob, imageFormFood, backgroundImage, backgroundLogin, imageFormCollege, imageFormDomicile, imageFormTransport, backgroundRegister, backgroundMainPage;

// Variables sound
let sonOpenClick, sonErrorClick, sonSuccessClick, backgroundGameMusic;

// Message box for success alert
let mailBoxImage, mailBoxNosuccessImage;

function preload(){
  backgroundGameMusic = loadSound('assets/background-game-music.mp3');
  sonOpenClick = loadSound('assets/mixkit-select-click-1109.wav');
  sonErrorClick = loadSound('assets/mixkit-click-error-1110.wav');

  // Background images
  backgroundImage = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1673434882/Scene_2_2_btxrgg.png");
  backgroundForm = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1651455915/background_oackyg.jpg");
  backgroundMainPage = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1672236451/Tela_Inicial_dmyjeo.png");
  
  // Forms images
  imageFormJob = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1672965559/assets/Job_saar9v.png");
  imageFormFood = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1672964865/assets/Food_g1rtpp.png");
  imageFormTransport = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1672964865/assets/Transport_vg4l6k.png");
  imageFormCollege = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1672941857/assets/formCollege_jbdnv6.png")
  imageFormDomicile = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1672964865/assets/Domicile_soq0xu.png");
  
  // MailBox for success alerts
  mailBoxImage = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1673313236/Congrats_gbgdrw.png");
  mailBoxNosuccessImage = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1673413753/No_success_pmgo1d.png");
};

function setup(){
  //backgroundGameMusic.play();
  //backgroundGameMusic.loop();
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
};

function draw(){
  if(scene == 0){
    formLogin();
    noLoop();
  } else if(scene == 1){
    formRegister();
    noLoop();
  } else if(scene == 2){
    loop();
    homePage();
    noLoop();
  };
};

/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      Display 
««««««««««««««««««««««««««««««««««««««««««««*/
function displayMakeSignUp(){
  background(backgroundMainPage);
  fill(50);
  text(mouseX + "," + mouseY, 540, 368, 70, 80);
  textSize(30);
  
  // Button start game.
  if(mouseX >= 840 && mouseY >= 225 && mouseX <= 1253 && mouseY <= 270){
    push();
      noFill();
      strokeWeight(3);
      stroke("#CC00FF");
      rect(840,225,413,45,10);
    pop();

    if(mouseIsPressed){
      sonOpenClick.play();
      scene = 2;
    };
  };

  // Button continue game.
  if(mouseX >= 840 && mouseY >= 288 && mouseX <= 1253 && mouseY <= 335){
    push();
      noFill();
      strokeWeight(3);
      stroke("#CC00FF");
      rect(840,288,413,45,10);
    pop();

    if(mouseIsPressed){
      sonOpenClick.play();
      scene = 1;
    };
  };

  // Button settings
  if(mouseX >= 1172 && mouseY >= 601 && mouseX <= 1252 && mouseY <= 656){
    push();
      noFill();
      strokeWeight(3);
      stroke("#CC00FF");
      circle(1172, 601, 80, 55);
    pop();
  };
};

/* Function buy house */
function payment(id, product, idProduct, price){
  const dataUser = { id, product, idProduct, price};
  fetch(`/${product}/${id}`, {
    method: 'PUT',
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
      if(dataServer){
        console.log("########");
        console.log(dataServer);
        mailBoxHouse();
      }
    }).catch((erro) => {
      console.error(erro);
    });
};