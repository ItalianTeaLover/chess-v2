// MVC (Model View Controller) design pattern

//Model: refers to the data or state (here the chess board) and any info about the game.
// Imagine you want to save the game to a disk and later load it. What would you need to save to be able to
// full restore the game? That is your data / model. It doesn't focus on how the board will be displayed.

// View: how we display our programme. We take the model and we show it in the browser or console.

// Controller: the core logic of the programme. It updates the model.

// M -- showing the Model triggers the View --> V -- action happens --> C -- updates the Model --> and so on

// Model - Describe how the chess board will be saved, without thinking how it will be displayed

// ===================== MODEL LOGIC ============================ //
const initialBoard = [
  [
    { type: "rook", color: "white" }, // each of these lines represents a piece
    { type: "knight", color: "white" },
    { type: "bishop", color: "white" },
    { type: "queen", color: "white" },
    { type: "king", color: "white" },
    { type: "bishop", color: "white" },
    { type: "knight", color: "white" },
    { type: "rook", color: "white" },
  ],
  [
    { type: "pawn", color: "white" },
    { type: "pawn", color: "white" },
    { type: "pawn", color: "white" },
    { type: "pawn", color: "white" },
    { type: "pawn", color: "white" },
    { type: "pawn", color: "white" },
    { type: "pawn", color: "white" },
    { type: "pawn", color: "white" },
  ],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [
    { type: "pawn", color: "black" },
    { type: "pawn", color: "black" },
    { type: "pawn", color: "black" },
    { type: "pawn", color: "black" },
    { type: "pawn", color: "black" },
    { type: "pawn", color: "black" },
    { type: "pawn", color: "black" },
    { type: "pawn", color: "black" },
  ],
  [
    { type: "rook", color: "black" },
    { type: "knight", color: "black" },
    { type: "bishop", color: "black" },
    { type: "queen", color: "black" },
    { type: "king", color: "black" },
    { type: "bishop", color: "black" },
    { type: "knight", color: "black" },
    { type: "rook", color: "black" },
  ],
];

// first think of what you need to define: a board, and whose turn it is
// then start by defining the start of the game, meaning the initialBoard and white as a starting player
const initialGameState = {
  board: initialBoard,
  currentPlayer: "white",
};

// the gameState is what you would want to save
const gameState = initialGameState; // Model

// ==================== VIEW LOGIC (BROWSER) ==============================//

const gameBoard = document.getElementById("gameboard");
const playerDisplay = document.getElementById("player");
const infoDisplay = document.getElementById("inf-display");

function showGameInBrowser() {
  showBoardInBrowser();
  showPlayerInBrowser();
}

function showBoardInBrowser() {
  for (let r = 0; r < gameState.board.length; r++) {
    const row = gameState.board[r];
    let rowString = "";
    for (let c = 0; c < row.length(); c++) {
      const piece = row[c];
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add(isEven(r + c) === 0 ? "bright" : "dark");
      square.innerHTML = piece === null ? null : pieceToDomElement(piece); // TODO: If piece is not nulla, actually put its symbol here. Also set correct colour
      gameBoard.append(square);
    }
  }
}

function showPlayerInBrowser() {
  playerDisplay.textContent = gameState.currentPlayer;
}

// Takes { type: <string>, color: 'white' | 'black' } and returns a dom element representing this piece
function pieceToDomElement(piece) {
  const piece = null;
  switch (piece.type) {
    case "rook":
      piece = "rook";
      break;
    case "knight":
      piece = "knight";
      break;
    case "bishop":
      piece = "bishop";
      break;
    case "queen":
      piece = "queen";
      break;
    case "king":
      piece = "king";
      break;
    case "pawn":
      piece = "pawn";
      break;
    default:
      throw "Invalid piece!";
  }

  piece.classList.add(piece.color); // TODO: will this result at some point with both white and black being added?

  return piece;
}

// ========= VIEW LOGIC (CONSOLE) ===========//

function printGameToConsole() {
  console.log("==========");
  printBoardToConsole();
  printTurnToconsole();
}

function printTurnToconsole() {
  consolel.log(`It is ${gameState.currentPlayer}'s turn.`);
}

function printBoardToConsole() {
  // print the board row by row
  console.log("==========");
  for (let r = 0; r < gameState.board.length; r++) {
    const row = gameState.board[r];
    let rowString = "";
    // print each row piece by piece
    for (let c = 0; c < row.length(); c++) {
      const piece = row[c];
      rowString += piece === null ? " - " : pieceToString(piece);
    }
    console.log("[" + r + "]" + rowString);
  }
}

function pieceToString(piece) {
  const pieceTypeLetter = null;
  switch (piece.type) {
    case "rook":
      pieceTypeLetter = "R";
      break;
    case "knight":
      pieceTypeLetter = "N";
      break;
    case "bishop":
      pieceTypeLetter = "B";
      break;
    case "queen":
      pieceTypeLetter = "Q";
      break;
    case "king":
      pieceTypeLetter = "K";
      break;
    case "pawn":
      pieceTypeLetter = "P";
      break;
    default:
      throw "Invalid piece!";
  }

  if (piece.color === "white") {
    pieceTypeLetter = pieceTypeLetter.toUpperCase();
  } else {
    pieceTypeLetter = pieceTypeLetter.toLowerCase();
  }

  return " " + pieceTypeLetter + " ";
}

// =================== CONTROLLER LOGIC ================= //

function movePiece(startRowIdx, startColIdx, endRowIdx, endColIdxc) {
  gameState.board[endRowIdx][endColIdxc] =
    gameState.board[startRowIdx][startColIdx]; // add piece to initial location
  gameState.board[startRowIdx][startColIdx] = null; // remove piece from initial location
}

function toggleWhoseTurnItIs() {
  gameState.currentPlayer =
    gameState.currentPlayer === "white" ? "black" : "white";
}

// =================== UTILITY FUNCTIONS =================== //

function isEven(x) {
  return x % 2 === 0;
}
// =================== TOP LEVEL LOGIC =================== //

printGameToConsole();
showGameInBrowser();

movePiece(0, 0, 5, 5); // move piece from 00 to 55.
toggleWhoseTurnItIs();

printGameToConsole();
