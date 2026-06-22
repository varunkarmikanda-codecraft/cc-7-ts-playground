import assert from "node:assert/strict";

// Transforming arrays imperatively
function computeSquaresImperative(numbers: number[]): number[] {
	const squares: number[] = [];
	for (let i = 0; i < numbers.length; i++) {
		const num = numbers[i];
		if (num !== undefined) {
			squares.push(num * num);
		}
	}
	return squares;
}

let nums1 = [1, 2, 3, 4, 5];
const squaredNumsImperative = computeSquaresImperative(nums1);
console.log("Squared numbers (Imperative):", squaredNumsImperative);

function capitalizeStringsImperative(words: string[]): string[] {
	const capitalizedWords: string[] = [];
	for (let i = 0; i < words.length; i++) {
		const word = words[i];
		if (word?.length) {
			capitalizedWords.push(word.charAt(0).toUpperCase() + word.slice(1));
		}
	}
	return capitalizedWords;
}

const words = ["apple", "banana", "cherry"];
const capitalizedWordsImperative = capitalizeStringsImperative(words);
console.log("Capitalized words (Imperative):", capitalizedWordsImperative);

// declare a result array
// loop through input array
// transform each input into some other out, and add that transformed value to result
// return result

const ourMap = <T, U>(items: T[], transform: (item: T) => U): U[] => {
	const result: U[] = [];
	for (let i = 0; i < items.length; i++) {
		const num = items[i];
		if (num !== undefined) {
			result.push(transform(num));
		}
	}
	return result;
};

// squaring the numbers
const squares = ourMap([1, 2, 3, 4, 5], (num) => num * num); // Declarative style
const capitalisedStrs = ourMap(
	words,
	(word: string) => word.charAt(0).toUpperCase() + word.slice(1),
);

// Declarative map implementation and usage
function map<T, U>(array: T[], transform: (item: T) => U): U[] {
	const result: U[] = [];
	for (const item of array) {
		result.push(transform(item));
	}
	return result;
}

let nums2 = [1, 2, 3, 4];
let squared = map(nums2, (num) => num * num);
assert.deepStrictEqual(squared, [1, 4, 9, 16]);

let capitalised = map(
	words,
	(word: string) => word.charAt(0).toUpperCase() + word.slice(1),
);
console.log("Capitalized words (Declarative map):", capitalised);

squared = nums2.map((num) => num * num);
assert.deepStrictEqual(squared, [1, 4, 9, 16]);

// Filtering values imperatively vs declaratively
function filterEvenImperative(numbers: number[]): number[] {
	const evens: number[] = [];
	for (let i = 0; i < numbers.length; i++) {
		if (numbers[i]! % 2 === 0) {
			evens.push(numbers[i]!);
		}
	}
	return evens;
}

const numbersToFilter = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbersImperative = filterEvenImperative(numbersToFilter);
assert.deepStrictEqual(evenNumbersImperative, [2, 4, 6, 8, 10]);

function filterLongStringsImperative(
	wordsToFilter: string[],
	minLength: number,
): string[] {
	const longWords: string[] = [];
	for (let i = 0; i < wordsToFilter.length; i++) {
		if (wordsToFilter[i].length > minLength) {
			longWords.push(wordsToFilter[i]);
		}
	}
	return longWords;
}

const wordsToFilter = ["apple", "banana", "cat", "dog", "elephant"];
const filteredWords = filterLongStringsImperative(wordsToFilter, 4);
assert.deepStrictEqual(filteredWords, ["apple", "banana", "elephant"]);

function filter<T>(array: T[], predicate: (item: T) => boolean): T[] {
	const result: T[] = [];
	for (let index = 0; index < array.length; index++) {
		if (predicate(array[index]!)) {
			result.push(array[index]!);
		}
	}
	return result;
}

let evens = filter(numbersToFilter, (num) => num % 2 === 0);
assert.deepStrictEqual(evens, [2, 4, 6, 8, 10]);

evens = numbersToFilter.filter((num) => num % 2 === 0);
assert.deepStrictEqual(evens, [2, 4, 6, 8, 10]);

// filter all numbs that are divisible by 3
//const divisibleBy3 = filter([3, 4, 6, 15, 21, 23, 27]);

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

function sumOfSquaresOfEvensImperative(arr: number[]): number {
	let sumOfSquares = 0;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i] % 2 === 0) {
			sumOfSquares += arr[i] * arr[i];
		}
	}
	return sumOfSquares;
}

{
	const numbers = [1, 2, 3, 4, 5, 6];
	assert.strictEqual(sumOfSquaresOfEvensImperative(numbers), 56);

	const sumDeclarative = numbers
		.filter((num) => num % 2 === 0)
		.map((item) => item * item)
		.reduce((accumulated, current) => accumulated + current, 0);

	assert.strictEqual(sumDeclarative, 56);
}

function mapUsingReduce<T, U>(array: T[], transform: (item: T) => U): U[] {
	return array.reduce((accumulated: U[], current) => {
		accumulated.push(transform(current));
		return accumulated;
	}, [] as U[]);
}

const capitals = ["Delhi", "Bangalore", "Panaji", "Chennai"];
assert.deepStrictEqual(
	mapUsingReduce(capitals, (str) => str.toUpperCase()),
	["DELHI", "BANGALORE", "PANAJI", "CHENNAI"],
);
