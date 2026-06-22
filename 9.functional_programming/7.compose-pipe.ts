import assert from "assert";
// We can create higher order functions from existing functions.
// we have already seen point free style using currying and partial application.
// Currying helped us to create sequence of functions and thereby enabled partial applications to create
// point free functions.

// Let us consider the following functions

const increment = (num: number) => num + 1;
const double = (num: number) => num * 2;
const square = (num: number) => num * num;
const strLength = (str: string) => str.length;

// How do we now right a function that doubles a given number and then increments using the above functions?
const doubleAndIncAndSquare = (num: number) => {
	const doubled = double(num);
	const incremented = increment(doubled);
	const squared = square(incremented);
	return squared;
};

// This piping is not commutative
const strLengthDouble = (str: string): number => {
	return double(strLength(str));
};

assert.equal(doubleAndIncAndSquare(10), 441);

type NumFunc = (num: number) => number;

const pipe3 = (fun1: NumFunc, fun2: NumFunc, fun3: NumFunc): NumFunc => {
	return (x: number) => fun3(fun2(fun1(x)));
};

const doubleAndIncAndSquare1 = pipe3(double, increment, square);

assert.equal(doubleAndIncAndSquare1(10), 441);

// pipe function can potentially take any number of functions
// and return a piped function. All functions must take single arg of type T and return a value of type T itself.
type FuncT<T> = (arg: T) => T;
type Pipe<T> = (...fns: FuncT<T>[]) => FuncT<T>;

const pipe = <T>(...fns: FuncT<T>[]): FuncT<T> => {
	return (x: T) => {
		return fns.reduce((accumulated, current) => current(accumulated), x);
	};
};

const doubleAndSquare = pipe(double, square);
assert.equal(doubleAndSquare(10), 400);

// there is another HOF called as compose, which is just the reverse of what pipe does.
const compose = <T>(...fns: FuncT<T>[]): FuncT<T> => {
	const reversedFns = fns.toReversed();
	return (x: T) => {
		return reversedFns.reduce(
			(accumulated, current) => current(accumulated),
			x,
		);
	};
};
const doubleAndSquareUsingCompose = compose(square, double);
console.log(doubleAndSquareUsingCompose(10));
assert.equal(doubleAndSquareUsingCompose(10), 400);

// trim right
const trimRight = (str: string) => str.trimEnd();
const trimLeft = (str: string) => str.trimStart();
const toLower = (str: string) => str.toLowerCase();
const catEmojee = (str: string, emojee: string) => str + "😿";
const emojeeCurried = (emojee: string) => (str: string) => str + emojee;

const catEmojee1 = emojeeCurried("😹😹😹😹😹");

const trimRTrimLCatEmojeePipe = pipe(trimRight, trimLeft, toLower, catEmojee1);

const tap = (message: string) => (str: string) => {
	console.log(message, ":", str);
	return str;
};
const trimRTrimLCatEmojeeCompose = compose(
	tap("after emojee"), // prints the final string
	catEmojee1,
	tap("after to lower"), // prints lower
	toLower,
	tap("after trim left: "), // prints left and right trimmed
	trimLeft,
	tap("after trim right"), // prints right trimmed
	trimRight,
);

assert.equal(
	trimRTrimLCatEmojeePipe("  Welcome to the wonderland of cats   "),
	"welcome to the wonderland of cats😹😹😹😹😹",
);

assert.equal(
	trimRTrimLCatEmojeeCompose("  Welcome to the wonderland of cats   "),
	"welcome to the wonderland of cats😹😹😹😹😹",
);

// Need a function evenSquares, that will transform a given
// array of nums to squared array, and then filter out even numbers.

const mapFn = <T>(transform: (value: T) => T): ((array: T[]) => T[]) => {
	return (array: T[]) => {
		return array.map(transform);
	};
};

const filterFn = <T>(
	predicate: (value: T) => boolean,
): ((array: T[]) => T[]) => {
	return (array: T[]) => {
		return array.filter(predicate);
	};
};

// Our goal is to have a tap operator which should help us supply
// a custom message and also a side effect
const tap1 =
	<T>(message: string) =>
	(sideEffect: (arg?: T) => void) =>
	(arg: T) => {
		console.log(message);
		sideEffect(arg);
		return arg;
	};

const squareAndFilterEvens = pipe<number[]>(
	mapFn((num) => num * num),
	tap1<number[]>("❤️")((arg) => console.log("✅", arg)),
	filterFn((item) => item % 2 === 0),
	tap1<number[]>("❤️")(() => console.log("✅")),
);

assert.deepStrictEqual(squareAndFilterEvens([1, 2, 3, 4, 5]), [4, 16]);
