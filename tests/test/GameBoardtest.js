const expect = require('chai').expect;

const GameBoard = require("../src/gameBoard.js").GameBoard;

describe('calculateWinner', function() {
    let gameBoard = new GameBoard(3)
    context('empty board', function() {
        it('should return null', function() {
            expect(gameBoard.calculateWinner()).to.be.null
        })
    })
    context('board before final round', function() {
        it('should return winner `x` if there is a matching row of x', function() {
            gameBoard.board = [
                ['o', 'x'],
                ['x', 'x', 'x'],
                []
            ]
            expect(gameBoard.calculateWinner()).to.equal('x')
        })
        it('should return winner `o` if there is a matching column of o', function() {
            gameBoard.board = [
                ['x', 'o'],
                ['x', 'o', 'x'],
                [undefined, 'o', 'x']
            ]
            expect(gameBoard.calculateWinner()).to.equal('o')
        })
        it('should return winner `x` if there is a matching diagonal of x', function() {
            gameBoard.board = [
                ['x', 'o'],
                ['o', 'x', 'x'],
                [undefined, 'o', 'x']
            ]
            expect(gameBoard.calculateWinner()).to.equal('x')
        })
        it('should return null if there is no match', function() {
            gameBoard.board = [
                ['x', 'o'],
                ['o', 'x', 'x'],
                [undefined, 'o']
            ]
            expect(gameBoard.calculateWinner()).to.be.null
        })
        it('should return winner `o` if there is a matching diagonal of len of 4 with `o` in board len of 5', function() {
            let gameBoard = new GameBoard(5)
            gameBoard.board = [
                ['x', 'o', undefined, undefined, 'x'],
                ['o', 'x', 'o'],
                [undefined, 'o', 'x', undefined, 'x'], 
                [undefined, 'x', 'o'],
                [undefined, 'o', 'x', 'o']
            ]
            expect(gameBoard.calculateWinner()).to.equal('o')
        })
    })
    context('final round', function() {
        it('should announce tie without no winner', function() {
        let gameBoard = new GameBoard(3)
        gameBoard.board = [
            ['x', 'x', 'o'],
            ['o', 'x', 'x'],
            ['x', 'o', 'o']
        ]
        gameBoard.round = 10
        expect(gameBoard.calculateWinner()).to.equal('It\'s a tie!')
        })
        it('should return winner', function() {
            let gameBoard = new GameBoard(3)
            gameBoard.board = [
                ['x', 'x', 'o'],
                ['o', 'x', 'o'],
                ['x', 'o', 'x']
            ]
            gameBoard.gameRound = 9
            expect(gameBoard.calculateWinner()).to.equal('x')
        })
    })
})
