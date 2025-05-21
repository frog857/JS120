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
      }
    }
    return {
      row1: `+-----+`,
      row2: `|${Card.UNICODE_SUITS[this.suit]}   ${this.rank}|`,
      row3: `|     |`,
      row4: `|${this.rank}   ${Card.UNICODE_SUITS[this.suit]}|`,
      row5: `+-----+`,
    }
  }

  getPlainEnglish() {
    return `${this.getRank(this.rank)} of ${this.getSuit(this.suit)}`;
  }

  getRank(rank) {
    switch(rank) {
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
    shuffleTool(deck)
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

  isBusted() {
    return this.getScore() > BJGame.BLACKJACK ? true : false;
  }

  getScore() {
    let score = 0;
    let faceCards = ["K", "Q", "J"];
    for (let card of this.hand) { // context loss problem?
      if (faceCards.includes(card.rank)) {
        score += 10;
      } else if (card.rank = "A") {
        score += 11;
      } else {
        score += parseInt(card.rank, 10);
      }
    }
    // still need to handle Ace scoring
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
  }

  getCard(game) {
    game.dealer.deal(this);
  }

  handleTurn() {
    //function cont() {rlSync.question("Press enter to continue")} // should this go here?

    console.clear();
    game.display();

    let answer = rlSync.question(`Player ${this.playerNumber}: (h)it, (s)tay, or (d)ouble down?\n`).toLowerCase();
    while (!Player.VALID_MOVES.includes(answer)) {
      answer = rlSync.question("Invalid answer: (h)it, (s)tay, or (d)ouble down?").toLowerCase();
    }
    
    let turnOngoing = true;
    while (turnOngoing) {
      if (answer === "hit" || answer === "h") {
        console.log(this.hand);
        this.getCard(game);
        console.log(this.hand);
        this.cont()
        break;
        if (this.isBusted()) {
          turnOngoing = false;
          console.log(`That's ${this.getScore()}. You busted!\n`);
          console.log(`Your cards are: ${this.hand.map(card => card.getPlainEnglish()).join(", ")}`);
          this.cont();
        } 
        console.log(`Your cards are: ${this.hand.map(card => card.getPlainEnglish()).join(", ")}`);
        this.cont();
      }

      if (answer === "stay" || answer === "s") {
        turnOngoing = false;
        console.log(`You've stayed. Your cards are: ${this.hand.map(card => card.getPlainEnglish()).join(", ")}`);
        this.cont();
      }
    }

  }

  cont() {
    rlSync.question("Press enter to continue")
  }

  doubleDown() {

  }
}

class Dealer extends Participant {

  constructor() {
    super();
    //STUB
    // What sort of state does a dealer need?
    // Score? Hand? Deck of cards? Bow tie?
    this.deck = new Deck();
  }


  hide() {
    //STUB
  }

  reveal() {
    //STUB
    // maybe this should go in the game engine?
  }

  deal(participant) {
    participant.hand.push(this.deck.cards.pop());
    // does the dealer or the deck deal? => dealer. Because in larger games may need multiple decks
  }
}

class BJGame {
  static MIN_BET = 1;
  static MAX_BET = 10;
  static BLACKJACK = 21;
  static DEALER_HIT_LIMIT = 17;
  static VALID_PLAYER_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
  static NUM_OF_PLAYERS;

  constructor() {
    this.players = [];
    this.dealer = new Dealer();

  }

  start() {
    //SPIKE
    this.displayWelcomeMessage();
    this.handlePlayersInitialization();

    while (true) {
      this.collectBets();
      this.dealARound();
      this.dealARound();
      this.display();
      this.players.forEach(player => {
        player.handleTurn();
      })
      break;
      this.dealerTurn();
    
      this.payout();
      if (!this.playAgain) break;
    }

    this.displayGoodbyeMessage();
  }

  playAgain() {
    //STUB
  }

  dealARound() {
    this.players.forEach(player => this.dealer.deal(player));
    this.dealer.deal(this.dealer);
  }

  getNumberOfPlayers() {
    let answer = rlSync.question("How many folks are playing? (Max 8)\n");
    let numAnswer = parseInt(answer, 10);
    while (!Number.isInteger(numAnswer) || !BJGame.VALID_PLAYER_NUMBERS.includes(numAnswer)) {
      answer = rlSync.question("Invalid choice. Choose a number from 1-8.\n");
    }
    return numAnswer;
  }

  handlePlayersInitialization() {
    BJGame.NUM_OF_PLAYERS = this.getNumberOfPlayers();
    for (let idx = 1; idx <= BJGame.NUM_OF_PLAYERS; idx++) {
      let player = new Player(idx);
      this.players.push(player);
    }
  }

  collectBets() {
    console.clear();
    this.displayWelcomeMessage();
    console.log(`Welcome. You each have ${Player.DEFAULT_MONEY_AMOUNT} chips to start. `)
    console.log("");

    for (let player of this.players) {
      let answer = parseInt(rlSync.question(`Player ${player.playerNumber}, place your wager: `), 10);
      if (!Number.isInteger(answer) || answer > BJGame.MAX_BET || answer < BJGame.MIN_BET) {
        answer = parseInt(rlSync.question(`Enter a whole number between the min wager (${BJGame.MIN_BET}) and the max wager (${BJGame.MAX_BET})`), 10)
      }
      if (answer > player.money) {
        answer = parseInt(rlSync.question(`You don't have enough bread. Enter a bet less than ${player.money + 1}: `), 10)
      }
      player.wager = answer;
    }
    console.log("");
    rlSync.question("Bets are in! Press enter to start the round!")
  }

  displayDealer(hiddenBoolean) {
    let asciiCardArr = this.dealer.hand.map(card => card.getASCII());
    
    let dealerRows = {
      row1: ``,
      row2: ``,
      row3: ``,
      row4: ``,
      row5: ``,
    }

    Object.keys(dealerRows).forEach((row, idx) => {
        let rowStr = `|   `;
        asciiCardArr.forEach(asciiCard => {
          rowStr += asciiCard[`row${idx + 1}`];
          rowStr += `   `;
        })
        dealerRows[row] = rowStr.trim() + `   |`;
    })

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
    console.log("|   Dealer Showing:     |");
    for (let row in dealerRows) {
      console.log(dealerRows[row]);
    }
    console.log("+" + "-".repeat(dealerRows.row1.length - 2) + "+");
    console.log("");

  }

  display(hidden = true, playerTurn = undefined) {
    // Display dealer's cards in ASCII FORM
    // diplay player cards in a row with PlayerX indicated
    this.displayDealer(hidden);

    this.players.forEach(player => {
      let playerCards = `Player ${player.playerNumber}'s cards: ${player.hand[0].getPlainEnglish()}, ${player.hand[1].getPlainEnglish()}`;
      console.log("-".repeat(playerCards.length));
      console.log(playerCards);

      let chipMessage = `Player ${player.playerNumber}'s wager: ${player.wager} chips`
      player.wager === 1 ? console.log(chipMessage.slice(0, chipMessage.length - 1)) : console.log(chipMessage);
      console.log("");
    });
  }
  

  playerTurns() {
    //STUB
  }

  dealerTurn() {
    //STUB
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
    //STUB
  }

  displayResult() {
    //STUB
  }

  payout() {
    //STUB
  }
}

let game = new BJGame();
game.start();




/*
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