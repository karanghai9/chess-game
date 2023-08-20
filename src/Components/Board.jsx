import React, { useState, useEffect } from 'react';
import Square from './Square';
import '../Styles/Board.css';

const Board = () => {
    const [selectedPiece, setSelectedPiece] = useState(null);
    const [flip, setFlip] = useState(false);
    const [boardStyling, setBoardStyling] = useState('rotateAnimationWhite 2s forwards');
    const [validPaths, setValidPaths] = useState([]);
    const [turn, setTurn] = useState('white');
    const [canRemovePieces, setcanRemovePieces] = useState([]);
    const [gameEnded, setGameEnded] = useState(false);
    const [winner, setWinner] = useState(null);

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
        const canRemovePieceArr = [];

        // Horizontal moves
        for (let i = col + 1; i < 8; i++) {
            if (!pieces[row][i]) {
                validMoves.push([row, i]); //Row would be fixed and all col values will be pushed.
            }
            else {
                if (pieces[row][i].color !== turn) {
                    canRemovePieceArr.push([row, i]);
                }
                break;
            }
        }
        for (let i = col - 1; i >= 0; i--) {
            if (!pieces[row][i]) {
                validMoves.push([row, i]); //Row would be fixed and all col values will be pushed.
            }
            else {
                if (pieces[row][i].color !== turn) {
                    canRemovePieceArr.push([row, i]);
                }
                break;
            }
        }

        // Vertical moves
        for (let i = row + 1; i < 8; i++) {
            if (!pieces[i][col]) {
                validMoves.push([i, col]); //Col would be fixed and all row values will be pushed.
            }
            else {
                if (pieces[i][col].color !== turn) {
                    canRemovePieceArr.push([i, col]);
                }
                break;
            }
        }
        for (let i = row - 1; i >= 0; i--) {
            if (!pieces[i][col]) {
                validMoves.push([i, col]); //Col would be fixed and all row values will be pushed.
            }
            else {
                if (pieces[i][col].color !== turn) {
                    canRemovePieceArr.push([i, col]);
                }
                break;
            }
        }

        // Diagonal moves
        for (let rowOffset = -1; rowOffset <= 1; rowOffset += 2) { //we need to add +1 and -1 in current row pos
            for (let colOffset = -1; colOffset <= 1; colOffset += 2) { //we need to add +1 and -1 in current col pos
                let newRow = row + rowOffset; //finding new indices of rows with +1 and -1
                let newCol = col + colOffset; //finding new indices of cols with +1 and -1
                while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) { //to limit the indices within 8*8 matrix
                    if (!pieces[newRow][newCol]) {
                        validMoves.push([newRow, newCol]);
                    }
                    else {
                        if (pieces[newRow][newCol].color !== turn) {
                            canRemovePieceArr.push([newRow, newCol]);
                        }
                        break; // Stop adding positions if there's a piece
                    }
                    newRow += rowOffset;
                    newCol += colOffset;
                }
            }
        }
        setcanRemovePieces(canRemovePieceArr)
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
                const targetPiece = pieces[newRow][newCol];
                if (!targetPiece) {
                    validMoves.push([newRow, newCol]);
                } else if (targetPiece.color !== turn) {
                    validMoves.push([newRow, newCol]);
                    setcanRemovePieces(prevCanRemovePieces => [...prevCanRemovePieces, [newRow, newCol]]);
                }
            }
        });

        return validMoves;
    };

    const isPathClear = (fromRow, fromCol, toRow, toCol, direction) => {
        const rowStep = Math.sign(toRow - fromRow);
        const colStep = Math.sign(toCol - fromCol);

        let currentRow = fromRow + rowStep;
        let currentCol = fromCol + colStep;

        while (currentRow !== toRow || currentCol !== toCol) {
            if (pieces[currentRow][currentCol]) {
                return false; // Found a piece in the path, so exit.
            }

            if (direction === 'horizontal') {
                currentCol += colStep;
            } else if (direction === 'vertical') {
                currentRow += rowStep;
            } else if (direction === 'diagonal') {
                currentRow += rowStep;
                currentCol += colStep;
            }
        }
        return true; // Path is clear
    };

    const isMoveValid = (fromRow, fromCol, toRow, toCol, selectedPieceType) => {
        const rowDiff = Math.abs(toRow - fromRow);
        const colDiff = Math.abs(toCol - fromCol);

        if (selectedPieceType === 'K') { // for knight
            if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
                if (pieces[toRow][toCol] && pieces[toRow][toCol].color === turn) {
                    return false; //Square is already occupied by a piece
                }
                return true; //Square is unoccupied
            }
            return false; //Selected square doesn't lie inside the path
        }
        else if (selectedPieceType === 'Q') { //for queen
            if (
                (fromRow === toRow && isPathClear(fromRow, fromCol, toRow, toCol, 'horizontal')) ||
                (fromCol === toCol && isPathClear(fromRow, fromCol, toRow, toCol, 'vertical')) ||
                (rowDiff === colDiff && isPathClear(fromRow, fromCol, toRow, toCol, 'diagonal'))
            ) {
                if (pieces[toRow][toCol] && pieces[toRow][toCol].color === turn) {
                    return false; //Square is already occupied by a piece
                }
                return true; //Square is unoccupied
            }
            return false; //Selected square doesn't lie inside the path
        }
    };

    const handleSquareClick = (row, col) => {
        if (!gameEnded) {
            if (!selectedPiece) { //if there exists no pre-selected piece
                if (pieces[row][col] && pieces[row][col].color === turn) {
                    setSelectedPiece({ row, col });
                    const selectedPieceType = pieces[row][col]?.type;
                    if (selectedPieceType) {
                        const validPaths = selectedPieceType === 'Q' ? getQueenMoves(row, col) : selectedPieceType === 'K' ? getKnightMoves(row, col) : [];
                        setValidPaths(validPaths);
                    }
                }
                return;
            }
            if (row === selectedPiece.row && col === selectedPiece.col) {  //if we've clicked the already selected piece again
                setSelectedPiece(null);
                setValidPaths([]);
                setcanRemovePieces([])
                return;
            }
            const selectedPieceType = pieces[selectedPiece.row][selectedPiece.col]?.type;
            if (isMoveValid(selectedPiece.row, selectedPiece.col, row, col, selectedPieceType) && selectedPieceType) {
                setcanRemovePieces([]);
                const newPieces = [...pieces];
                const capturedPiece = newPieces[row][col];
                newPieces[row][col] = newPieces[selectedPiece.row][selectedPiece.col];
                newPieces[selectedPiece.row][selectedPiece.col] = null;

                if (selectedPieceType === 'Q' && capturedPiece?.type === 'Q' && capturedPiece?.color !== turn) {
                    // Check if the move captures the opponent's queen
                    setGameEnded(true);
                    setWinner(turn === 'white' ? 'black' : 'white');
                } else if (selectedPieceType === 'K' && capturedPiece?.type === 'Q' && capturedPiece?.color !== turn) {
                    // Check if the move captures the opponent's queen
                    setGameEnded(true);
                    setWinner(turn === 'white' ? 'black' : 'white');
                }

                setPieces(newPieces);
                setTurn(turn === 'white' ? 'black' : 'white');
                setSelectedPiece(null);
                setValidPaths([]);
            }
            else {
                setcanRemovePieces([]);
                setSelectedPiece(null);
                setValidPaths([]);
            }
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
            canRemovePieces={canRemovePieces}
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
                {gameEnded ? `Game Over, ${winner === 'white' ? 'Black' : 'White'} won!` : `${turn}'s turn`}
                <button onClick={flipBoard} className="flipBoardButton">Flip Board</button>
            </div>
        </>
    );

};

export default Board;