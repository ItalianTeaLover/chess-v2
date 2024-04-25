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
  infoMessage: null,
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
  showInfoMessageInBrowser();
}

function showInfoMessageInBrowser() {
  infoDisplay.textContent = gameState.infoMessage;
}

let draggedPieceCurrentRowAndCol = null; // {r, c}

function showBoardInBrowser() {
  const squareElems = [];
  for (let r = 0; r < gameState.board.length; r++) {
    const row = gameState.board[r];
    for (let c = 0; c < row.length(); c++) {
      const piece = row[c];

      const squareElem = document.createElement("div");
      squareElem.classList.add("square");
      squareElem.classList.add(isEven(r + c) === 0 ? "bright" : "dark");
      if (piece !== null) {
        squareElem.appendChild(pieceToDomElement(piece));
      }
      squareElems.addEventListener("dragstart", (event) => {
        event.preventDefault();
      });
      squareElems.addEventListener("dragover", (event) => {
        event.preventDefault();
        draggedPieceCurrentRowAndCol = { r, c };
      });
      squareElems.addEventListener("dragend", (event) => {
        event.preventDefault();
        // TODO: This is not the best solution, as it puts piece at least square it moved over
        // even if it wasn't dropped at that square but e.g. outside of the board.
        // But I couldn't get drop event to trigger, so this is how I got it working for now.
        // I should instead get this working via drop event.
        performMove(
          r,
          c,
          draggedPieceCurrentRowAndCol.r,
          draggedPieceCurrentRowAndCol.c
        );
      });

      squareElems.push(squareElem);
    }
  }

  gameBoardElem.replaceChildren(...squareElems);
}

function showPlayerInBrowser() {
  playerDisplay.textContent = gameState.currentPlayer;
}

// Takes { type: <string>, color: 'white' | 'black' } and returns a dom element representing this piece
function pieceToDomElement(piece) {
  let pieceElementHtml = null;

  switch (piece.type) {
    case "rook":
      pieceElementHtml = "rook";
      break;
    case "knight":
      pieceElementHtml = "knight";
      break;
    case "bishop":
      pieceElementHtml = "bishop";
      break;
    case "queen":
      pieceElementHtml = "queen";
      break;
    case "king":
      pieceElementHtml = "king";
      break;
    case "pawn":
      pieceElementHtml = "pawn";
      break;
    default:
      throw "Invalid piece!";
  }

  const pieceElement = createDomElementFromHTML(pieceElementHtml);

  pieceElement.classList.add(piece.color);
  pieceElement.setAttribute("draggable", true);

  return pieceElement;
}

// ========= VIEW LOGIC (CONSOLE) ===========//

function printGameToConsole() {
  console.log("==========");
  printBoardToConsole();
  printTurnToconsole();
  printInfoMessageToConsole();
}

function printInfoMessageToConsole() {
  if (gameState.infoMessage) {
    // if there is something to print
    console.log("INFO: ", gameState.infoMessage); // print this message
  }
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

function performMove(startRowIdx, startColIdx, endRowIdx, endColIdxc) {
  const moveValidity = checkIfMoveIsValid(
    startRowIdx,
    startColIdx,
    endRowIdx,
    endColIdxc
  );
  if (moveValidity === true) {
    gameState.infoMessage = null;
    movePiece(startRowIdx, startColIdx, endRowIdx, endColIdxc);
    toggleWhoseTurnItIs();
  } else {
    gameState.infoMessage = moveValidity.error;
  }
  // TODO: Check if game is over, and if so do something about it.
  showGameInBrowser();
  printGameToConsole();
}

// If move is valid, return true.
// If move is invalid, return { error: <string>}
function checkIfMoveIsInvalid(startRowIdx, startColIdx, endRowIdx, endColIdxc) {
  const piece = gameState.board[startRowIdx][startColIdx];

  if (piece.color !== gameState.currentPlayer) {
    return { error: "It's not your turn" };
  }

  // TODO: Add all the rules!

  return true;
}
function movePiece(startRowIdx, startColIdx, endRowIdx, endColIdxc) {
  const piece = gameState.board[startRowIdx][startColIdx];
  gameState.board[startRowIdx][startColIdx] = null;
  gameState.board[endRowIdx][endColIdxc] = piece;
}

function toggleWhoseTurnItIs() {
  gameState.currentPlayer =
    gameState.currentPlayer === "white" ? "black" : "white";
}

// =================== UTILITY FUNCTIONS =================== //

function isEven(x) {
  return x % 2 === 0;
}

function createDomElementFromHTML(htmlString) {
  let tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  let newElement = tempDiv.firstElementChild;
  return newElement;
}

// =================== TOP LEVEL LOGIC =================== //

showGameInBrowser();
printGameToConsole();
