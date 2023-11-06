//your JS code here. If required.
const container = document.querySelector(".container");
const player1Input = document.getElementById("player-1");
const player2Input = document.getElementById("player-2");
const submitButton = document.getElementById("submit");

const messageDiv = document.createElement("div");
messageDiv.classList.add("message");
container.appendChild(messageDiv);

const board = document.createElement("div");
board.classList.add("board");
container.appendChild(board);

const cells = [];

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

// Initialize the game
function initializeGame() {
  board.innerHTML = "";
  cells.length = 0;
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.id = i + 1;

    cell.addEventListener("click", () => handleCellClick(i));

    cells.push(cell);
    board.appendChild(cell);
  }

  messageDiv.textContent = `${player1Input.value}, you're up!`;
}

// Handle cell click
function handleCellClick(index) {
  if (!gameBoard[index]) {
    gameBoard[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer);

    if (checkWinner()) {
      messageDiv.textContent = `${currentPlayer === "X" ? player1Input.value : player2Input.value}, congratulations, you won!`;
    } else if (gameBoard.every((cell) => cell !== "")) {
      messageDiv.textContent = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      messageDiv.textContent = `${currentPlayer === "X" ? player1Input.value : player2Input.value}, you're up!`;
    }
  }
}

// Check for a win
function checkWinner() {
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }

  return false;
}

submitButton.addEventListener("click", () => {
  if (player1Input.value && player2Input.value) {
    initializeGame();
  }
});
