function assignProperty(obj, str, val) {
  // check if the prototype above has the val in it
    // if so, reassign the val
    // else, check the next 

  // while the val is not an "own" property of the object && prototype is not null
    // check for the presence in the parent obj
      // if present, reassign
      // if not present, reassign "obj" pointer to prototype obj
  while (!obj.hasOwnProperty(str) && Object.getPrototypeOf(obj) !== null) {
    let prototype = Object.getPrototypeOf(obj);
    if (prototype.hasOwnProperty(str)) {
      prototype[str] = val;
      break;
    } 
    obj = prototype;
  }
}

let fooA = { bar: 1 };
let fooB = Object.create(fooA);
let fooC = Object.create(fooB);

assignProperty(fooC, "bar", 2);
console.log(fooA.bar); // 2
console.log(fooC.bar); // 2

assignProperty(fooC, "qux", 3);
console.log(fooA.qux); // undefined
console.log(fooC.qux); // undefined
console.log(fooA.hasOwnProperty("qux")); // false
console.log(fooC.hasOwnProperty("qux")); // false