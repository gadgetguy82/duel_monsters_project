const fs = require('fs');

const path = `${__dirname}/../db/files/`;

const readSync = (file) => {
  const rawData = fs.readFileSync(path + file);
  const gameCards = JSON.parse(rawdata);
  return gameCards;
}

const readAsync = (file) => {
  fs.readFile(path + file, (err, data) => {
    if (err) {
      throw err;
    }
    const gameCards = JSON.parse(data);
  });
  return gameCards;
}

const writeSync = (file, gameCards) => {
  const data = JSON.stringify(gameCards, null, 2);
  fs.writeFileSync(path + file, data);
}

const writeAsync = (file, gameCards) => {
  const data = JSON.stringify(gameCards, null, 2);
  fs.writeFile(path + file, data, (err) => {
    if (err) {
      throw err;
    }
  });
}

module.exports = {
  readSync: readSync,
  readAsync: readAsync,
  writeSync: writeAsync,
  writeAsync: writeAsync
};
