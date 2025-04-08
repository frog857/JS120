class SmartPhone {
  constructor (brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
  }

  batteryLevel() {
    return `Your ${this.brand} ${this.model}'s battery is full.`
  }

  displayInfo() {
    return `Your ${this.brand} ${this.model} was released in ${this.year} `
  }
}

let iPhone12 = new SmartPhone("Apple", "iPhone 12", 2022);

console.log(iPhone12.batteryLevel());
console.log(iPhone12);

//#2


class Dog {
  constructor (name, breed) {
    this.name = name;
    this.breed = breed;
  }
  bark() {
    return `${this.name} barked!`
  }
}

let boo = new Dog("boo", "schnauzer");


console.log(boo instanceof Dog);
console.log(boo);

// #3

class Vehicle {
  constructor(color, weight) {
    this.color = color;
    this.weight = weight;
  }

  accelerate() {
    return `Step on it!`;
  }

  decelerate() {
    return `Woah there, tiger.`
  }
}

class Boat extends Vehicle {
  constructor(color, weight, homePort) {
    super(color, weight);
    this.homePort = homePort
  }

  dropAnchor() {
    return `We've dropped anchor.`
  }
}

class Plane extends Vehicle {
  constructor(color, weight, airline) {
    super(color, weight);
    this.airline = airline;
  }
  takeOff() {
    return `We have liftoff - climbing at 15 degrees.`
  }

  land(airport) {
    return `We've now arrive at ${airport}.`
  }
}

class Car extends Vehicle {
  constructor(color, weight, licenseNumber) {
    super(color, weight);
    this.licenseNumber = licenseNumber;
  }

  honk() {
    return `HONK HONK`
  }
}

let fordF150 = new Car("white", 5000, "A2645B");
let cessna120 = new Plane("red", 3000, "Alex Air");
let laSienna = new Boat("blue", 7000, "San Diego");

fordF150.accelerate();
console.log(fordF150 instanceof Car);
console.log(cessna120.color, cessna120.weight, cessna120.airline);

console.log(fordF150 instanceof Vehicle && cessna120 instanceof Vehicle);
console.log(laSienna instanceof Car);
