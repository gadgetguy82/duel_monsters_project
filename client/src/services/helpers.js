export const changeTurn = (turn) => {
  return turn === "one" ? "two" : "one";
}

export const checkTurn = ({turn}, {player}) => {
  return turn === player;
}

export const trackUniqueProperty = (obj, property) => {
  if (obj.hasOwnProperty(property)) {
    obj[property]++;
  } else {
    obj[property] = 1;
  }
  return obj;
}
