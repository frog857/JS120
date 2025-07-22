/*
Explain advantages and disadvantages and use-case of: 
Factory functions
Constructor functions with prototypes
ES6 Classes

*/


let hector = {
  name: "Hector",
  age: 21,
  favoriteIceCream: "Cherry"
};

let cheryl = {
  //
  //
  //
}

function createPerson(name, age, favoriteIceCream) {
  return {
    name: name,
    age: age,
    favoriteIceCream: favoriteIceCream,
    speak: function() {
      console.log("Hi, I'm friendly")
    }
  }

}

let bob = createPerson("bob", 50, "rocky road");
let marvin
let freddy


// Constructor/prototypes

function CreatePerson(name, age, favoriteIceCream) {
  this.age = age;
  this.name = name;
  this.favoriteIceCream = favoriteIceCream;
}

let john = new CreatePerson("john", 30, "chocolate");

/*
- a new object is created, and `this` is bound to the instance variable (in this case, john)
- a [[prototype]] property is created on the instance that points back to the constructor function's prototype
- the consructor function is invoked, and the properties are created with their associated values 
- the object is returned and assigned to the variable john
*/

