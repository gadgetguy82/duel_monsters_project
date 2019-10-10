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

const comparator = (first, second) => {
  const textA = first[0].toLowerCase();
  const textB = second[0].toLowerCase();
  return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
}

export const objToArray = (obj) => {
  const array = Object.entries(obj);
  return array.sort(comparator);
}

export const shuffle = (array) => {
  for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
    const randomIndex = Math.floor(Math.random() * currentIndex);
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
}

export const convertToJSON = (string) => {
  let stringArray = string.split(",");
  const trimmedArray = [];
  stringArray.forEach(property => {
    const pair = property.split(":");
    const trimmedPair = [];
    for (let item of pair) {
      const trimmedItem = item.replace(/\./gi, '').trim();
      trimmedPair.push(JSON.stringify(trimmedItem));
    }
    trimmedArray.push("  " + trimmedPair.join(": "));
  });
  const result = "{\n" + trimmedArray.join(",\n") + "\n}";
  return JSON.parse(result);
}
