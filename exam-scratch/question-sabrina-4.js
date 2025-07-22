/*
Explain the concept of execution context in JavaScript and how it relates to the this keyword. Provide examples of how the value of this can change in different situations.

how does it behave in strict mode
*/

class Dog {
  constructor(type){
  this.type = type
  }

  showInfo() {
    console.log(`${this.type} is my breed.`)
  }
}

let fluffy = new Dog ('labrador')

let info = fluffy.showInfo; 

fluffy.showInfo();
info()




//



/*
Explain the concept of execution context in JavaScript and how it relates to the this keyword. Provide examples of how the value of this can change in different situations.

how does it behave in strict mode
*/

class Dog {
  constructor(type, favoriteToys){
  this.type = type
  this.favoriteToys = favoriteToys
  }

  showInfo() {
    console.log(`${this.type} is my breed.`)
  }

  showToys(){
    this.favoriteToys.forEach(function (toy) {
      console.log( `I love playing with my ${toy}`)
    })
  }
}

let fluffy1 = new Dog ('labrador', ["sticks", "bones"])

fluffy1.showToys();

//let info = fluffy.showInfo.bind(fluffy); 
//fluffy.showInfo();
//info()