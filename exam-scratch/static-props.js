class Cat {
  static catLog = [];

  constructor(name, favoriteToy) {
    this.name = name;
    this.favoriteToy = favoriteToy;
    Cat.catLog.push(this);
  }

  play() {
    console.log(`My name is ${this.name} and I'm playing with ${this.favoriteToy}`);
  }

  allCats() {
    return Cat.catLog.map(cat => cat.name);
  }
}

let cat1 = new Cat("Jerry", "book");
let cat2 = new Cat("Tom", "bludgeon");
let cat3 = new Cat("Spike", "bone");

cat1.play();
console.log(cat1.allCats());