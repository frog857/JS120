function createProduct(id, name, stock, price) {
  return {
    id,
    name,
    stock, 
    price,
    setPrice(newPrice) {
      if (newPrice >= 0) {
        this.price = newPrice;
      } else {
        console.log("Invalid price.");
      }
    },
    describe() {
      console.log("Name: " + this.name);
      console.log("Price: " + this.price);
    }
  }
}

let drill = createProduct(1, "Cordless Drill", 15, 45);
let scissors = createProduct(0, "Scissors", 8, 10);

drill.describe();
scissors.setPrice(20);
scissors.describe();

// function changePrice(product, newPrice) {
//   if (newPrice > 0) {
//     product.price = newPrice;
//   } else {
//     console.log("Must enter a price greater than 0.");
//   }

// }

// function describeProduct(product) {
//   //let inStockPhrase = "We've got plenty in stock";
//   //let outOfStockPhrase = "Sorry, we just sold out!";
  
//   return `This is a ${product.name}, which will cost you ${product.price} bucks.`
// }


