import React, { Component } from 'react'

class CellItem extends Component {

  render () {
    // Code that creates an 'X' or an 'O' image to insert into the Cells
    const active = this.props.isPlayerX ? styles.active : null
    return <td
      className={`${styles.root} ${active}`}
      onClick={this.props.playerMove} />
  }
}

export default CellItem
