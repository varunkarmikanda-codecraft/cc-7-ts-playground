// ? We want a dealership chain across country for a vehicle brand. And we want the dealership only in 
// ? "MUMBAI", "DELHI", "CHENNAI", "BANGALORE"

// ? And each location maintains the vehicles in stock. 
// ? A vehicle had a name, optional registration number, fuel type (petrol, diesel, electric).

// TODO: We need to be able to maintain the inventory for all these cities in a single DataStructure

type Fuel = "PETROL" | "DIESEL" | "ELECTRIC";

type Vehicle = {
    name: string;
    registrationNumber?: string;
    fuelType: Fuel
}

// type Locations = "MUMBAI" | "DELHI" | "CHENNAI" | "BANGALORE";

// type Dealership = {
//     location: Locations;
//     stock: number;
//     vehicle: Vehicle;
// }

type vehicleInventory = {
    mumbai: Vehicle[];
    delhi: Vehicle[];
    chennai: Vehicle[];
    bangalore: Vehicle[];
}

// TODO: A new approach 
