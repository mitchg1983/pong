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

let sUP = true;

let wUP = true;

// The y-velocity of the computer paddle
let computerPaddleYPosition = 0;
// let computerPaddleYVelocity = 0;

let playerPaddleYPosition = 0;
let playerPaddleYVelocity = 1;
playerPaddle.style.top = `${playerPaddleYPosition}px`;

let xPos = 0;
let xVel = 6;
let yPos = 0;
let yVel = 6;

let playerScore = 0;
let compScore = 0;

// Update the pong world
function update() {
  // Update the computer paddle's position to follow the ball.
  let follower = yPos - 50;
  computerPaddleYPosition = yPos;
  computerPaddle.style.top = `${follower}px`;

  //Set the location of the player paddle. *******TEMP*******

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

  //Update the position of the ball
  xPos = xPos + xVel;
  yPos = yPos + yVel;

  //Apply the new position to the ball
  ball.style.top = `${yPos}px`;
  ball.style.left = `${xPos}px`;

  addEventListener("keydown", (playerInput) => {
    if (playerInput.key === "s") {

      playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity;
      playerPaddle.style.top = `${playerPaddleYPosition}px`;
    }

    if (playerInput.key === "w") {

        playerPaddleYPosition = playerPaddleYPosition - playerPaddleYVelocity;
        playerPaddle.style.top = `${playerPaddleYPosition}px`;
    }
  });
}

// addEventListener("keydown", (inp) => {
//   if (inp.key === "s") {
//     //   sUP = false;
//     setInterval(playerPaddleDown, 50);
//   }

//   if (inp.key === "w") {
//     setInterval(playerPaddleUp, 50);
//   }
// });

// addEventListener("keyup", (inp) => {
//   if (inp.key === "s") {
//     sUp = true;
//   }
// });

// function playerPaddleDown() {

//   if (sUP === false) {
//   playerPaddleYVelocity = 1;
//   playerPaddleYPosition = playerPaddleYPosition + playerPaddleYVelocity;
//   playerPaddle.style.top = `${playerPaddleYPosition}px`;
//   }

//   if (sUP === true) {
//       playerPaddleYVelocity = 0;
//       return;
//   }

// }
// function playerPaddleUp() {
//   playerPaddleYVelocity = 1;
//   playerPaddleYPosition = playerPaddleYPosition - playerPaddleYVelocity;
//   playerPaddle.style.top = `${playerPaddleYPosition}px`;
// }

//PLayer input event listeners & functions

// addEventListener("keydown", (playerInput) => {
//   if (playerInput.key === "s") {
//     sUP = false;
//     console.log('You are pressing the s key.');
//     console.log(sUP);
//     }

//   if (playerInput.key === "w") {
//     wUP = false;
//   }
// });

addEventListener("keyup", (playerInput) => {
  if (playerInput.key === "s") {
    sUP = true;
    console.log("You have released the s key.");
    console.log(sUP);
  }

  if (playerInput.key === "w") {
    wUP = true;
  }
});

if (sUP === true) {
  console.log("You did it.");
}

//new sec

// Call the update() function every 35ms
setInterval(update, 35);
