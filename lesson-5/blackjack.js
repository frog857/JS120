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
    })

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
    this.hasStayed = false;
  }

  getCard(game) {
    game.dealer.deal(this);
  }

  handleTurn() {
    //function cont() {rlSync.question("Press enter to continue")} // should this go here?

    console.clear();
    game.display();

    while (true) {
      let answer = rlSync.question(`Player ${this.playerNumber}: (h)it, (s)tay, or (d)ouble down?\n`).toLowerCase();
      while (!Player.VALID_MOVES.includes(answer)) {
        answer = rlSync.question("Invalid answer: (h)it, (s)tay, or (d)ouble down?").toLowerCase();
      }

      if (answer === "hit" || answer === "h") {
        this.getCard(game);
        if (this.isBusted()) {
          console.log(`Your cards are: ${this.hand.map(card => card.getPlainEnglish()).join(", ")}`);
          console.log(`That's ${this.getScore()}. You busted!\n`);
          this.cont();
          break;
        } 

        let successfulHitMessage = `Your cards are: ${this.hand.map(card => card.getPlainEnglish()).join(", ")}`;
        console.log(successfulHitMessage);
        console.log("-".repeat(successfulHitMessage.length));
      }

      if (answer === "stay" || answer === "s") {
        console.log(`You've stayed. Your cards are: ${this.hand.map(card => card.getPlainEnglish()).join(", ")}`);
        this.hasStayed = true;
        this.cont();
        break;
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

  handleTurn() {
    while (this.getScore() < BJGame.DEALER_HIT_LIMIT) {
      this.getCard(game);
      console.log("Dealer Hits!");
      console.log(`Dealers Hand: ${this.hand.forEach(card => console.log(card.getPlainEnglish()))}`);
      rlSync.question("Press Enter to continue");
    }
    console.log("Dealer Stays");
    rlSync.question("Press Enter to continue");
  }

  getCard(game) {
    game.dealer.deal(this);
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
      this.display(true, false, true);
      this.dealerTurn();
      this.displayPayout();
      if (!this.playAgain()) break;
    }

    this.displayGoodbyeMessage();
  }

  playAgain() {
    let answer = rlSync.question("play again? (y/n)").toLowerCase();
    return answer === "y" ? true : false;
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

  collectBets() {
    console.clear();
    this.displayWelcomeMessage();
    console.log(`Welcome. You each have ${Player.DEFAULT_MONEY_AMOUNT} chips to start. `)
    console.log("");

    for (let player of this.players) {
      let answer = parseInt(rlSync.question(`Player ${player.playerNumber}, place your wager: `), 10);

      while (!Number.isInteger(answer) || answer > BJGame.MAX_BET || answer < BJGame.MIN_BET || answer > player.money) {
        answer = parseInt(rlSync.question(`Enter a whole number between the min wager (${BJGame.MIN_BET}) and the max wager (${BJGame.MAX_BET})`), 10)
      }
      
      player.wager = answer;
    }
    console.log("");
    rlSync.question("Bets are in! Press enter to start the round!")
  }

  displayDealerASCII(hiddenBoolean) {
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

  displayPlayerScores() {
    this.players.forEach(player => {
      let bustedMessage = `Player ${player.playerNumber}: Busted`;
      let nonBustedMessage = `Player ${player.playerNumber}: ${player.getScore()} (${player.hand.map(card => card.getPlainEnglish()).join(", ")})`;
      player.isBusted() ? console.log(bustedMessage) : console.log(nonBustedMessage);
    })
  }

  displayPlayerTurns() {
    this.players.forEach(player => {
      //let playerCards = `Player ${player.playerNumber}'s cards: ${player.hand[0].getPlainEnglish()}, ${player.hand[1].getPlainEnglish()}`;
      let playerCards = [];
      player.hand.forEach(card => {
        playerCards.push(card.getPlainEnglish())
      })
      let playerCardsMessage = `Player ${player.playerNumber}'s cards: ${playerCards.join(", ")}`;
      console.log("-".repeat(playerCardsMessage.length));
      console.log(playerCardsMessage);

      let chipMessage = `Player ${player.playerNumber}'s wager: ${player.wager} chips`
      player.wager === 1 ? console.log(chipMessage.slice(0, chipMessage.length - 1)) : console.log(chipMessage);

      if (player.isBusted()) {
        console.log("BUSTED");
      } else if (player.hasStayed) {
        console.log("STAYED");
      } else {
        console.log("")
      }
    });
  }

  display(dealerHidden = true, playerTurns = true, playerScores = false) {
    // Display dealer's cards in ASCII FORM
    // diplay player cards in a row with PlayerX indicated
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

    let [dealerHidden, playerTurns, playerScores] = [false, false, true]
    console.clear();
    this.display(dealerHidden, playerTurns, playerScores);
    rlSync.question("Dealer's cards revealed! Press Enter for dealer to play")
    
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
    //STUB
  }

  displayResult() {
    //STUB
  }

  payout() {
    // all busted players minus their wager
    let bustedPlayers = this.players.filter(player => player.isBusted());
    let nonBustedPlayers = this.players.filter(player => !player.isBusted());

    bustedPlayers.forEach(player => {
      player.money -= player.wager;
    })
    // if dealer is busted, 
      // all players not busted get paid
    if (this.dealer.isBusted()) {
      nonBustedPlayers.forEach(player => {
        player.money += player.wager;
      })
    } else {
      let dealerScore = this.dealer.getScore();
      nonBustedPlayers.forEach(player => {
        let playerScore = player.getScore();
        if (playerScore > dealerScore) {
          player.money += player.wager;
        } else if (playerScore < dealerScore) {
          player.money -= player.wager;
        } else {
         // push, nothing happens  
        }
      })
    }
    // if dealer is not busted
      // loop over all not busted players
      // if player score is greater than dealer score
        // player += wager
      // if player score is less than dealer score
        // player -= wager
      // if player score is equal
        // push: purse is unchanged
    

  }

  displayPayout() {
    this.display(false, false, true);
    rlSync.question("Calculating payout... press enter to continue");
    this.payout();
    this.players.forEach(player => {
      if (player.isBusted()) {
        console.log(`Player ${player.playerNumber} busted! ${player.wager} chips deducted from purse.`);
      } else if (player.getScore() > this.dealer.getScore()) {
        console.log(`Player ${player.playerNumber} beat the dealer! ${player.wager} chips added to purse.`);
      } else if (player.getScore() > this.dealer.getScore()) {
        console.log(`Player ${player.playerNumber} lost to the dealer! ${player.wager} chips deducted from purse.`);
      } else {
        console.log(`Player ${player.playerNumber} tied the dealer. Bet was returned.`);
      }
    })
    console.log("♥ ♦ ♣ ♠ ".repeat(6));
    rlSync.question("Press Enter to Continue");
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