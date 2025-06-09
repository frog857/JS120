function objectsEqual(obj1, obj2) {
  let obj1keys = Object.getOwnPropertyNames(obj1).sort();
  let obj2keys = Object.getOwnPropertyNames(obj2).sort();

  if (obj1keys.length !== obj2keys.length) return false;
  if (!obj1keys.every((key, idx) => key === obj2keys[idx])) return false;
  if (!obj1keys.every(key => {obj1[key] === obj2[key]})) return false;
  
  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({a: 'foo', b: 'bar'}, {b: "bar", a: 'foo'}));  // true
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false