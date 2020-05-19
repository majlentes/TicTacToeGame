"use strict";


// MODEL
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
    

class View {
    constructor() {
        this.container = document.querySelector(".boardContainer");        
    }

    renderBoard(board, numOfRows) {
        let template, rowTemplate, fieldTemplate, field, row, dataIndex;

        template = document.querySelector("template");
        rowTemplate = template.content.querySelector(".boardRow");
        fieldTemplate = template.content.querySelector("button");
        //  Each time render in place of previous
        this.container.innerHTML= "";

        for (let i = 0; i < numOfRows; i++) {
            row = document.importNode(rowTemplate, false);
            row.dataset.rowIndex += i
            this.container.appendChild(row);
            for (let j = 0; j < numOfRows; j++) {
                field = document.importNode(fieldTemplate, true);
                field.dataset.colIndex += j;
                if (!!board[i][j]) {
                    field.textContent = board[i][j];
                    field.style.border = "none";
                } else {field.textContent = "_"}
                row.appendChild(field);
            }
        }
    }

    renderWinner(winner) {
        document.querySelector("#result").innerHTML = 
            (!!winner && winner.length === 1)? `Player <span id="win">${winner}</span> won!` : winner;
    }

    renderInfo(player, round) {
        document.querySelector("#currentPlayer").textContent = player;
        document.querySelector('#round').textContent = round;
    }
}

class Controller {
    constructor() {
        // Default game version 3x3 board
        this.model = new GameBoard(3);
        this.view = new View();

        this.updateView();

        const boardSize = document.querySelector(".chooseSize");
        boardSize.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") this.makeModel(parseInt(e.target.value));        
        });

        this.view.container.addEventListener("click", (e) => {
            if (e.target.className === "boardField" && !this.model.winner) {
                let row = parseInt(e.target.parentElement.dataset.rowIndex);
                let col = parseInt(e.target.dataset.colIndex);
                this.makeMove(row, col)
            }
        });
    }

    makeModel(numOfRows) {
        this.model = new GameBoard(numOfRows);
        this.updateView();
    }

    makeMove(row, col) {
        this.model.makeMove(row, col)
        this.updateView();
    }

    announceWinner(winner) {
        this.view.renderWinner(winner)
    }

    updateView() {
        this.view.renderBoard(this.model.board, this.model.numOfRows);
        if (!this.model.winner) {
            // If winner is found stop updating round info
            this.view.renderInfo(this.model.player, this.model.round);
        }
        this.view.renderWinner(this.model.winner) 
    }
}

let app = new Controller


