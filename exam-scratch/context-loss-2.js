
let franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map(function(number) {
      return this.name + ' ' + number;
    }.bind(franchise));
  },
};

console.log(franchise.allMovies());


let _franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    return [1, 2, 3].map((number) => {
      return this.name + ' ' + number;
    });
  },
};

console.log(_franchise.allMovies());



let __franchise = {
  name: 'How to Train Your Dragon',
  allMovies: function() {
    let self = this;
    return [1, 2, 3].map(function (number) {
      return self.name + ' ' + number;
    });
  },
};

console.log(__franchise.allMovies());
