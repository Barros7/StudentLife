// Variable to state control
let scene = 0;

// Variables image
let backgroundImage;
let backgroundLogin;
let backgroundRegister;
let backgroundMainPage;

// Variables son
let backgroundGameMusic;
let sonOpenClick;
let sonErrorClick;
let sonSuccessClick;

function preload(){
  backgroundGameMusic = loadSound('assets/background-game-music.mp3');
  sonOpenClick = loadSound('assets/mixkit-select-click-1109.wav');

  backgroundImage = loadImage('https://res.cloudinary.com/dcglas1nk/image/upload/v1672847587/scene1_aohv4h.png');
  backgroundRegister = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1672847587/Register_o1jxgf.png");
  backgroundLogin = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1672847587/Login_fyjx6i.png");
  backgroundMainPage = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1672236451/Tela_Inicial_dmyjeo.png");
};

function setup(){
  //backgroundGameMusic.pause();
  //backgroundGameMusic.loop();
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
};

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
};

function draw(){
  if(scene == 0){
    displayMakeSignUp();
  } else if (scene == 1){
    formLogin();
  } else if (scene == 2){
    formRegister();
  } else if (scene == 3){
    homePage();
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

  // Button menu.
  if(mouseX >= 1172 && mouseY >= 601 && mouseX <= 1252 && mouseY <= 656){
    push();
      noFill();
      strokeWeight(3);
      stroke("#CC00FF");
      circle(1172, 601, 80, 55);
    pop();
  };
};

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