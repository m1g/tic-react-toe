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
        console.log(move, player)
        return move === player
      })) {
        this.gameOver()
      }
    }
  }

// ENDS THE GAME IF A WINNING COMBO IS MADE
  gameOver () {
    console.log('player won')
    this.setState({playerWon: true})
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
              <td onClick={() => { this.playerMove(0) }}>{this.state.cells[0]}</td>
              <td onClick={() => { this.playerMove(1) }} className='lr-border'>{this.state.cells[1]}</td>
              <td onClick={() => { this.playerMove(2) }}>{this.state.cells[2]}</td>
            </tr>
            <tr>
              <td onClick={() => { this.playerMove(3) }} className='tb-border'>{this.state.cells[3]}</td>
              <td onClick={() => { this.playerMove(4) }} className='tb-border lr-border'>{this.state.cells[4]}</td>
              <td onClick={() => { this.playerMove(5) }} className='tb-border'>{this.state.cells[5]}</td>
            </tr>
            <tr>
              <td onClick={() => { this.playerMove(6) }}>{this.state.cells[6]}</td>
              <td onClick={() => { this.playerMove(7) }} className='lr-border'>{this.state.cells[7]}</td>
              <td onClick={() => { this.playerMove(8) }}>{this.state.cells[8]}</td>
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
