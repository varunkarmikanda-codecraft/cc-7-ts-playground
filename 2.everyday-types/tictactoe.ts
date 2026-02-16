// Design a function to check if there is a winner in a board of tic-tac-toe
// Tic tac toe board. It should take the board as input, and return winner x or o, or if the game is drawn, then return 'drawn'
//  * draw
//  x  o  x
//  x  x  o
//  o  x  o
// ! x wins!
//  x  x  o
//  o  x  o
//. o  o  x
// ! o wins
//  x  o  x
//  o  x  x
//  o  o  o

// Need a 3 x 3 table
// User input: 2 User X and O

// ? What are the different values that can go into each cell if we call it as Move
// ? can we have a type for it 

// ? Don't you think, the board can potentially be an array containing moves at any given point of time?

// ? What are the outcomes of the check that we make? winner x, winner o, draw, progress
// * function statusOfTicTacToeBoard(board: Board): Status { /* implementation */ }

// type Board = [
//     [Move, Move, Move],
//     [Move, Move, Move],
//     [Move, Move, Move],
// ];

type Move = "X" | "O" | undefined;

type Board = [Move, Move, Move, Move, Move, Move, Move, Move, Move];

type Status = "WINNER 'X'" | "WINNER 'O'" | "DRAW" | "PROGRESS";

function statusOfTicTacToeBoard(board: Board): Status {
    console.log(drawBoard);
    
    return "PROGRESS";
}

const drawBoard: Board = ["X", "O", "X", "X", "X", "O", "O", "X", "O"];
statusOfTicTacToeBoard(drawBoard)

0 1 2 3 4 5 6 7 8 9 

0 1 2 
3 4 5
6 7 8 