import assert from "node:assert/strict";

// Assigning functions to variables
const greet = function (name: string): string {
	return `Hello, ${name}!`;
};
const greetAlias = greet;
const greetArrow = (name: string): string => `Hello, ${name}!`;

assert.strictEqual(greet("Alice"), "Hello, Alice!");
assert.strictEqual(greetAlias("Alice"), "Hello, Alice!");
assert.strictEqual(greetArrow("Go"), "Hello, Go!");

// Arrow functions can stay concise
const add1 = (a: number, b: number): number => a + b;
assert.strictEqual(add1(5, 3), 8);

/**
 * Apply the callback to each element of the array.
 */
function forEachElement<T>(arr: T[], callback: (item: T) => void): void {
	for (let i = 0; i < arr.length; i++) {
		callback(arr[i]);
	}
}

{
	const numbers = [1, 2, 3, 4, 5];
	const collected: number[] = [];
	const collectFunc = (num: number) => collected.push(num);
	assert.deepStrictEqual(collected, []);
	forEachElement(numbers, collectFunc);
	assert.deepStrictEqual(collected, [1, 2, 3, 4, 5]);
	forEachElement(collected, (item) => console.log(item));
}

// Returning functions from functions
function giveMeAFunction(str1: string): (nextStr: string) => string {
	return (str2: string): string => {
		return `${str1} : ${str2}`;
	};
}

const aFunc = giveMeAFunction("Hello");
assert.strictEqual(typeof aFunc, "function");
const finalStr = aFunc("World");
assert.strictEqual(finalStr, "Hello : World");

// Demonstrate closures that retain private state
function symbolFactory(symbol: string): () => void {
	let symbols = symbol;
	return () => {
		console.log(symbols);
		symbols = symbols + symbol;
	};
}

const displaySymbols = symbolFactory("😹");
const interval = setInterval(displaySymbols, 1000);
setTimeout(() => clearInterval(interval), 4100);

/*
## Functions are first class citizens in JS

In **JavaScript** and **TypeScript**, functions are *first-class citizens*. This means they can be treated like any other value.

You can:
1. Assign them to variables
2. Pass them as arguments to other functions
3. Return them from other functions

*/
