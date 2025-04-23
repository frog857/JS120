let rlSync = require("readline-sync");

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },

  displayGoodBye() {
    console.log("Thanks for playing. Bye now.");
  },

  displayWinner() {
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
  },

  playAgain() {
    let answer;
    console.log("Play again? y/n");
    answer = rlSync.question().toLowerCase();
    while (answer[0] !== "n" && answer[0] !== "y") {
      console.log("What was that? y/n");
      answer = rlSync.question().toLowerCase();
    }
    return answer[0] === "y";
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.human.choose();
      this.computer.choose();
      this.displayWinner();
      if (!this.playAgain()) break;
    }
    this.displayGoodBye();
  }
}

// function createPlayer(playerType) {
//   return {
//     playerType,
//     move: null,

//     choose() {
//       if (this.isHuman()) {
//         let choice;

//         const validChoices = ["rock", "paper", "scissors"];
//         choice = rlSync.question("Your Turn: Rock, Paper, Scissors?\n=> ");
//         while (!validChoices.includes(choice.toLowerCase())) {
//           choice = rlSync.question("Not a valid choice. Rock, Paper, Scissors?");
//         }
        
//         this.move = choice.toLowerCase();

//       } else {
//         const choices = ["rock", "paper", "scissors"];
//         let randomIndex = Math.floor(Math.random() * choices.length);
//         this.move = choices[randomIndex];
//       }
//     },

//     isHuman() {
//       return this.playerType === "human";
//     }

//   }
// }

function createPlayer() {
  return {
    move: null
  }
}

function createHuman() {
  let playerObject = createPlayer();
  
  let humanObject = {
    choose() {
      let choice;
      const validChoices = ["rock", "paper", "scissors"];
      choice = rlSync.question("Your Turn: Rock, Paper, Scissors?\n=> ");
      while (!validChoices.includes(choice.toLowerCase())) {
        choice = rlSync.question("Not a valid choice. Rock, Paper, Scissors?");
      }
      this.move = choice.toLowerCase();
    }
  }
  return Object.assign(playerObject, humanObject);
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    choose() {
      const choices = ["rock", "paper", "scissors"];
      let randomIndex = Math.floor(Math.random() * choices.length);
      this.move = choices[randomIndex];
    }
  }

  return Object.assign(playerObject, computerObject);
}

RPSGame.play();