import assert from "node:assert/strict";
import type { callbackify } from "node:util";

/**
 * createMultiplier returns a function configured with a specific multiplier.
 */
function createMultiplier(multiplier: number): (num: number) => number {
	const func = function (num: number): number {
		return num * multiplier;
	};

	return func;
}

const multiplyByTwo = createMultiplier(2); // Point free style of creating functions.
const multiplyByTen = createMultiplier(10);
assert.strictEqual(multiplyByTwo(5), 10);
assert.strictEqual(multiplyByTen(5), 50);

const multiplyBy15 = createMultiplier(15); //closes over the value 15
assert.strictEqual(multiplyBy15(10), 150);

// ! create a function add that return another function and that returns
// !another function
function add(
	a: number,
): (b: number) => (c: number) => (d: number, f: number) => number {
	return (b: number) => {
		return (c: number) => {
			return (d: number, f: number) => a + b + c + d;
		};
	};
}

// ! create a function that takes 2 arguments, and return a function that takes 3 arguments and returns a function that does not take any arguments, but returns a number. For now let all args be numbers.

type ReturnTypeOfSpecial = (c: number, d: number, e: number) => () => number;

const special = (a: number, b: number): ReturnTypeOfSpecial => {
	return (c: number, d: number, e: number) => () => 20;
};

//! create a function foo, that takes another function as its argument. And this argument function receives a number, and an array of numbers and returns a number. foo should return a number.

type FunctionArg = (a: number, items: number[]) => number;

const foo = (callback: FunctionArg): number => callback(10, [1, 2, 4]);

type SearchFunc<T> = (
	value: T,
	compareFunc: (v: T, other: T) => boolean,
) => boolean;

/**
 * createGreeter builds a customized greeter function.
 */
function createGreeter(greeting: string): (name: string) => string {
	return function (name: string): string {
		return `${greeting}, ${name}!`;
	};
}

// The mechanism using which a function remembers all vars in its containing lexical scope is known as closure.

const sayHello = createGreeter("Hello");
const sayHi = createGreeter("Hi");
assert.strictEqual(sayHello("Bob"), "Hello, Bob!");
assert.strictEqual(sayHi("Charlie"), "Hi, Charlie!");

/**
 * Each counter returned by createCounter maintains its own private state.
 */
function createCounter(): () => number {
	let count = 0;
	return function (): number {
		count++;
		return count;
	};
}

const counter1 = createCounter();
const counter2 = createCounter();
console.log("\n--- Closures with State ---");
console.log("Counter 1:", counter1());
console.log("Counter 1:", counter1());
console.log("Counter 2:", counter2());
console.log("Counter 1:", counter1());
console.log("Counter 2:", counter2());

// ! implement a function called as createACounter, that will return an object. This object will have 3 methods. increment(), decrement(), and currentCount(). All these 3 methods will close over a local variable called count defined within createACounter
const createACounter = () => {
	let count = 0;
	return {
		increment: () => count++,
		decrement: () => count--,
		currentCount: () => count,
	};
};

const aCounter = createACounter();
aCounter.increment();
aCounter.increment();
aCounter.increment();
aCounter.decrement();
assert.strictEqual(aCounter.currentCount, 2);

/**
 * Apply the callback to each element of the array.
 */
function forEachElement<T>(arr: T[], callback: (item: T) => void): void {
	for (let i = 0; i < arr.length; i++) {
		const item = arr[i];
		if (item) {
			callback(item);
		}
	}
}

/*
## Higher Order functions

A function that takes one or more functions as its arguments and/or returns a function as its return value is known as a **Higher-Order function**.

Examples: `forEachElement`, `createGreeter`.

---

## Closure mechanism

A **closure** is the combination of a function bundled together with references to its surrounding state (the *lexical environment*).

Closures give inner functions access to outer scopes, and they are created every time a function is defined.

---
*/
