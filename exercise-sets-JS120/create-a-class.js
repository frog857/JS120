class Cat {
  static genericGreeting() {
    console.log("Hello, Аз есмь Кот");
  }

  constructor(name, age) {
    this.name = name;
    this.age = age;
    console.log("I'm a cat! My name is " + this.name);
  }

  fart(age) {
    (age === 15) ? console.log("It's my quinciñera! Pffft") : console.log("Pffft");
  }

  greet() {
    console.log("Konichiwa, my name is " + this.name);
  }

  rename(newName) {
    this.name = newName;
  }
}

let kitty = new Cat("kitty", 10);
kitty.greet();
Cat.genericGreeting();
// PT Two


class Person {
  constructor(name = "John Doe") {
    this.name = name;
  }
}

let person1 = new Person();
let person2 = new Person("Pepe");

console.log(person1.name);
console.log(person2.name);