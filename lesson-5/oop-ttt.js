class Board {
  constructor() {
    // STUB
    // displays the board (the state of the board) 
    // EDIT: tracks the state of the board. display is elsewhere
    this.squares = {
      1: new Square(" "),
      2: new Square(" "),
      3: new Square(" "),
      4: new Square(" "),
      5: new Square(" "),
      6: new Square(" "),
      7: new Square(" "),
      8: new Square(" "),
      9: new Square(" "),
    }
  }

  display() {
    //STUB
    // show the status of the board as it is
    console.log("");
    console.log(`     |     |`);
    console.log(`  ${this.squares["1"].render()}  |  ${this.squares["2"].render()}  |   ${this.squares["3"].render()}`);
    console.log(`     |     |`);
    console.log(`-----+-----+------`);
    console.log(`     |     |`);
    console.log(`  ${this.squares["4"].render()}  |  ${this.squares["5"].render()}  |   ${this.squares["6"].render()}`);
    console.log(`     |     |`);
    console.log(`-----+-----+------`);
    console.log(`     |     |`);
    console.log(`  ${this.squares["5"].render()}  |  ${this.squares["8"].render()}  |   ${this.squares["9"].render()}`);
    console.log(`     |     |`);
    console.log("");
  }

}

class Row {
  constructor() {
    //STUB
    // identifies when 3 player markers are in a row
  }
}

class Square {
  constructor(marker) {
    //STUB
    // Accepts a marker to fill a square
    this.marker = marker;
  }

  render() {
    return this.marker;
  }
}

class Marker {
  constructor() {
    //STUB
    // Fills a spot on the Board
  }
}

class Player {
  constructor() {
    //STUB 
    // maybe a "marker" prop to track if player is X, O, or custom
  }

  play() {
    // STUB
    // indicates the players turn? The player choosing to play?
  }

  mark() {
    //STUB
    // mutates the board
    // fills with the correct marker
  }
}

class Human extends Player {
  constructor() {
    //STUB
  }
}

class Computer extends Player {
  constructor() {
    //STUB
  }
}

class TTTGame {
  constructor() {
    //STUB
    // could put info here about custom board sizes? custom row requirements determined from this?
    // constructs the board and creates the players
    this.board = new Board();
  }

  play() {
    //SPIKE
    this.displayWelcomeMessage();

    while (true) {
      this.board.display();

      this.playerMoves();
      if (this.gameOver()) break;
      
      this.board.display();

      this.computerMoves();
      if (this.gameOver()) break;
      
      break;
    }
    
    this.displayWinner();
    this.displayGoodbyeMessage();
  }

  displayWelcomeMessage() {
    console.log("Welcome to Tic-Tac-Toe!");
  }

  displayGoodbyeMessage() {
    console.log("Thanks for playing. Bye!");
  }

  playerMoves() {
    // STUB
    // allows the player to choose a square
  }

  computerMoves() {
    //STUB
    //computer chooses a square. Optimally? Different modes? Depending on how well player is doing?
  }

  gameOver() {
    //STUB
    // determines if there's any rows on the board currently
  }

  displayWinner() {
    //STUB
    // shows if computer or player won
    // highlights (encircles) the marks on the board???
  }

}

let game = new TTTGame();
game.play();

