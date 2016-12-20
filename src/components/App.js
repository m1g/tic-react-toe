import React, { Component } from 'react'
// import CellItem from './CellItem.js'

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
      won: false,
      wins: {
        X: 0,
        O: 0
      }
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
        // this.gameOver(player)

        // Essentially copy the existing state
        const wins = {
          X: this.state.wins.X,
          O: this.state.wins.O
        }
        wins[player] = wins[player] + 1

        this.setState({ won: true, wins: wins })
        setTimeout(() => { this.gameReset() }, 2000)
        return true
      }
    }
  }

// RESETS THE GAME
  gameReset () {
    this.setState({
      cells: [
        '', '', '',
        '', '', '',
        '', '', ''
      ],
      won: false
    })
  }

  // playSound () {
  //   if (gameOver === true && !this.state.playSound) {
  //     this.setState({
  //       playSound: true
  //     })
  //   }
  // }

  getClassForCell (position) {
    if (this.state.won) {
      if (this.state.currentPlayer === this.state.cells[position]) {
        return 'win'
      } else {
        return 'lose'
      }
    }
  }

  render () {
    return <div>
      <section>
        <header>
          <h1>Tic React Toe</h1>
        </header>
        <table>
          <tbody>
            <tr>
              <td className={this.getClassForCell(0)} onClick={() => { this.playerMove(0) }}>{this.state.cells[0]}</td>
              <td className={this.getClassForCell(1) + ' lr-border'} onClick={() => { this.playerMove(1) }}>{this.state.cells[1]}</td>
              <td className={this.getClassForCell(2)} onClick={() => { this.playerMove(2) }}>{this.state.cells[2]}</td>
            </tr>
            <tr>
              <td className={this.getClassForCell(3) + ' tb-border'} onClick={() => { this.playerMove(3) }}>{this.state.cells[3]}</td>
              <td className={this.getClassForCell(4) + ' tb-border lr-border'} onClick={() => { this.playerMove(4) }}>{this.state.cells[4]}</td>
              <td className={this.getClassForCell(5) + ' tb-border'} onClick={() => { this.playerMove(5) }}>{this.state.cells[5]}</td>
            </tr>
            <tr>
              <td className={this.getClassForCell(6)} onClick={() => { this.playerMove(6) }}>{this.state.cells[6]}</td>
              <td className={this.getClassForCell(7) + ' lr-border'} onClick={() => { this.playerMove(7) }}>{this.state.cells[7]}</td>
              <td className={this.getClassForCell(8)} onClick={() => { this.playerMove(8) }}>{this.state.cells[8]}</td>
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
