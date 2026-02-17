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

  displayInfo(): string;
}

// ! Exercise : Create an instance of Flight.

const flight: Flight = {
  operator: "Varun",
  origin: {
    airport: "Bangalore",
    latitude: 67,
    longitude: 67
  },
  destination: {
    airport: "Mangalore",
    latitude: 111,
    longitude: 111
  },
  date: "17-02-2026",
  price: 9000,
  supersonic: false,
  displayInfo() {
    // Going to get 'this' pointer 
    console.log(flight);
    return ''
  },
};

// ! Exercise: Create an instance of PassengerFlight. How do we implement displayInfo?

const passengerFlight: PassengerFlight = {
  operator: "Varun",
  origin: {
    airport: "Bangalore",
    latitude: 67,
    longitude: 67
  },
  destination: {
    airport: "Mangalore",
    latitude: 111,
    longitude: 111
  },
  date: "17-02-2026",
  price: 9000,
  supersonic: false,
  make: "Airbus",
  countryOfOrigin: "India",

  displayInfo() {               //When a function becomes a part of the object is called method
    
    function doStuff2(this: any){
      // Global is node, window in browser, globalThis
      // You get implicitally the 'this' argument
      console.log("Do Stuff 2");
      console.log(this)
    }

    doStuff2();

    const that = this;
    function doStuff3(this: any){
      // Global is node, window in browser, globalThis
      // You get implicitally the 'this' argument
      console.log("Do Stuff 3");
      console.log(that)
    }
    doStuff3();

    const doStuff4 = () => {
      console.log("Do Stuff 4");
      console.log(this)
    }

    doStuff4();
    
    // console.log(flight);
    return `${this.operator} is flying from ${this.origin.airport} to ${this.destination.airport}`
  },

  // displayInfo: () => {
  //   return `${this.operator} is flying from ${this.origin.airport} to ${this.destination.airport}`;
  // }
};

function doStuff1(this: any){
  // Global is node, window in browser, globalThis
  // You get implicitally the 'this' argument
  console.log("Do Stuff 1");
  console.log(this)
}

doStuff1();

const doStuff5 = () => {
  console.log("Do Stuff 5");
  console.log(this)
}

doStuff5();

passengerFlight.displayInfo();

const displayInfo = passengerFlight.displayInfo;
displayInfo();

// ! Exercise
// Create an interface that has an id, name, and address.
// Create Employee, and Student interfaces extending from this. Employee will have company associated, and student will have an institute associated in addition to id, name, and address

interface human {
  id: number;
  name: string;
  address: string;
}

interface Employee extends human {
  company: string;
}

interface StudentX extends human {
  institute: string;
}

// * interfaces and types can be recursive as well
// * For example tree or Linked list

interface LinkedListNode {
  data: number;
  next: LinkedListNode | null;
}

const node1: LinkedListNode = {
  data: 1,
  next: null
}

const node2: LinkedListNode = {
  data: 1,
  next: null
}

const node3: LinkedListNode = {
  data: 1,
  next: null
}

node1.next = node2;
node2.next = node3;

