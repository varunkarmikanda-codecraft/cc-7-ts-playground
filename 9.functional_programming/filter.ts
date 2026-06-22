import assert from "node:assert/strict";

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
