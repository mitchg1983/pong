// Size of the game area (in px)
const GAME_AREA_WIDTH = 700;
const GAME_AREA_HEIGHT = 500;

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 20;

// Size of the ball (in px)
const BALL_SIZE = 20;

// Get the computer paddle element
const computerPaddle = document.querySelector(".computer-paddle");

const ball = document.querySelector(".ball");
const playerPaddle = document.querySelector(".player-paddle");
const field = document.querySelector(".game-area");
const scoreBoard = document.querySelector(".score");
const points = document.querySelector(".points");
const startButton = document.querySelector(".startButton");
const stopButton = document.querySelector(".stopButton");
const fasterButton = document.querySelector(".fasterButton");
const slowerButton = document.querySelector(".slowerButton");
const faster = document.querySelector(".faster");
const slower = document.querySelector(".slower");

//Starting position for the player & computer paddle.
let playerPaddleYPosition = 200;
let computerPaddleYPosition = 200;

playerPaddle.style.top = `${playerPaddleYPosition}px`;

//This value determines how the player paddle moves. When the 's' key is pressed this value becomes '1'. When the
//'w' key is pressed, the value is -1.
let playerPaddleYVelocity = 0;

let superBall = false;

let smasher = false;

let timer = 0;

//Player control for the player paddle. Using keydown so you can hold the key, to get continuous movement.
addEventListener("keydown", (playerInput) => {
  if (playerInput.key === "s") {
    playerPaddleYVelocity = 1;
  }

  if (playerInput.key === "w") {
    playerPaddleYVelocity = -1;
  }

  if (playerInput.key === "l") {
    superBall = true;
  }
});

//Keyup will set the velocity to 0. The update function will always try to 'move' the player paddle, but without
//a keydown press, it will always be adding or subracting 0 from the yPos.
addEventListener("keyup", (playerInput) => {
  if (playerInput.key === "s") {
    playerPaddleYVelocity = 0;
  }

  if (playerInput.key === "w") {
    playerPaddleYVelocity = 0;
  }

  if (playerInput.key === "l") {
    superBall = false;
  }
});

//Position for the ball.
let xPos = 240;
let yPos = 340;

//Speed of the ball, also doubles as a difficulty slider.
let yVel = 1.25;
let xVel = 1.25;

//Score of the game.
let playerScore = 0;
let compScore = 0;

//Start & Stop controls
//This variable holds the setInterval & clearInterval window methods.
let runner = "";

startButton.onclick = startGame;
stopButton.onclick = stopGame;

function startGame() {
  //This first return case is to prevent mulitple clicks. I found that if you run the setInterval method
  //more than once, it's additive and you will effectively double the rate at which it is called. This code
  //will check if the game is already 'running' or not.
  if (runner !== "") {
    return;
  }
  runner = setInterval(update, 5);
}

function stopGame() {
  clearInterval(runner);
  runner = "";
}

//Game speed controls
fasterButton.onclick = speedUp;
slowerButton.onclick = slowDown;

function speedUp() {
  yVel = yVel * 1.2;
  xVel = xVel * 1.2;

  //This code will give some feedback to the player that the button was pressed.
  fastImg();
  setTimeout(outFast, 1500);
  return;
}

function slowDown() {
  yVel = yVel * 0.8;
  xVel = xVel * 0.8;

  //This code will give some feedback to the player tha the button was pressed.
  slowImg();
  setTimeout(outSlow, 800);
  return;
}

//Image functions for speed-up & slow-down.
//This variable holds the setInterval & clearInterval window methods.
let fastTemp = "";
let slowTemp = "";

//This function will set fastFade to run every 50ms, which will slowly increment the opacity of the image.
function fastImg() {
  fastTemp = setInterval(fastFade, 50);
  return;
}

function slowImg() {
  slowTemp = setInterval(slowFade, 50);
  return;
}

//This function will set fastFadeOut to run every 50ms, which will slowly decrease the opacity of the image.
function outFast() {
  fastTemp = setInterval(fastFadeOut, 50);
  return;
}

function outSlow() {
  slowTemp = setInterval(slowFadeOut, 50);
  return;
}

//fastFade increases the opacity of the image to appear, when the player clicks the 'faster' button.
function fastFade() {
  //This took me a long time to figure out. The below code will grab a copy of the opacity value, of the
  //element 'faster'. I am not sure why 'window' needs to be written here.
  let fasterOpacity = window
    .getComputedStyle(faster)
    .getPropertyValue("opacity");

  //There was a lot of troubleshooting, so to make things simpler for me, I just make a new variable
  //to store a Number version of the opacity value, which is returned to us as a string.
  let fasterOpacityNum = Number(fasterOpacity);

  //Everytime this function is run, it will check to see if the image is at full opacity or not. If it is below 1,
  //we increase the opacity by 0.08, then end the function. This could potentially be done with a loop or recursion,
  //but that proved very diffucult for me.
  if (fasterOpacityNum < 1) {
    fasterOpacityNum = fasterOpacityNum + 0.08;
    let input = fasterOpacityNum.toString();
    faster.style.opacity = input;
    return;
  }

  //If the image is at max opacity, we end the function and clear the interval. You must clear the interval ***BEFORE***
  //setting the variable back to an empty string. I had the two of those swapped and it caused a massive headache.
  if (fasterOpacityNum >= 1) {
    clearInterval(fastTemp);
    fastTemp = "";
    return;
  }
  return;
}

//slowFade decreases the opacity of the image to appear, when the player clicks the 'slower' button.
function slowFade() {
  let slowerOpacity = window
    .getComputedStyle(slower)
    .getPropertyValue("opacity");

  let slowerOpacityNum = Number(slowerOpacity);

  if (slowerOpacityNum < 1) {
    slowerOpacityNum = slowerOpacityNum + 0.08;
    let input = slowerOpacityNum.toString();
    slower.style.opacity = input;
    return;
  }

  if (slowerOpacityNum >= 1) {
    clearInterval(slowTemp);
    slowTemp = "";
    return;
  }
  return;
}

//This function is almost identitcal to fastFade, except here it reduces the opacity of the image.

function fastFadeOut() {
  let fasterOpacity = window
    .getComputedStyle(faster)
    .getPropertyValue("opacity");
  let fasterOpacityNum = Number(fasterOpacity);

  if (fasterOpacityNum > 0) {
    fasterOpacityNum = fasterOpacityNum - 0.08;
    let input = fasterOpacityNum.toString();
    faster.style.opacity = input;
    return;
  }

  if (fasterOpacityNum <= 0) {
    clearInterval(fastTemp);
    fastTemp = "";
    return;
  }
}

function slowFadeOut() {
  let slowerOpacity = window
    .getComputedStyle(slower)
    .getPropertyValue("opacity");
  let slowerOpacityNum = Number(slowerOpacity);

  if (slowerOpacityNum > 0) {
    slowerOpacityNum = slowerOpacityNum - 0.12;
    let input = slowerOpacityNum.toString();
    slower.style.opacity = input;
    return;
  }

  if (slowerOpacityNum <= 0) {
    clearInterval(slowTemp);
    slowTemp = "";
    return;
  }
}

// Update the pong world
function update() {
  timer++;

  // Update the computer paddle's position to follow the ball.
  let follower = yPos - 50;
  computerPaddleYPosition = yPos;
  computerPaddle.style.top = `${follower}px`;

  //Update the player's paddle based on keyboard input.
  playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity;
  playerPaddle.style.top = `${playerPaddleYPosition}px`;

  //Game boundaries for the ball.
  if (yPos >= 480) {
    yVel = yVel * -1;
  }

  if (yPos < 0) {
    yVel = yVel * -1;
  }

  //Scoring a point for the player.
  if (xPos >= 680) {
    playerScore++;

    yPos = 240;
    xPos = 140;

    ball.style.top = `${yPos}px`;
    ball.style.left = `${xPos}px`;

    ball.style.backgroundColor = "green";
    smasher = false;

    stopGame();
  }

  //Scoring a point for the computer.
  if (xPos <= 0) {
    compScore++;

    yPos = 240;
    xPos = 540;

    ball.style.top = `${yPos}px`;
    ball.style.left = `${xPos}px`;

    stopGame();
  }

  //Paddle ball bounce
  if (
    smasher === false &&
    xPos >= 660 &&
    yPos >= computerPaddleYPosition &&
    yPos <= computerPaddleYPosition + 100
  ) {
    xVel = xVel * -1;
    ball.style.backgroundColor = "green";
    smasher = false;
  }

  if (
    smasher === true &&
    xPos >= 660 &&
    yPos >= computerPaddleYPosition &&
    yPos <= computerPaddleYPosition + 100
  ) {
  }

  if (
    superBall === false &&
    xPos <= 20 &&
    yPos >= playerPaddleYPosition &&
    yPos <= playerPaddleYPosition + 100
  ) {
    xVel = xVel * -1;
  }

  if (
    superBall === true &&
    xPos <= 20 &&
    yPos >= playerPaddleYPosition &&
    yPos <= playerPaddleYPosition + 100
  ) {
    xVel = xVel * -1;
    smasher = true;
    ball.style.backgroundColor = "orange";
  }

  //Update the position of the ball.
  xPos = xPos + xVel;
  yPos = yPos + yVel;

  //Apply the new position to the ball.
  ball.style.top = `${yPos}px`;
  ball.style.left = `${xPos}px`;

  //Update the scoreboard.
  let pointOutput = playerScore + " - " + compScore;
  points.innerText = pointOutput;
}
