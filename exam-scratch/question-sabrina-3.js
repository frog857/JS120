

/*
Explain how JavaScript implements inheritance through the prototype chain. Provide a detailed example that demonstrates how property lookup works when a method is called on an object.
*/


function Animal(color) {
  this.color = color;
}

Animal.prototype.noise = function () {
    this.sound ? console.log(this.sound) : console.log("Grrrrbhhb");
}

function Dog (sound) {
  this.sound = sound; 
}

Dog.prototype = Object.create(Animal.prototype);
Dog.constructor = Dog;
 

let fluffy = new Dog('brown'); 

fluffy.noise()
console.log(fluffy.hasOwnProperty('noise'))
console.log(fluffy instanceof Dog)
console.log(Object.getPrototypeOf(fluffy) === Dog.prototype)


/*
- first JS looks on fluffy => doesn't `noise` there
- Animal.prototype => does find noise, and executes the function.
*/