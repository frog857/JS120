function Phone(brand, model, year) {
  
  this.brand = brand;
  this.model = model;
  this.year = year;

  // displayInfo = function() {
  //   return `This ${this.brand} ${this.model} was released in ${this.year}.`
  // }

  // checkBatteryLevel = function() {
  //   return `Your ${this.model} has 75% charge remaining.`
  // }

}

Phone.prototype.checkBatteryLevel = function() {
  return `Your ${this.model} has 75% charge remaining.`;
}

Phone.prototype.displayInfo = function() {
  return `This ${this.brand} ${this.model} was released in ${this.year}.`;
}

let iphone12 = new Phone("Apple", "iPhone 12", "2020");
let pixel7 = new Phone("Google", "Pixel 7", 2019);

console.log(iphone12.checkBatteryLevel());
// Apple iPhone 12 has 75% battery remaining.

console.log(iphone12.displayInfo());
// 2020 Apple iPhone 12

console.log(pixel7.checkBatteryLevel());
// Samsung Galaxy S21 has 75% battery remaining.

console.log(pixel7.displayInfo());
// 2021 Samsung Galaxy S21