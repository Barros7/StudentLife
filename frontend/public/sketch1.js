let mouseEnable=true
let firstScene=false;

let questionArea=false;

let usernameInput;
let passwordInput;
let loginBTN;
let Id_Student;

let registerBTN

let stats;
let butArray=new Array();
var perguntaID;

//Variables of user
let academicLevel = 1;
let age = 18;
let emotionUser = 100;
let level = 1
let lifeUser = 100;
let salary = 500;
let moneyUser = 500;
let image;

let questionUploaded;
let responsesUploaded;

let infoAreaValue=false;

let img;
let imgjoao
let imgjoaoex
let url="https://res.cloudinary.com/ddgeecexx/image/upload/v1642371771/jogos/"

let urlend=".png";

function preload(){	  
  img=loadImage(url+"ini"+urlend)
  imgjoao=loadImage("https://res.cloudinary.com/ddgeecexx/image/upload/v1642371749/jogos/joao.png")
  imgjoaoex=loadImage("https://res.cloudinary.com/ddgeecexx/image/upload/v1642371749/jogos/joaoex.png")
  imgblack=loadImage("https://res.cloudinary.com/ddgeecexx/image/upload/v1642371771/jogos/404.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  startAt = 0;
  background(img);
  push()
  text("StudentLife",windowWidth/2 ,windowHeight*0.1);
  pop()

  emailInput = createInput('');
  emailInput.size(250,30);
  emailInput.position(width/2.5,height/3.1);

  usernameInput = createInput('');
  usernameInput.size(250,30);
  usernameInput.position(width/2.5,height/2.4);

  passwordInput = createInput('');
  passwordInput.size(250,30);
  passwordInput.position(width/2.5,height/2);

  loginBTN = createButton('Login');
  loginBTN.position(width/2.3,height/1.76);
  loginBTN.size(150, 40)
  loginBTN.mousePressed(doLogin)
 
  registerBTN = createButton('Registar');
  registerBTN.position(width/2.3,height/1.58);
  registerBTN.size(150, 25);
  registerBTN.mousePressed(doRegister)


  infoBut= new infoButton(windowWidth*0.940,windowHeight*0.05,10,"I")
  beginBut= new beginButton(width/2,height/4,10,"INICIAR");
  continueBut= new continueButton(width/2,height/3,10,"CONTINUAR");
  backBut= new backButton(width/2,height/1.6,10,"VOLTAR")

  img=loadImage(url+"ini"+urlend,imageLoaded)  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

//this function could be called whatever we want
function imageLoaded(){ 
  push()
  imageMode(CORNER);
  image(img, 0, 0, windowWidth,windowHeight);
  pop()
}

function imageJoao(){
  push()
  imageMode(CORNER);
  image(imgjoao, 0, 0);
  pop()
}

//FUNÇÕES DE LOAD
function loadSave(){
  // carregar dados do utilizador 

  loadJSON('/getSave/'+Id_Student,(res)=>{

    if(res.length>0){
      
      perguntaID=res[0].id_pergunta;

      loadQuestion();
      loadResponses();

    }else{
      alert("no stats");
    }
  })
}

//Show houses
function loadHouse(){
  loadJSON('/my/house/' + Id_Student,(res)=>{
    if(res.length > 0){

      questionUploaded=res[0].Id_House

      loadResponses()

    }else{
      alert("You have to buy a house!");
    }
  });
}

//carregar respostas associadas a pergunta
function loadResponses(){
  loadJSON('/house/' + Id_Student,(res)=>{
    if(res.length>0){
      responsesUploaded=res
    }else{
      alert("no responses");
    }
  });
}

//carregar perguntas
function loadQuestion(){
  loadJSON('/getPergunta/'+perguntaID,(res)=>{
    if(res.length>0){

      questionUploaded=res[0].pergunta

      loadResponses()

    }else{
      alert("no question");
    }
  });


}
//carregar respostas associadas a pergunta
function loadResponses(){
  
  loadJSON('/getRespostas/'+perguntaID,(res)=>{
    if(res.length>0){
      responsesUploaded=res
    }else{
      alert("no responses");
    }
  });
}

function draw() {
  background(img);
  if(firstScene){
    mainScene();
  }else{
    homeScene()
  }
}

//Initial scene /login and register
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

function mainScene() {

  infoBut.draw_Button();
  usernameDisplay()
  if(!questionArea){
    if(perguntaID>0){
      continueBut.draw_Button();
    }  
    beginBut.draw_Button();
  
  }else{

    drawQuestions();
   
  }

  if(infoAreaValue){
    infoArea();
  }
  
}

function usernameDisplay(){
  push()

  fill("white")
  rect(width*0.040, height*0.025,windowWidth/6,windowHeight/20,10)
  pop()
  push()
  text(usernameInput.value(), width*0.05, height*0.05);
  pop()
}

function drawQuestions(){
  if(questionUploaded.includes("João") && questionUploaded.includes("libris")){
    image(imgjoaoex,width/2,height/2)
 
    }else if(questionUploaded.includes("João") ){
      image(imgjoao,width/2,height/2)
    }
    if(questionUploaded.includes("OVER") ){
      image(imgblack)
    }

  push()
  fill(255,255,255,170);
  rectMode(CENTER)
  rect(width/2,height/1.2,windowWidth/1.4,windowHeight/4,10);
  fill("grey")
  textAlign(CENTER);
  textSize(12*((windowHeight/2*windowWidth/3.5)/100000))
 
  fill("black")
  text(questionUploaded,windowWidth/2 ,windowHeight/1.35);
  pop()
  maxnum=responsesUploaded.length;
  let butheight=0;
  for(let j=0;j<maxnum;j++){
    butArray[j]= new choiceButton(width/2,height/1.2+butheight,10,responsesUploaded[j].texto,responsesUploaded[j].texto.length)
    butArray[j].draw_Button();
    butheight+=35

  }
  
}

function infoArea(){
  
  push()
  fill("white");
  rectMode(CENTER)
  rect(width/2,height/2,windowWidth/1.4,windowHeight/8,10);
  fill("black")
  textAlign(CENTER);
  textSize(12*((windowHeight/2*windowWidth/3.5)/100000))
 
  fill("black")
  text("Para jogar basta escolher a opção que quiser podendo levar a fins diferentes",windowWidth/2 ,windowHeight/2);
  pop()
}

function mousePressed(){
  if(firstScene){
  
  if(infoBut.click_Button(mouseX,mouseY)){
    if(!infoAreaValue){
    infoAreaValue=true;
    }else{
      infoAreaValue=false
    }
    console.log("infoBUT click")
  }

  if(beginBut.click_Button(mouseX,mouseY)){
    
    perguntaID=0;
    loadQuestion();
    loadResponses();
    
    questionArea=true;
    img=loadImage(url+perguntaID+urlend,imageLoaded)
  }

  if(continueBut.click_Button(mouseX,mouseY)){
    questionArea=true;
    img=loadImage(url+perguntaID+urlend,imageLoaded)  
  }
}

  if(questionArea){
    for(let a=0;a<butArray.length;a++){
      if(butArray[a].click_Button(mouseX,mouseY)){
        console.log(responsesUploaded[a])
        perguntaID=responsesUploaded[a].id_next_pergunta;
        img=loadImage(url+perguntaID+urlend,imageLoaded)
        console.log("perguntaID",perguntaID)
        loadQuestion();
        loadResponses();
        saveGame();
      }
    }
  }
}

function saveGame(){ 
   stats={
    "idpergunta":perguntaID
  }

  httpPost('/saveStats/'+Id_Student,'json',stats,(resposta)=>{
  });
}
//----------------------AREAS-------------------//

//-----------CLASSES------------//
class infoButton{
  constructor(x,y,r,txt){
    this.x=x;
    this.y=y;
    this.sx=50;
    this.sy=this.sx;
    this.r=r
    this.txt=txt;
  }
  
  draw_Button(){
  push()
  rectMode(CENTER)
  fill("white")
  rect(this.x, this.y, this.sx, this.sy,this.r);
  textAlign(CENTER, CENTER);
  stroke(1)
  fill("Black")
  textSize(14);
  text(this.txt, this.x, this.y);
  pop()
    
  }
  
  click_Button(x,y){
    
    if(x>this.x-this.sx/2 && x<this.x+this.sx/2 && y>this.y-this.sy/2 && y<this.y+this.sy/2) {
      return true;
    }else{
      return false;
    }
  }
}

class choiceButton{
  constructor(x,y,r,txt,txtLength){
    this.x=x;
    this.y=y;
    this.sx=100;
    this.sy=this.sx/3;
    this.r=r
    this.txt=txt;
    this.txtLength=txtLength;
  }
  
  draw_Button(){
    if(this.txtLength>8){
      this.sx=this.sx*2;
      
    }
    if(this.txtLength>20){
      this.sx=windowWidth/1.4;
    } 

    push()
    rectMode(CENTER)
    fill(255,255,255,200);
    rect(this.x, this.y, this.sx, this.sy,this.r);
    textAlign(CENTER, CENTER);
    stroke(1)
    fill("black")
    textSize(11*((windowHeight/2*windowWidth/3.5)/100000));
    text(this.txt, this.x, this.y);
    pop()
  }
  
  click_Button(x,y){
    
    if(x>this.x-this.sx/2 && x<this.x+this.sx/2 && y>this.y-this.sy/2 && y<this.y+this.sy/2) {
      return true;
    }else{
      return false;
    }  
  }
}

class beginButton{
  constructor(x,y,r,txt){
    this.x=x;
    this.y=y;
    this.sx=100;
    this.sy=this.sx/2;
    this.r=r
    this.txt=txt;
  }
  
  draw_Button(){
    push()
    rectMode(CENTER)
    fill("white")
    rect(this.x, this.y, this.sx, this.sy,this.r);
    textAlign(CENTER, CENTER);
    stroke(1)
    fill("black")
    textSize(14);
    text(this.txt, this.x, this.y);
    pop()  
  }
  
    click_Button(x,y){
      
    if(x>this.x-this.sx/2 && x<this.x+this.sx/2 && y>this.y-this.sy/2 && y<this.y+this.sy/2) {
      return true;
    }else{
      return false;
    }
  }
}

class continueButton{
  
  constructor(x,y,r,txt){
    this.x=x;
    this.y=y;
    this.sx=100;
    this.sy=this.sx/2;
    this.r=r
    this.txt=txt;
  }
  
  draw_Button(){
  push()
  rectMode(CENTER)
  fill("white")
  rect(this.x, this.y, this.sx, this.sy,this.r);
  textAlign(CENTER, CENTER);
  stroke(1)
  fill("black")
  textSize(14);
  text(this.txt, this.x, this.y);
  pop()
    
  }
  
  click_Button(x,y){
    
    if(x>this.x-this.sx/2 && x<this.x+this.sx/2 && y>this.y-this.sy/2 && y<this.y+this.sy/2) {  
      return true;
    }else{
      return false;
    }
  }
}

class backButton{
  constructor(x,y,r,txt){
    this.x=x;
    this.y=y;
    this.sx=100;
    this.sy=this.sx/2;
    this.r=r
    this.txt=txt;
  }
  
  draw_Button(){
    push()
    rectMode(CENTER)
    fill("white")
    rect(this.x, this.y, this.sx, this.sy,this.r);
    textAlign(CENTER, CENTER);
    stroke(1)
    fill("black")
    textSize(14);
    text(this.txt, this.x, this.y);
    pop()  
  }

  click_Button(x,y){
    if(x>this.x-this.sx/2 && x<this.x+this.sx/2 && y>this.y-this.sy/2 && y<this.y+this.sy/2) {
      return true;
    }else{
      return false;
    }
  }
}