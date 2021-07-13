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

// The y-velocity of the computer paddle
let computerPaddleYPosition = 0;

//Starting position for the player paddle.
let playerPaddleYPosition = 200;
playerPaddle.style.top = `${playerPaddleYPosition}px`;

//This value determines how the player paddle moves. When the 's' key is pressed this value becomes '1'. When the
//'w' key is pressed, the value is -1.
let playerPaddleYVelocity = 0;

//Position for the ball.
let xPos = 0;
let yPos = 0;

//Speed of the ball, also doubles as a difficulty slider.
let yVel = 1.25;
let xVel = 1.25;

//Score of the game.
let playerScore = 0;
let compScore = -1;

//Status of the game state; running vs not-running.
let running = false;



//
//
//Opening screen for the player.
//
//


//Event listeners
// startButton.addEventListener("click", startPush);
// stopButton.addEventListener("click", stopPush);



// const runner = setInterval(update, 5);

// //Button controls
// function startPush () {
//   // setInterval(update, 5);
// }

// function stopPush () {
//   clearInterval(runner);
// }

let runner = '';

startButton.onclick = startGame;

function startGame() {

  if (runner !== '') {
    return
  }

  runner = setInterval(update, 5);

}



stopButton.onclick = stopGame;

function stopGame() {

  clearInterval(runner);
  runner = '';

}

// Update the pong world
function update() {
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
  }

  //Paddle ball bounce
  if (
    xPos >= 660 &&
    yPos >= computerPaddleYPosition &&
    yPos <= computerPaddleYPosition + 100
  ) {
    xVel = xVel * -1;
  }

  if (
    xPos <= 20 &&
    yPos >= playerPaddleYPosition &&
    yPos <= playerPaddleYPosition + 100
  ) {
    xVel = xVel * -1;
  }

  //Update the position of the ball.
  xPos = xPos + xVel;
  yPos = yPos + yVel;

  //Apply the new position to the ball.
  ball.style.top = `${yPos}px`;
  ball.style.left = `${xPos}px`;

  //Update the scoreboard.
  let pointOutput = playerScore + ' - ' + compScore;
  points.innerText = pointOutput;







}

//Player control for the player paddle.
addEventListener("keydown", (playerInput) => {
  if (playerInput.key === "s") {
    playerPaddleYVelocity = 1;
  }

  if (playerInput.key === "w") {
    playerPaddleYVelocity = -1;
  }
});

addEventListener("keyup", (playerInput) => {
  if (playerInput.key === "s") {
    playerPaddleYVelocity = 0;
  }

  if (playerInput.key === "w") {
    playerPaddleYVelocity = 0;
  }
});

// Call the update() function every 35ms.
//   setInterval(update, 5);