// Accumulating values (reduce/fold)
function imperativeSum(array: number[]): number {
  const initial = 0;
  let accumulated = initial;
  for (let i = 0; i < array.length; i++) {
    accumulated = accumulated + array[i];
  }
  return accumulated;
}

// Function that returns an object, where each key is a value is the length of the word in given array of words
const arrayOfWords = ["one", "two", "three", "four", "five"];
/* 
{ 
  "one": 3,
  "two": 3,
  "three": 5,
  "four": 4,
  "five": 4,
}
*/

const freqTable = (words: string[], initialValue: {}): Record<string, number>  => {
  let accumulated = initialValue;
  for(let i=0;i<words.length;i++){
    const word = words[i];
    if(word && word !== undefined){
      accumulated[word] = word.length
    }
  }
  return accumulated;
}

const freqTable2 = (words: string[], initialValue: Record<string, number>  = {} ): Record<string, number>=> {
  let accumulated = initialValue;
  for(let i=0;i<words.length;i++){
    const word = words[i];
    if(word && word !== undefined){
      accumulated[word] = word.length
    }
  }
  return accumulated;
}

const freqTableX = reduce(["one", "two", "three", "four"], (accumulated: Record<string, number>, current: string) => {
  accumulated[current] = current.length;
  return accumulated
}, {})

const freqTableY = freqTable2(["one", "two", "three", "four"], {} as Record<string, number>)
// console.log("freqY: " + freqTableY)
console.log(`freqY: ${JSON.stringify(freqTableY)}`);


// console.log(freqTableX)

const ft = freqTable(arrayOfWords, {})
console.log(ft)

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
