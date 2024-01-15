import React, { useState } from 'react';


export default function GameBoard({ onSelect, board }) {
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);
    // const handelClick = (rowIndex, colIndex) => {
    //     setGameBoard((prevGameBoard) => {
    //         const updatedGameBoard = [...prevGameBoard.map((innerArrays) => [...innerArrays])];
    //         updatedGameBoard[rowIndex][colIndex] = activeSymbol;
    //         return updatedGameBoard;
    //     });
    //     onSelect();
    // }



    return (
        <ol id='game-board'>
            {board.map((row, rowIndex) => (
                <li key={rowIndex}>
                    <ol>
                        {row.map((Symbol, colIndex) => (
                            <li key={colIndex}>
                                <button onClick={() => onSelect(rowIndex, colIndex)} disabled={Symbol !== null}>{Symbol}</button>
                            </li>
                        ))}
                    </ol>
                </li>
            ))}
        </ol>
    )
}