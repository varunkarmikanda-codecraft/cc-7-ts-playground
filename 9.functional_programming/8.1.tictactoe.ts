const createStore = <T, A>(initial: T, reduce: (state: T, action: A) => T) => {
	let state: T = initial;

	return {
		dispatch(action: A) {
			state = reduce(state, action);
		},
		currentState() {
			return state;
		},
	};
};

type Player = "X" | "O";
type Result = Player | "DRAW" | "ONGOING";
type Cell = Player | undefined;

type GameState = {
	board: Cell[];
	currentPlayer: Player;
	result: Result;
};

type GameAction = { type: "MOVE"; index: number } | { type: "RESET" };

const initialGameState: GameState = {
	board: Array.from({ length: 9 }),
	currentPlayer: "X",
	result: "ONGOING",
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
	let newState: GameState = state;

	switch (action.type) {
		case "MOVE":
			state = playMove(state, action);
			break;
		case "RESET":
			state = initialGameState;
			break;
	}

	return state;
};

const playMove = (state: GameState, action: GameAction): GameState => {
	if (action.type !== "MOVE") return state;

	const { type, index } = action;
	const { board, currentPlayer, result } = state;

	if (
		index < 0 ||
		index > 9 ||
		board[index] !== undefined ||
		result !== "ONGOING"
	)
		return state;

	const newBoard = [...board];
	newBoard[index] = currentPlayer;

	const winner = checkWinner(newBoard, currentPlayer);
	const isBoardFull = newBoard.every((cell) => cell !== undefined);

	let newResult: Result = "ONGOING";

	if (winner) newResult = currentPlayer;
	else if (isBoardFull) newResult = "DRAW";

	return {
		...state,
		board: newBoard,
		currentPlayer: currentPlayer === "X" ? "O" : "X",
		result: newResult,
	};
};

const checkWinner = (board: Cell[], currentPlayer: Player): boolean => {
	for (let i = 0; i < 9; i = i + 3) {
		if (
			board[i] === currentPlayer &&
			board[i + 1] === currentPlayer &&
			board[i + 2] === currentPlayer
		)
			return true;
	}

	for (let i = 0; i < 3; i++) {
		if (
			board[i] === currentPlayer &&
			board[i + 3] === currentPlayer &&
			board[i + 6] === currentPlayer
		)
			return true;
	}

	if (
		board[0] === currentPlayer &&
		board[4] === currentPlayer &&
		board[6] === currentPlayer
	)
		return true;
	if (
		board[2] === currentPlayer &&
		board[4] === currentPlayer &&
		board[8] === currentPlayer
	)
		return true;

	return false;
};

// const game = createStore(initialGameState, gameReducer);

// console.log(game.currentState());
// game.dispatch({ type: "MOVE", index: 4});
// game.dispatch({ type: "MOVE", index: 7});
// console.log(game.currentState());
// game.dispatch({ type: "MOVE", index: 6});
// game.dispatch({ type: "MOVE", index: 5});
// console.log(game.currentState());
// game.dispatch({ type: "MOVE", index: 1});
// game.dispatch({ type: "MOVE", index: 2});
// game.dispatch({ type: "MOVE", index: 3});
// game.dispatch({ type: "MOVE", index: 0});
// game.dispatch({ type: "MOVE", index: 8});
// console.log(game.currentState());
// game.dispatch({ type: "MOVE", index: 10});
// console.log(game.currentState());
// game.dispatch({ type: "RESET" })
// console.log(game.currentState());

// 0 1 2
// 3 4 5
// 6 7 8
