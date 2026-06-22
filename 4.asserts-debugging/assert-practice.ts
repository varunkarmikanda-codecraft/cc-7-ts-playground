import assert from 'assert';
/**
 * assert will throw an exception if the invariant (boolean expression) fails. Otherwise, it does not do anything.
 * @param invariant boolean expression
 * @param message string that explains what is being checked for
 */
// function assert(invariant: boolean, message: string): void {
//   if (invariant === false) {
//     throw new Error(`assertion: ${message} failed`);
//   }
// }

function assertEqual(actual: number[], expected: number[], message: string) {
  if (actual.length !== expected.length) {
    throw new Error(`assertion: ${message} failed`);
  }

  for (let i = 0; i < actual.length; i++) {
    if (actual[i] !== expected[i]) {
      throw new Error(`assertion: ${message} failed`);
    }
  }
}

/**
 * Function that checks if the given string is palindrome or not
 * @param str The string to check
 * @returns true if the string is palindrome, false otherwise
 */
const isPalindrome = (str: string): boolean => {
  // const chars = str.split('').reverse().join('');
  // if (chars === str) {
  //   return true;
  // } else {
  //   return false;
  // }
  // We need to compare i th char with that of n-i + 1 th char
  // in the string, until we scan half of the string. if any comparison fails, we return false as it is not a palindrome, otherwise it is a palindrome.
  const length = str.length;
  for (let i = 0; i < length; i++) {
    if (str[i] !== str[length - i - 1]) {
      return false;
    }
  }
  return true;
};

let str = '';
// console.log(str, isPalindrome(str));
// console.assert(str)
str = 'h';
//console.log(str, isPalindrome(str));
assert(isPalindrome(str) === true, 'A single char is a palindrome');
str = 'hi';
//console.log(str, isPalindrome(str));
assert(isPalindrome(str) === false, 'hi is not a palindrome');

str = '    ';
//console.log(str, isPalindrome(str));
assert(isPalindrome(str) === true, 'A string with just spaces is a palindrome');

str = 'abcd';
// console.log(str, isPalindrome(str));
assert(isPalindrome(str) === false, 'abcd is not a palindrome');

str = 'aaaaaaaaaaa';
//console.log(str, isPalindrome(str));
assert(isPalindrome(str) === true, 'aaaaaaaaaaa is a palindrome');

str = 'racecar';
//console.log(str, isPalindrome(str));
assert(isPalindrome(str) === true, 'racecar is  a palindrome');

str = 'gadag';
// console.log(str, isPalindrome(str));
assert(isPalindrome(str) === true, 'gadag is  a palindrome');

str = '11211';
// console.log(str, isPalindrome(str));
assert(isPalindrome(str) === true, '11211 is a palindrome');

str = 'madam';
//console.log(str, isPalindrome(str));
assert(isPalindrome(str) === true, 'madam is  a palindrome');

// Relying on I/O for testing functions is not going to scale.

/**
 * Filters odd numbers in a given array of numbers
 *
 */
const filterOdd = (numbers: number[]): number[] => {
  assert(Array.isArray(numbers), 'Array was expected, but got object!'); // Pre conditions.

  //return [];
  const oddNums = [];
  for (let num of numbers) {
    if (num % 2 === 1) {
      oddNums.push(num);
    }
  }
  return oddNums;
};

let oddTestNumbers: number[] = []; //?  pass by value or pass by reference?
// assert(
//   filterOdd(numbers) === [],
//   'Filtering empty array must return an empty array',
// );
assertEqual(
  filterOdd(oddTestNumbers),
  [],
  'Filtering empty array must return an empty array',
);

oddTestNumbers = [1, 2, 3, 4, 5];

// assert(
//   filterOdd(numbers) === [1, 3, 5],
//   'Filtering empty array must return an empty array',
// );

assert.deepStrictEqual(
  filterOdd(oddTestNumbers),
  [1, 3, 5],
  'Filtering [1, 2, 3, 4, 5] must return [1, 3, 5]',
);

filterOdd({} as unknown as []);
