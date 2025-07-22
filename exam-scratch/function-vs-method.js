// diff between fuction and method as it relates to exec context?


// example?


function showThis() {
  console.log(this);
}

let obj = {
  value: 42,
  showThis() {
    console.log(this);
  }
}

showThis();
obj.showThis();