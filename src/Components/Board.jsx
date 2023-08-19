import React, { useState, useEffect } from 'react';
import Square from './Square';
import '../Styles/Board.css';

const Board = () => {
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [flip, setFlip] = useState(false);
    const [boardStyling, setBoardStyling] = useState('rotateAnimationWhite 2s forwards');

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

    useEffect(() => {
        if (flip === false) {
            setBoardStyling('rotateAnimationWhite 2s forwards')
        }
        else setBoardStyling('rotateAnimationBlack 2s forwards')
    }, [flip]);

    const renderSquare = (row, col, piece) => {
        return <Square
            key={`${row}-${col}`}
            row={row}
            col={col}
            piece={piece}
        />
    };

    const flipBoard = () => {
        setFlip(prevFlip => !prevFlip);
    }

    return (
        <>
            <div className="board" style={{ animation: boardStyling }}>
                {pieces.map((row, rowIndex) => (
                    <div className="row" key={rowIndex}>
                        {row.map((piece, colIndex) =>
                            renderSquare(rowIndex, colIndex, piece)
                        )}
                    </div>
                ))}
            </div>
            <div className='turn'>
                <button onClick={flipBoard} className="flipBoardButton">Flip Board</button>
            </div>
        </>
    );

};

export default Board;