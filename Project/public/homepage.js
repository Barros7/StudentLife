let textAge;
let textName;
let textLife;
let textMoney;
let textEmotion;

let idStudent = localStorage.getItem("ID");

function getAllData(idStudent){
    setInterval(() => {
        getDataPlayer(idStudent);
        gameOver(idStudent);
    }, 5000);
};

/* This function generate random event, it's for more dificulty */
function generateRandomEvent(){
    const randomEvent = Math.round(Math.random() * 4);
    let event = '';
    switch(randomEvent){
        case 0:
            event = 'Your boss is stressed out about you!';
            break;
        case 1:
            event = 'A bad day in traffic!';
            break;
        case 2:
            event = 'Noisy neighbors!';
            break;
        case 3:
            event = 'Bad news. You didn`t pass the test!';
            break;
        case 4:
            event = 'Conflicts in the relationship!';
            break;
        default:
            break;      
    };
};

function homePage(){
    background(backgroundImage);
    redraw();

    // Money
    textMoney = createP(money);
    textMoney.style('font-size', '30px');
    textMoney.style('color', '#ffffff');
    textMoney.position(810, -13);
    
    // Name
    textName = createP(username);
    textName.style('font-size', '25px');
    textName.style('color', '#ffffff');
    textName.position(1060, 0);
    
    // Age
    textAge = createP(age);
    textAge.style('font-size', '25px');
    textAge.style('color', '#ffffff');
    textAge.position(1060, 30);

    // Level life
    push();
        fill("#ff0000");
        rect(70, 20, life, 32, 20);
    pop();

    // Level emotion
    push();
        fill("#ffff00");
        rect(427, 20, emotion, 32, 20);
    pop();
    
    // Button close form
    const buttonClose = () => {
        if(mouseX >= 895 && mouseX <= 925 && mouseY >= 163 && mouseY <= 185){
            if(mouseIsPressed){
                sonOpenClick.play();
                forms = 0;
            };
        };
    };

    // Test... after test must be changed!!!!

    if(forms > 0){
        buttonClose();
    };
    
    // Form job
    if(mouseX >= 43 && mouseX <= 150 && mouseY >= 565 && mouseY <= 650){
        if(mouseIsPressed){
            sonOpenClick.play();
            forms = 1;
        };
    }

    // Form transport
    else if(mouseX >= 217 && mouseX <= 346 && mouseY >= 565 && mouseY <= 650){
        if(mouseIsPressed){
            sonOpenClick.play();
            forms = 2;
        };
    }

    // Form domicile
    else if(mouseX >= 395 && mouseX <= 531 && mouseY >= 565 && mouseY <= 650){
        if(mouseIsPressed){
            sonOpenClick.play();
            forms = 3;
        };
    }

    // Form college
    else if(mouseX >= 576 && mouseX <= 709 && mouseY >= 565 && mouseY <= 650){
        if(mouseIsPressed){
            sonOpenClick.play();
            forms = 4;
        };
    }

    // Form health
    else if(mouseX >= 1123 && mouseX <= 1256 && mouseY >= 565 && mouseY <= 650){
        if(mouseIsPressed){
            sonOpenClick.play();
            forms = 5;
        };
    }

    // Form food
    else if(mouseX >= 1123 && mouseX <= 1256 && mouseY >= 565 && mouseY <= 650){
        if(mouseIsPressed){
            sonOpenClick.play();
            forms = 6;
        };
    };

    // Check if variable forms is different than 0, if true show form.
    switch(forms){
        case 1:
            formJobs();
            break;
        case 2:
            formTransport();
            break;
        case 3:
            formDomicile();
            break;
        case 4:
            formCollege();
            break;
        case 5:
            formLove();
            break;
        case 6:
            formFood();
            break;
        case 7:
            mailBoxHouse();
            break;
        default:
            break;
    };
};

/*»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»»
         Decrement life and emotion level
««««««««««««««««««««««««««««««««««««««««««««««««*/
function gameOver(idStudent){
  const data = {idStudent};
    fetch('/', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then((response) => {
        if (response) {
          return response.json();
        } else {
          throw new Error('Erro ao enviar dados para o servidor');
        }
      }).then((dataServer) => {
        if(dataServer.stateGame === 'Game Over!'){
          removeElements();
          alert("Game Over!");
        }
      }).catch((erro) => {
        console.error(erro);
      });
  };

function getDataPlayer(idStudent){
    fetch(`/getplayer/${idStudent}`, {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    },
    }).then((response) => {
        if (response) {
            console.log(response);
        return response.json();
        } else {
        throw new Error('Erro ao enviar dados para o servidor');
        }
    }).then((dataServer) => {
        life = dataServer[0].Life;
        money = `${dataServer[0].Money} €`;
        emotion = dataServer[0].Emotion;
        age = `Age: ${dataServer[0].Age}`;
        username = `Name: ${dataServer[0].Username}`;
        
        if(dataServer.stateGame === 'Game Over!'){
            removeElements();
            alert("Game Over!");
        };
    }).catch((erro) => {
        console.error(erro);
    });
};
  