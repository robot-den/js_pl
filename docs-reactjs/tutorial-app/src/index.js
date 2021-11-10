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
  renderSquare(i) {
    return (
      <Square
        value={ this.props.cells[i] }
        onClick={ () => this.props.onClick(i) }
      />
    )
  }

  render() {
    return (
      <div>
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
  constructor(props) {
    super(props)
    this.state = {
      history: [{
        cells: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const cells = history[history.length - 1].cells.slice();
    if (calculateWinner(cells) || cells[i]) {
      return;
    };

    cells[i] = this.state.xIsNext ? 'X' : 'O';
    history.push({ cells: cells });

    this.setState({
      history: history,
      stepNumber: history.length - 1,
      xIsNext: !this.state.xIsNext,
    })
  }

  jumpTo(index) {
    const history = this.state.history.slice(index + 1);

    this.setState({
      stepNumber: index,
      xIsNext: (index % 2) === 0,
    })
  }

  statusStr(cells) {
    const winner = calculateWinner(cells);
    if (winner) {
      return 'Winner: ' + winner;
    };

    return 'Next player: ' + ( this.state.xIsNext ? 'X' : 'O' );
  }

  moves() {
    return this.state.history.map((value, index) => {
      const desc = index ? ('Go to step # ' + index) : 'Go to game start';

      return (
        <li key={index}>
          <button onClick={() => this.jumpTo(index)}>{desc}</button>
        </li>
      );
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const status = this.statusStr(current.cells);

    return (
      <div className="game">
        <div className="game-board">
          <Board
            cells={ current.cells }
            onClick={ (i) => this.handleClick(i) }
          />
        </div>
        <div className="game-info">
          <div className="status">{ status }</div>
          <ol>{ this.moves() }</ol>
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
