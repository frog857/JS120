function foo() {
  console.log("I am foo.")
}

let baz = () => console.log("I am baz.");


let bazProto = Object.getPrototypeOf(baz);

// console.log(baz());
// console.log(baz.prototype);
// console.log(bazProto)
// console.log(baz.prototype === bazProto)


// let fooProto = Object.getPrototypeOf(foo);

// console.log(foo());
// console.log(foo.prototype);
// console.log(fooProto)
// console.log(foo.prototype === fooProto)


class Mammal {
  foo() { console.log("Mammal.foo"); }
}

class Whale extends Mammal {
  foo() { console.log("Whale.foo"); }
}

class Beluga extends Whale {}

let beluga = new Beluga();
beluga.foo(); // Whale.foo
console.log(Object.hasOwnProperty(foo))
let belugaProto = Object.getPrototypeOf(beluga);
console.log(belugaProto.foo)
//beluga.bar(); // TypeError: beluga.bar is not a function