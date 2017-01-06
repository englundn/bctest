const S3 = require('aws-sdk/clients/s3');
const Promise = require('bluebird');
const keys = require('./keys.js');
// const fs = require('fs');
// const path = require('path');

const s3 = new S3({
  accessKeyId: keys.key,
  secretAccessKey: keys.secret,
});

module.exports = (query) => {
  return new Promise((resolve, reject) => {
    s3.listObjects({
      Bucket: 'coding-challenges',
      Prefix: `files-challenge/${query}`,
    }, (err, data) => {
      if (err) {
        return reject(err);
      }
      const streamArray = data.Contents.map((file) => {
        return {
          stream: s3.getObject({
            Bucket: 'coding-challenges',
            Key: file.Key,
          }).createReadStream(),
          name: file.Key,
        };
      });
      resolve(streamArray);
    });
  });
};


  // }, (err, data) => {
  //   if (err) {
  //     console.error(err);
  //   } else {
  //     s3.getObject({
  //       Bucket: 'coding-challenges',
  //       Key: data.Contents[0].Key,
  //     }, (err1, data1) => {
  //       err1 ? console.log(err1) : console.log(data1);
  //     })
  //     ;
  //   }
  // });

// } else {
        // let writeStream = fs.createWriteStream(path.join(__dirname, '/crypto.md'));
        // writeStream.on('error', error => console.error(error));
        // writeStream.on('finish', () => {
        //   // callback();
        //   writeStream.destroy();
        //   writeStream = null;
        // });
      // return data.Contents;