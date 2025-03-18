const RPSGame = {
  human: createPlayer('human'),
  computer: createPlayer('computer'),

  displayWelcomeMessage() {
    console.log("Welcome to Rock, Paper, Scissors!");
  },

  displayGoodBye() {
    console.log("Thanks for playing. Bye now.");
  },

  play() {
    this.displayWelcomeMessage();
    this.human.choose();
    this.computer.choose();
    compareMoves();
    displayWinner();
    this.displayGoodBye();
  }
}

function createPlayer(playerType) {
  return {
    playerType,
    move: null,

    choose() {
      if (this.isHuman()) {

      } else {
        const choices = ["rock", "paper", "scissors"];
        let randomIndex = Math.floor(Math.random() * choices.length);
        this.move = choices[randomIndex];
      }
    },

    isHuman() {
      return this.playerType === "human";
    }

  }
}

RPSGame.play;