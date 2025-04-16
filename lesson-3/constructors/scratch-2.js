
// JANKY HOME-GROWN PROTOTYPE SET UP
/*
function Dog(name, breed, weight) {
  Object.setPrototypeOf(this, Dog.myPrototype);
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}

Dog.myPrototype = {
  bark() {
    console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  }
};

let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);
maxi.bark(); // 'Woof!'

// maxi.hasOwnProperty('bark'); // false
// dexter.hasOwnProperty('bark'); // false
// biggie.hasOwnProperty('bark'); // false
// Object.getPrototypeOf(maxi).bark === Dog.myPrototype.bark; // true
// Object.getPrototypeOf(dexter).bark === Dog.myPrototype.bark; // true
// Object.getPrototypeOf(biggie).bark === Dog.myPrototype.bark; // true

console.log(Dog.hasOwnProperty("myPrototype"))
console.log(maxi.hasOwnProperty("myPrototype"))
console.log(maxi.hasOwnProperty("bark"))

for (let prop in maxi) {
  if (typeof maxi[prop] === "function") maxi[prop]();
  console.log(prop)
}
*/

// USING `NEW`

function Dog(name, breed, weight) {
  // deleted Object.setPrototypeOf(this, Dog.myPrototype);
  this.name = name;
  this.breed = breed;
  this.weight = weight;
}


Dog.prototype.bark = function() {
  console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
};



let maxi = new Dog('Maxi', 'German Shepherd', 32);
maxi.bark(); // 'Woof!'


console.log(Object.getPrototypeOf(maxi) === Dog.prototype);
//Dog.prototype = {meow: function() {console.log(`${this.name} meowed!`)}};
console.log(Dog.prototype);
console.log(Object.getPrototypeOf(maxi))

let biggie = new Dog('Biggie', 'Whippet', 9);
//biggie.meow(); // 'Yip!'

console.log(Dog.prototype.constructor.prototype.constructor.prototype)
console.log(Dog.prototype)