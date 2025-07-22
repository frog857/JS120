const chairPrototype = {
  sit() {
    return `Sat in the chair.`;
  },
};

class Chair {
  sit() {
    return `Sat in the chair.`;
  }
}

let recliner = Object.create(chairPrototype);
let barstool = new Chair();

console.log(Object.getPrototypeOf(recliner).sit);
console.log(barstool.sit);

// What is the prototype chain of each of the following objects.