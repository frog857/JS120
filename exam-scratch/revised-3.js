function Chair(legs) {
  this.legs = legs;
}

let chair = Chair(4);
console.log(chair); // undefined
console.log(legs); // logs 4
//console.log(chair.legs) // type error: cannot read properties of undefined

console.log(globalw);