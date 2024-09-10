let inputs, sequence;
let scores = [];
let gameEnd; 
let compTurn;
let score, flash;
let intervalId;
let buttonOn;
let interval = 800;
const time = 4000;
let timer;

StartButton.addEventListener('click', (event) => {
    Indicator.style.backgroundColor = "green";
    gameEnd = false;
    setTimeout(gameStart, 2000);
});

function gameStart() {
    inputs = [];
    sequence = [];
    score = 0;
    flash = 0;
    compTurn = true;
    score = 1;
    intervalId = setInterval(game, interval);
}

function game() {
    resetTime();
    if (sequence.length == 6 || sequence.length == 10 || sequence.length == 14) interval -= 100;
    buttonOn = false;
    sequence.push(Math.floor(Math.random() * 4) + 1);

    if (flash == score) {
        clearInterval(intervalId);
        compTurn = false;
        clearColor();
        buttonOn = true;
    }
    if (compTurn) {
        clearColor();
        setTimeout(() => {
            if (sequence[flash] == 1) GreenButton.style.backgroundColor = "lightgreen";
            if (sequence[flash] == 2) RedButton.style.backgroundColor = "salmon";
            if (sequence[flash] == 3) YellowButton.style.backgroundColor = "yellow";
            if (sequence[flash] == 4) BlueButton.style.backgroundColor = "lightblue";
            flash++;
        }, 200);
    }
}
function clearColor() {
    GreenButton.style.backgroundColor = "green";
    RedButton.style.backgroundColor = "red";
    YellowButton.style.backgroundColor = "gold";
    BlueButton.style.backgroundColor = "blue";
}
function resetTime() {
    clearTimeout(timer);
    timer = setTimeout(() => {
        check();
    }, time);
}
GreenButton.addEventListener('click', (event) => {
    if (buttonOn) {
        inputs.push(1);
        check();
        GreenButton.style.backgroundColor = "lightgreen";
        if(!gameEnd) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
    resetTime();
});
RedButton.addEventListener('click', (event) => {
    if (buttonOn) {
        inputs.push(2);
        check();
        RedButton.style.backgroundColor = "salmon";
        if(!gameEnd) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
    resetTime();
});
YellowButton.addEventListener('click', (event) => {
    if (buttonOn) {
        inputs.push(3);
        check();
        YellowButton.style.backgroundColor = "yellow";
        if(!gameEnd) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
    resetTime();
});
BlueButton.addEventListener('click', (event) => {
    if (buttonOn) {
        inputs.push(4);
        check();
        BlueButton.style.backgroundColor = "lightblue";
        if(!gameEnd) {
            setTimeout(() => {
                clearColor();
            }, 300);
        }
    }
    resetTime();
});

function check() {
    let len = inputs.length-1;
    if ((inputs[len] != sequence[len])) gameEnd = true;
    if (gameEnd) {
        buttonOn = false;
        clearTimeout(timer);
        flashColors();
        setTimeout(() => {
            clearColor();
        }, 200)
        scores.push(score-1);
        setHigh();
        setPrev();
        Indicator.style.backgroundColor = "red";
    }
    if (score == inputs.length && !gameEnd) {
        score++;
        inputs = [];
        compTurn = true;
        flash = 0;
        intervalId = setInterval(game, interval);
    }
}
function flashColors() {
    GreenButton.style.backgroundColor = "lightgreen";
    RedButton.style.backgroundColor = "salmon";
    YellowButton.style.backgroundColor = "yellow";
    BlueButton.style.backgroundColor = "lightblue";
}
function setHigh() {
    let highest = 0;
    for (let i = 1; i < scores.length; i++) {
        if (scores[highest] < scores[i]) highest = i;
    }
    highest = scores[highest];
    highScore.innerHTML = highest;
}
function setPrev() {
    prevScore.innerHTML = score - 1;
}