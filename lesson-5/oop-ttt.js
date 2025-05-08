let rlSync = require('readline-sync');

class Board {
  constructor() {
    this.squares = {};
    for (let i = 1; i <= 9; i++) {
      this.squares[i] = new Square();
    }
    this.relatedSquares = {
      "1": { top: {row:1, col:2}, bottom: {row:3, col:2}, left: {row:2, col:1}, right: {row:2, col:3} },
      "2": { top: {row:1, col:8}, bottom: {row:3, col:8}, left: {row:2, col:7}, right: {row:2, col:9} },
      "3": { top: {row:1, col:14}, bottom: {row:3, col:14}, left: {row:2, col:13}, right: {row:2, col:16} },
      "4": { top: {row:5, col:2}, bottom: {row:7, col:2}, left: {row:6, col:1}, right: {row:6, col:3} },
      "5": { top: {row:5, col:8}, bottom: {row:7, col:8}, left: {row:6, col:7}, right: {row:6, col:9} },
      "6": { top: {row:5, col:14}, bottom: {row:7, col:14}, left: {row:6, col:13}, right: {row:6, col:16} },
      "7": { top: {row:9, col:2}, bottom: {row:11, col:2}, left: {row:10, col:1}, right: {row:10, col:3} },
      "8": { top: {row:9, col:8}, bottom: {row:11, col:8}, left: {row:10, col:7}, right: {row:10, col:9} },
      "9": { top: {row:9, col:14}, bottom: {row:11, col:14}, left: {row:10, col:13}, right: {row:10, col:16} }
    };
    
   }

   getTicTacToeASCII() {
    
    return {
      row0: ``,
      row1: `     |     |   `,
      row2: `  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`,
      row3: `     |     |   `,
      row4: `-----+-----+-----`,
      row5: `     |     |   `,
      row6: `  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`,
      row7: `     |     |   `,
      row8: `-----+-----+-----`,
      row9: `     |     |   `,
      row10: `  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`,
      row11: `     |     |   `,
      row12: ``,
    };
   }

   display() {
    let ascii = this.getTicTacToeASCII();
    for (let i = 0; i <= 12; i++) {
      console.log(ascii[`row${i}`]);
    }
  }
  
   markSquareAt(choice, marker) {
    this.squares[choice].setMarker(marker)
   }

   unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
   }

   isFull() {
    return this.unusedSquares().length === 0;
   }

   countMarkersFor(player, keys) {
    // takes the player and keys as parameters
    // determines the number of player markers at the given keys, returns that number
    let count = 0;
    let playerMarker = player.getMarker();
    keys.forEach(key => {
      //console.log(playerMarker, this.board.squares[key].getMarker())
      if (this.squares[key].getMarker() === playerMarker) count++;
    }) 
    return count;
  }

  getWinningRow(player) {
    let winningRow;
    TTTGame.POSSIBLE_WINNING_ROWS.forEach(row => {
      if (this.countMarkersFor(player, row) === 3) {
        winningRow = row;
      }
    })
    return winningRow;
  }

  displayWithWinner(player, winningRow) {
    let ascii = this.getTicTacToeASCII();
    
    winningRow.forEach(key => {

      let top = this.relatedSquares[key]["top"];
      let bottom = this.relatedSquares[key]["bottom"];
      let left = this.relatedSquares[key]["left"];
      let right = this.relatedSquares[key]["right"];
      
      //let sideArr = [this.relatedSquares[key]["top"], this.relatedSquares[key]["bottom"], this.relatedSquares[key]["left"], this.relatedSquares[key]["right"]];
      // let sideArr = [[top, "_"], [bottom, "^"], [left, "|"], [right, "|"]];

      // for (let i = 0; i < sideArr.length; i++) {
      //   let side = sideArr[i];
      //   console.log(side);
      //   let asciiStrArr = ascii[`row${side[0]["row"]}`].split("");
      //   asciiStrArr[side["col"]] = side[1];
      //   ascii[`row${side["row"]}`] = asciiStrArr.join("");
      //   console.log(ascii);
      // }

      let asciiStrArr = ascii[`row${top["row"]}`].split("");
      asciiStrArr[top["col"]] = "_";
      ascii[`row${top["row"]}`] = asciiStrArr.join("");

      asciiStrArr = ascii[`row${bottom["row"]}`].split("");
      asciiStrArr[bottom["col"]] = "^";
      ascii[`row${bottom["row"]}`] = asciiStrArr.join("");

      asciiStrArr = ascii[`row${right["row"]}`].split("");
      asciiStrArr[right["col"]] = "|";
      ascii[`row${right["row"]}`] = asciiStrArr.join("");

      asciiStrArr = ascii[`row${left["row"]}`].split("");
      asciiStrArr[left["col"]] = "|";
      ascii[`row${left["row"]}`] = asciiStrArr.join("");

      // ascii[`row${bottom["row"]}`][bottom["col"]] = "_";
      // ascii[`row${left["row"]}`][left["col"]] = "|";
      // ascii[`row${right["row"]}`][right["col"]] = "|";
    })

    for (let i = 0; i <= 12; i++) {
      console.log(ascii[`row${i}`]);
    }
    // get the winning squares. i.e. squareOne = "1", squareTwo = "2", squareThree = "3"
    // switch case for all 8 possible winnin combos... No...
    // data structure for the ASCII art... yes?
  }



}

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  setMarker(marker) {
    this.marker = marker
  }

  getMarker() {
    return this.marker;
  }

  toString() {
    return this.marker;
  }

  isUnused() {
    return this.marker === Square.UNUSED_SQUARE;
  }
}

class Player {
  constructor(marker) {
    this.marker = marker;
  }

  getMarker() {
    return this.marker;
  }
}

class Human extends Player {
  constructor() {
    super(Square.HUMAN_MARKER); 
  }
}

class Computer extends Player {
  constructor() {
    super(Square.COMPUTER_MARKER); 
  }
}

class TTTGame {
  static POSSIBLE_WINNING_ROWS = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["1", "5", "9"],
    ["7", "5", "3"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["3", "6", "9"],
  ]
  
  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
  }

  play() {
    this.displayWelcomeMessage();

    while (true) {
      console.clear();
      //console.log(this.board)
      this.board.display();

      this.humanMoves();
      if (this.gameOver()) {
        console.clear();
        this.someoneWon() ? this.board.displayWithWinner(this.human, this.board.getWinningRow(this.human)) 
                          : this.board.display();
        break;
      };

      this.computerMoves();
      if (this.gameOver()) {
        console.clear();
        this.someoneWon() ? this.board.displayWithWinner(this.computer, this.board.getWinningRow(this.computer)) 
                          : this.board.display();
        break;
      };
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

  humanMoves() {
    let answer;

    let validAnswers = this.board.unusedSquares();
    const prompt = `Choose a square: ${validAnswers.join(", ")}: `;
    answer = rlSync.question(prompt);

    while (!validAnswers.includes(answer)) {
      console.log(`Invalid Choice. Pick a number between 1 and 9 that is not taken.`);
      answer = rlSync.question(prompt);
    }

    this.board.markSquareAt(answer, this.human.getMarker());
  }

  computerMoves() {
    let validChoices = this.board.unusedSquares();
    let randomIndex = Math.floor(Math.random() * validChoices.length);

    this.board.markSquareAt(this.board.unusedSquares()[randomIndex], this.computer.getMarker());
  }

  gameOver() {
    //STUB
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.board.countMarkersFor(player, row) === 3;
    })
  }

  displayWinner() {
    if (this.isWinner(this.human)) {
      console.log(`You win!`);
    } else if (this.isWinner(this.computer)) {
      console.log(`I win. HA`);
    } else {
      console.log(`Tie game...`);
    }
  }

}

let game = new TTTGame();
game.play();

