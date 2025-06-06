class Vehicle {
  constructor(year) {
    this.year = year;
  }
}

class Truck extends Vehicle {
  constructor(year, bedType) {
    super(year);
    this.bedType = bedType;
  }

  startEngine() {
    console.log("Vroom vroom");
  }
}

class Car extends Vehicle {
  startEngine() {
    console.log("Ready to go!");
  }
}

let truck = new Truck(2003, "flatbed");

let car = new Car(2015);

console.log(truck);

//let vehicle = new Vehicle(2005);




