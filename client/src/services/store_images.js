const fs = require('fs');
const request = require('request');

const dir = `${__dirname}/../../../server/card_images/`;

export const download = (uri, callback) => {
  request.head(uri, (err, res, body) => {
    const uriArray = uri.split("/");
    const filename = uriArray[uriArray.length - 1];
    request(uri).pipe(fs.createWriteStream(`${dir}${filename}`)).on('close', callback);
  });
};
