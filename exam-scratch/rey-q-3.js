//  Implement the following Person class that maintains a history of all names a person has had:   

class Person {
  static fullNameHistory = [];

  constructor(name) {
    this.name = name;
    this.nameHistory = [];
  }

  rename(newName) {
    // take the old name and push it to the array at the isntance's nameHistory 
    this.nameHistory.push(this.name);
    // take the old name, and push it to the fullNameHistory
    Person.fullNameHistory.push(this.name);
    // reassign the isntance's name property to the argument passed in to rename
    this.name = newName;
  }

}
 
const person = new Person('Bob');
const person2 = new Person('Sherry');
 
console.log(person.name);                  // => 'Bob'    
console.log(person.nameHistory);           // => []?
console.log(person.rename('Robert')); 
console.log(person.name);                 // => 'Robert'    
console.log(person.nameHistory);          // => ['Bob']    
console.log(person.rename('Bobby'));
console.log(person.nameHistory);          // => ['Bob', 'Robert']  


person2.rename("Ruth");
person2.rename("Jerry");
person2.rename("Supreme overlord");
person.rename('Sherry');

console.log(Person.fullNameHistory)

