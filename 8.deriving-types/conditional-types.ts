// type expressions can be conditional and depeneding on a condition
// the type can be changed
interface Animal {
	live(): void;
}
interface Dog extends Animal {
	woof(): void;
}

// Conditional types take the form:
// SomeType extends OtherType ? TrueType : FalseType;

type Example1 = Dog extends Animal ? number : string;

type Example2 = number;

type Example3 = RegExp extends Animal ? number : string;

let x: Example1 = 100; // Example1 is number

// Consider the following case
interface IdLabel {
	id: number /* some fields */;
}
interface NameLabel {
	name: string /* other fields */;
}

// function overloading is possible in typescript
function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel {
	throw "unimplemented";
}

type NameOrId<T extends number | string> = T extends number
	? IdLabel
	: NameLabel;

// The complex oveeride based createLabel, now becomes a simple function
// with the following signature.
function createLabel1<T extends number | string>(idOrName: T): NameOrId<T> {
	throw "unimplemented";
}

let a = createLabel1("typescript");
//  a:NameLabel
let b = createLabel1(2.8);
//  b:IdLabel
let c = createLabel1(Math.random() ? "hello" : 42);
//  c: IdLabel | NameLabel

// Conditional type constraints
type MessageOf<T> = T["message"]; // Type '"message"' cannot be used to index type 'T'
//In this example, TypeScript errors because T isn’t known to have a property called message. We could constrain T, and TypeScript would no longer complain:
type MessageOfN<T extends { message: unknown }> = T["message"];

interface Email {
	message: string;
}

type EmailMessageContents = MessageOf<Email>; // Works as Email has message field
type SomeMessage = MessageOfN<{ name: "Ram" }>; // Wont work!

// ? However, what if we wanted MessageOf to take any type, and default to something like `never` if a message property isn’t available? We can do this by moving the constraint out and introducing a conditional type:
type MessageOfA<T> = T extends { message: unknown } ? T["message"] : never;
interface Album {
	name: "Random";
}
type MessageAlbum = MessageOfA<Album>; // no error, MessageAlbum is never as Album does not have message
type MessageEmail = MessageOfA<Email>; // MessageEmail is string.

// ! Exercise: As another example, we could also write a type called Flatten that flattens array types to their element types, but leaves them alone otherwise:
type Flatten<T> = T;

// *  Inferring Within Conditional Types
// * Conditional types provide us with a way to infer from types we compare against in the true branch using the infer keyword. For example, we could have inferred the element type in Flatten instead of fetching it out “manually” with an indexed access type:
type Flatten1<Type> = Type extends Array<infer Item> ? Item : Type;
