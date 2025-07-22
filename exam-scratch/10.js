function Machine() {}

Machine.prototype.actuate = function () {
  return `The machine actuates`;
};

function ArborPress() {}

ArborPress.prototype = Object.create(Machine.prototype);

ArborPress.prototype.flatten = function () {
  return `The press flattens`;
};

let press = new ArborPress();
console.log(press.actuate());
console.log(press.flatten());