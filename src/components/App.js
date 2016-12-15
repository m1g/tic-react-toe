import React, { Component } from 'react'
import CellItem from './CellItem.js'

class App extends Component {

// SET A CONSTRUCTOR FOR THE INITIAL STATE
  constructor () {
    super()
    this.state = {
      currentPlayer: 'X',
      cells: [
        '', '', '',
        '', '', '',
        '', '', ''
      ],
      won: false
    }
  }

// SELECTS A BOX
  playerMove (position) {
    if (this.state.whoWon) {
      return
    }
    // If the cell hasn't already been played:
    if (this.state.cells[position] === '') {
      // Make a copy of the existing state // Why?
      const newCells = this.state.cells.slice()
      // Set the move for the current player
      newCells[position] = this.state.currentPlayer
      this.setState({ cells: newCells })
      if (!this.check(newCells, this.state.currentPlayer)) {
        if (this.state.currentPlayer === 'X') {
          this.setState({ currentPlayer: 'O' })
        } else {
          this.setState({ currentPlayer: 'X' })
        }
      }
    }
  }

// CHECKS TO SEE IF THE BOX IS A WINNER
  check (cells, player) {
    const winCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    for (var i = 0; i < winCombos.length; i++) {
      let moves = winCombos[i].map((position) => {
        return cells[position]
      })

      if (moves.every((move) => {
        return move === player
      })) {
        this.gameOver(player)
      }
    }
  }

// ENDS THE GAME IF A WINNING COMBO IS MADE
  gameOver (player) {
    console.log('player won')
    this.setState({whoWon: player})
  // Adds the Highlight colors to the winning combo
  // After 3 wins by either player displays a modal to reset
  // Timeout 2 seconds and clears and calls gameReset
  }

// RESETS THE GAME
  gameReset (position) {
    if (gameOver) {
      const newCells = this.state.cells.slice()
      newCells[position] = this.state.currentPlayer
      this.setState({ cells: newCells })
    }
  }
    // Resets the game to its initial state
  // }

  playSound () {
    if (gameOver === true && !this.state.playSound) {
      this.setState({
        playSound: true
      })
    }
  }

  render () {
    return <div>
      <header>
        <h1>Tic React Toe</h1>
      </header>
      <section>
        <table>
          <tbody>
            <tr>
              <td className={this.state.cells[0] === this.state.whoWon ? 'win' : ''} onClick={() => { this.playerMove(0) }}>{this.state.cells[0]}</td>
              <td className={this.state.cells[1] === this.state.whoWon ? 'win lr-border' : 'lr-border'} onClick={() => { this.playerMove(1) }}>{this.state.cells[1]}</td>
              <td className={this.state.cells[2] === this.state.whoWon ? 'win' : ''} onClick={() => { this.playerMove(2) }}>{this.state.cells[2]}</td>
            </tr>
            <tr>
              <td className={this.state.cells[3] === this.state.whoWon ? 'win tb-border' : 'tb-border'} onClick={() => { this.playerMove(3) }}>{this.state.cells[3]}</td>
              <td className={this.state.cells[4] === this.state.whoWon ? 'win tb-border lr-border' : 'tb-border lr-border'} onClick={() => { this.playerMove(4) }}>{this.state.cells[4]}</td>
              <td className={this.state.cells[5] === this.state.whoWon ? 'win tb-border' : 'tb-border'} onClick={() => { this.playerMove(5) }}>{this.state.cells[5]}</td>
            </tr>
            <tr>
              <td className={this.state.cells[6] === this.state.whoWon ? 'win' : ''} onClick={() => { this.playerMove(6) }}>{this.state.cells[6]}</td>
              <td className={this.state.cells[7] === this.state.whoWon ? 'win lr-border' : 'lr-border'} onClick={() => { this.playerMove(7) }}>{this.state.cells[7]}</td>
              <td className={this.state.cells[8] === this.state.whoWon ? 'win' : ''} onClick={() => { this.playerMove(8) }}>{this.state.cells[8]}</td>
            </tr>
          </tbody>
        </table>
        <footer>
          <p>
            &copy; 2016 Miguel Malcolm.
          </p>
        </footer>
      </section>
    </div>
  }
}

export default App
