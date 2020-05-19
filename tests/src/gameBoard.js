"use strict";

class GameBoard {
    constructor(numOfRows) {
        this.numOfRows = numOfRows;
        this.board = this.makeBoard()
        this.round = 1;
        this._winner = null;
    }

    get player() {
        return (this.round% 2 == 0)? "o": "x";
    }

    get winner() {
        if (!this._winner) {
            this._winner = this.calculateWinner();
        }
        return this._winner;
    }

    makeBoard() {
        const arr = [];
        for (let i = 0; i < this.numOfRows; i++) {
            arr.push([])
        }
        return arr
    }

    makeMove(row, column) {
        if (!this.board[row][column]){
            this.board[row][column] = this.player;
            this.round ++;
        }
    }

    calculateWinner() {
        // Check columns and rows
        for (let i = 0; i < this.numOfRows; i++) {
            let row = []
            let col = []
            for (let j = 0; j < this.numOfRows; j++) {
                row.push(this.board[i][j]);
                col.push(this.board[j][i]);
            }
            if (checkForMatch(row)) {
                return row[0];
            } else if (checkForMatch(col)) {
                return col[0];
            }
        }
        // Check  diagonals
        // If playing 5x5 board, diagonals of 4 fields also count for a win
        const diag = (this.numOfRows < 5)? [[], []] : [[],[],[],[],[],[]];

        for (let i = 0; i < this.numOfRows; i++) {
            const j = i + 1;
            // From last index to first
            const k = this.numOfRows - j;
            diag[0].push(this.board[i][i])
            diag[1].push(this.board[k][i])

            
            if (this.numOfRows == 5 && j < 5) {
                diag[2].push(this.board[j][i]);
                diag[3].push(this.board[i][j]);
                diag[4].push(this.board[k - 1][i]);
                diag[5].push(this.board[k][j]);
            }                
        }

        let checkDiag = diag.filter(checkForMatch)
        if (checkDiag.length > 0) {
            return checkDiag[0][0];
        }

        function checkForMatch(arr) {
            return (arr.every( v => v === "x") || arr.every( v => v === "o"));
        }

        // Check if it's final round and still no winner
        if (this.round > Math.pow(this.numOfRows, 2) && !this._winner) {
            return "It's a tie!";
        }
        // If no winner found
        return null;
    }
};

module.exports = {GameBoard};

