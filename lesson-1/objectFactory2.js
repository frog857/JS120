function createBook(title, author, read = false) {
  return {
    title,
    author,
    read,
    readBook() {this.read = true},
    getDescription() {
      console.log(`${this.title} was written by ${this.author}. ` +
                  `I ${this.read ? "have" : "haven't"} read it.`);
    }
  }
}

let book1 = createBook('Mythos', 'Stephen Fry');
let book2 = createBook('Me Talk Pretty One Day', 'David Sedaris');
let book3 = createBook("Aunts aren't Gentlemen", 'PG Wodehouse');


book1.getDescription(); // Mythos was written by David Fry. I haven't read it.
book1.readBook();
book1.getDescription(); // Mythos was written by David Fry. I have read it.