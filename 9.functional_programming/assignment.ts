import assert from "node:assert";

const num = [1, 2, 3, 4, 5];

const square = num.map((num) => num * num);

console.log(num);
console.log(square);
assert.deepStrictEqual(square, [1, 4, 9, 16, 25]);

// ? We want to transform the above array such that in each item, we re arrange ‘CraftCode’ with ‘CodeCraft’.

const strings = [
	"CraftCode is a nice company",
	"We love CraftCode",
	"We are working in CraftCode",
	"Where is CraftCode?",
];

const fixedStrings = strings.map((str) =>
	str.replaceAll("CraftCode", "CodeCraft"),
);
console.log(fixedStrings);

assert.deepStrictEqual(fixedStrings, [
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
console.log(purchases);

const purchaseArray = purchases.split("\n");
console.log(purchaseArray);

const res = purchaseArray.filter((item) => !item.includes("4"));
console.log(res);

const transformedLine = res.map((line, index) => {
	if (index === 0) return line;

	const [item, quantity] = line.split(" ");

	let numQuantity = Number(quantity);

	if (!isNaN(numQuantity)) numQuantity += 10;

	return `${item} ${numQuantity}`;
});

const transformed = transformedLine.join("\n");
console.log(transformed);

// * 4

const items = ["browl", "faaast", "energy", "stand", "eat", "lunch"];

const filterItems = items.filter(
	(item) => !(item.includes("g") || item.includes("u")),
);

console.log(filterItems);

// * 5

let itemsList = [
	"mangalore",
	"semangin",
	"2 lonely",
	"verify",
	"rectify",
	"mangala",
	"notifyy",
];

const filteredItems = itemsList.filter(
	(item) => item.startsWith("mang") || item.endsWith("fy"),
);
console.log(filteredItems);

// const itemsRegx = /^mang\w$fy/i
// const filteredItemsRegx = itemsList.filter(item => itemsRegx.test(item))
// console.log(filteredItemsRegx)

// * 6
const numbers = [34, 45, 2, 53, 84, 542, 31, 23];

const addAndDivBy4 = numbers
	.map((num) => num + 10)
	.filter((num) => num % 4 === 0);

console.log(addAndDivBy4);

// * 7
const fibArray = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
const nums = [2, 1, 5, 7];

const fibonacci = nums.map((num) => fibArray[num]);
console.log(fibonacci);

const fib = (num: number): number => {
	if (num < 2) return num;
	return fib(num - 1) + fib(num - 2);
};

const fibonacciOfNums = nums.map((num) => fib(num));

console.log(fibonacciOfNums);

// * 8
const emails = [
	"34",
	"brighten street",
	"BS@sft.com",
	"Behind hotel paragon",
	"rode street",
	"micHel@sun.it",
	"ulef court",
	"cown street",
	"cown@street",
	"CodeCraft",
];

const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]/gi;

const filteredEmails = emails.filter((email) => email.match(emailRegex));

console.log(filteredEmails);

// * 9

const people = [
	{
		name: "John",
		age: 13,
	},
	{
		name: "Mark",
		age: 56,
	},
	{
		name: "Rachel",
		age: 45,
	},
	{
		name: "Nate",
		age: 67,
	},
	{
		name: "Jeniffer",
		age: 65,
	},
];

const getAges = people.map((people) => people.age);
console.log(getAges);

// * 10

const foods = [
	{
		idli: ["rice", "urad", "oil", "cashew", "water"],
	},
	{
		chapathi: ["atta", "gluten", "water", "oil", "sugar"],
	},
	{
		pizza: ["maida", "sugar", "oil", "chiili", "flakes", "sause"],
	},
	{
		"paneer masala": ["paneer", "onion", "tomato", "garlic", "oil"],
	},
];



// * 11

const numArray = [1, 2, 43, 67, 321, 99, 77, 9];
const getSecondlargest = (numArray: number[]): number => {
  let largest = Number.MIN_VALUE;
  let secondLargest = Number.MIN_VALUE;

  numArray.forEach((num) => {
    if(num > largest){
      secondLargest = largest;
      largest = num;
    } else if(num > secondLargest && num !== largest) {
      secondLargest = num;
    }
  })

  return secondLargest;
}

const initialValue = 0;
const secondLargestNum = numArray.reduce((accumulator, current) => {
  if(current > accumulator.largest){

  }
}, initialValue)

console.log(getSecondlargest(numArray))


// * 12

