import React from 'react';
import '../Styles/Square.css';

const Square = ({ row, col, piece }) => {

  return (
    <div className={"square"}>
      {piece && piece.type}
    </div>
  );
};

export default Square;