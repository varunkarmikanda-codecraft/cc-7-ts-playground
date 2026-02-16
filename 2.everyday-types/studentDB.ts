// ? We want a student DB
// ? A student is going to have a name, he can be undergrad, graduate, post graduate
// ? He can subscribe to few subjects. We do not know all subjects in advance. Ex: Math, Science, Kannada, English, Chemistry
// ? He can have score out of 100
// ? Student should have an address. Address must have street, city, state and pincode (in number)
// ? For now our DB simply resides in an array. That is our DB

// TODO: What is the type of student?
// TODO: What is the type of the DB?

type StudentGrade = "UNDER GRADUATE" | "GRADUATE" | "POST GRADUATE";

type Address = {
    street: string;
    city: string;
    state: string;
    pincode: number;
}

type Student = {
    name: string;
    grade: StudentGrade;
    subject: string[]; 
    score: number;
    address: Address
}

type DB ={
    student: Student[];
}

const student1: Student = {
    name: "Varun",
    grade: "UNDER GRADUATE",
    subject: ["Maths", "Science", "English", "Kannada"],
    score: 100,
    address: {
        street: "Street1",
        city: "Mangalore",
        state: "Karnataka",
        pincode: 575004,
    }
}

const dataBase: DB = {
    student: [student1]
}

