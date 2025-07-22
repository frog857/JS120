function Vehicle(make, model, year) {
  this.make = make;
  this.model = model;
  this.year = year;
}

Vehicle.prototype.drive = function() {
    console.log(`Your ${this.make} ${this.model} is on its way`);
}


function Car(make, model, year, numDoors) {
  Vehicle.call(this, make, model, year);
  this.numDoors = numDoors;
}

Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car;

Car.prototype.howManyDoors = function() {
  console.log(`You've got ${this.numDoors} doors on this thing.`);
}


function Motorcyle(make, model, year, engineSize) {
  Vehicle.call(this, make, model, year);
  this.engineSize = engineSize;  
}

Motorcyle.prototype = Object.create(Vehicle.prototype);
Motorcyle.prototype.constructor = Motorcyle;

Motorcyle.prototype.displayEngineSize = function() {
  console.log(`Your engine is ${this.engineSize}.`);
}

let truck = new Vehicle("toyota", "rav4", 2010);
let sedan = new Car("honda", "focus", 2020, 4);
let suzuki = new Motorcyle("suzuki", "crotchrocket", 2020, )

console.log(truck, sedan, suzuki);
//console.log(truck instanceof Vehicle);