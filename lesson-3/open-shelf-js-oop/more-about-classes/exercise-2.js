
class Book {
  #title;
  #author;
  #year;

  constructor(title, author, year) {
    this.#title = title;
    this.#author = author;
    if (year < 1900 || typeof year !== "number") {
      console.error("Invalid year provided. Defaulting to 1900.");
      this.#year = 1900;
    } else {
      this.#year = year;
    }
  }

  get title() {
    return this.#title;
  }

  get author() {
    return this.#author;
  }

  get year() {
    return this.#year;
  }

  set year(newYear) {
    if (typeof newYear === "number" && newYear > 1899) {
      this.#year = newYear;
    } else {
      throw new RangeError("Year must be 1900 or beyond.");
    }
  }

  displayInfo() {
    return `${this.#title} was writen in ${this.#year} by ${this.#author}.`
  }
}

let grapesOfWrath = new Book("Grapes of Wrath", "John Steinbeck", 1939);

let book = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925);
console.log(book.title);  // The Great Gatsby
console.log(book.author); // F. Scott Fitzgerald
console.log(book.year);   // 1925

book.year = 1932;         // Changing year
console.log(book.year);   // 1932

try {
  book.year = 1825;
} catch (e) {
  console.log(e);   // RangeError: Invalid year
}

try {
  let book2 = new Book('A Tale of Two Cities', 'Charles Dickents', 1859);
} catch (e) {
  console.log(e);   // RangeError: Invalid year
}

console.log("\nmade it here\n==============================\n")

