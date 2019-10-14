const fs = require('fs');
const request = require('request');

const path = `${__dirname}/../db/files/`;
const directory = `${__dirname}/../card_images/`;

const readSync = (file) => {
  const data = fs.readFileSync(path + file);
  const gameCards = JSON.parse(data);
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

const download = (uri, subDirectory) => {
  request.head(uri, (err, res, body) => {
    const uriArray = uri.split("/");
    const filename = uriArray[uriArray.length - 1];
    request(uri).pipe(fs.createWriteStream(`${directory}${subDirectory}${filename}`)).on('close');
  });
};

module.exports = {
  readSync: readSync,
  readAsync: readAsync,
  writeSync: writeAsync,
  writeAsync: writeAsync,
  download: download
};
