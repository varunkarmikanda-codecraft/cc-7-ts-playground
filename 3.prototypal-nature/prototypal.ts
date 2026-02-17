// * Object.prototype is the root of entire object heirarchy in JS, however we create the object.
// Various ways of creating objects
// 1. literal syntax

const empty = {}; // Automatically has linkage to Object.prototype
const empty1 = Object.create(Object.prototype); // Same as {}
Object.prototype.hi = 'Some stuff'; //* FIXME:  How to tell typescript that we can this field in protototype?

console.assert(empty.hi === 'Some stuff', "Empty should see the property via prototypal inheritance"); // Automating tests via assert

const st = 'This is crazy!';
console.assert(st.hi === 'Some stuff'); // In JS under the hood everything is an object and has connection ultimately to Object.prototype

const displayable = {
  display() {
    console.log('Displayable!');
  },
};

const num = 1;
console.assert(num.hi === 'Some stuff', "Even literal should get the prop from their prototype")

console.assert(Object.getPrototypeOf(displayable) === Object.prototype);
const aDisplayable = Object.create(displayable);
console.assert(Object.getPrototypeOf(aDisplayable) === displayable); // * -->displayable --> Object.prototype

// aDisplayable.hi = "HI"

console.assert(displayable.hi === 'Some stuff', "Any object created using literal syntax must get all the prop of the object")

console.assert(aDisplayable.hi === 'Some stuff', "aDisplayable")

// All functions are also objects, And each function has its prototype as
// Function.prototype
function doStuff() {}
console.assert(Object.getPrototypeOf(doStuff) === Function.prototype);

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

// doStuff.toString = () => 'DoS'
doStuff.toString = function(){
  return 'DDoS'
}
console.log(doStuff.toString())
console.log(console.assert)

// ! Exercise
// Extend String.prototype with a method  isPalindrome

String.prototype.isPalindrome = function(){
  
}

// ! Exercise Create an object called person. let it have name, id, and country as fields. Then create another object called citizen, that has this person object as its prototype. Let citizen additionally have fields: passportNumber, aadharNumber.
