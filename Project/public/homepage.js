
function homePage(){
    let textAge;
    let textName;
    let textLife;
    let textMoney;
    let textEmotion;

    background(backgroundImage);
    
    /*
    /Level life
    textLife = createP(life);
    textLife.style('font-size', '30px');
    textLife.style('color', '#ffffff');
    textLife.position(165, -13);
    
    //Level emotion
    textEmotion = createP(emotion);
    textEmotion.style('font-size', '30px');
    textEmotion.style('color', '#ffffff');
    textEmotion.position(490, -13);
    */
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

    // Level life
    push();
        fill("#ff0500");
        rect(60, 20, life, 32, 20);
    pop();
    
    // Level emotion
    push();
        fill("#ffff00");
        rect(427, 20, emotion, 32, 20);
    pop();

    /*       Forms of interaction       */
    fill(255,255,0);
    text(mouseX + "," + mouseY, 950, 368, 70, 80);
    textSize(30);
    
    //
    // Button close form
    //
    const buttonClose = () => {
        if(mouseX >= 895 && mouseX <= 925 && mouseY >= 163 && mouseY <= 185){
            if(mouseIsPressed){
                sonOpenClick.play();
                forms = 0;
            };
        };
    };
    //
    // Test... after test must be changed!!!!
    //
    if(forms > 0){
        buttonClose();
    };
    //
    //
    
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
