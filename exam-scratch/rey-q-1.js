// Explain the difference between factory functions and constructor functions. 

// Provide an example of each and discuss their advantages and disadvantages.

function createDog(breed, color) {
  return {
    breed: breed,
    color: color,
    makeNoise: function() {
      console.log("Bark!")
    }
  }
}

const sparky = createDog("lab", "black");
const spike = createDog("pitbull", "gray");

console.log(sparky.breed);
sparky.makeNoise();



function Dog(breed, color) {
  this.breed = breed;
  this.color = color;
}

// Dog.makeNoise => directly on the constructor function
// Dog.prototype.makeNoise => on the prototype of the constructor

/* Prototype chain lookup
- the instance itself (scooby) => 
- Dog.prototype => 
- Object.prototype =>
- null


scooby {
  breed, 
  color,
  [[Prototype]]: {
    ...
  }
}

Dog {
  makeNoise: [function body]
  prototype: {
    ...  
  }
}

Dog.prototype {
  [[prototype]]: {
    ...
  }
}


*/

Dog.makeNoise = function() {
  console.log("Bark")
}



const scooby = new Dog("mutt", "brown and black");

console.log(scooby.breed);
scooby.makeNoise()
