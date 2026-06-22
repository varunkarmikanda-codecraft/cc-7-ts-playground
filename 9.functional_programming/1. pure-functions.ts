import assert from "node:assert/strict";

// 1. Adds two numbers and returns the sum
function add(a: number, b: number): number {
	return a + b;
}

assert.strictEqual(add(3, 5), 8);
assert.strictEqual(add(-1, 1), 0);
assert.strictEqual(add(0, 0), 0);

// 2. Converts Celsius to Fahrenheit
function toFahrenheit(celsius: number): number {
	return (celsius * 9) / 5 + 32;
}

assert.strictEqual(toFahrenheit(0), 32);
assert.strictEqual(toFahrenheit(100), 212);
assert.strictEqual(toFahrenheit(-10), 14);
assert.strictEqual(toFahrenheit(-10), 14);

// 3. Trim extra spaces from both ends while preserving internal spacing
function trim(str: string): string {
	let trimmed = "";
	let canCopySpace = false;
	let collectedSpaces = "";
	for (let i = 0; i < str.length; i++) {
		if (str[i] === " ") {
			if (canCopySpace) {
				collectedSpaces += " ";
			}
		} else {
			if (collectedSpaces !== "") {
				trimmed += collectedSpaces;
				collectedSpaces = "";
			}
			trimmed += str[i];
			canCopySpace = true;
		}
	}
	return trimmed;
}

assert.strictEqual(trim("    I love India   "), "I love India");
assert.strictEqual(
	trim("Programming is    understanding   "),
	"Programming is    understanding",
);
assert.strictEqual(
	trim("Programming is    understanding   "),
	"Programming is    understanding",
);
assert.strictEqual(
	trim("Programming is    understanding   "),
	"Programming is    understanding",
);
assert.strictEqual(trim(""), "");

// Function that adds an entry to an object if it is not there already
function addEntry(
	object: Record<string, string>,
	key: string,
	value: string,
): Record<string, string> {
	const copy = { ...object }; // shallow copy
	if (!(key in copy)) {
		copy[key] = value;
	}
	return copy;
}

const obj1 = { a: "apple", b: "banana" };
const result1 = addEntry(obj1, "c", "cherry");
assert.deepStrictEqual(result1, { a: "apple", b: "banana", c: "cherry" });
assert.deepStrictEqual(obj1, { a: "apple", b: "banana" });

const result2 = addEntry(obj1, "a", "apricot");
assert.deepStrictEqual(result2, { a: "apple", b: "banana" });

assert.deepStrictEqual(obj1, { a: "apple", b: "banana" });

const result3 = addEntry({}, "x", "x-ray");
assert.deepStrictEqual(result3, { x: "x-ray" });

/**  
## Pure Functions

All the above are **Pure functions**. They solely depend on the *arguments* to compute the return value.

### Key things they avoid
- No reading or modifying global variables
- No printing to console
- No mutating input arguments
- No network calls, file I/O, or random number generation
- No exceptions thrown

🚀 Pure functions have no side effects and are easy to test.

---
*/
