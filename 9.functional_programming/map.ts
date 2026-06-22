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

const ourMap = <T, U>(
	items: T[],
	transform: (item: T, index: number, arr: T[]) => U,
): U[] => {
	const result: U[] = [];
	for (let i = 0; i < items.length; i++) {
		const num = items[i];
		if (num !== undefined) {
			result.push(transform(num, i, items));
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

const nums = [1, 2, 3, 4, 5];

const squares1 = nums.map((num) => num * num);

assert.deepStrictEqual(squares1, [1, 4, 9, 16, 25]);

const strings = [
	"CraftCode is a nice company",
	"We love CraftCode",
	"We are working in CraftCode",
	"Where is CraftCode?",
];

//We want to transform the above array such that in each item, we re arrange ‘CraftCode’ with ‘CodeCraft’.
//Transformed:  ["CodeCraft is a nice company", "We love CodeCraft”, “We are working in CodeCraft”, “Where is CraftCode?”]

const correctedStrings = strings.map((str) =>
	str.replaceAll("CraftCode", "CodeCraft"),
);
assert.deepStrictEqual(correctedStrings, [
	"CodeCraft is a nice company",
	"We love CodeCraft",
	"We are working in CodeCraft",
	"Where is CodeCraft?",
]);

const purchases = `items qty
apple 24
mango 50
guava 42
onion 31
water 10`;

const lines = purchases.split("\n");
console.log(lines);

// Get the lines that do not have 4 in them
const linesWithout4 = lines.filter((line) => !line.includes("4"));
console.log(linesWithout4);

// Add 10 to quantity:
// will require map. The transformation should split each string into the item and quantity parts.
// then convert  quantity part into a number, add 10 to it. Now the transformed string will the item part appended with the modified quantity.
const transformedLines = lines
	.filter((line) => !line.includes("4"))
	.map((line, index) => {
		// 'items qty' needs to be intact, no transformation for it. It is at index 0
		if (index === 0) {
			return line;
		}
		// Each line needs to be split into item and number
		const [item, quantity] = line.split(" ");

		// Convert quantity to a number and then add 10.
		let numQuantity = Number(quantity);
		if (!isNaN(numQuantity)) {
			numQuantity += 10;
		}
		return `${item} ${numQuantity}`;
	});

console.log(transformedLines);
