//* Sometimes, once an object is created, we might not want someone to modify certain properties of it. Such props can be marked as readonly

interface Album {
  readonly title: string;
  readonly artist: string;
  status?: 'new-release' | 'on-sale' | 'staff-pick';
  genre?: string[];
}

const readOnlyWhiteAlbum: Readonly<Album> = {
  title: 'The Beatles (White Album)',
  artist: 'The Beatles',
  status: 'staff-pick',
};

readOnlyWhiteAlbum.title = 'New album!'; // ! Can not modify readonly props
// ! Note that like many of TypeScript's type helpers, the immutability enforced by readonly only operates on the first level. It won't make properties read-only recursively.

// * Readonly arrays
const readOnlyGenres: readonly string[] = ['rock', 'pop', 'unclassifiable'];

//! Now you cant push into readOnlyGenres, as it is readonly. No mutations allowed
readOnlyGenres.push('classic');
readOnlyGenres[0] = 'classic';

// * ReadonlyArray helper of TypeScript.
const readOnlyGenres1: ReadonlyArray<string> = [
  'rock',
  'pop',
  'unclassifiable',
];

// * you can assign a mutable array to a readonly array, but not vice versa
function readonlyFoo(strings: readonly string[]): void {}
const readonlyNames: readonly string[] = ['one', 'two', 'three'];
readonlyFoo(readonlyNames);
readonlyFoo(['one', 'two']);
const mutableNames = ['one', 'two', 'three'];
readonlyFoo(mutableNames); // Mutable array can be assigned to a readonly one

function mutableFoo(strings: string[]): void {}
mutableFoo(readonlyNames); // ! can not pass readonly where a mutable is expected

//* Readonly utility type
//* Similar to pick and omit, this too will convert only the top level keys into readonly.
type Country = {
  name: string;
  population: number;
  capital: string;
  stateHeads: {
    primeMinister: string;
    president: string;
  };
};
type ReadonlyCountry = Readonly<Country>; //only top level keys are made readonly

//! Exercise: Ensure push, and assingment results in error.
function printNames(names: string[]) {
  for (const name of names) {
    console.log(name);
  }

  // @ts-expect-error
  names.push('John');

  // @ts-expect-error
  names[0] = 'Billy';
}

//* Deep immutability with 'as const'
//? Suppose that we want to use this config through out the app, but no one should be able to modify it anywhere. How can we achieve this?

const serverConfig = {
  port: 3300,
  certsPath: 'path/to/certs',
  host: 'somehost.com',
  hardwareInfo: { cpu: '3Gz', ram: '128GB' },
};

// One way is to try introduce a type.
interface ServerConfig {
  readonly port: number;
  readonly certsPath: string;
  readonly host: string;
  readonly hardwareInfo: { readonly cpu: string; readonly ram: string };
}

// But for one of object, it is a hassle to invent a type.
// But thanks to the `as const` assertion that TS has, it will turn the whole object including the hierachy into readonly
const serverConfig1 = {
  port: 3300,
  certsPath: 'path/to/certs',
  host: 'somehost.com',
  hardwareInfo: { cpu: '3Gz', ram: '128GB' },
} as const;

// ! Just like the readonly modifier, as const only affects the type level. At runtime, the object and its properties are still mutable.

// However if we use type also along with as const, the type wins.
interface ServerConfig1 {
  port: number;
  certsPath: string;
  host: string;
  hardwareInfo: { cpu: string; ram: string };
}
const serverConfig2: ServerConfig1 = {
  port: 3300,
  certsPath: 'path/to/certs',
  host: 'somehost.com',
  hardwareInfo: { cpu: '3Gz', ram: '128GB' },
} as const;

serverConfig2.port = 1000; // * Type has won!.

// ! exercise
type ButtonAttributes = {
  type: 'button' | 'submit' | 'reset';
};

const modifyButtons = (attributes: ButtonAttributes[]) => {};

const buttonsToChange = [
  {
    type: 'button',
  },
  {
    type: 'submit',
  },
];

modifyButtons(buttonsToChange); //! Fix by using as const
// !----
