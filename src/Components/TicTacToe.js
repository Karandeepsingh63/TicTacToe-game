import React, { useState } from 'react';


const moveSound = new Audio('/sounds/movesound.mp3');
const winSound = new Audio('/sounds/win.mp3');
const resetSound = new Audio('/sounds/reset.mp3');

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXturn, setXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [scores, setScores] = useState({ X: 0, O: 0 });

  const renderSquare = (index) => {
    return (
      <button className="square" onClick={() => handleClick(index)}>
        {board[index]}
      </button>
    );
  };

  const handleClick = (index) => {
    if (board[index] !== null || winner) {
      return;
    }

    
    moveSound.play();

    const newBoard = [...board];
    newBoard[index] = isXturn ? 'X' : 'O';
    setBoard(newBoard);
    setXTurn(!isXturn);

    const winnerCombination = checkWinner(newBoard);
    if (winnerCombination) {
      setWinner(newBoard[winnerCombination[0]]);
    
      const newScores = { ...scores };
      newScores[newBoard[winnerCombination[0]]]++;
      setScores(newScores);
     
      winSound.play();
    }
  };

  const checkWinner = (newBoard) => {
    const combinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < combinations.length; i++) {
      const [a, b, c] = combinations[i];
      if (newBoard[a] && newBoard[a] === newBoard[b] && newBoard[a] === newBoard[c]) {
        return combinations[i];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXTurn(true);
    setWinner(null);
    // Play reset sound
    resetSound.play();
  };

  return (
    <>
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      {winner && <div className="winner-message">{winner} is the winner!</div>}
      <div className="scores">
        <p>Player X: {scores.X}</p>
        <p>Player O: {scores.O}</p>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </>
  );
}
