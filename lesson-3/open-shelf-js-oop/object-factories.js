let apple = {
  name: 'Apple',
  color: 'Red',

  isRipe: function() {
    return `This ${this.name} is ripe.`;
  },

  describe: function() {
    return `This ${this.name} is ${this.color}.`;
  },
};

let banana = {
  name: 'Banana',
  color: 'Yellow',

  isRipe: function() {
    return `This ${this.name} is ripe.`;
  },

  describe: function() {
    return `This ${this.name} is ${this.color}.`;
  },
};

function createFruit(name, color) {
  return {
    name,
    color,
    describe() {
      return `This ${this.name} is ${this.color}.`;
    },

    isRipe() {
      return `This ${this.name} is ripe.`;
    }
  }
}

let blackberry = createFruit("blackberry", "black");

// console.log(blackberry.describe());
// console.log(blackberry.isRipe());
// console.log(blackberry.color);

// #2

function createPhone(brand, model, year) {
  return {
    brand,
    model, 
    year,

    batteryLevel() {
      return `Your ${this.brand} ${this.model}'s battery is full.`
    },

    displayInfo() {
      return `Your ${this.brand} ${this.model} was released in ${this.year} `
    }
  }
}

let iPhone = createPhone("Apple", "iPhone 12", 2022);

console.log(iPhone.batteryLevel());
console.log(iPhone.displayInfo());

function createInstrument(name, type) {
  return {
    name,
    type,

    play() {
      return `You played a tune on your ${this.name}`;
    },

    showType() {
      return `The ${this.name} is a ${this.type} instrument`
    }
  }
}

let zacksDrum = createInstrument("drum", "percussion");

console.log(zacksDrum.play());
console.log(zacksDrum.showType());