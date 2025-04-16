function Car(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
  this.started = false;
}

// Car.prototype = {meow: 10}; // Placing this line before instantation of `corolla` causes its prototype to be identical to it's constructor

let corolla = new Car('Toyota', 'Corolla', 2016);

Car.prototype = {meow: 10}; // Placing this line after instantiation of `corolla` causes its prototype to be empty object

console.log(Object.getPrototypeOf(corolla) === Car.prototype); // true