function Vehicle(weight, color) {
  this.weight = weight;
  this.color = color;
}

Vehicle.prototype.accelerate = function() {
  return `Your ${this.name} is speedin up`;
}

Vehicle.prototype.decelerate = function() {
  return `Easy there fella`;
}

function Boat(weight, color, name) {
  Vehicle.call(this, weight, color);
  this.name = name;
}

Boat.prototype = Object.create(Vehicle.prototype)
Boat.prototype.constructor = Boat;

Boat.prototype.dropAnchor = function() {
  return `We've dropped the anchor.`
} 

function Plane(weight, color, name, model) {
  Vehicle.call(this, weight, color);
  this.name = name;
  this.model = model;
}

Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane;

Plane.prototype.takeOff = function() {
  return `Your ${this.model} is off the runway.`
}



let sienna = new Boat(2000, "Green", "Sienna");
let cessna128 = new Plane(1000, "Red and White", "Freebird", "Cessna 128");

console.log(sienna.constructor);
console.log(sienna.accelerate());
console.log(cessna128.model);
console.log(cessna128.accelerate());