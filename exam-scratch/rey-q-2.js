/* Describe the concept of encapsulation in JavaScript. How can you implement private data in:

a) Factory functions
b) Classes

*/


class Person {
  static #purpose; 

  constructor(name, age, purpose) {
    this.name = name;
    this.age = age;
    Person.#purpose = purpose;
  }

  // setPassword(password) {
  //   this.#password = password;
  // }

  getPassword() {
    return Person.#purpose;
  }
}


let bob = new Person('Bob', 28, 'abadpassword')
console.log(bob.getPassword());


function createDog(breed, name, password) {
  let password = password;
  
  return {
    breed, 
    name,
    getPassword() {
      return password;
    }
  }
}

const jane = new Person("Jane Eyre", 18, "iLoveBooks");



