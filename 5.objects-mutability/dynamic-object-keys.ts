// * We already have discussed that the objects are used as key value stores. And many a times, it is impossible to guess the exact keys upfront.

// * JS will alllow us to create a object literal, and then randomly add new keys as we want
let anObject = {}; // Observe how TS infers type here
anObject.one = 1; //!Property 'one' does not exist on type '{}'
anObject.two = 2; //!Property 'two' does not exist on type '{}'

// Consider you are using an object to store frequency count of words in a sentence. It is not possible to fix what keys might be needed in advance.
interface WordFrequency {
  //? but how do we type keys which are words in a sentence given? we do not know them in advance!
}

// To address this, TS has a thing called index signature. So we can now accomodate the dynamic keys in WordFrequency:
interface WordFrequency {
  [key: string]: number; // string, number, Symbol
}
// This signature says, you can have any number of string keys as you wish. Key sentence, however is a must.

const getWordFreq = (sentence: string): WordFrequency => {
  const wordFreq: WordFrequency = {};

  const words = sentence.trim().toLowerCase().split(/\s+/).filter(Boolean);

  for (const word of words) {
    const current =
      typeof wordFreq[word] === 'number' ? (wordFreq[word] as number) : 0;
    wordFreq[word] = current + 1;
  }

  return wordFreq;
};

const sampleSentence =
  'TypeScript makes types safe and TypeScript makes types fun';
const frequency = getWordFreq(sampleSentence);
console.log(frequency);

// * Luckily we TS has a dedicated type for this kind of requirements, and it is called as Record.

type WordFrequencyN = Record<string, number>; // key here is string, value is number. Actually Record is a generic type. We will cover that later.

// * There is one more advantage. Record can support a union type of literals as key, where as index signature does not
const albumAwards1: Record<'Grammy' | 'MercuryPrize' | 'Billboard', boolean> = {
  Grammy: true,
  MercuryPrize: false,
  Billboard: true,
};

const albumAwards2: {
  [index: 'Grammy' | 'MercuryPrize' | 'Billboard']: boolean;
  // !An index signature parameter type cannot be a literal type or generic type. Consider using a mapped object type instead. (We will explore mapped types later)
} = {
  Grammy: true,
  MercuryPrize: false,
  Billboard: true,
};

// * Combining Known and Dynamic Keys
// * In many cases there will be a base set of keys we know we want to include, but we also want to allow for additional keys to be added dynamically.
// Let us consider a small state is formed called Tulunadu, but to begin with has only 3 districts, and we do not know about any new district that might come up soon. Lets call them as "Udupi", "Mangalore", "Kasaragodu"
type DistrictInfo = { name: string };
type StateInfo = Record<'Udupi' | 'Mangalore' | 'Kasaragodu', DistrictInfo> & {
  [index: string]: DistrictInfo;
};
const tulunadu: StateInfo = {
  Kasaragodu: { name: 'kasaragodu' },
  Mangalore: { name: 'mangalooru' },
  Udupi: { name: 'udupi' },
};

// After some time Kodagu is getting added
tulunadu['Kodagu'] = { name: 'Kodagu' };

//* Same type can be represented using interface too, and is preferred.
interface BaseStateInfo {
  Udupi: DistrictInfo;
  Mangalore: DistrictInfo;
  Kasaragodu: DistrictInfo;
}

interface StateInfoI extends BaseStateInfo {
  [dist: string]: DistrictInfo;
}

// * PropertyKey type of typescript
// Actually javascript object will allow only string, number and sybol keys. And PropertyKey exactly captures this type
// When we are not sure the type of key, we can use this type
type SystemSettings = {
  [key: PropertyKey]: string;
};

const sysSettings = {
  bootVolume: 'C',
  0: { port: 124 },
  [Symbol('secret')]: 200,
};

// * The object type
// * Typescript has a type called object that can represent any object and in JS almost all reference entities are objects (actually even primitives as well!). All reference entities can be referred as object. That means it can represent an Array, Function or an instance of Object.
function acceptAllNonPrimitives(obj: object) {}
acceptAllNonPrimitives({});
acceptAllNonPrimitives([]);
acceptAllNonPrimitives(() => {});

// But will error on primititve data types - value based
acceptAllNonPrimitives(1);
acceptAllNonPrimitives('hello');
acceptAllNonPrimitives(true);

// ! Exercise - 1 Use an Index Signature for Dynamic Keys: Invent a type Scores, that can have any string as key.
// Give solution using inline structural type, type alias, interface, and Record.

const scores = {};

scores.math = 95;
scores.english = 90;
scores.science = 85;

// ! Exercise  -2 Default Properties with Dynamic Keys: tweak the Scores type to include 3 known fields - maths, science, english. And then we should be able to add many more.
const scores1: Scores = {
  maths: 95,
  english: 90,
  science: 30,
};

scores1.athletics = 100;
scores1.french = 75;
scores1.spanish = 70;

interface Scores {
  maths: number;
  english: number;
  science: number;
  [key: string]: number;
}
