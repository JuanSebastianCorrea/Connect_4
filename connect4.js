/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */
const body = document.querySelector('body');
const startGame = document.getElementById('startgame');
startGame.addEventListener('submit', beginGame);
let WIDTH = 7;
let HEIGHT = 6;
let currPlayer = 1; // active player: 1 or 2
let board1 = []; // array of rows, each row is array of cells  (board[y][x])

body.classList.add('introImg');
function beginGame(evt) {
	evt.preventDefault();
	const widthInput = document.getElementById('boardwidth');
	const heightInput = document.getElementById('boardheight');

	WIDTH = widthInput.value;
	HEIGHT = heightInput.value;

	if (!document.getElementById('column-top')) {
		board1 = makeBoard(HEIGHT, WIDTH);
		body.classList.remove('introImg');
		makeHtmlBoard();
	}
}

function restartGame(e) {
	window.location.reload();
}

function makeBoard(HEIGHT, WIDTH) {
	let board = [];
	for (let y = 0; y < HEIGHT; y++) {
		board.push(Array.from({ length: WIDTH }));
	}
	return board;
}

/** makeHtmlBoard: make HTML table and row of column tops. */
function makeHtmlBoard() {
	const htmlBoard = document.querySelector('#board');
	// create a table row at the top that listens for click events
	const top = document.createElement('tr');
	top.setAttribute('id', 'column-top');
	top.addEventListener('click', handleClick);

	// create cells within the top tr for each separate column
	for (let x = 0; x < WIDTH; x++) {
		const headCell = document.createElement('td');
		headCell.setAttribute('id', x);
		top.append(headCell);
	}
	htmlBoard.append(top);

	// create rows of the board with the number of rows = HEIGHT and the number of columns = WIDTH
	for (let y = 0; y < HEIGHT; y++) {
		const row = document.createElement('tr');
		for (let x = 0; x < WIDTH; x++) {
			const cell = document.createElement('td');
			cell.setAttribute('id', `${y}-${x}`);
			row.append(cell);
		}
		htmlBoard.append(row);
	}
	const restartBtn = document.createElement('button');
	const container = document.querySelector('#container');
	restartBtn.setAttribute('id', 'restartBtn');
	restartBtn.innerText = 'Restart';
	restartBtn.addEventListener('click', restartGame);
	startGame.append(restartBtn);
}

/** findSpotForCol: given column x, return top empty y (null if filled) */
function findSpotForCol(x) {
	for (let y = HEIGHT - 1; y >= 0; y--) {
		if (!board1[y][x]) {
			return y;
		}
	}
	return null;
}

/** placeInTable: update DOM to place piece into HTML table of board */
function placeInTable(y, x) {
	const piece = document.createElement('div');
	piece.classList.add('piece');
	piece.classList.add(`p${currPlayer}`);

	const spot = document.getElementById(`${y}-${x}`);
	spot.append(piece);
}

/** endGame: announce game end */
function endGame(msg) {
	// TODO: pop up alert message
	setTimeout(function() {
		alert(msg);
	}, 5);
}

/** handleClick: handle click of column top to play piece */
function handleClick(evt) {
	// get x from ID of clicked cell
	let x = parseInt(evt.target.id);

	// get next spot available in column (if none, ignore click)
	let y = findSpotForCol(x);
	if (y === null) {
		return;
	}

	// place piece in board and add to HTML table
	// board[y][x] is the location found for the piece on that click evt, fill it with a piece that is color of currPlayer
	board1[y][x] = currPlayer;
	placeInTable(y, x);

	if (checkForWin()) {
		return endGame(`Player ${currPlayer} won!`);
	}

	if (checkForTie(board1)) {
		return endGame('Tie!');
	}

	currPlayer = switchPlayers(currPlayer);
}

function checkForTie(board) {
	if (board.every((row) => row.every((cell) => cell))) {
		return true;
	}
}

function switchPlayers(currplayer) {
	return currPlayer === 1 ? 2 : 1;
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */
function _win(cells) {
	// Check four cells to see if they're all color of current player
	//  - cells: array list of four (y, x) cells
	//  - returns true if all are legal coordinates & all match currPlayer

	return cells.every(([ y, x ]) => y >= 0 && y < HEIGHT && x >= 0 && x < WIDTH && board1[y][x] === currPlayer);
}

function checkForWin() {
	/* saving 4 adjacent spaces to a variable describing their position relationship. 
  Nested Loop: y loop defines which row we are looping through with second loop (x) to test every possible combination
  defined in horiz, vert, diagDR, diagDL, which are all passed in to _win()
  */
	for (let y = 0; y < HEIGHT; y++) {
		for (let x = 0; x < WIDTH; x++) {
			let horiz = [ [ y, x ], [ y, x + 1 ], [ y, x + 2 ], [ y, x + 3 ] ];
			let vert = [ [ y, x ], [ y + 1, x ], [ y + 2, x ], [ y + 3, x ] ];
			let diagDR = [ [ y, x ], [ y + 1, x + 1 ], [ y + 2, x + 2 ], [ y + 3, x + 3 ] ];
			let diagDL = [ [ y, x ], [ y + 1, x - 1 ], [ y + 2, x - 2 ], [ y + 3, x - 3 ] ];

			if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
				return true;
			}
		}
	}
}
