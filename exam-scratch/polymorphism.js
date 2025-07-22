class Person {
  speak() {
    console.log("Hello!");
  } 
  
}

class grumpyPerson extends Person {
  speak() {
    console.log("Go away!");
  }
}

class nicePerson extends Person {
  speak() {
    console.log("Hi there! How are ya.");
  }
}

let bob = new Person();
let daniel = new grumpyPerson();
let fred = new nicePerson();

for (let person of [bob, daniel, fred]) {
  person.speak();
}