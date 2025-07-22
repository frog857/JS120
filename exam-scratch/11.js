function CoffeeMaker() {}

function DripMachine() {}

DripMachine.prototype = Object.create(CoffeeMaker.prototype);

DripMachine.prototype.constructor = DripMachine;

let dripCoffee = new DripMachine();
console.log(dripCoffee.constructor);