const logAlbumInfo = (
  title: string,
  trackCount: number,
  isReleased: boolean,
  releaseDate?: string, // optional param
  format = 'CD', // default param preferably must appear at the end, though technically this can come any place.
): string => {
  // Arrow function
  // rest of function body
  return '';
};

logAlbumInfo('Midnights', 13, true, '2022-10-21');
logAlbumInfo('American Beauty', 10, true);
logAlbumInfo('Midnights', 13, true, 'stream');

// * Rest Parameters
function getAlbumFormats(album: Album, ...formats: string[]) {
  for (let format of formats) {
    console.log('Next format: ', format);
  }
  return `${album.title} is available in the following formats: ${formats.join(
    ', ',
  )}`;
}

getAlbumFormats(
  { artist: 'Radiohead', title: 'OK Computer', year: 1997 },
  'CD',
);

//* Also we can supply variable args by spreading an array as well.
const albumFormats = ['CD', 'LP', 'Cassette'];

getAlbumFormats(
  { artist: 'Radiohead', title: 'OK Computer', year: 1997 },
  ...albumFormats,
);

// * Also function args can be destructured
type CitizenInfo = {
  name: string;
  country: string;
  passportNumber: string;
};
const getCitizenInfo = ({ name, country, passportNumber }: CitizenInfo): void =>
  console.log(name, country, passportNumber);

function getCitizenInfo1({ country, name, passportNumber }: CitizenInfo): void {
  console.log(name);
  console.log(country);
  console.log(passportNumber);
}

getCitizenInfo({ name: 'Ram', country: 'India', passportNumber: 'XCZ-23' });

// * function types
// We can create type aliases to functions
type FuncNumToString = (s: number) => string;

const fns: FuncNumToString = (s: number) => {
  return '';
}; // !fixme

// * functions are first class citizens in JS, you can treat them like other values. A function that takes another function as its arg, or returns another function as return value is known as higher order function (More on this later)
const higherOrder = (fn: FuncNumToString): string => {
  return fn(10); //! fixme by invoking fn
};

// * Some type alias for function examples
// Optional parameters
type WithOptional = (index?: number) => number;

// Rest parameters
type WithRest = (...rest: string[]) => number;

// Multiple parameters
type WithMultiple = (first: string, second: string) => number;

// Create a type for a function that receives a string, and number, and returns a string ?
type WithStringNumber = (s: string, count: number) => string;

// Create a type for a function that receives two strings, followed by variable number of numbers
// returns nothing.
type TwoStringVarNums = (s1: string, s2: string, ...nums: number[]) => void;

// Create a type for a function that takes no arguments, but returns a function that takes
// a string and returns a number.
type StringReturningNumber = (s: string) => number;
type FuncReturningStringReturningNumber = () => (s: string) => number;

// Type of a function that returns a function that returns a function that takes a string and returns a number.
type FuncReturningFuncReturningFuncStringNum = () => () => (
  s: string,
) => number;

// ! exercise. You are suppose to design a binary search function, for an array of sorted student objects sorted by their serial number.  Come up with a minimum type needed to define a student. Binary search requires a comparison. Students are objects so, they use pass by reference semantics. Obviously we need to pass a compare function to binary search so that two students can be compared using their serial number. Essentially binary search function should take the array of students, the student to search for, and then a compare function that can compare two students and can return 0 if equal, 1 if first is greater than second, -1 otherwise. Binary search should return true if student is found, false otherwise.

type Student = {
  serialNumber: number;
};

type CompareFunc = (strudent1: Student, student2: Student) => 0 | 1 | -1;

function binarySearch(
  students: Student[],
  searchStudent: Student,
  compareFunc: CompareFunc,
): boolean {
  //TODO: implement
  return true;
}
