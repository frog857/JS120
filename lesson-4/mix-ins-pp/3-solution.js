const Moveable = {
  range() {
    return this.fuelCap * this.fuelEfficiency;
  }
}

class WheeledVehicle {
  constructor(kmTravelledPerLiter, fuelCapInLiter, tirePressure) {
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
    this.tires = tirePressure;
  }

  tirePressure(tireIdx) {
    return this.tires[tireIdx];
  }

  inflateTire(tireIdx, pressure) {
    this.tires[tireIdx] = pressure;
  }
}

Object.assign(WheeledVehicle.prototype, Moveable);

class Auto extends WheeledVehicle {
  constructor() {
    super([30,30,32,32], 50, 25.0);
  }
}

let mater = new Auto();

class Motorcycle extends WheeledVehicle {
  constructor() {
    super([30,30], 30, 20.0);
  }
}

let dodo = new Motorcycle();

class Catamaran {
  constructor(propellerCount, hullCount, kmTravelledPerLiter, fuelCapInLiter) {
    this.propellerCount = propellerCount;
    this.hullCount = hullCount;
    this.fuelEfficiency = kmTravelledPerLiter;
    this.fuelCap = fuelCapInLiter;
  }
}

Object.assign(Catamaran.prototype, Moveable);

let bigMoneyBoat = new Catamaran()
