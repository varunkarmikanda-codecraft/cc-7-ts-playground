import { describe, expect, it } from "vitest";
import { counterReducer, createStore, type CounterAction } from "./8.redux.ts";

describe("Counter reducer", () => {
	it("Should increment the state value with 67 and return 67 as the state", () => {
		const counterStore = createStore(0, counterReducer);
		counterStore.dispatch({ type: "INCREMENT", data: 67 });
		expect(counterStore.currentState()).toBe(67);
	});

	it("Should decrement the state value with the -67 and return -67 as the state", () => {
		const counterStore = createStore(0, counterReducer);
		counterStore.dispatch({ type: "DECREMENT", data: 67 });
		expect(counterStore.currentState()).toBe(-67);
	});

	it("should reset the value to 0", () => {
		const counterStore = createStore<number, CounterAction>(67, counterReducer);
		counterStore.dispatch({ type: "RESET", value: 0 });
		expect(counterStore.currentState()).toBe(0);
	});

	it("Testing all the actions together", () => {
		const counterStore = createStore(0, counterReducer);
		counterStore.dispatch({ type: "DECREMENT", data: 100 });
		counterStore.dispatch({ type: "RESET", value: 0 });
		counterStore.dispatch({ type: "DECREMENT", data: 100 });
		counterStore.dispatch({ type: "INCREMENT", data: 50 });
		counterStore.dispatch({ type: "INCREMENT", data: -50 });
		expect(counterStore.currentState()).toBe(-100);
	});
});
