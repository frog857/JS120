let carpenter = {
  name: "Bob",
  makes: [],
  makeThings: function() {
    this.makes.forEach(thing => thing.build());
  }
};

let cabinet = {
  materials: ["wood", "nails", "hinges", "handle"],
  build() {
    console.log("Building a cabinet...");
  },
};

let shelf = {
  materials: ["wood", "screws", "glue"],
  build() {
    console.log("Building a shelf...");
  },
};

carpenter.makes.push(cabinet);
carpenter.makes.push(shelf);

carpenter.makeThings()