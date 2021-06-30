"use strict";

const board = document.querySelector(".container");
const resetBtn = document.querySelector(".reset");
let temp = document.querySelectorAll(".dot");

function togglePlayerTurn() {
  temp[0].classList.toggle("active");
  temp[1].classList.toggle("active");
}

board.addEventListener("click", (e) => {
  //   console.log(e.target.dataset.index);
  let [row, col] = [e.target.dataset.index[0], e.target.dataset.index[1]];
  console.log(row, col);

  togglePlayerTurn();
  mGame.makeMove(row, col);

  //   console.log(temp);
});

resetBtn.addEventListener("click", () => {
  mGame.resetGame();
});

class Game {
  board = [Array(3).fill(""), Array(3).fill(""), Array(3).fill("")];
  player1 = "X";
  player2 = "O";
  players = { player1: "X", player2: "O" };
  curPlayerTurn = "X";
  gameWon = 0;
  numMoves = 0;

  makeMove(row, col) {
    if (!this.gameWon) {
      if (this.board[row][col] == "") {
        // console.log(row, col);
        this.board[row][col] = this.curPlayerTurn;
        this.updateBoard(row, col);
        this.checkWon()
          ? alert(`${this.curPlayerTurn} has won!`)
          : this.changeTurn();
      }
    }
  }

  changeTurn() {
    this.curPlayerTurn == this.player1
      ? (this.curPlayerTurn = this.player2)
      : (this.curPlayerTurn = this.player1);
  }

  checkWon() {
    //TODO redo with turnary and short circuiting once logic is in place
    let boardT = this.transpose();
    let winArray = [];
    for (let i = 0; i < this.board[0].length; i++) {
      winArray.push(this.board[i].reduce((acc, val) => acc + val));
      winArray.push(boardT[i].reduce((acc, val) => acc + val));
    }
    winArray.push(this.board[0][0] + this.board[1][1] + this.board[2][2]);
    winArray.push(this.board[2][0] + this.board[1][1] + this.board[2][0]);

    let winningStr =
      this.curPlayerTurn + this.curPlayerTurn + this.curPlayerTurn;
    winArray.includes(winningStr) ? (this.gameWon = 1) : (this.gameWon = 0);
    return this.gameWon;
  }

  transpose() {
    return this.board[0].map((col, i) => this.board.map((row) => row[i]));
  }

  updateBoard(row, col) {
    console.log(typeof row, typeof col);
    if (typeof row != "string" && typeof col != "string") {
      //   console.log("$$$$$$$$$$$$");
      row = row.toString();
      col = col.toString();
      //   console.log(row + col);
    }
    let updateCell = document.body.querySelector(
      `.square[data-index="${row + col}"`
    );
    // console.log(`${row + col}`);
    console.log(updateCell);
    updateCell.innerHTML = this.curPlayerTurn;
  }

  resetGame() {
    this.gameWon = 0;
    this.numMoves = 0;
    this.curPlayerTurn = "";
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        this.board[i][j] = "";
        this.updateBoard(i, j);
      }
    }
    togglePlayerTurn();
    this.curPlayerTurn = this.player1;
  }
}

let mGame = new Game();
