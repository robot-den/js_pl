import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button className="square" onClick={ props.onClick }>
      { props.value }
    </button>
  );
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cells: Array(9).fill(null),
      xIsNext: true,
    }
  }

  renderSquare(i) {
    return (
      <Square
        value={ this.state.cells[i] }
        onClick={ () => this.handleClick(i) }
      />
    )
  }

  handleClick(i) {
    const cells = this.state.cells.slice()
    if (calculateWinner(cells) || cells[i]) {
      return;
    }

    cells[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      cells: cells,
      xIsNext: !this.state.xIsNext,
    })
  }

  status() {
    const winner = calculateWinner(this.state.cells)
    if (winner) {
      return 'Winner: ' + winner;
    };

    return 'Next player: ' + ( this.state.xIsNext ? 'X' : 'O' );
  }

  render() {
    return (
      <div>
        <div className="status">{this.status()}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(cells) {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c] = winLines[i];
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return cells[a];
    }
  }
  return null;
}
