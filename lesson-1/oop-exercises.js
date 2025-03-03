/*
Create an object that represents a Cessna 152 aircraft. 
The aircraft should include information that shows its fuel capacity of 24.5 gallons and a cruising speed
of 111 knots. The aircraft should be able to take off and land.
*/

let aircraft = {
  aircraftType: "Cessna 152",
  fuelCapacityInGallons: 24.5,
  cruisingSpeedInKnots: 111,
  inflight: false,

  takeOff() {
    console.log(`${this.aircraftType} has taken off.`);
    this.inflight = true;
  },

  land() {
    console.log(`${this.aircraftType} has landed.`);
    this.inflight = false;
  }
}

// console.log(aircraft.inflight);
// aircraft.takeOff();
// console.log(aircraft.inflight);
// aircraft.land()
// console.log(aircraft.inflight);

/*
State items in this object are the first four properties
Behavior items in this object are the two methods.
*/

/* #2
Write a simple constructor function that creates objects that represent books. 
Each book should have a title, author, and the year published. 
Create objects that represent the following books:

Title         	Author	           Year Published
Neuromancer	    William Gibson	   1984
Doomsday Book	  Connie Willis    	 1992


When you are done, identify the type of the objects created, the constructor function, 
and the instance objects.
*/

function Book(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
}

let neuromancer = new Book("Neuromancer", "William Gibson", 1984);
let doomsday = new Book("Doomsday Book", "Connie Willis", 1992);

console.log(neuromancer);
console.log(doomsday);

/*
The object type is Book. The constructor function is Book function. the instances are
the OBJECTS stored at `doomsday` and `neuromancer`
*/



