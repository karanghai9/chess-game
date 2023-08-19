import React, { useState } from 'react';
import Square from './Square';
import '../Styles/Board.css';

const Board = () => {
  const [selectedPiece, setSelectedPiece] = useState(null);

  const pieces = [
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
    ];

  const renderSquare = (row, col) => (
    <Square
      key={`${row}-${col}`}
      row={row}
      col={col}
    />
  );

return (
    <div className="board">
      {pieces.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((eachPiece, colIndex) =>
            renderSquare(rowIndex, colIndex)
          )}
        </div>
      ))}
    </div>
  );
  
};

export default Board;