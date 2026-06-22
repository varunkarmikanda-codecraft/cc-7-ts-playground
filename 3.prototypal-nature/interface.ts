// * interface is another mechanism to create an object type.
// * differs from the type alias, where an interface can be extended by another interface, whereas
// * you can not extend a type from another type
// * We can open an interface again and few more properties and thus can augment an existing interface.
interface Flight {
  operator: string;
  origin: { airport: string; latitude: number; longitude: number };
  destination: { airport: string; latitude: number; longitude: number };
  date: string;
  price: number;
}

// * One can derive from existing interface
interface PassengerFlight extends Flight {
  make: string;
  countryOfOrigin: string;
}

// * One can augment existing interface by re opening the declaration and can add more fields
interface Flight {
  supersonic: boolean;

  displayInfo(sequence: number): string;
}

// ! Exercise : Create an instance of Flight.
const aFlight: Flight = {
  date: '3-Feb-2026',
  operator: 'Indigo',
  destination: { airport: 'Mangalore', latitude: 10, longitude: 14 },
  origin: { airport: 'Bangalore', latitude: 15, longitude: 14 },
  price: 2000,
  supersonic: false,
  displayInfo(sequence: number) {
    return '';
  },
};
// ! Exercise: Create an instance of PassengerFlight. How do we implement displayInfo?
const aPassengerFlight: PassengerFlight = {
  date: '3-Feb-2026',
  operator: 'Indigo',
  destination: { airport: 'Mangalore', latitude: 10, longitude: 14 },
  origin: { airport: 'Bangalore', latitude: 15, longitude: 14 },
  price: 2000,
  supersonic: false,
  make: 'Airbus',
  countryOfOrigin: 'India',

  displayInfo(sequence: number) {
    const that = this;
    function doStuff2(this: any) {
      console.log(that.operator);
    }

    const doStuff3 = () => {
      console.log(that.operator);
    };

    // doStuff3();
    console.log(sequence);
    // Going to get a `this` parameter
    // When a function becomes part of an object, it is called as method.
    // return `${this.operator} flight is from ${this.origin.airport} to ${this.destination.airport}`;

    return this.operator;
  },

  //   displayInfo: () => {
  //     return `${this.operator} flight is from ${this.origin.airport} to ${this.destination.airport}`;
  //   },
};

function doStuff1(this: any) {
  // global in node, and window in browser. globalThis
  // you get implicitely the `this` argument
  console.log(this);
}

// doStuff1(); //this will be global.

console.log(aPassengerFlight.displayInfo(3));

const adder = (a: number, b: number): number => a + b;

adder(1, 2);

const displayInfo = aPassengerFlight.displayInfo;
globalThis.operator = 'Delta Airlines';
console.log(displayInfo(4)); // ? What do you think will happen now?

// ! Exercise
// Create an interface that has an id, name, and address. Call it Person.
// Create Employee, and Student interfaces extending from this. Employee will have company associated, and student will have an institute associated in addition to id, name, and address

// * interfaces and types can be recursive as well
// For example tree, or linked list
interface LinkedListNode {
  data: number;
  next: LinkedListNode | null;
}
