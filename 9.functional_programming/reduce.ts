import assert from "node:assert/strict";

// Accumulating values (reduce/fold)
function imperativeSum(array: number[]): number {
	const initial = 0;
	let accumulated = initial;
	for (let i = 0; i < array.length; i++) {
		accumulated = accumulated + array[i];
	}
	return accumulated;
}

const sum = imperativeSum([1, 2, 3, 4]);
assert.strictEqual(sum, 10);

function imperativeConcat(array: string[]): string {
	const initialValue = "";
	let accumulated = initialValue;
	for (let i = 0; i < array.length; i++) {
		accumulated = accumulated + array[i];
	}
	return accumulated;
}

// Function that returns an object, where each key is the word and value is the length of word
// in a given array words
const arrayOfWords = ["one", "two", "three", "four", "five"];
// {'one':3, "two":3, "three":5, "four":4, "five":5}

function freqTable(
	words: string[],
	initialValue: Record<string, number>,
): Record<string, number> {
	let accumulated = initialValue;
	for (let i = 0; i < words.length; i++) {
		//accumulated = accumulated + words[i]!;
		const word = words[i];
		if (word) {
			accumulated[word] = word.length;
		}
	}
	return accumulated;
}

const ft = freqTable(arrayOfWords, {});

const concated = imperativeConcat(["a", "b", "c"]);
assert.strictEqual(concated, "abc");

function reduce<T, U>(
	array: T[],
	reducer: (accumulated: U, current: T) => U,
	initial: U,
): U {
	let accumulated = initial;
	for (let i = 0; i < array.length; i++) {
		accumulated = reducer(accumulated, array[i]);
	}
	return accumulated;
}

let sumUsingReduce = reduce(
	[1, 2, 3, 4, 5],
	(accumulated, current) => accumulated + current,
	0,
);
assert.strictEqual(sumUsingReduce, 15);

sumUsingReduce = [1, 2, 3, 4, 5].reduce(
	(accumulated, current) => accumulated + current,
	0,
);
assert.strictEqual(sumUsingReduce, 15);

const freqTable1 = reduce<string, Record<string, number>>(
	["one", "two", "three"],
	(accumulated: Record<string, number>, current: string) => {
		accumulated[current] = current.length;
		return accumulated;
	},
	{},
);

console.log(freqTable1);
