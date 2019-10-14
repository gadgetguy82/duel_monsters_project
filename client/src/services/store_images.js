const fs = require('fs');
const request = require('request');

const directory = `${__dirname}/../../../server/card_images/`;

export const download = (uri, subDirectory) => {
  request.head(uri, (err, res, body) => {
    const uriArray = uri.split("/");
    const filename = uriArray[uriArray.length - 1];
    request(uri).pipe(fs.createWriteStream(`${directory}${subDirectory}${filename}`)).on('close');
  });
};
