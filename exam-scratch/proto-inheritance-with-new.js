// function Chair(legs, hasWheels=false) {
//   this.legs = legs;
//   this.hasWheels = hasWheels;
// }


// Chair.prototype.swivel = function() {
//   console.log("Swivelling...");
// };

// console.log(Chair.prototype);

// let myDeskChair = new Chair(1, true);

// console.log(myDeskChair.constructor.prototype);

// myDeskChair.swivel = function() {
//   console.log("Swivelling!!!");
// }
// myDeskChair.swivel();




function Chair(legs, hasWheels=false) {
  this.legs = legs;
  this.hasWheels = hasWheels;
}

Chair.prototype.swivel = function() {
  console.log("Swivelling...");
};


let myDeskChair = new Chair(1, true);

myDeskChair.swivel();

console.log(Object.getPrototypeOf(myDeskChair) === Chair.prototype);  

// The above code returns a Type Error. Why is that? What is the way to fix it.
