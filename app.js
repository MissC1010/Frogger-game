const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector("#start-pause-button");
const squares = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");

let currentIndex = 76; //position of frog
const width = 9; //width of game board
let timerId;
let outcomeTimerId;
let currentTime = 20;

//e stands for event its an event object that holds the information of what key was pressed.
function moveFrog(e) {
  // Remove the "frog" class from the current square to clear its position
  squares[currentIndex].classList.remove("frog");
  // Check which arrow key was pressed,
  //when specific key in case is pressed check index of frog
  //and see if its valid to move
  switch (e.key) {
    case "ArrowLeft":
      if (currentIndex % width !== 0) currentIndex -= 1;

      break;
    case "ArrowRight":
      if (currentIndex % width < width - 1) currentIndex += 1;
      break;
    case "ArrowUp":
      if (currentIndex - width >= 0) currentIndex -= width;
      break;
    case "ArrowDown":
      if (currentIndex + width < width * width) currentIndex += width;
      break;
  }
  squares[currentIndex].classList.add("frog");
}

function autoMoveElements() {
  //Decreases the remaining time and updates  display.
  //Calls functions to move logs and cars.
  currentTime--;
  timeLeftDisplay.textContent = currentTime;
  logsLeft.forEach((logLeft) => moveLogLeft(logLeft));
  logsRight.forEach((logRight) => moveLogRight(logRight));
  carsLeft.forEach((carLeft) => moveCarLeft(carLeft));
  carsRight.forEach((carRight) => moveCarRight(carRight));
}

function checkOutComes() {
  lose();
  win();
}

function moveLogLeft(logLeft) {
  //switch statement uses true as expression,
  // evaluating whether the expression true matches any of the case values.
  //if it matches case value it tells it to remove and add.
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;
    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;
    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;
    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;
    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;
  }
}

function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;
  }
}

function moveCarLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains("c1"):
      carLeft.classList.remove("c1");
      carLeft.classList.add("c2");
      break;
    case carLeft.classList.contains("c2"):
      carLeft.classList.remove("c2");
      carLeft.classList.add("c3");
      break;
    case carLeft.classList.contains("c3"):
      carLeft.classList.remove("c3");
      carLeft.classList.add("c1");
      break;
  }
}

function moveCarRight(carRight) {
  switch (true) {
    case carRight.classList.contains("c1"):
      carRight.classList.remove("c1");
      carRight.classList.add("c3");
      break;
    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c1");
      break;
    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("c2");
      break;
  }
}

function lose() {
  if (
    // Check if the current square has the class "c1," representing a car.
    // If move car functions update square classes correctly, "c1" effectively covers collisions with any car on the grid.
    // Using "c1" as the representative class ensures seamless collision handling in the game.
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5") ||
    currentTime <= 0
  ) {
    resultDisplay.textContent = "You Lose!";
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    squares[currentIndex].classList.remove("frog");
    document.removeEventListener("keyup", moveFrog);
  }
}

function win() {
  if (squares[currentIndex].classList.contains("ending-block")) {
    resultDisplay.textContent = "You Win!";
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    document.removeEventListener("keyup", moveFrog);
  }
}

startPauseButton.addEventListener("click", () => {
  // Check if the game is already running
  if (timerId) {
    // If the game is running, stop both the main game timer and the outcome checker timer
    clearInterval(timerId);
    clearInterval(outcomeTimerId);
    // Set both timers to null to indicate that they are stopped
    outcomeTimerId = null;
    timerId = null;
    // Remove event listener for controlling the frog's movement
    document.removeEventListener("keyup", moveFrog);
  } else {
    // If the game is not running, start the main game timer and the outcome checker timer
    timerId = setInterval(autoMoveElements, 1000);
    outcomeTimerId = setInterval(checkOutComes, 50);
    // Add an event listener to allow controlling the frog's movement
    document.addEventListener("keyup", moveFrog);
  }
});
