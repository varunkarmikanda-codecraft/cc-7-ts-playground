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
  return `${album.title} is available in the following formats: ${formats.join(
    ', ',
  )}`;
}

getAlbumFormats(
  { artist: 'Radiohead', title: 'OK Computer', year: 1997 },
  'CD',
  'LP',
  'Cassette',
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
const getCitizenInfo = ({
  name,
  country,
  passportNumber,
}: CitizenInfo): void => {
  console.log(name, country, passportNumber);
};

getCitizenInfo({ name: 'Ram', country: 'India', passportNumber: 'XCZ-23' });

// * function types
// We can create type aliases to functions
type FuncNumToString = (s: number) => string;

const fns: FuncNumToString = (s: number) => {return "string"}; // !fixme

// * functions are first class citizens in JS, you can treat them like other values. A function that takes another function as its arg, or returns another function as return value is known as higher order function (More on this later)
const higherOrder = (fn: FuncNumToString): string => {
  return "abc"; //! fixme by invoking fn
};

// * Some type alias for function examples
// Optional parameters
type WithOptional = (index?: number) => number;

// Rest parameters
type WithRest = (...rest: string[]) => number;

// Multiple parameters
type WithMultiple = (first: string, second: string) => number;



// ? Creates a type for a function that receives a string and number and returns a string

type WithStringAndNumber = (s: string, n: number) => string;

// ? Create a type for a function that receives the string, followed by variable number of numbers and returns nothing

type TwoStringVars = (s1: string, s2: string, ...nums: number[]) => void;

// ? Create a type for a function that takes no argument but returns function that takes a string and returns number
type StringReturnsNumber = (s: string) => number;
type FnReturnsFn = () => StringReturnsNumber;

// type FnReturnsFn = () => (s: string) => number;

// ? Type of function that returns a function that returns a function that returns a function that takes a string and a number 
type function3 = (s: string) => number;
type function2 = () => function3;
type function1 = () => function2;