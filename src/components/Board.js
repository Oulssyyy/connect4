import React from 'react';
import Cell from './Cell';
import './Board.scss'

const Board = ({ board, handleClick }) => {
    return (
      <div className="board">
        {board.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <Cell
                key={colIndex}
                value={cell}
                onClick={() => handleClick(colIndex)}
              />
            ))}
          </div>
        )).reverse()}
      </div>
    );
  };
  
  export default Board;
