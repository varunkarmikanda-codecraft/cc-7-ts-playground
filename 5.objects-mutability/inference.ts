// * Variable Declaration and Type Inference

//* Variable inference
type AlbumGenre = 'rock' | 'country' | 'electronic';

const handleGenre = (genre: AlbumGenre) => {
  // ...
};

let albumGenre = 'rock';

handleGenre(albumGenre);
// ! let was used when declaring the variable albumGenre, TypeScript understands that the value can later be changed. In this case, it infers albumGenre as a string rather than the specific literal type "rock"

// If we supply the actual type, typescript will respect that
let albumGenre1: AlbumGenre = 'rock';
handleGenre(albumGenre1);

// Also when we define the var as const, TS will fix the type to the exact literal as a constant can not be modified later.
const albumGenre2 = 'rock';
handleGenre(albumGenre2); // * No error. This is because, TS infers that the constant can not be changed later as that is the core JS behavior. So it infers the type to be 'rock' literal itself. Thus that can be passed where a AlbumGenre is exprected.

// * Object property inference
type AlbumAttributes = {
  status: 'new-release' | 'on-sale' | 'staff-pick';
};

const updateStatus = (attributes: AlbumAttributes) => {
  // ...
};

const albumAttributes = {
  status: 'on-sale',
};

updateStatus(albumAttributes);
// ! typescript infers the status to be string, and that is quite logical, as we can set its value later to any string we want.

const albumAttributes1: AlbumAttributes = {
  status: 'on-sale',
};
updateStatus(albumAttributes1); // * TypeScript is happy, as on-sale is a valid status

// Also if we supply an object inline typescript knows, that can never change as it is a object literal  being supplied inline.
updateStatus({ status: 'on-sale' });

// ! Exercise: Fix the error:
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

modifyButtons(buttonsToChange);
