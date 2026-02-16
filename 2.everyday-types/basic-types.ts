// * Basic types
let example1: string = 'Hello World!';
let example2: number = 42;
let example3: boolean = true;
let example4: symbol = Symbol(); // Unique value
let example5: bigint = 123n; // Very large numbers
let example6: null = null;
let example7: undefined = undefined;

// * Type inference
// Not always we need to supply type. Many times TS can infer the type.
let dob = '31 Aug 2020';
dob = 20; // TS fixes the inferred type earlier. Only string is allowed for dob

let isReleased = true;
let trackCount = 13;

// Function parameters always need annotation
function add(a, b) {
  //* hover to see what typescript is inferring
  return a + b;
}

// It is a good practice to mention type of return value as well.
// This will guide implementation to return correct value.
function addP(a: number, b: number): number {
  return a + b;
}

// `any` type basically downgrades the type checking and takes us back to js
// ! using `any` is therefore discouraged.
function addDownGraded(a: string, b: string): string {
  return a.split(b); // ! we can do whatever we want here!
}

// * Exercise 1:
// Fix the error, and ensure it returns value of proper type
function subtract(a: number, b: number): number {
  return a - b;
}

// * Exercise 2:
export let example11: string = 'Hello World!';
export let example22: number = 42;
export let example33: boolean = true;
export let example44: symbol = Symbol();
export let example55: bigint = 123n;
