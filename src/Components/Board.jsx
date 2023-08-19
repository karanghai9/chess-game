import React, { useState } from 'react';
import Square from './Square';
import '../Styles/Board.css';

const Board = () => {
  const [selectedPiece, setSelectedPiece] = useState(null);

  const [pieces, setPieces] = useState(
    [
        [null, null, null, null, null, null, null, null],
        [null, null, null, { type: 'Q', color: 'black' }, { type: 'K', color: 'black' }, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null, null],
        [null, null, null, { type: 'K', color: 'white' }, { type: 'Q', color: 'white' }, null, null, null],
        [null, null, null, null, null, null, null, null],
    ]
);

  const renderSquare = (row, col, piece) => (
    <Square
      key={`${row}-${col}`}
      row={row}
      col={col}
      piece={piece}
    />
  );

return (
    <div className="board">
      {pieces.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((piece, colIndex) =>
            renderSquare(rowIndex, colIndex, piece)
          )}
        </div>
      ))}
    </div>
  );
  
};

export default Board;