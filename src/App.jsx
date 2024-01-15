import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import { useState } from "react"
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./Winning_combinations";
import GameOver from "./components/GameOver";

const InitialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

const driveActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

const driveGameBoard = (gameTurns) => {
  let gameBoard = [...InitialGameBoard.map((array) => [...array])];
  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

const driveWinner = (gameBoard, players) => {
  let winner;
  for (let combination of WINNING_COMBINATIONS) {
    let firstSymbol = gameBoard[combination[0].row][combination[0].column];
    let secondSymbol = gameBoard[combination[1].row][combination[1].column];
    let thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSymbol && firstSymbol === secondSymbol && firstSymbol === thirdSymbol) {
      winner = players[firstSymbol];
    }
  }
  return winner;
}



function App() {
  // const [activePlayer, setActivePlayer] = useState('X');
  const [gameTurns, setGameTurns] = useState([]);
  const [players, setPlayers] = useState({ 'X': "player1", 'O': "player2" });

  const activePlayer = driveActivePlayer(gameTurns);
  const gameBoard = driveGameBoard(gameTurns);
  const winner = driveWinner(gameBoard, players);

  const draw = gameTurns.length === 9 && !winner;

  const handelActivePlayer = (rowIndex, colIndex) => {
    // setActivePlayer((active) => active === 'X' ? 'O' : 'X');
    setGameTurns((prev) => {
      // let currentPlayer = 'X';
      // if (prev.length > 0 && prev[0].player === 'X') {
      //   currentPlayer = 'O';
      // }
      let currentPlayer = driveActivePlayer(prev);
      const updatedGameTurns = [{ square: { row: rowIndex, col: colIndex }, player: currentPlayer }, ...prev];
      return updatedGameTurns;
    });
  }

  const handelRestart = () => {
    setGameTurns([]);
  }

  const handelPlayer = (symbol, newName) => {
    setPlayers((prev) => {
      return { ...prev, [symbol]: newName }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="player 1" symbol="X" isActive={activePlayer === 'X'} onChangePlayer={handelPlayer} />
          <Player initialName="player 2" symbol="O" isActive={activePlayer === 'O'} onChangePlayer={handelPlayer} />
        </ol>
        {(winner || draw) && <GameOver winner={winner} onRestart={handelRestart} />}
        <GameBoard onSelect={handelActivePlayer} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
