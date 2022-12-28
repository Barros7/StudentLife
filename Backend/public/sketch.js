let socket;
let scene;
let backgroundGameMusic;
let background_image_start;
let backgroundImageRegisterAndLogin;
let button_registerLogin_position_x = 720;
let button_registerLogin_position_y = 450;


function preload(){
    backgroundGameMusic = loadSound('assets/background-game-music.mp3');
  backgroundImageRegisterAndLogin = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1651455915/background_oackyg.jpg");
  background_image_start = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1657015987/StudentLife_Poster_tmpgtr.png");
}

function mousePressed(){
  if (mouseX >= button_registerLogin_position_x && mouseX <= (button_registerLogin_position_x + 1) &&
  mouseY >= button_registerLogin_position_y && mouseY >= (button_registerLogin_position_y + 1)){
    homeScene();
    
  }
}

function setup(){
  socket = io.connect("http://localhost:8000/");
  socket.on('connect', function() {
    console.log("Connected");
  });
// Receive from socket server
socket.on('generic_message', function (data) {
    console.log(data);
    ellipse(data.x, data.y, 50, 50);
  });

  backgroundGameMusic.loop();
  scene = 3
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw(){
  if(scene === 1){
    formLogin();
  } else if (scene === 2){
    formRegister();
  } else if (scene === 3) {
    homeScene();
  } 
}

/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
Main page after login
««««««««««««««««««««««««««««««««««««««««««««*/
function homeScene(){
  const COLORTEXT = color('#ffffff');
  const COLORBUTTONLOGIN = color('#000D4F');
  let buttonNewGame = createButton('New Game');
  let buttonContinueGame = createButton('Continue Game');
  background(background_image_start);
  backgroundGameMusic.pause();

  // button New game
  buttonNewGame.style('background-color', COLORBUTTONLOGIN);
  buttonNewGame.style('color', COLORTEXT);
  buttonNewGame.style('font-size', 130 + '%');
  buttonNewGame.position(1024, 250);
  buttonNewGame.size(230, 40);
  buttonNewGame.mousePressed(function(){
    scene = 2;
  });

  // button Continue game
  buttonContinueGame.style('background-color', COLORBUTTONLOGIN);
  buttonContinueGame.style('color', COLORTEXT);
  buttonContinueGame.style('font-size', 130 + '%');
  buttonContinueGame.position(1024, 300);
  buttonContinueGame.size(230, 40);
  buttonContinueGame.mousePressed(function(){
    scene = 1;
  })
}


/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
      Display 
««««««««««««««««««««««««««««««««««««««««««««*/
function displayMakeSignUp(){
  const COLORTEXT = color('#ffffff');
  const COLORBUTTONLOGIN = color('#000D4F');
  let buttonNewGame = createButton('New Game');
  let buttonContinueGame = createButton('Continue Game');
  background(background_image_start);

  // button New game
  buttonNewGame.style('background-color', COLORBUTTONLOGIN);
  buttonNewGame.style('color', COLORTEXT);
  buttonNewGame.style('font-size', 130 + '%');
  buttonNewGame.position(1024, 250);
  buttonNewGame.size(230, 40);
  buttonNewGame.mousePressed();

  // button Continue game
  buttonContinueGame.style('background-color', COLORBUTTONLOGIN);
  buttonContinueGame.style('color', COLORTEXT);
  buttonContinueGame.style('font-size', 130 + '%');
  buttonContinueGame.position(1024, 300);
  buttonContinueGame.size(230, 40);
}
/*
  function preload(){
    backgroundImage = loadImage("https://res.cloudinary.com/dcglas1nk/image/upload/v1651455915/background_oackyg.jpg");
  }
*/

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