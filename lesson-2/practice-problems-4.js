let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a '
                                + this.occupation + '.';
  }
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);

let garcia = {
  firstName: 'Fabian',
  lastName: 'Garcia',
  occupation: 'Meow-Man'
}

garcia.getDescription = turk.getDescription.bind(turk);

logReturnVal(garcia.getDescription, garcia);

/*
The code originally deviated from the expected output because at the time of invokation on line 12,
`this` referred to the global object, and not the object contained at varaible `turk`. By introducting
an extra parameter `context`, to which we can pass whatever object we'd like as the context, `this`
will now refer to `turk`
*/

// Problem 5:

const TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames: function() {
    this.titles.forEach((title) => {
      console.log(this.seriesTitle + ': ' + title);
    });
  }
};

TESgames.listGames();

/*
This code will not produce the desired output. When invoking `forEach` within a method on the `TESgames` 
object, it seems as though `this` would refer to `TESgames`. But when we invoke `listGames` on line 47,
only `listGames` this refers to `TESgames`. forEach is invoked as a standalone function, and therefore 
its `this` will refer to the global object
*/


//Problem 9

let foo = {
  a: 0,
  incrementA: function() {
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a);