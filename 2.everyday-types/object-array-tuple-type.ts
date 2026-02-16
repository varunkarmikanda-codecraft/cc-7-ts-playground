// * Object literal types
// We can create an object using literal syntax
const lion = {
  //? Exercise - what happens when you hover over lion?
  name: 'Lion',
  livesInLand: true,
  isPredator: true,
  estimatedCount: 3000,
};

// * function that displays an animal
function displayStringForAnimal(animal: {
  name: string;
  livesInLand: boolean;
  isPredator: boolean;
  estimatedCount: number;
}): string {
  const displayStr = `${animal.name} is ${animal.isPredator ? 'a predator' : 'not a predator'}\n. It is ${animal.estimatedCount > 10000 ? 'not endangered' : 'endangered!'}`;
  return displayStr;
}

function displayToConsole(animal: {
  name: string;
  livesInLand: boolean;
  isPredator: boolean;
  estimatedCount: number;
}) {
  const displayStr = displayStringForAnimal(animal);
  console.log(displayStr);
}

displayToConsole(lion);

const aCat: {
  name: string;
  livesInLand: boolean;
  isPredator: boolean;
  estimatedCount: number;
} = { name: 'Tom', livesInLand: true, isPredator: true, estimatedCount: 1_000_000 };
displayToConsole(aCat); //! Exercise: Fix the error - few fields are missing.
// * Done

// * Typescript follows structured typing.
const aDog = {
  name: 'Dog',
  livesInLand: true,
  isPredator: false,
  estimatedCount: 1000000,
  domesticated: true,
};
displayToConsole(aDog); // * TypeScript ignores additional fields. It has everything that the function is expecting and much more. All the extra fields are ignored.

// * optional properties.
function logAnimal(animal: Animal) {
  displayToConsole(animal);
  if (animal.isDomesticated) {
    //* optinal param check, if it is absent, value will be undefined.
    console.log('Domesticated!');
  }
}

logAnimal(aDog);
logAnimal(lion);

// * We can observe that, we are simply duplicating the structured type in many places
// * We can avoid this by introducing a type. Thanks to typescript's type alias expressions.
type Animal = {
  // * Animal is a type alias
  name: string;
  livesInLand: boolean;
  isPredator: boolean;
  estimatedCount: number;
  isDomesticated?: boolean; // ? Exercise: What type you see when you hover?
}; // ! Exercise, use this type in logAnimal

// ! Exercise. Can you identify the common type
// ! among the following functions and create a type
// ! and use it?
type Rectangle = { 
  width: number; 
  height: number 
};

const getRectangleArea = (rectangle: Rectangle) => {
  return rectangle.width * rectangle.height;
};

const getRectanglePerimeter = (rectangle: Rectangle) => {
  return 2 * (rectangle.width + rectangle.height);
};

/*
 * Arrays and Tuples
 */

// * You can also describe the types of arrays in TypeScript. There are two different syntaxes for doing this.

// * The first option is the square bracket syntax. This syntax is similar to the type annotations we've made so far, but with the addition of two square brackets at the end to indicate an array.

let alb = [
  'Rubber Soul',
  'Revolver',
  "Sgt. Pepper's Lonely Hearts Club Band",
  63,
];

let albums: string[] = [
  'Rubber Soul',
  'Revolver',
  "Sgt. Pepper's Lonely Hearts Club Band",
];

let dates: number[] = [1965, 1966, 1967];

let albums1: Array<string> = [
  'Rubber Soul',
  'Revolver',
  "Sgt. Pepper's Lonely Hearts Club Band",
];

//! Exercise - try removing types and see what TS infers?

// * Arrays of objects
// When specifying an array's type, you can use any built-in types, inline types, or type aliases:
type Album = {
  artist: string;
  title: string;
  year?: number;
};

let selectedDiscography: Album[] = [
  {
    artist: 'The Beatles',
    title: 'Rubber Soul',
    // year: 1965,
  },
  {
    artist: 'The Beatles',
    title: 'Revolver',
    year: 1966,
  },
];
// ! exercise try removing types and see what TS inferes

// !You can not push some differently typed object than typed or inferred earlier
selectedDiscography.push({ name: 'Karma', type: 'cat' });

//* Tuples
// * Tuples let you specify an array with a fixed number of elements, where each element has its own type.

let album1: [string, number] = ['Rubber Soul', 1965];
album1[1] = 'Hi'; // ! error

// ? React useState() uses the tuple under the hood

// * Tuples are useful for grouping related information together without having to create a new type.
let albumWithPlayCount: [Album, number] = [
  {
    artist: 'The Beatles',
    title: 'Revolver',
    year: 1965,
  },
  10000,
];

// * Named tuples
// * To add more clarity to the tuple, names for each of the types can be added inside of the square brackets:

type NamedTuple = [album: Album, playCount: number];
const [album, playCount]: NamedTuple = [
  {
    artist: 'The Beatles',
    title: 'Revolver',
    year: 1965,
  },
  10000,
];

// ! Exercise
type ShoppingCart = {
  userId: string;
  items: string[];
};

const processCart = (cart: ShoppingCart) => {
  // Do something with the cart in here
};

processCart({
  userId: 'user123',
  items: ['item1', 'item2', 'item3'], // ! fixme
});

// !Exercise
type Ingredient = {
  name: string;
  quantity: string
}

type Recipe = {
  title: string;
  instructions: string;
  ingredients?: Ingredient[];
};

const processRecipe = (recipe: Recipe) => {
  console.log(recipe.title);
  console.log('Instructions: ', recipe.instructions);
  if (recipe.ingredients) {
    // !fixme
    for (let instruction of recipe.instructions) {
      console.log(instruction);
    }
  }
};

processRecipe({
  title: 'Chocolate Chip Cookies',
  ingredients: [
    //! fixme
    { name: 'Flour', quantity: '2 cups' },
    { name: 'Sugar', quantity: '1 cup' },
  ],
  instructions: 'Mix flour and sugar',
});

//! fixme, ensure someone can pass only two numbers
//! as a tuple
// const setRange = (range: Array<number>) => {
const setRange = (range: [number, number]) => {
  const x = range[0];
  const y = range[1];

  // Do something with x and y in here
  // x and y should both be numbers!
};

// Gives error when no error lol!

setRange([1, 2]);
setRange([1, 2, 3]);

//@ts-expect-error calling setRange must be flagged as error, as only two items can be passed
setRange([1, 2]); //

//@ts-expect-error calling setRange must be flagged as error, as only two items can be passed
setRange([1, 2, 3]); //

//! Fixme
// const goToLocation = (coordinates: Array<number>) => {
  // const goToLocation = (coordinates: [number, number, number | undefined]) => {
  const goToLocation = (coordinates: [number, number, number?]) => {
  const latitude = coordinates[0];
  const longitude = coordinates[1];
  const elevation = coordinates[2];

  // Do something with latitude, longitude, and elevation in here
  if (elevation) {
    console.log(elevation);
  }
};
goToLocation([2, 3, 3.9]);
goToLocation([2, 3, 3.9, 3]);

//@ts-expect-error one should be able to pass tuple
// with lat, long, and optional elevation
goToLocation([2, 3, 3.9, 3]);
