/* Constructor/Prototype pattern

function Person() {
}
Person.prototype.greeting = function(text) {
  console.log(text);
}

function Shouter() {
  Person.call(this);
}
Shouter.prototype = Object.create(Person.prototype)
Shouter.prototype.greeting = function(text) {
  Person.prototype.greeting.call(this, text.toUpperCase());
}

*/

class Person {
  greeting(text) {
    console.log(text);
  }
}

class Shouter extends Person {
  greeting(text) {
    super.greeting(text.toUpperCase())
    console.log(super.greeting("meow"));
  }
}

class BigShouter extends Shouter {
  greeting(text) {
    text += " I AM BIG";
    super.greeting(text);
    console.log((super.prototype));
  }
}

let person = new Person();
let shouter = new Shouter();
let bigShouter = new BigShouter();

person.greeting("Hello. It's very nice to meet you."); // Hello. It's very nice to meet you
shouter.greeting("Hello my friend."); // HELLO MY FRIEND.
bigShouter.greeting("Hello there.")




