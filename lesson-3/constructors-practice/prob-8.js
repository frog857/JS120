function User(first, last) {
  if (User.prototype === Object.getPrototypeOf(this)) {
    this.name = first + " " + last;
    return;
  } else {
    console.log("GUH")
    let obj = Object.create(User.prototype);
    obj.name = first + " " + last;
    console.log(obj)
    return obj;
  }
}

function BetterUser(first, last) {
  if (!(this instanceof BetterUser)) {
    return new BetterUser(first, last)
  }
  this.name = `${first} ${last}`;
}


let name = 'Jane Doe';
console.log(name);         // => Jane Doe

let user1 = new User('John', 'Doe');
console.log(user1)
console.log(user1.name);   // => John Doe

let user2 = User('John', 'Doe');
console.log(user2)
console.log(user2.name);   // => John Doe
