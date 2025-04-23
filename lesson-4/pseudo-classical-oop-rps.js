let rlSync = require("readline-sync");

class Player {
  constructor() {
    this.move = null;
  }
  //move = null; // my og answer
}

class Human extends Player {
  constructor() {
    super();
  }

  choose() {
    let choice;
    const validChoices = ["rock", "paper", "scissors"];
    choice = rlSync.question("Your Turn: Rock, Paper, Scissors?\n=> ");
    while (!validChoices.includes(choice.toLowerCase())) {
      choice = rlSync.question("Not a valid choice. Rock, Paper, Scissors?\n");
    }
    this.move = choice.toLowerCase();
  }
}

class Computer extends Player {
  constructor() {
    super();
  }

  choose() {
    const choices = ["rock", "paper", "scissors"];
    let randomIndex = Math.floor(Math.random() * choices.length);
    this.move = choices[randomIndex];
  }
}

class RPSGame {
  constructor() {
    this.human = new Human();
    this.computer = new Computer();
  }

  // human = new Human(); // original inaccurate answer
  // computer = new Computer(); 

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  }

  displayGoodBye() {
    console.log("Thanks for playing. Bye now.");
  }

  displayWinner() {
    let humanMove = this.human.move;
    let computerMove = this.computer.move;
    
    console.log(`You chose ${humanMove}`);
    console.log(`Computer chose ${computerMove}\n`);

    let winningCombos = {
      rock: "scissors",
      scissors: "paper",
      paper: "rock"
    }

    let losingCombos = {
      scissors: "rock",
      paper: "scissors",
      rock: "paper"
    }

    if (winningCombos[humanMove] === computerMove) console.log("You win.");
    if (losingCombos[humanMove] === computerMove) console.log("You lose.");
    if (humanMove === computerMove) console.log("Tie!");
  }

  playAgain() {
    let answer;
    console.log("Play again? y/n");
    answer = rlSync.question().toLowerCase();
    while (answer[0] !== "n" && answer[0] !== "y") {
      console.log("What was that? y/n");
      answer = rlSync.question().toLowerCase();
    }
    return answer[0] === "y";
  }

  play() {
    this.displayWelcomeMessage();
    while (true) {
      //console.log(`You previously chose: ${this.human.move}\n`)
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }
    this.displayGoodBye();
  }
}

let game = new RPSGame();

game.play();