function createCar(make, fuelLevel, engineOn) {
  let obj = {};

  obj['make'] = make;
  obj['fuelLevel'] = fuelLevel;
  obj['engineOn'] = engineOn;

  obj.startEnine = function() {
    this.engineOn = true;
  }

  obj.drive = function() {
    this.fuelLevel -= 0.1;
  }

  obj.stopEngine = function() {
    this.engineOn = false;
  }

  obj.refuel = function(percent) {
    if ((this.fuelLevel + (percent / 100) <= 1)) {
      this.fuelLevel += (percent / 100);
    } else {
      this.fuelLevel = 1;
    }
  }

  return obj;
}

let raceCar1 = createCar('BMW', 0.5, false);
raceCar1.drive();

let raceCar2 = createCar('Ferrari', 0.7, true);
raceCar2.drive();

raceCar2.refuel(200);
console.log(raceCar2);