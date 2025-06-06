class Cat {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = Object.create(Cat.prototype);
let realCat = new Cat("Fred");


console.log(fakeCat instanceof Cat); // logs true
console.log(fakeCat.name);           // logs undefined
console.log(fakeCat.speaks());       // logs undefined says meowwww.

console.log(realCat instanceof Cat); // logs true
console.log(realCat.name);           // logs undefined
console.log(realCat.speaks());       // logs undefined says meowwww.

