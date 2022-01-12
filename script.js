//Screen Changes
const btnStart = document.getElementById("start");
const gameScreen = document.getElementById("screen");

let start = false;

btnStart.addEventListener("click", () => {
  start = !start;
  if (start) {
    gameScreen.style.visibility = "visible";
    btnStart.innerHTML = "Stop";
  } else {
    gameScreen.style.visibility = "hidden";
    btnStart.innerHTML = "Start";
    location.reload();
  }
});

//Scores
let scoresPlayer1 = 0;
let scoresPlayer2 = 0;
let scoreOne = [];
let scoreTwo = [];

//Player One Variables with Player Two Health

const shooterOne = document.getElementById("shoot1");
const healthTwo = document.getElementById("health2");
const playerOne = document.getElementById("player1");

function resetImgOne() {
  playerOne.src =
    "images/standing.gif";
  playerOne.style.marginLeft = "0%";
}

shooterOne.addEventListener("click", () => {
  const currentPlayer = "Player 1";
  playerOne.src =
    "images/attack.gif";
  playerOne.style.marginLeft = "100%";
  let bulletOne = parseInt(Math.random() * (5 - 0) + 0);
  healthTwo.style.width = healthTwo.clientWidth - bulletOne + "%";
  setTimeout(function () {
    resetImgOne();
  }, 800);
  console.log("p1",healthOne.offsetWidth);
  if (healthTwo.offsetWidth <= 0) {
    playerTwo.style.visibility = "hidden";
    countResults.push(currentPlayer);
    scoresPlayer1 = scoresPlayer1 + 1;
    scoreOne.push(scoresPlayer1);
    winnerPlayer(currentPlayer);
  }
});
//Player Two with Player One Health

const shooterTwo = document.getElementById("shoot2");
const healthOne = document.getElementById("health1");
const playerTwo = document.getElementById("player2");

function resetImgTwo() {
  playerTwo.src =
    "images/standing.gif";
  playerTwo.style.marginLeft = "0%";
}

shooterTwo.addEventListener("click", () => {
  const currentPlayer = "Player 2";
  let bulletTwo = parseInt(Math.random() * (5 - 0) + 0);
  playerTwo.style.marginLeft = "-100%";
  playerTwo.src =
    "images/attack.gif";
  healthOne.style.width = healthOne.offsetWidth - bulletTwo + "%";
  setTimeout(function () {
    resetImgTwo();
  }, 800);
  console.log("p1",healthOne.offsetWidth);
  if (healthOne.offsetWidth <= 0) {
    playerOne.style.visibility = "hidden";
    countResults.push(currentPlayer);
    scoresPlayer2 = scoresPlayer2 + 1;
    scoreTwo.push(scoresPlayer2);
    winnerPlayer(currentPlayer);
  }
});

//Winner

const winScreen = document.getElementById("win-screen");
const winnerText = document.getElementById("winner");
const playerDetails = document.getElementById("player-details");
const roundDetails = document.getElementById("round-details");

let roundCount = [];

if (roundCount.length === 0) {
  roundCount.push(1);
  roundDetails.innerHTML = "Round " + roundCount[roundCount.length - 1];
}
let index = 0;
let boolWin = false;
function winnerPlayer(winner) {
  winScreen.style.visibility = "visible";
  winnerText.style.visibility = "visible";
  playerDetails.innerHTML = winner;
  shooterTwo.disabled = true;
  shooterOne.disabled = true;

  let div = document.createElement("div");
  div.style.height = "150px";
  div.style.width = "300px";
  div.style.marginLeft = "100px";
  div.style.border = "2px solid white";
  div.style.marginTop = "5px";
  let heading = document.createElement("h2");
  heading.style.color = "white";
  heading.innerHTML = "Round " + roundCount[index];
  let player1 = document.createElement("h2");
  player1.style.color = "white";
  let newScore1 =
    scoresPlayer1 === 0
      ? "Player 1 - Won: " + 0
      : "Player 1 - Won: " + scoresPlayer1;
  player1.innerHTML = newScore1;
  let player2 = document.createElement("h2");
  player2.style.color = "white";
  let newScore2 =
    scoresPlayer2 === 0
      ? "Player 2 - Won: " + 0
      : "Player 2 - Won: " + scoresPlayer2;
  player2.innerHTML = newScore2;
  index = index + 1;
  div.appendChild(heading);
  div.appendChild(player1);
  div.appendChild(player2);
  document.body.appendChild(div);
  if (index === 5) {
    let winText = document.createElement("h1");
    winText.style.color = "white";
    winText.style.marginLeft = "100px";
    winText.innerHTML =
      sumScores(scoreOne) > sumScores(scoreTwo)
        ? "Player 1 is the winner"
        : "Player 2 is the winner";
    document.body.appendChild(winText);
  }
}

if (!boolWin) {
  winScreen.style.visibility = "hidden";
  winnerText.style.visibility = "hidden";
}

//Next Round
const nextRoundBtn = document.getElementById("next-round");

var countResults = [];

nextRoundBtn.addEventListener("click", () => {
  boolWin = false;
  winScreen.style.visibility = "hidden";
  winnerText.style.visibility = "hidden";
  playerOne.style.visibility = "visible";
  playerTwo.style.visibility = "visible";
  shooterOne.disabled = false;
  shooterTwo.disabled = false;
  healthOne.style.width = "100%";
  healthTwo.style.width = "100%";
  roundCount.push(roundCount[roundCount.length - 1] + 1);
  roundDetails.innerHTML = "Round " + roundCount[roundCount.length - 1];
  if (roundCount.length > 4) {
    nextRoundBtn.disabled = true;
  }
});

//Restart Game
const restartBtn = document.getElementById("restart");
restartBtn.addEventListener("click", () => {
  location.reload();
});

function sumScores(scores) {
  let sum = 0;
  for (let i = 0; i < scores.length; i++) {
    sum = sum + scores[i];
  }
  return sum;
}
