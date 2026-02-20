// * let us write a function to get the first item in an array
const first = (array: number[]) => array[0];

// * But this only works with array. how to make it work with all types?
//? Can we try this? -
const first1 = (array: any[]) => array[0];
let numbers = [1, 2, 3];
const firstNum = first1(numbers); // Bad this is now we loose the type of firstNum!

// Another way to solve is implement one version of this algorithm for each of the type that we want. But this is not practical.
const firstString = (array: string[]) => array[0];
const firstName = (array: { name: string }[]) => array[0];

// ! same code is duplicated and only thing that is changing is the type.
// * Thanks to TypeScript, it allows us to follow DRY principle here so that we can implememt the algorithm once, and be able to pass the type we want at static time. This ability is known as generics.
const firstItem = <T>(array: T[]) => {
  return array[0];
};

const fNum = firstItem<number>([1, 2, 3]);
const fStr = firstItem<string>(['1', '2', '3']);

function test<T>(array: T[]){
  return array[0];
};
const fnNum = firstItem<number>([1,2,3]);
const fnnNum = firstItem([1,2,3]);

interface Planet {
  name: string;
  daySpan: number;
  distanceFromSun: number;
}

const planets: Planet[] = [
  { name: 'Mercury', daySpan: 12, distanceFromSun: 444000000 },
];

const firstPlanet = firstItem<Planet>(planets); // Try removing the  <Planet>. Observe that it still works!.
// We need not supply type in case TS can infer it correctly.

// We can also create types which are generic.
// * A function that transforms given type T into a type U
// * Generic types can be specified using type alias. The types that will be supplied
// * must follow the type alias name. RHS should make use of the types however needed.
type Transform<T, U> = (t: T) => U;

// ! Exercise give the type for firstItem.
type firstItemFn<T> = (array: T[]) => T | undefined;

const aFirstItem: firstItemFn<number> = (array: number[]) =>{ return 0};

// * we can have an interface with generics support. For example, we want a linked list implementation. Here list node can be represented as
interface ListNode<T> {
  data: T; // Node can hold a value of any type T.
  next: ListNode<T> | null;
}

// We can create different nodes now.
const stringNode: ListNode<string | number> = {
  data: 'Algorithms',
  next: null,
};

// !exercise: create a node that holds number
const numberNode: ListNode<number | string> = {
  data: 67,
  next: null
}

numberNode.next = stringNode;

// We can define a Linked list data structure that uses ListNode. Observe how we now
// fix the linked list to use one type T across.
interface LinkedList<T> {
  head: ListNode<T> | null;
  tail: ListNode<T> | null;
  addAtEnd(t: T): T;
  removeFromEnd(): T | null;
  addAtHead(t: T): T;
  removeFromHead(t: T): T | null;
  searchFor(t: T): T | null;
  length(): number;
}

// const linkedlist0: LinkedList<number> = {
//   head: {
//     data: 100,
//     next: null,
//   },
//   tail: {
//     data: 50,
//     next: null
//   }
// }

// const linkedlist1: LinkedList<number> = {
//   head: {
//     data: 100,
//     next: null,
//   },
//   tail: {
//     data: 50,
//     next: null
//   }
// }

// const linkedlist2: LinkedList<number> = {
//   head: {
//     data: 100,
//     next: null,
//   },
//   tail: {
//     data: 50,
//     next: null
//   }
// }


interface TestNode<T> {
  head: <TestNode>
}

interface LinkedListTest<T> {
  element: TestNode<T> | null;
}
// We shall implement this interface, once we explore classes.

// ! Exercise,  can you realize a stack DS, in terms of this linked list
interface Stack<T> {
  data: T
  readonly link: LinkedList<T>;
  push(t: T): T;
  pop(): T | null;
  peek(): T | null;
  isEmpty(): boolean | null;
  size(): number | null;
  isFull(): boolean | null
}

// interface StackNode<T> {
//   data: T,
//   next: StackNode<T> | null;
// }