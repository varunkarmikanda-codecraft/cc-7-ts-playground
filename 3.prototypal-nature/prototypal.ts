// * Object.prototype is the root of entire object heirarchy in JS, however we create the object.
// Various ways of creating objects
// 1. literal syntax

const empty = {}; // Automatically has linkage to Object.prototype
const empty1 = Object.create(Object.prototype); // Same as {}
Object.prototype.hi = 'Some stuff1'; //* FIXME:  How to tell typescript that we can use this field in protototype?

console.assert(
  empty.hi === 'Some stuff1',
  'Empty should see the hi property via prototypal inheritence',
); // Automating tests via assert

const st = 'This is crazy!';
console.assert(st.hi === 'Some stuff1'); // In JS under the hood everything is an object and has connection ultimately to Object.prototype
const num = 1;
console.assert(
  num.hi === 'Some stuff1',
  'Even literals should get the prop from their prototype',
);

const displayable = {
  display() {
    console.log('Displayable!');
  },
};

console.assert(Object.getPrototypeOf(displayable) === Object.prototype);
const aDisplayable = Object.create(displayable);
displayable.hi = 'Displayable Hi';
console.assert(Object.getPrototypeOf(aDisplayable) === displayable); // * -->displayable --> Object.prototype

console.assert(
  displayable.hi === 'Displayable Hi',
  'any object created using literal syntax must get all props of Object.prototype',
);

console.assert(
  aDisplayable.hi === 'Displayable Hi',
  'any object created using literal syntax must get all props of Object.prototype',
);

// All functions are also objects, And each function has its prototype as
// Function.prototype -> Object.prototype
function doStuff() {}
doStuff.toString = function () {
  return 'doStuff';
};
console.log(doStuff.toString()); // doStuff.toString()
console.assert(Object.getPrototypeOf(doStuff) === Function.prototype);
console.assert(doStuff.hi === 'Some stuff1');
Function.prototype;
// adding fields to Function.prototype will end up adding fields to all functions out there.
interface Function {
  scream: string;
}
Function.prototype.scream = 'screaming';
console.assert(doStuff.scream === 'screaming');

// Similary Arrays, have Array.prototype
Array.prototype.getLength = function () {
  return this.length;
};

const nums = [1, 2, 3];
console.assert(nums.getLength() === 3);

// ! Exercise
// Extend String.prototype with a method  isPalindrome

// ! Exercise Create an object called person. let it have name, id, and country as fields. Then create another object called citizen, that has this person object as its prototype. Let citizen additionally have fields: passportNumber, aadharNumber.
