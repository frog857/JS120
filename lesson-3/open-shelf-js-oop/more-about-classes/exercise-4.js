


class Rectangle {
  #width;
  #height;

  constructor(width, height) {
    this.#height = height;
    this.#width = width;
  }

  get width() {
    return `The width is ${this.#width}.`;
  }

  get height() {
    return `The height is ${this.#height}.`;
  }

  set width(newWidth) {
    if (newWidth <= 0 || typeof newWidth !== "number") {
      throw new RangeError("Invalid width. Must be positive number.");
    } else {
      this.#width = newWidth;
    }
  }

  set height(newHeight) {
    if (newHeight <= 0 || typeof newHeight !== "number") {
      throw new RangeError("Invalid height. Must be positive number.");
    } else {
      this.#height = newHeight;
    }
  }

  get area() {
    return `The area of this rectange is ${this.#height * this.#width}.`;
  }
}

let rect = new Rectangle(10, 5);
console.log(rect.area); // 50

rect.width = 20;
console.log(rect.area); // 100

rect.height = 12;
console.log(rect.area); // 240

try {
  rect.width = 0;
} catch (e) {
  console.log(e); // RangeError: width must be positive
}

try {
  rect.height = -10;
} catch (e) {
  console.log(e); // RangeError: height must be positive
}

console.log("Made it here.")