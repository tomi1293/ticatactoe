import { useState } from "react";
import { Square } from "./components/Square";
import confetti from "canvas-confetti";

import { TURNS } from './constants.js'
import { checkEndGame, checkWinnerFrom } from './helpers/logic.js';
import { WinnerModal } from "./components/WinnerModal";


function App() {

  const [board, setBoard] = useState(() =>{
    //El storage lo retomamos aqui con un callback porque si lo hacemos afuera cada vez que se re renderiza me va a volver a tomar el storage
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null) 
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.X
  });
  const [winner, setWinner] = useState(null);//null => no hay ganador, flase => Empate, true => hay ganador


  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);  

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }

  const updateBoard = (index) => {

    //Si en esa celda del board ya tenemos algo, no actualizamos esa posicion
    //O si es que tenemos un ganador
    if(board[index] || winner) return

    //Hacemos una copia del tablero
    const newBoard = [...board];
    //En esa copia accedemos al indice donde hizo click y le colocamos el valor del turnoactual
    newBoard[index] = turn;
    //Actualizamos el tablero con el nuevo estado.
    setBoard(newBoard)

    //De esta forma cambiamos el turno.
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);   

    //Guardar partida
    window.localStorage.setItem('board',JSON.stringify(newBoard));
    window.localStorage.setItem('turn',newTurn);
 
    //Revisamos si hay ganador
    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner){
      confetti();
      setWinner(newWinner);
    } else if(checkEndGame(newBoard)){
      setWinner(false);
    }
  }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <section className="game">
        {
          board.map( (square,index) => {
            return(
              <Square key={index} index={index} updateBoard={updateBoard}>
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className="turn">
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal  resetGame={ resetGame } winner={ winner } />

    </main>
  )
}

export default App
