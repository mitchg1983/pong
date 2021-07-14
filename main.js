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

//Starting position for the player & computer paddle.
let playerPaddleYPosition = 200;
let computerPaddleYPosition = 200;

playerPaddle.style.top = `${playerPaddleYPosition}px`;

//This value determines how the player paddle moves. When the 's' key is pressed this value becomes '1'. When the
//'w' key is pressed, the value is -1.
let playerPaddleYVelocity = 0;

let superBall = false;

let timer = 0;

let fastTemp = "";

let fastTemp2 = "";

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
    console.log("Superball is", superBall);
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
    console.log("Superball is", superBall);
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

//
//
//Opening screen for the player.
//
//

// window.onload = alert(
//   "Hello! Welcome to Pong, the best Pong clone on the market."
// );

//Start & Stop controls
//This variable holds the setInterval & clearInterval window methods
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

  playerPaddleYPosition = 200;
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

  fastImg();
  setTimeout(outFast, 3000);
  return
}

function slowDown() {
  yVel = yVel * 0.8;
  xVel = xVel * 0.8;
}

function fastImg() {
  fastTemp = setInterval(fastFade, 50);
  return;
}

function outFast() {
  fastTemp = setInterval(fastFadeOut, 50);

  return;
}

function fastFade() {
  let fasterOpacity = window
    .getComputedStyle(faster)
    .getPropertyValue("opacity");
  let fasterOpacityNum = Number(fasterOpacity);

  if (fasterOpacityNum < 1) {
    console.log("I am INCREASING the opacity of the image.");
    fasterOpacityNum = fasterOpacityNum + 0.08;
    let input = fasterOpacityNum.toString();
    faster.style.opacity = input;
    return;
  }

  if (fasterOpacityNum >= 1) {
    console.log("The image is at maximum opacity.");
    clearInterval(fastTemp);
    fastTemp = "";
    return;
  }



  return;
}

function fastFadeOut() {

  let fasterOpacity = window
    .getComputedStyle(faster)
    .getPropertyValue("opacity");
  let fasterOpacityNum = Number(fasterOpacity);

  if (fasterOpacityNum > 0) {
    console.log("I am DECREASING the opacity of the image.");
    fasterOpacityNum = fasterOpacityNum - 0.08;
    let input = fasterOpacityNum.toString();
    faster.style.opacity = input;
    return;
  }

  if (fasterOpacityNum <= 0) {
    console.log("The image is at minimum opacity.");
    clearInterval(fastTemp);
    fastTemp = "";
    return;
  }

}

function fastStop() {
  console.log("We should be stopping");

  fastTemp = "";
  console.log(fastTemp);
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
    xPos = 340;

    ball.style.top = `${yPos}px`;
    ball.style.left = `${xPos}px`;
  }

  //Scoring a point for the computer.
  if (xPos <= 0) {
    compScore++;

    yPos = 240;
    xPos = 340;

    ball.style.top = `${yPos}px`;
    ball.style.left = `${xPos}px`;

    stopGame();
  }

  //Paddle ball bounce
  if (
    xPos >= 660 &&
    yPos >= computerPaddleYPosition &&
    yPos <= computerPaddleYPosition + 100
  ) {
    xVel = xVel * -1;
    ball.style.backgroundColor = "green";
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

// faces.fadeTo("slow", 0);

// faces.style.backgroundColor = 'black';
