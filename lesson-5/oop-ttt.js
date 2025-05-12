let rlSync = require('readline-sync');

class Square {
  static UNUSED_SQUARE = " ";
  static HUMAN_MARKER = "X";
  static COMPUTER_MARKER = "O";

  constructor(marker = Square.UNUSED_SQUARE) {
    this.marker = marker;
  }

  setMarker(marker) {
    this.marker = marker;
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

class Board {
  constructor() {
    this.initializeSquares();
  }

  initializeSquares() {
    this.squares = {};
    for (let idx = 1; idx <= 9; idx++) {
      this.squares[idx] = new Square();
    }
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
    for (let idx = 0; idx <= 12; idx++) {
      console.log(ascii[`row${idx}`]);
    }
  }

  markSquareAt(choice, marker) {
    this.squares[choice].setMarker(marker);
  }

  unusedSquares() {
    let keys = Object.keys(this.squares);
    return keys.filter(key => this.squares[key].isUnused());
  }

  isFull() {
    return this.unusedSquares().length === 0;
  }

  getSquare(key) {
    return this.squares[key];
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

  static BORDER_POSITIONS = {
    1: {top: [1,2], bottom: [3,2], left: [2,1], right: [2,3]},
    2: {top: [1,8], bottom: [3,8], left: [2,7], right: [2,9]},
    3: {top: [1,14], bottom: [3,14], left: [2,13], right: [2,16]},
    4: {top: [5,2], bottom: [7,2], left: [6,1], right: [6,3]},
    5: {top: [5,8], bottom: [7,8], left: [6,7], right: [6,9]},
    6: {top: [5,14], bottom: [7,14], left: [6,13], right: [6,16]},
    7: {top: [9,2], bottom: [11,2], left: [10,1], right: [10,3]},
    8: {top: [9,8], bottom: [11,8], left: [10,7], right: [10,9]},
    9: {top: [9,14], bottom: [11,14], left: [10,13], right: [10,16]}
  }

  constructor() {
    this.board = new Board();
    this.human = new Human();
    this.computer = new Computer();
    this.initializeRelatedSquares();
  }

  initializeRelatedSquares() {
    this.relatedSquares = {};
    for (let square in TTTGame.BORDER_POSITIONS) {
      const borders = TTTGame.BORDER_POSITIONS[square];
      this.relatedSquares[square] = {
        top: {row: borders.top[0], col: borders.top[1]},
        bottom: {row: borders.bottom[0], col: borders.bottom[1]},
        left: {row: borders.left[0], col: borders.left[1]},
        right: {row: borders.right[0], col: borders.right[1]}
      };
    }
  }

  displayWithWinner(winningRow) {
    let ascii = this.board.getTicTacToeASCII();

    winningRow.forEach(key => {
      const bordersOfWinningSquare = this.relatedSquares[key];
      const symbols = {top: "_", bottom: "^", left: "|", right: "|"};

      Object.entries(bordersOfWinningSquare).forEach(([position, coords]) => {
        let row = ascii[`row${coords.row}`].split("");
        row[coords.col] = symbols[position];
        ascii[`row${coords.row}`] = row.join("");
      });
    });

    for (let idx = 0; idx <= 12; idx++) {
      console.log(ascii[`row${idx}`]);
    }
  }

  /*
   * The play method is intentionally longer than our usual method length
   * guidelines. As the main orchestration engine of the game, it provides a
   * clear, sequential view of the game's flow: initialization, turn-taking
   * loop, and game end.
   * While it could be broken into smaller methods, doing so would scatter
   * this flow across multiple methods, making the game's structure harder
   * to understand at a glance. Each line is at an appropriate level of
   * abstraction, delegating details to well-named methods.
   */
  // eslint-disable-next-line max-lines-per-function, max-statements
  play() {
    let firstTimeThrough = true;

    while (true) {
      console.clear();
      if (firstTimeThrough === true) {
        this.displayWelcomeMessage();
        firstTimeThrough = false;
      }
      this.board.display();

      this.humanMoves();
      if (this.gameOver()) {
        console.clear();
        let displayMethod = this.someoneWon()
          ? () => this.displayWithWinner(this.getWinningRow(this.human))
          : () => this.board.display();
        displayMethod();
        break;
      }

      this.computerMoves();
      if (this.gameOver()) {
        console.clear();
        let displayMethod = this.someoneWon()
          ? () => this.displayWithWinner(this.getWinningRow(this.computer))
          : () => this.board.display();
        displayMethod();
        break;
      }
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
    let randomChoice = validChoices[randomIndex];

    this.board.markSquareAt(randomChoice, this.computer.getMarker());
  }

  gameOver() {
    return this.board.isFull() || this.someoneWon();
  }

  someoneWon() {
    return this.isWinner(this.human) || this.isWinner(this.computer);
  }

  isWinner(player) {
    return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
      return this.countMarkersFor(player, row) === 3;
    });
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

  countMarkersFor(player, keys) {
    let count = 0;
    let playerMarker = player.getMarker();
    keys.forEach(key => {
      if (this.board.getSquare(key).getMarker() === playerMarker) count++;
    });
    return count;
  }

  getWinningRow(player) {
    let winningRow;
    TTTGame.POSSIBLE_WINNING_ROWS.forEach(row => {
      if (this.countMarkersFor(player, row) === 3) {
        winningRow = row;
      }
    });
    return winningRow;
  }
}

let game = new TTTGame();
game.play();

