// * UNION TYPES
type ID = string | number | symbol;

function displayID(id: ID){
  if(typeof id === 'string') return id.toUpperCase();
  else if(typeof id === 'symbol') id.toString();        // ! check this issue in that playground
  else return id.toFixed(0);
}

console.log(displayID("CS67"))
console.log(displayID(Symbol("Secret_id")))
console.log(displayID(67))

let myName = "Varun";

type Direction = "NORTH" | "WEST" | "EAST" | "SOUTH" | "NORTH";     // * Ignore the repeated

function goTo(direction: Direction){
    let myDirection: Direction;
    switch(direction){
        case "EAST":
            myDirection = "EAST";
            break;
        case "WEST":
            myDirection = "WEST";
            break;
        case "NORTH":
            myDirection = "NORTH";
            break;
        case "SOUTH":
            myDirection = "SOUTH";
            break;
    }
    console.log(`Moving towards: ${myDirection}`)
}

goTo("EAST")