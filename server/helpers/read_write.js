const fs = require('fs');
const request = require('request');

const db_path = `${__dirname}/../db/files/`;
const image_path = `${__dirname}/../card_images/`;
const public_image_path = `${__dirname}/../../client/public/card_images/`;

const readSync = (file) => {
  const data = fs.readFileSync(db_path + file);
  const gameCards = JSON.parse(data);
  return gameCards;
}

const readAsync = (file) => {
  fs.readFile(db_path + file, (err, data) => {
    if (err) {
      throw err;
    }
    const gameCards = JSON.parse(data);
  });
  return gameCards;
}

const writeSync = (file, gameCards) => {
  const data = JSON.stringify(gameCards, null, 2);
  fs.writeFileSync(db_path + file, data);
}

const writeAsync = (file, gameCards) => {
  const data = JSON.stringify(gameCards, null, 2);
  fs.writeFile(db_path + file, data, (err) => {
    if (err) {
      throw err;
    }
  });
}

const download = (uri, subDirectory, callback) => {
  request.head(uri, (err, res, body) => {
    const uriArray = uri.split("/");
    const filename = uriArray[uriArray.length - 1];
    request(uri).pipe(fs.createWriteStream(`${image_path}${subDirectory}${filename}`)).on('close', () => console.log(filename));
    request(uri).pipe(fs.createWriteStream(`${public_image_path}${subDirectory}${filename}`)).on('close', () => console.log(filename));
  });
};

module.exports = {
  readSync: readSync,
  readAsync: readAsync,
  writeSync: writeAsync,
  writeAsync: writeAsync,
  download: download
};
