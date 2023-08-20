import React from 'react';
import '../Styles/Square.css';

const Square = ({ row, col, piece, selectedPiece, onClick, validPaths, canRemovePieces }) => {
  const isSelected = selectedPiece && selectedPiece.row === row && selectedPiece.col === col;
  const isValidPath = validPaths.some(([pathRow, pathCol]) => pathRow === row && pathCol === col);
  const removablePiece = canRemovePieces.length>0 && canRemovePieces.some(([pathRow, pathCol]) => pathRow === row && pathCol === col);

  const renderPiece = () => {
    if (piece) {
      return (
        <span className={`chess-piece ${piece.color}`}>
          {piece.icon}
        </span>
      );
    }
    return null;
  };

  return (
    <div className={`square ${isSelected ? 'selected' : ''} ${isValidPath ? 'valid-path' : ''} ${removablePiece ? 'removablePiece' : ''}`}
      onClick={() => onClick(row, col)}
    >
      {renderPiece()}
    </div>
  );
};

export default Square;