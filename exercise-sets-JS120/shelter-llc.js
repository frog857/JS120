class Pet {
  constructor(species, name) {
    this.species = species;
    this.name = name;
  }

  info() {
    console.log(`A ${this.species} named ${this.name}.`);
  }
}

class Owner {
  constructor(name) {
    this.name = name;
    this.pets = [];
  }

  numberOfPets() {
    return this.pets.length;
  }
}

class Shelter {
  constructor() {
    this.adoptionLog = {};
  }

  adopt(owner, pet) {
    owner.pets.push(pet);
    if (!this.adoptionLog.hasOwnProperty(owner.name)) {
      this.adoptionLog[owner.name] = [];
    } 
    this.adoptionLog[owner.name].push(pet);
  }

  printAdoptions() {
    for (let ownerName in this.adoptionLog) {
      console.log(`${ownerName} has adopted the following pets:`);
      this.adoptionLog[ownerName].forEach(pet => pet.info())
      console.log("");
    }
  }
}


let butterscotch = new Pet('cat', 'Butterscotch');
let pudding      = new Pet('cat', 'Pudding');
let darwin       = new Pet('bearded dragon', 'Darwin');
let kennedy      = new Pet('dog', 'Kennedy');
let sweetie      = new Pet('parakeet', 'Sweetie Pie');
let molly        = new Pet('dog', 'Molly');
let chester      = new Pet('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let jendisShelter = new Shelter();
jendisShelter.adopt(phanson, butterscotch);
jendisShelter.adopt(phanson, pudding);
jendisShelter.adopt(phanson, darwin);
jendisShelter.adopt(bholmes, kennedy);
jendisShelter.adopt(bholmes, sweetie);
jendisShelter.adopt(bholmes, molly);
jendisShelter.adopt(bholmes, chester);
jendisShelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);