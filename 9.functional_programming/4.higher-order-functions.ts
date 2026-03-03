import assert from "node:assert/strict";

/**
 * createMultiplier returns a function configured with a specific multiplier.
 */
function createMultiplier(multiplier: number): (num: number) => number {
	return function (num: number): number {
		return num * multiplier;
	};
}

// The mechanism with which a function remembers all the vars in its lexical scope is called as clodure

const multiplyByTwo = createMultiplier(2);
const multiplyByTen = createMultiplier(10);
assert.strictEqual(multiplyByTwo(5), 10);
assert.strictEqual(multiplyByTen(5), 50);
const multiplyBy15 = createMultiplier(15);
assert.strictEqual(multiplyBy15(10), 150);
assert.strictEqual(createMultiplier(20)(5), 100)

// ! Create a function that returns a function and that return another function
function add(a: number): (b: number) => (c: number) => (d: number, e: number) => number {
	return (b: number) => {
		return (c: number) => {
			return(d, e) => {
				return a + b + c + d + e;
			}
		}
	}
}

// ? Create a function that takes 2 arguments and return function tha takes 3 arguments and returns a function that does not take any arguments but returns a number. Let all args be number 

// type ReturnTypeOfSpecial = (c: number, d: number, e: number) => () => number;

const fun = (a: number, b: number) => (c: number, d: number, e: number) => (): number => {
	return 1;
}


// ? Create a function foo, that takes another function as its argument. And this argument function receives a number, and an array of numbers and returns a number. foo should return a number

const foo = (func: (num: number, array: number[]) => number): number => {
	return 1;
}

/**
 * createGreeter builds a customized greeter function.
 */
function createGreeter(greeting: string): (name: string) => string {
	return function (name: string): string {
		return `${greeting}, ${name}!`;
	};
}

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

// ! implement a function called createACounter, that will return a object. This will have 3 methods increment(), decrement() and currentCount(). All these 3 methods will close over a local variable called count defined within createACounter

const createACounter = () => {
	let count = 0;
	return {
		increment: () => count++,
		decrement: () => count--,
		currentCount: () => count
	}
}

const counter = createACounter();

counter.increment();
console.log(counter.currentCount())
counter.decrement();
counter.decrement();
console.log(counter.currentCount())
assert.strictEqual

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
