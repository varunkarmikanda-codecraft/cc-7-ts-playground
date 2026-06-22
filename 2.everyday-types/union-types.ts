type ID = string | number; // union type.

function displayID(id: ID) {
  if (typeof id === 'number') {
    // type narrowing.
    console.log(id.toFixed(7));
  } else {
    console.log(id.toUpperCase());
  }
}
displayID('zzz');

type Direction = 'South' | 'West' | 'North' | 'East';

function goTo(direction: Direction) {
  switch (direction) {
    case 'East':
    case 'North':
    case 'South':
    case 'West':
  }
}

// Some times depending on the
