import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

function derivedActivePlayer(gameTurns) {
  let currentPlayer = 'X';

    if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
      currentPlayer = 'O';
    }

    return currentPlayer;
}

function App() {
  
//const [activePlayer, setActivePlayer] = useState('X');
const [gameTurns, setGameTurns] = useState([]);

const activePlayer = derivedActivePlayer(gameTurns);

let gameBoard = [...intialGameBoard.map(innerArray => [...innerArray])]; // save copy of original board as array/obj's are reference types

for(const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
}

let winner;

for(const combination of WINNING_COMBINATIONS) {

  const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
  const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
  const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

  if(firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
    winner = firstSquareSymbol;
  }
}

const hasDraw = gameTurns.length === 9 && !winner;

function handleSelectSquare(rowIndex, colIndex) {
  
  setGameTurns(prevTurns => {

    const currentPlayer = derivedActivePlayer(prevTurns);
    const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns];
    return updatedTurns;
  })
}

function handleRestart() {
  setGameTurns([]);
}

  return (
    <main>
      <div id="game-container">
        <ol id='players' className="highlight-player">
          <Player initialName='Player 1' symbol='X' isActive={activePlayer === 'X'} />
          <Player initialName='Player 2' symbol='O' isActive={activePlayer === 'O'} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart} />}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
