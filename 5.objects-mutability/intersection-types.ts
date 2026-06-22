//* We already learnt we can extend interfaces.
//* We also saw that we cant extend type aliases though.
//* But however there is a way to combine two type aliases into an intersection and create new types. And this become useful in some situations.

//*An intersection type lets us combine multiple object types into a single type. It uses the & operator. You can think of it like the reverse of the | operator. Instead of representing an "or" relationship between types, the & operator signifies an "and" relationship.

type Album = {
  title: string;
  artist: string;
  releaseYear: number;
};

type SalesData = {
  unitsSold: number;
  revenue: number;
};

//*On their own, each type represents a distinct set of properties. While the SalesData type on its own could be used to represent sales data for any product, using the & operator to create an intersection type allows us to combine the two types into a single type that represents an album's sales data:

type AlbumSales = Album & SalesData;

//* AlbumSales object has now properties of both objects. Note here, intention is not to inherit, but to combine. This gives a flexibility where SalesData can be combined with any other type to create new Sales types.
const wishYouWereHereSales: AlbumSales = {
  //conform
  title: 'Wish You Were Here',
  artist: 'Pink Floyd',
  releaseYear: 1975,
  unitsSold: 13000000,
  revenue: 100000,
};

//* you can intersect as many types as you want
type AlbumSalesGenre = Album & SalesData & { genre: string };

//* Intersection types can be created even combining primitive types, but turns out to be impossible.
type StringAndNumber = string & number; //! never is a special type of typescript that indicates, this can never work. The reason is string and number have some properties which cant be combined together.

//* Incompatible types can not be combined
type One = { id?: number; x: string };
type Two = { id?: string; y: string };
type Combined = One & Two;
let combined: Combined = { id: 10, x: 'x', y: 'string' }; //! id can not be a number as well as string at same time! Type 'number' is not assignable to type 'never'.

// * Intersections vs interface extends

// ? We've now covered two separate TypeScript syntaxes for extending object types: & and interface extends. So, which is better?

// * You should choose interface extends for two reasons. We saw earlier that when you intersect two object types with an incompatible property, TypeScript will resolve the property to never

// *When using interface extends, TypeScript will raise an error when you try to extend an interface with an incompatible property:
interface OneI {
  id: number;
}

interface TwoI extends OneI {
  //! Error: Types of property 'id' are incompatible.
  id: string;
}
//* TypeScript will only raise an error when you try to access the id property, not when you define it. So, `interface extends` is better for catching errors when building out your types. Also from overall performace perspective interface extends is much better.

//* Also from performance angle, the intersection types get recomputed everytime they are used, however typescript can cache interface extends.

//* So better avoid intersection types most of the times.

//! Exercise:
// Here we have a User type and a Product type, both with some common properties like id and createdAt:
type User = {
  id: string;
  createdAt: Date;
  name: string;
  email: string;
};

type Product = {
  id: string;
  createdAt: Date;
  name: string;
  price: number;
};
// Your task is to create a new BaseEntity type that includes the id and createdAt properties. Then, use the & operator to create User and Product types that intersect with BaseEntity.
//!-------------
