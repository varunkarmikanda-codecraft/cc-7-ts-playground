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

// Declare a result array 
// Loop through input array
// transform each input into some pother output, and add the transformed value to result
// return result


const ourMap = <T, U>(items: T[], transform: (num: T) => U): U[] => {
  const result: U[] = [];
  for (let i = 0; i < items.length; i++) {
    const num = items[i];
    if (num !== undefined) {
      result.push(transform(num));
    }
  }
  return result;
}

const squares = ourMap([1, 2, 3, 4, 5], num => num * num);	// Declarative style(Basically no implementation details)

const caps = ourMap(["apple", "banana", "cherry"], (word: string) => word.charAt(0).toUpperCase() + word.slice(1))


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