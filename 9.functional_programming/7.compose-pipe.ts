// We can create higher order functions from existing functions.
// we have already seen point free style using currying and partial application.
// Currying helped us to create sequence of functions and thereby enabled partial applications to create
// point free functions.

import assert from "node:assert";

// Let us consider the following functions

const increment = (num: number) => num + 1;
const double = (num: number) => num * 2;
const square = (num: number) => num ** 2;

// How do we now right a function that doubles a given number and then increments using the above functions?
const doubleIncAndSquare = (num: number) => {
	const doubled = double(num);
	const incremented = increment(doubled);
	const squared = square(incremented);
	return squared;
};

assert.equal(doubleIncAndSquare(10), 441);

type NumFunc = (num: number) => number;

const pipex = (func1: NumFunc, func2: NumFunc, func3: NumFunc): NumFunc => {
	return (x: number) => func3(func2(func1(x)));
};

const doubleIncAndSquarePipe = pipex(double, increment, square);
assert.equal(doubleIncAndSquarePipe(10), 441);

const strLen = (str: string) => str.length;

type StrFunc = (str: string) => number;

const pipe2 = (func1: StrFunc, func2: NumFunc, func3: NumFunc): StrFunc => {
	return (x: string) => func3(func2(func1(x)));
};

const doubleIncStrLen = pipe2(strLen, double, increment);
assert.equal(doubleIncStrLen("varun"), 11);

// * Pipe function can potentially take any number os functions and return a piped function. All function must take a single arg of type T and return a value of te type T
type FuncT<T> = (arg: T) => T;
type Pipe<T> = (...fns: FuncT<T>[]) => FuncT<T>;

const pipeX = <T>(...fns: FuncT<T>[]): FuncT<T> => {
	return (x: T) => {
		return fns.reduce((accumulated, current) => current(accumulated), x);
	};
};

const doubleAndSquarePipe = pipeX(double, square);
assert.equal(doubleAndSquarePipe(10), 400);

const composeX = <T>(...fns: FuncT<T>[]): FuncT<T> => {
	const reversedFuncs = fns.toReversed();
	return (x: T) => {
		return reversedFuncs.reduce(
			(accumulated, current) => current(accumulated),
			x,
		);
	};
};

const doubleAndSquareCompose = composeX(double, square);
assert.equal(doubleAndSquareCompose(20), 800);

const trimFromStart = (str: string) => str.trimStart();
const trimFromEnd = (str: string) => str.trimEnd();
const convertToLowerCase = (str: string) => str.toLowerCase();
const appendCatEmoji = (str: string) => str + "😼";
const appendCatEmojiCurried = (emoji: string) => (str: string) => str + emoji;

const catEmoji = appendCatEmojiCurried("😼😼😼😼😼");

const tap =
	(message: string) =>
	(str: string): string => {
		const value = `${str}`;
		console.log(`${message}: ${value}`);
		return value;
	};

type Func<T> = (arg: T) => T;

const pipe =
	<T>(...fx: Func<T>[]): Func<T> =>
	(x: T) =>
		fx.reduce((accumulation, current) => current(accumulation), x);

const compose =
	<T>(...fx: Func<T>[]): Func<T> =>
	(x: T) =>
		fx.toReversed().reduce((accumulator, current) => current(accumulator), x);

const stringOperationCompose = compose(
	catEmoji,
	convertToLowerCase,
	trimFromEnd,
	trimFromStart,
);
assert.equal(stringOperationCompose("   varun   "), "varun😼😼😼😼😼");

const stringOperationPipe = pipe(
	trimFromStart,
	trimFromEnd,
	convertToLowerCase,
	catEmoji,
);
assert.equal(stringOperationPipe("   varun   "), "varun😼😼😼😼😼");

// const stringOperationPipeX = pipe(
// 	tap("initial value"),
// 	trimFromStart,
// 	tap("after trim start"),
// 	trimFromEnd,
// 	tap("after trim end"),
// 	convertToLowerCase,
// 	tap("after lower case"),
// 	catEmoji,
// 	tap("after appending emoji"),
// );
// assert.equal(stringOperationPipeX("   VaRun   "), "varun😼😼😼😼😼");

// const stringOperationComposeX = compose(tap, catEmoji, tap, convertToLowerCase, tap, trimFromEnd, tap, trimFromStart, tap);
// assert.equal(stringOperationComposeX("   Cats ?? !   "), "cats ?? !😼😼😼😼😼")

// Need a function that will transform a given array of numbers to squared array and filter out th even numbers

const transformToSquare = (nums: number[]) => nums.map((num) => num ** 2);

const filterEven = (nums: number[]) => nums.filter((num) => num % 2 === 0);

const evenSquares = pipe(transformToSquare, filterEven);
assert.deepStrictEqual(evenSquares([1, 2, 3, 4]), [4, 16]);

const mapFn =
	<T>(transform: (value: T) => T) =>
	(array: T[]) =>
		array.map(transform);

const filterFn =	
	<T>(predicate: (value: T) => boolean) =>
	(array: T[]) =>
		array.filter(predicate);

// Our goal is to have a tap operator which should help us supply a custom message and also a side effect

const tapY = <T>(message: string) => (sideEffect: (arg?: T) => void) => (arg: T) => {
	console.log(message);
	sideEffect(arg);
	return arg;
};

const pipedSquareAndEven = pipe<number[]>(
	mapFn((num: number) => num * num),
	tapY<number[]>("😼")(() => console.log("🦈👟")),
	filterFn((num: number) => num % 2 === 0),
);

assert.deepStrictEqual(pipedSquareAndEven([1, 2, 3, 4]), [4, 16]);

















// Wes bos
// lee

