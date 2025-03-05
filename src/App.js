import React, { useState } from 'react';
import Board from './components/Board';
import './styles.scss';
import confettis from './assets/confetti-4.gif'
import dommage from './assets/dommage.jpg'

const App = () => {
  const [board, setBoard] = useState(() => (
    Array.from({length:6}, () => Array.from({length:7}, () => 0))
  ));
  
  const [currentPlayer, setCurrentPlayer] = useState(1)
  const [winner, setWinner] = useState(0)
  const [gameStatus,setGameStatus] = useState(null)
  const [reversed, setReversed]=useState(null)
  const [percentage, setPercentage] = useState(20)

  function ResetGame(){
    setBoard(() => (
      Array.from({length:6}, () => Array.from({length:7}, () => 0))
    ))
    setGameStatus(null)
    setWinner(0)
  }

  function checkForWinner(board) {
    const directions = [
      [0, 1], [1, 0], [1, 1], [-1, 1]
    ];
  
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 7; j++) {
        const player = board[i][j]
        if (player !== 0) {
          for (const [dx, dy] of directions) {
            let count = 1
            for (let k = 1; k < 4; k++) {
              const ni = i + k * dx
              const nj = j + k * dy
              if (ni >= 0 && ni < 6 && nj >= 0 && nj < 7 && board[ni][nj] === player)
                count++
              else
                break;
            }
            if (count === 4)
              return player
          }
        }
      }
    }
  
    return null;
  }
  
  function isBoardFull(board) {
    return board.every(row => row.every(cell => cell !== 0));
  }

  const handleClick = (colIndex) => {
    if (board[5][colIndex] !== 0)
      return
    let rowIndex = -1;
    for (let i = 0; i <= 5; i++) {
      if (board[i][colIndex] === 0) {
        rowIndex = i
        break;
      }
    }
    if (rowIndex === -1)
      return
    setReversed(null)
    const newBoard = [...board]
    newBoard[rowIndex][colIndex] = currentPlayer
    const winner = checkForWinner(newBoard)
    if (winner) {
      setWinner(winner)
      setGameStatus('win')
    } else {
      if (isBoardFull(newBoard))
        setGameStatus('draw')
    }
    setBoard(newBoard)
    if (Math.random() < percentage/100) {
      const randomIndex = Math.floor(Math.random() * 7)
      reverseColumn(randomIndex)
      setReversed(randomIndex)
    }
    setCurrentPlayer(currentPlayer === 1 ? -1 : 1)
  }

  function reverseColumn(colIndex) {
    const newBoard = [...board]
    let column = newBoard.map(row => row[colIndex]).reverse().filter(element=>element !== 0);
    while(column.length < 6)
      column.push(0)
    for (let i = 0; i < 6; i++)
      newBoard[i][colIndex] = column[i]
    setBoard(newBoard)
  }

  return (
    <div className="app">
      <h1>Puissance 4</h1>
      <div>Pourcentage de chance que le reverse s'applique : {percentage}%</div>
      <input type="range" min="0" max="100" value={percentage} onChange={(e)=>{setPercentage(e.target.value)}}/>
      {
        gameStatus === 'win' || gameStatus === 'draw' ? (
        <>
          <img className='background' alt='background' src={gameStatus === 'win' ? confettis : dommage }/>
          {
            gameStatus === 'win' ? (<h1>Gagnant : joueur {winner===1? '1':'2'}</h1>) : (<h1>Egalité</h1>)
          }

          <button data-testid={'restart'} onClick={()=>{ResetGame()}}>Recommencer</button>
        </>) :  (
            <>
              <div>Au tour du joueur {currentPlayer===1? '1':'2'}</div>
              <Board board={board} handleClick={handleClick} />
              {reversed !== null && <h2>Reverse sur la colonne {reversed+1}</h2>}
            </>
          )
      }
    </div>
  );
};

export default App;
