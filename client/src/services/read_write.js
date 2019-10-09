const fs = require('fs');

export const readSync = (file) => {
  const rawData = fs.readFileSync(file);
  const gameCards = JSON.parse(rawdata);
  return gameCards;
}

export const readAsync = (file) => {
  fs.readFile(file, (err, data) => {
    if (err) {
      throw err;
    }
    const gameCards = JSON.parse(data);
  });
  return gameCards;
}

export const writeSync = (file, gameCards) => {
  const data = JSON.stringify(gameCards, null, 2);
  fs.writeFileSync(file, data);
}

export const writeAsync = (file, gameCards) => {
  fs.writeFile(file, data, (err) => {
    if (err) {
      throw err;
    }
  });
}
