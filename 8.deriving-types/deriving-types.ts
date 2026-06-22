// DRY principle:  instead of hand coding every type you want see if you can derive it from existing ones!.

// We have seen derived types to some extent already when we discussed interfaces and union types.
interface Person {
	name: string;
	dob: Date;
}

interface Student extends Person {
	college: string;
}

// Another example is union type.
type Triangle = {
	type: "triangle";
	sideLength: number;
};

type Rectangle = {
	type: "rectangle";
	width: number;
	height: number;
};

type Shape = Triangle | Rectangle;

//* keyof operator
//* The keyof operator allows you to extract the keys from an object type into a union type.
interface Album {
	title: string;
	artist: string;
	releaseYear: number;
}

// True that we can manually create a type for the keys of Album
type KeysOfAlbum = "title" | "artist" | "releaseYear";

// But that is not scalable, everytime a new key is added to Album, we need to manually update KeysOfAlbum
// We can do better, with keyof operator of typescript
type AlbumKeys = keyof Album; //"title" | "artist" | "releaseYear";

//Since keyof tracks the keys from a source, any changes made to the type will automatically be reflected in the AlbumKeys type.

function getAlbumDetails(album: Album, key: AlbumKeys) {
	return album[key];
}

getAlbumDetails(
	{ title: "Thriller", artist: "Micheal Jackson", releaseYear: 1984 },
	"something",
); // trying to access a non existing key is an error!

//* Keyof allowed us to extract typeof key of a structured type. Similary typeof can help to derive type from a value
const student = {
	name: "Ram",
	dob: "4-Apr-2003",
	score: 23,
};

type StudentT = typeof student;

// Let us consider the following object
const Direction = {
	south: "South",
	north: "North",
	west: "West",
	east: "East",
} as const;

//Lets derive type of keys in Direction object.
type DirectionKey = keyof Direction; // This is an error, as keyof can only work on type

// Lets get the type of Direction object
type DirectionT = typeof Direction; // Assigned to type - type expression
type KeyOfDirection = keyof DirectionT;
// * One note - this typeof is not same as typeof that reflects the runtime js type.
const runTimeTypeOfDirection = typeof Direction; // typeof on a value assigned to var - value expression.

// * Indexed Access types
interface IAlbum {
	title: string;
	artist: string;
	releaseYear: number;
}

// Let us try to get type of the value of title key
type TitleValue = IAlbum.title; // This wont work
type TitleValue1 = IAlbum["title"]; // indexed access

// How do we get type of all values of album?
type AllTitleType = IAlbum["title"] | IAlbum["artist"] | Album["releaseYear"]; // string | number

// This is again not scalable, and it is manual. Luckily there is a better way
type AllTitles = IAlbum[keyof IAlbum]; // indexing using key type.

// ! exercise - get the type of the values of Direction object above.
