// Manipulating and producing new types using TypeScript's utility types
// Often we would need to have similar types, and definitely we can simply duplicate and create seperate types manually for this purpose.
interface Student {
  name: string;
  id: string;
  college: string;
  grade: number;
}

// Let us say that we want a student object where all properties are optional. We can
// create such a type manually
interface StudentOptional {
  name?: string;
  id?: string;
  college?: string;
  grade?: number;
}

// But this is almost same as Student, it would be great we can easily derive this type from Student. Thanks to Partial utility type of TypeScript
type StudentOptionalT = Partial<Student>;

const updateStudent = (student: StudentOptionalT) => {
  // ...
};

updateStudent({ name: 'John' });

// * --
// * Required utility type is the reverse of Partial
type RequiredStudent = Required<StudentOptional>;

// ! Note: Both Required and Partial only work one level deep
type Album = {
  title: string;
  artist: string;
  releaseYear?: number;
  genre?: {
    parentGenre?: string;
    subGenre?: string;
  };
};

type RequiredAlbum = Required<Album>;

// * Pick utility type
// * Pick allows to create a type by choosing few properties from a given type
type Person = Pick<Student, 'name' | 'id'>;

// * Omit utility type is the opposite of Pick, creates new type by omitting few props
type StudenSansGrade = Omit<Student, 'grade' | 'id'>;
