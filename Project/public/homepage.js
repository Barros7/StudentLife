let username;
let agePlayer;
let age;
let lifeLevel;
let life;
let emotion;
let money;
let url = 'http://localhost:8000/getallplayer';

function homePage(){
    let textLife;
    let textEmotion;
    let textMoney;
    let textName;

    background(backgroundImage);
    
    //Level life
    textLife = createP(life);
    textLife.style('font-size', '30px');
    textLife.style('color', '#ffffff');
    textLife.position(165, -13);
    
    //Level emotion
    textEmotion = createP(emotion);
    textEmotion.style('font-size', '30px');
    textEmotion.style('color', '#ffffff');
    textEmotion.position(490, -13);

    //Money
    textMoney = createP(money);
    textMoney.style('font-size', '30px');
    textMoney.style('color', '#ffffff');
    textMoney.position(810, -13);

    //Name
    textName = createP(username);
    textName.style('font-size', '25px');
    textName.style('color', '#ffffff');
    textName.position(1060, 0);

    //Age
    textAge = createP(age);
    textAge.style('font-size', '25px');
    textAge.style('color', '#ffffff');
    textAge.position(1060, 30);

    httpGet(url, 'json', false, (data) => {
        life = data[0].Life;
        emotion = data[0].Emotion;
        money = data[0].Money;
        username = 'Name: ' + data[0].Username;
        age = 'Age: ' + data[0].Age;
    });
};