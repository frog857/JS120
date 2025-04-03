

class MathUtils {
  static add(num1, num2) {
    return num1 + num2;
  }

  static subtract(num1, num2) {
    return num1 - num2;
  }

  static multiply(num1, num2) {
    return num1 * num2;
  }

  static divide(num1, num2) {
    if (num2 === 0) {
      throw new RangeError("Divison by zero");
    } else {
      return num1 / num2;
    }
  }
}

console.log(MathUtils.add(5, 3));       // 8
console.log(MathUtils.subtract(10, 4)); // 6
console.log(MathUtils.multiply(6, 7));  // 42
console.log(MathUtils.divide(20, 5));   // 4
console.log(MathUtils.divide(10, 0));   // RangeError: Division by zero