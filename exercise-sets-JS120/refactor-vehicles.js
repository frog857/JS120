class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  getWheels() {
    return this.wheels;
  }

  info() {
    return `${this.make} ${this.model}`
  }

}


class Car extends Vehicle {}

class Motorcycle extends Vehicle {}

class Truck extends Vehicle {
  constructor(make, model, wheels, payload) {
    super(make, model, wheels)
    this.payload = payload;
  }
}