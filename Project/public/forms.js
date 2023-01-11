/*  Sign contract with Faculty or Job  */

const formJobs = () => {
    image(imageFormJob, 425, 155);
    if(mouseX >= 815 && mouseX <= 886 && mouseY >= 305 && mouseY <= 325){
        signJob(1);
    } else if(mouseX >= 815 && mouseX <= 886 && mouseY >= 409 && mouseY <= 430){
        
    };
};

const formTransport = () => {
    image(imageFormTransport, 425, 155);
};

const formDomicile = () => {
    image(imageFormDomicile, 425, 155);
    if(mouseX >= 815 && mouseX <= 886 && mouseY >= 305 && mouseY <= 325){
        if(mouseIsPressed){
            payment(2, 125);
        };
    } else if(mouseX >= 815 && mouseX <= 886 && mouseY >= 409 && mouseY <= 430){
        payment(2, 125);
    };
};

const formCollege = () => {
    image(imageFormCollege, 425, 155);
    if(mouseX >= 815 && mouseX <= 886 && mouseY >= 305 && mouseY <= 325){
        if(mouseIsPressed){
            payment(1, 300);
        };
    } else if(mouseX >= 815 && mouseX <= 886 && mouseY >= 409 && mouseY <= 430){
        payment(2, 125);
    };
};

/*
    const formLove = () => {
        image(imageFormLove, 425, 155);
    };
    
    const formDog = () => {
        image(imageFormJob, 425, 155);
    };
*/

const formFood = () => {
    image(imageFormFood, 425, 155);
};

/* MailBox for success alert */
const mailBoxHouse = () => {
    forms = 7;
    image(mailBoxImage, 425, 155);
    if(mouseX >= 645 && mouseX <= 715 && mouseY >= 388 && mouseY <= 409){
        if(mouseIsPressed){
            sonOpenClick.play();
            forms = 0;
        };
    };
};

