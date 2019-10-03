export const changeTurn = (turn) => {
  return turn === "one" ? "two" : "one";
}

export const checkTurn = ({turn}, {player}) => {
  return turn === player;
}
