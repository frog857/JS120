let parity = {
  div: 2,
  areEven(nums) {
    return nums.every(function (num) {
      console.log(this);
      num % this.div === 0
    });
  },
};

console.log(parity.areEven([6, 18, 54, 30, 12]));


let parity2 = {
  div: 2,
  areEven(nums) {
    return nums.every(num => {
      console.log(this);
      return num % this.div === 0;
    });
  },
};

console.log(parity2.areEven([6, 18, 54, 30, 12]));