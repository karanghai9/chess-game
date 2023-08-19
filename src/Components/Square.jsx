import React from 'react';
import '../Styles/Square.css';

const Square = ({ row, col, piece, selectedPiece, onClick }) => {
  const isSelected = selectedPiece && selectedPiece.row === row && selectedPiece.col === col;

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
    <div className={`square ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(row, col)}
    >
      {renderPiece()}
    </div>
  );
};

export default Square;