import React from 'react';
import '../Styles/Square.css';

const Square = ({ row, col, piece }) => {

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
    <div className={"square"}>
      {renderPiece()}
    </div>
  );
};

export default Square;