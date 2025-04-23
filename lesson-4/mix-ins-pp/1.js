const Speed = {
  goFast() {
    console.log(`I'm a ${this.constructor.name} and going super fast!`);
  }
};

class Car {
  goSlow() {
    console.log(`I'm safe and driving slow.`);
  }
}

class Truck {
  goVerySlow() {
    console.log(`I'm a heavy truck and like going very slow.`);
  }
}

Object.assign(Truck.prototype, Speed);

let mater = new Truck();
mater.goFast()
console.log(mater instanceof Truck);

let lightningMcQueen = new Car();
console.log("goFast" in lightningMcQueen);
console.log("goFast" in mater);
console.log(Truck.name);
console.log(lightningMcQueen.constructor.name);
console.log(mater.constructor.length);
