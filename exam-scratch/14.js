function Paint(type, color) {
  this.type = type;
  this.color = color;
}

Paint.prototype.dry = function () {
  return `The ${this.color} ${this.type} paint is drying.`;
};

let acrylicPaint = new Paint("acrylic", "blue");
console.log(acrylicPaint.dry());