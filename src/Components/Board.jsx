import React, { useState, useEffect } from 'react';
import Square from './Square';
import '../Styles/Board.css';

const Board = () => {
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [flip, setFlip] = useState(false);
    const [boardStyling, setBoardStyling] = useState('rotateAnimationWhite 2s forwards');
    const [validPaths, setValidPaths] = useState([]);

    const [pieces, setPieces] = useState(
        [
            [null, null, null, null, null, null, null, null],
            [null, null, null, { icon: '\u265B', type: 'Q', color: 'black' }, { icon: '\u265E', type: 'K', color: 'black' }, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null],
            [null, null, null, { icon: '\u2658', type: 'K', color: 'white' }, { icon: '\u2655', type: 'Q', color: 'white' }, null, null, null],
            [null, null, null, null, null, null, null, null],
        ]
    );

    useEffect(() => {
        if (flip === false) {
            setBoardStyling('rotateAnimationWhite 2s forwards')
        }
        else setBoardStyling('rotateAnimationBlack 2s forwards')
    }, [flip]);

    const getQueenMoves = (row, col) => {
        const validMoves = [];
        return validMoves;
    };

    const getKnightMoves = (row, col) => {
        const validMoves = [];
    
        const possibleMoves = [
            [-2, -1], [-2, 1], [-1, -2], [-1, 2],
            [1, -2], [1, 2], [2, -1], [2, 1]
        ];
    
        possibleMoves.forEach(([rowOffset, colOffset]) => {
            const newRow = row + rowOffset;
            const newCol = col + colOffset;
            if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
                validMoves.push([newRow, newCol]);
            }
        });
    
        return validMoves;
    };

    const handleSquareClick = (row, col) => {
        if (!selectedPiece) {
            if (pieces[row][col]) {
              setSelectedPiece({ row, col });
              const selectedPieceType = pieces[row][col]?.type;
                if (selectedPieceType) {
                    const validPaths = selectedPieceType === 'Q' ? getQueenMoves(row, col) : selectedPieceType === 'K' ? getKnightMoves(row, col) : [];
                    setValidPaths(validPaths);
                }
            }
            return;
        }
        if (row === selectedPiece.row && col === selectedPiece.col) {
            setSelectedPiece(null);
            setValidPaths([]);
            return;
        }
    };

    const renderSquare = (row, col, piece) => {
        return <Square
            key={`${row}-${col}`}
            row={row}
            col={col}
            piece={piece}
            selectedPiece={selectedPiece}
            validPaths={validPaths}
            onClick={handleSquareClick}
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