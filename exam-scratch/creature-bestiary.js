class Creature {
  constructor(name, habitat) {
    this.name = name;
    this.habitat = habitat;
  }
}

class landCreature extends Creature {
  constructor(name, habitat) {
    super(name, habitat);
  }

  chase() {
    console.log("You better run, mortal");
  }
}

class skyCreature extends Creature {
  constructor(name, habitat) {
    super(name, habitat);
  }

  fly() {
    console.log("I'm a bird");
  }
}

class Wolf extends landCreature {
  constructor(name, habitat, color) {
    super(name, habitat);
    this.color = color;
  }

  howl() {
    console.log("awooooo");
  }
}

class Wyvern extends skyCreature {
  constructor(name, habitat) {
    super(name, habitat);
  }
}

class Drake extends landCreature {
  constructor(name, habitat) {
    super(name, habitat);
  }
}

const fireBreatherMixin = {
  breathFire() {
    console.log("I AM FIRE BREATHER BLEHHGHGHGHHGHG");
  }
};

Object.assign(Wyvern.prototype, fireBreatherMixin);
Object.assign(Drake.prototype, fireBreatherMixin);


let wolf = new Wolf("Jacob", "The Twilight Universe", "grey");
let wyvern = new Wyvern("Terry", "da sky");
let drake = new Drake("Drake Bell", "not the sky");

wolf.howl();
wolf.chase();
wyvern.fly();
drake.breathFire();
// wyvern.chase(); => throws TypeError
// drake.fly(); => throws TypeError
console.log(wolf.habitat);
console.log(drake.name);


