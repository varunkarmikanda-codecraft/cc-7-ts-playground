// Redux is a popular FP pattern to
// manage application state.

// Reducer, is a pure function, that creates a new state every time it is called, with an existing state, and an action

// A counter example
// we can reset to a given value
// we can increment
// we can decrement

const counter = (initialValue: number = 0) => {
	let count = initialValue; // state
	return {
		increment(inc: number = 1) {
			// action
			count = count + inc;
		},
		decrement(dec: number = 1) {
			// action
			count = count - dec;
		},
		reset(value: number = 0) {
			// action
			count = value;
		},
		currentValue() {
			// just probing, getter of the state
			return count;
		},
	};
};

const aCounter = counter();

aCounter.increment(67);
aCounter.decrement(55);
aCounter.increment();
aCounter.currentValue();

// Here state can only be modified via the actions identified

// Our aim is to generalize the actions. Having them as methods is not going to work for us, as these methods will change from system to system.

type CounterAction =
	| { type: "INCREMENT"; data: number }
	| { type: "DECREMENT"; data: number }
	| { type: "RESET"; value: number };

// type CounterAction = {
//   type: "INCREMENT" | "DECREMENT" | "RESET";
//   data: number;
// }

const createStore = <T, A>(initial: T, reducer: (state: T, action: A) => T) => {
	let state: T = initial;

	return {
		dispatch(action: A) {
			// * Needs to apply the action and this should compute a new state
			state = reducer(state, action);
		},
		currentState() {
			return state;
		},
	};
};

// Reducers must be pure functions
const counterReducer = (state: number, action: CounterAction): number => {
	let newState = state;

	switch (action.type) {
		case "INCREMENT":
			newState = newState + action.data;
			break;
		case "DECREMENT":
			newState = newState - action.data;
			break;
		case "RESET":
			newState = action.value;
			break;
	}

	return newState;
};

const counterStore = createStore(0, counterReducer);

counterStore.dispatch({ type: "INCREMENT", data: 67 });
counterStore.currentState();
counterStore.dispatch({ type: "DECREMENT", data: 67 });
counterStore.currentState();
counterStore.dispatch({ type: "RESET", value: 67 });
counterStore.currentState();

// ? Please write vitest test to test counterStore

export { createStore, counterReducer, type CounterAction };
