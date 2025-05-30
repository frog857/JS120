/*
Lint issue categories I don't know solution for:

- using rlSync.question to control user flow is not allowed...
- using static properties and instances of orchestration engine class (constructor function) outside of said class
- main game flow too many lines & statements
- some line lengths are violated, but seems more readable to me
*/

/*
Bonus features to add later:
- let players name themselves
- "double down" option
- "split" option
*/

let rlSync = require("readline-sync");
let shuffleTool = require("shuffle-array");

class Card {
  static UNICODE_SUITS = {
    H: "♥",
    D: "♦",
    C: "♣",
    S: "♠"
  }

  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  getASCII() {
    if (this.rank === '10') {
      return {
        row1: `+-----+`,
        row2: `|${Card.UNICODE_SUITS[this.suit]}  ${this.rank}|`,
        row3: `|     |`,
        row4: `|${this.rank}  ${Card.UNICODE_SUITS[this.suit]}|`,
        row5: `+-----+`,
      };
    }
    return {
      row1: `+-----+`,
      row2: `|${Card.UNICODE_SUITS[this.suit]}   ${this.rank}|`,
      row3: `|     |`,
      row4: `|${this.rank}   ${Card.UNICODE_SUITS[this.suit]}|`,
      row5: `+-----+`,
    };
  }

  getPlainEnglish() {
    return `${this.getRank(this.rank)} of ${this.getSuit(this.suit)}`;
  }

  getRank(rank) {
    switch (rank) {
      case '2': return 'Two';
      case '3': return 'Three';
      case '4': return 'Four';
      case '5': return 'Five';
      case '6': return 'Six';
      case '7': return 'Seven';
      case '8': return 'Eight';
      case '9': return 'Nine';
      case '10': return 'Ten';
      case 'J': return 'Jack';
      case 'Q': return 'Queen';
      case 'K': return 'King';
      case 'A': return 'Ace';
    }
    return undefined;
  }

  getSuit(suit) {
    switch (suit) {
      case 'H': return 'Hearts';
      case 'S': return 'Spades';
      case 'D': return 'Diamonds';
      case 'C': return 'Clubs';
    }
    return undefined;
  }
}

class Deck {
  static suits = ['H', 'D', 'C', 'S'];
  static ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  constructor() {
    this.cards = this.initializeShuffledDeck();
  }

  initializeShuffledDeck() {
    let deck = [];
    for (let suit of Deck.suits) {
      for (let rank of Deck.ranks) {
        deck.push(new Card(rank, suit));
      }
    }
    shuffleTool(deck);
    return deck;
  }
}

class Participant {
  constructor() {
    this.hand = [];
  }

  hit() {
    //STUB
  }

  stay() {
    //STUB
  }

  getCard(game) {
    game.dealer.deal(this);
  }

  isBusted() {
    return this.getScore() > BJGame.BLACKJACK;
  }

  getScore() {
    let score = 0;
    let faceCards = ["K", "Q", "J"];
    for (let card of this.hand) {
      if (faceCards.includes(card.rank)) {
        score += 10;
      } else if (card.rank === "A") {
        score += 11;
      } else {
        score += parseInt(card.rank, 10);
      }
    }
    this.hand.filter(card => card.rank === "A").forEach(_ace => {
      if (score > BJGame.BLACKJACK) score -= 10;
    });

    return score;
  }
}


class Player extends Participant {
  static DEFAULT_MONEY_AMOUNT = 10;
  static VALID_MOVES = ["s", "stay", "h", "hit", "d", "double down", "double", "dd"];

  constructor(playerNumber) {
    super();
    this.playerNumber = playerNumber;
    this.money = Player.DEFAULT_MONEY_AMOUNT;
    this.wager = undefined;
    this.hasStayed = undefined;
  }

  handleTurn() {
    console.clear();
    game.display();

    while (true) {
      let answer = rlSync.question(`Player ${this.playerNumber}: (h)it or (s)tay?\n`).toLowerCase();
      while (!Player.VALID_MOVES.includes(answer)) {
        answer = rlSync.question("Invalid answer: (h)it or (s)tay?").toLowerCase();
      }

      if (answer === "hit" || answer === "h") this.handleHit();
      if (answer === "stay" || answer === "s") {
        console.log(`You've stayed. Your cards are: ${this.hand.map(card => card.getPlainEnglish()).join(", ")}`);
        this.hasStayed = true;
        this.cont();
        break;
      }
    }

  }

  handleHit() {
    this.getCard(game);
    if (this.isBusted()) {
      console.log(`Your cards are: ${this.hand.map(card => card.getPlainEnglish()).join(", ")}`);
      console.log(`That's ${this.getScore()}. You busted!\n`);
      this.cont();
    } else {
      let successfulHitMessage = `Your cards are: ${this.hand.map(card => card.getPlainEnglish()).join(", ")}`;
      console.log(successfulHitMessage);
      console.log("-".repeat(successfulHitMessage.length));
    }
  }

  cont() {
    rlSync.question("Press enter to continue"); // does this really go here?
  }

  doubleDown() {
    // STUB can add later. gotta move on to this exam lolol
  }
}

class Dealer extends Participant {

  constructor() {
    super();
    this.deck = new Deck();
  }

  handleTurn() {
    while (this.getScore() < BJGame.DEALER_HIT_LIMIT) {
      this.getCard(game);
      console.clear();
      game.display(false, false, true);
      console.log("Dealer Hits!");
      console.log(`Dealers Total: ${this.getScore()}`);
      this.getScore() > BJGame.BLACKJACK ?
        rlSync.question(`Dealer Busted! Press Enter to Continue`) :
        rlSync.question(`Press Enter to continue`);
    }

    if (!this.isBusted()) {
      console.clear();
      game.display(false, false, true);
      console.log(`Dealer Stays. Score: ${this.getScore()}`);
      rlSync.question("(Press Enter to continue)");
    }
  }

  deal(participant) {
    participant.hand.push(this.deck.cards.pop());
  }
}

class BJGame {
  static MIN_BET = 1;
  static BLACKJACK = 21;
  static DEALER_HIT_LIMIT = 17;
  static VALID_PLAYER_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
  static NUM_OF_PLAYERS;

  constructor() {
    this.players = [];
    this.dealer = undefined;

  }

  start() {
    this.displayWelcomeMessage();
    this.handlePlayersInitialization();
    let firstTime = true;

    while (true) {
      this.dealer = new Dealer();
      this.players.forEach(player => {
        player.hand = [];
        player.hasStayed = false;
      });
      this.collectBets(firstTime);
      this.dealARound();
      this.dealARound();
      this.display();
      this.players.forEach(player => {
        player.handleTurn();
      });
      this.display(true, false, true);
      this.dealerTurn();
      this.displayPayout();
      firstTime = false;
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  }

  playAgain() {
    console.log("");
    let answer = rlSync.question("Another round? (y/n): ").toLowerCase();
    while (answer[0] !== "y" && answer[0] !== "n") {
      answer = rlSync.question("Invalid answer. Enter y or n: ").toLowerCase();
    }
    return answer[0] === "y";
  }

  dealARound() {
    this.players.forEach(player => this.dealer.deal(player));
    this.dealer.deal(this.dealer);
  }

  getNumberOfPlayers() {
    let answer = rlSync.question("How many folks are playing? (Max 8)\n");
    let numAnswer = parseInt(answer, 10);
    while (!Number.isInteger(numAnswer) || !BJGame.VALID_PLAYER_NUMBERS.includes(numAnswer)) {
      numAnswer = parseInt(rlSync.question("Invalid choice. Choose a number from 1-8.\n"), 10);
    }
    return numAnswer;
  }

  handlePlayersInitialization() {
    BJGame.NUM_OF_PLAYERS = this.getNumberOfPlayers();
    for (let idx = 1; idx <= BJGame.NUM_OF_PLAYERS; idx++) {
      let player = new Player(idx);
      this.players.push(player);
    }

    // STUB: let players name themselves
  }

  collectBets(firstTime) {

    console.clear();
    this.displayWelcomeMessage();

    if (firstTime) {
      this.handleFirstTime();
    } else {
      this.handleOtherTimes();
    }

    for (let player of this.players) {
      let answer = parseInt(rlSync.question(`Player ${player.playerNumber}, place your wager: `), 10);

      while (!Number.isInteger(answer) || answer < BJGame.MIN_BET || answer > player.money) {
        answer = parseInt(rlSync.question(`Enter a whole number between ${BJGame.MIN_BET} and ${player.money}: `), 10);
      }
      player.wager = answer;
    }

    console.log("");
    rlSync.question("Bets are in! Press enter to start the round!");
  }

  handleFirstTime() {
    let singlePlayerMessage = `Welcome. You have ${Player.DEFAULT_MONEY_AMOUNT} chips to start.`;
    let multiplayerMessage = `Welcome, all. You each have ${Player.DEFAULT_MONEY_AMOUNT} chips to start.`;

    this.players.length === 1 ? console.log(singlePlayerMessage) : console.log(multiplayerMessage);
    console.log("");
  }

  handleOtherTimes() {
    let playerArrCopy = [...this.players];
    playerArrCopy.forEach(player => {
      if (player.money === 0) {
        console.log(`Player ${player.playerNumber} went bust! Please enjoy watching your friends, Player ${player.playerNumber}`);
        this.players.splice(player.playerNumber - 1, 1);
      } else {
        console.log(`Player ${player.playerNumber} chips: ${player.money}`);
      }
    });
    console.log("");
  }

  displayDealerASCII(hiddenBoolean) {
    let asciiCardArr = this.dealer.hand.map(card => card.getASCII());

    let dealerRows = {
      row1: ``,
      row2: ``,
      row3: ``,
      row4: ``,
      row5: ``,
    };

    Object.keys(dealerRows).forEach((row, idx) => {
      let rowStr = `|   `;
      asciiCardArr.forEach(asciiCard => {
        rowStr += asciiCard[`row${idx + 1}`];
        rowStr += `   `;
      });
      dealerRows[row] = rowStr.trim() + `   |`;
    });

    if (hiddenBoolean) {
      let [row2Arr, row4Arr] = [[...dealerRows.row2], [...dealerRows.row4]];

      row2Arr.splice(15, 1, "?");
      row2Arr.splice(18, 1, " "); // in case it's a 10
      row2Arr.splice(19, 1, "?");
      dealerRows.row2 = row2Arr.join("");

      row4Arr.splice(15, 1, "?");
      row4Arr.splice(16, 1, " ");
      row4Arr.splice(19, 1, "?");
      dealerRows.row4 = row4Arr.join("");
    }


    console.clear();
    console.log("+" + "-".repeat(dealerRows.row1.length - 2) + "+");
    console.log(`|   Dealer Showing:${" ".repeat(dealerRows.row1.length - 20)}|`);
    for (let row in dealerRows) {
      console.log(dealerRows[row]);
    }
    console.log("+" + "-".repeat(dealerRows.row1.length - 2) + "+");
    console.log("");

  }

  displayPlayerScores() {
    this.players.forEach(player => {
      let bustedMessage = `Player ${player.playerNumber}: Busted`;
      let nonBustedMessage = `Player ${player.playerNumber}: ${player.getScore()} (${player.hand.map(card => card.getPlainEnglish()).join(", ")})`;

      player.isBusted() ? console.log(bustedMessage) : console.log(nonBustedMessage);
    });
  }

  displayPlayerTurns() {
    this.players.forEach(player => {
      let playerCards = [];
      player.hand.forEach(card => {
        playerCards.push(card.getPlainEnglish());
      });

      let playerCardsMessage = `Player ${player.playerNumber}'s cards: ${playerCards.join(", ")}`;
      console.log("-".repeat(playerCardsMessage.length));
      console.log(playerCardsMessage);

      let chipMessage = `Player ${player.playerNumber}'s wager: ${player.wager} chips`;
      player.wager === 1 ? // I don't get this linter error... "Expected an assignment or function call and instead saw an expression"
        console.log(chipMessage.slice(0, chipMessage.length - 1)) :
        console.log(chipMessage);

      if (player.isBusted()) {
        console.log(`BUSTED: ${player.getScore()}`);
      } else if (player.hasStayed) {
        console.log(`STAYED: ${player.getScore()}`);
      } else {
        console.log("");
      }
    });
  }

  display(dealerHidden = true, playerTurns = true, playerScores = false) {
    this.displayDealerASCII(dealerHidden);

    if (playerTurns) {
      this.displayPlayerTurns();
    }

    if (playerScores) {
      this.displayPlayerScores();
    }

    console.log("");
    console.log("♥ ♦ ♣ ♠ ".repeat(6));
  }

  dealerTurn() {
    let continueMessage = "Players' hands finished. Press enter for Dealer Turn";
    console.log("-".repeat(continueMessage.length));
    rlSync.question(continueMessage);

    let [dealerHidden, playerTurns, playerScores] = [false, false, true];
    let revealMessage = "Dealer's cards revealed! Press Enter for dealer to play";

    console.clear();
    this.display(dealerHidden, playerTurns, playerScores); // is this the way to do this? or just put fft as args...
    console.log("-".repeat(revealMessage.length));
    rlSync.question(revealMessage);

    this.dealer.handleTurn();
  }

  displayWelcomeMessage() {
    console.clear();
    console.log(".__________________________________.");
    console.log("|♠ ♣ ♥ ♦  ♠ ♣ ♥ ♦  ♠ ♣ ♥ ♦  ♠ ♣ ♥ ♦|");
    console.log("|----------------------------------|");
    console.log("|  Welcome to Terminal Blackjack!  |");
    console.log("|----------------------------------|");
    console.log("|♠ ♣ ♥ ♦  ♠ ♣ ♥ ♦  ♠ ♣ ♥ ♦  ♠ ♣ ♥ ♦|");
    console.log("|__________________________________|");
    console.log("");
  }

  displayGoodbyeMessage() {
    console.clear();
    console.log(".__________________________________.");
    console.log("|♠ ♣ ♥ ♦  ♠ ♣ ♥ ♦  ♠ ♣ ♥ ♦  ♠ ♣ ♥ ♦|");
    console.log("|----------------------------------|");
    console.log("|  Thanks for Playing Blackjack!   |");
    console.log("|----------------------------------|");
    console.log("|♠ ♣ ♥ ♦  ♠ ♣ ♥ ♦  ♠ ♣ ♥ ♦  ♠ ♣ ♥ ♦|");
    console.log("|__________________________________|");
    console.log("");
    console.log("Final Results:");
    console.log("");
    this.players.forEach(player => {
      console.log(`Player ${player.playerNumber}'s ending purse: ${player.money}`);
    });
    console.log("");
  }

  payout() {
    let bustedPlayers = this.players.filter(player => player.isBusted());
    let nonBustedPlayers = this.players.filter(player => !player.isBusted());

    bustedPlayers.forEach(player => {
      player.money -= player.wager;
    });

    if (this.dealer.isBusted()) {
      nonBustedPlayers.forEach(player => {
        player.money += player.wager;
      });
    } else {
      nonBustedPlayers.forEach(player => {
        if (player.getScore() > this.dealer.getScore()) {
          player.money += player.wager;
        } else if (player.getScore() < this.dealer.getScore()) {
          player.money -= player.wager;
        }
      });
    }
  }

  displayPayout() {
    this.display(false, false, true);
    rlSync.question("Calculating payout... (enter to continue)");
    this.payout();

    this.players.forEach(player => {
      if (player.isBusted()) {
        console.log(`Player ${player.playerNumber} busted! ${player.wager} chips deducted from purse.`);
      } else if (player.getScore() > this.dealer.getScore() || this.dealer.isBusted()) {
        console.log(`Player ${player.playerNumber} beat the dealer! ${player.wager} chips added to purse.`);
      } else if (player.getScore() < this.dealer.getScore()) {
        console.log(`Player ${player.playerNumber} lost to the dealer! ${player.wager} chips deducted from purse.`);
      } else {
        console.log(`Player ${player.playerNumber} tied the dealer. Bet was returned.`);
      }
    });
    console.log("♥ ♦ ♣ ♠ ".repeat(6));
    console.log("");
    rlSync.question("Press Enter to Continue");
  }
}

let game = new BJGame();
game.start();


/* Add later
      // if dd
        // get card from dealer
        // check if busted
          // you busted!
          // break
        // cl(you've doubled down. Your turn is over. Enter to continue)
      if (answer[0] === "d") {
        console.log("You've doubled down!");
        cont();
      }
*/