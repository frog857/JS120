class Greeting {
  greet(greeting) {
    console.log(greeting);
  }
}

class Hello extends Greeting {
  hi() {
    this.greet("Hello");
  }
}

class Goodbye extends Greeting {
  bye() {
    this.greet("Goodbye!");
  }
}

let bye = new Goodbye();

bye.bye();