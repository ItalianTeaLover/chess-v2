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

// the gameState is what you want to save throghout the game --> It's the actual Model
const gameState = initialGameState;

// ==================== VIEW LOGIC (BROWSER) ============================== //

const gameBoardElem = document.getElementById("gameboard");
const playerDisplayElem = document.getElementById("player");
const infoDisplayElem = document.getElementById("inf-display");

function showGameInBrowser() {
  showBoardInBrowser();
  showPlayerInBrowser();
  showInfoMessageInBrowser();
}

function showInfoMessageInBrowser() {
  infoDisplayElem.textContent = gameState.infoMessage;
}

let draggedPieceCurrentRowAndCol = null; // {r, c}

function showBoardInBrowser() {
  const squareElems = [];
  for (let r = 0; r < gameState.board.length; r++) {
    const row = gameState.board[r];
    for (let c = 0; c < row.length; c++) {
      const piece = row[c];

      const squareElem = document.createElement("div");
      squareElem.classList.add("square");
      squareElem.classList.add(isEven(r + c) ? "bright" : "dark");
      if (piece !== null) {
        squareElem.appendChild(pieceToDomElement(piece));
      }

      squareElem.addEventListener("dragstart", (event) => {});
      squareElem.addEventListener("dragover", (event) => {
        event.preventDefault();
        draggedPieceCurrentRowAndCol = { r, c };
      });
      squareElem.addEventListener("dragend", (event) => {
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
  playerDisplayElem.textContent = gameState.currentPlayer;
}

// Takes { type: <string>, color: 'white' | 'black' } and returns a dom element representing this piece
function pieceToDomElement(piece) {
  let pieceElementHtml = null;

  switch (piece.type) {
    case "rook":
      pieceElementHtml = rookElement;
      break;
    case "knight":
      pieceElementHtml = knightElement;
      break;
    case "bishop":
      pieceElementHtml = bishopElement;
      break;
    case "queen":
      pieceElementHtml = queenElement;
      break;
    case "king":
      pieceElementHtml = kingElement;
      break;
    case "pawn":
      pieceElementHtml = pawnElement;
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
  for (let r = 0; r < gameState.board.length; r++) {
    const row = gameState.board[r];
    let rowString = "";
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

function performMove(startRowIdx, startColIdx, endRowIdx, endColIdx) {
  const moveValidity = checkIfMoveIsValid(
    startRowIdx,
    startColIdx,
    endRowIdx,
    endColIdx
  );
  if (moveValidity === true) {
    gameState.infoMessage = null;
    movePiece(startRowIdx, startColIdx, endRowIdx, endColIdx);
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
function checkIfMoveIsValid(startRowIdx, startColIdx, endRowIdx, endColIdx) {
  const piece = gameState.board[startRowIdx][startColIdx];

  if (piece.color !== gameState.currentPlayer) {
    return { error: "It's not your turn" };
  }

  // TODO: Add all the rules!

  return true;
}
function movePiece(startRowIdx, startColIdx, endRowIdx, endColIdx) {
  const piece = gameState.board[startRowIdx][startColIdx];
  gameState.board[startRowIdx][startColIdx] = null;
  gameState.board[endRowIdx][endColIdx] = piece;
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
