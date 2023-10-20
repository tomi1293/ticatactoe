import { WINNER_COMBOS } from '../constants';

export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    // console.log(combo)
    const [a,b,c] = combo;
    if(
      boardToCheck[a] &&
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ){
      return boardToCheck[a]
    }
  }

  //Si no hay ganador
  return null;
}

export const checkEndGame = (newBoard) => {
  //Revisamos que no queden esapacios vacios
  return newBoard.every((square)=> square !== null)
}