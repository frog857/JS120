let rlSync = require("readline-sync");

function RPSGame() {
  this.human = new Human();
  this.computer = new Computer();
}

RPSGame.prototype.displayWelcomeMessage = function() {
  console.log("Welcome to Rock, Paper, Scissors!");
}

RPSGame.prototype.displayGoodBye = function() {
  console.log("Thanks for playing. Bye now.");
}

RPSGame.prototype.displayWinner = function() {
  let humanMove = this.human.move;
  let computerMove = this.computer.move;
  
  console.log(`You chose ${this.human.move}`);
  console.log(`Computer chose ${this.computer.move}\n`);

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

RPSGame.prototype.playAgain = function() {
  let answer;
  console.log("Play again? y/n");
  answer = rlSync.question().toLowerCase();
  while (answer[0] !== "n" && answer[0] !== "y") {
    console.log("What was that? y/n");
    answer = rlSync.question().toLowerCase();
  }
  return answer[0] === "y";
}

RPSGame.prototype.play = function() {
  this.displayWelcomeMessage();
  while (true) {
    this.human.choose();
    this.computer.choose();
    this.displayWinner();
    if (!this.playAgain()) break;
  }
  this.displayGoodBye();
}

function Player() {
  this.move = null;
}

function Human() {
  Player.call(this);
}

console.log(Human.prototype);
Human.prototype = Object.create(Player.prototype); // this code allows Human to inherit from Player. Must come before adding instance methods
console.log(Human.prototype);

Human.prototype.choose = function() {
  let choice;
  const validChoices = ["rock", "paper", "scissors"];
  choice = rlSync.question("Your Turn: Rock, Paper, Scissors?\n=> ");
  while (!validChoices.includes(choice.toLowerCase())) {
    choice = rlSync.question("Not a valid choice. Rock, Paper, Scissors?\n");
  }
  this.move = choice.toLowerCase();
}

console.log(Human.prototype);

//console.log(Human.prototype.constructor);
Human.prototype.constructor = Human;
//console.log(Human.prototype.constructor);



function Computer() {
  Player.call(this);
}

Computer.prototype.choose = function() {
  const choices = ["rock", "paper", "scissors"];
  let randomIndex = Math.floor(Math.random() * choices.length);
  this.move = choices[randomIndex];
}

Computer.prototype.constructor = Computer;

let game = new RPSGame();

console.log(RPSGame.prototype.constructor);
RPSGame.prototype.constructor = RPSGame;
console.log(RPSGame.prototype.constructor);

game.play()