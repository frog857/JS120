function Chair(legs, hasWheels=false) {
  const chair = {};
  chair.legs = legs;
  chair.hasWheels = hasWheels;
  this.legs = legs;
  return chair;
}

Chair.prototype.swivel = function() {
  console.log("Swivelling...");
};

let myDeskChair = new Chair(1, true);
//myDeskChair.swivel();

console.log(myDeskChair);

/*
1. when an explicit return is present, the implicitly returned object referred to by `this` is overriden.
*/