/*
Reflection: I chose inheritance to implement a walk ability. However, should probably
consider mix-ins in the future, as walking, and other verb-y type things can be
thought of as "abilities", or DLC, which are very mix-in-able...

*/

class Animal {
  constructor(name) {
    this.name = name;
  }

  walk() {
    return `${this.name} ${this.gait()} forward.`;
  }
}

class Person extends Animal {
  gait() {
    return "strolls";
  }
}

class Cat extends Animal {
  gait() {
    return "saunters";
  }
}

class Cheetah extends Animal {
  gait() {
    return "runs";
  }
}

let mike = new Person("Mike");
console.log(mike.walk());
// "Mike strolls forward"

let kitty = new Cat("Kitty");
console.log(kitty.walk());
// "Kitty saunters forward"

let flash = new Cheetah("Flash");
console.log(flash.walk());
// "Flash runs forward"