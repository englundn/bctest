const S3 = require('aws-sdk/clients/s3');
const Promise = require('bluebird');
const keys = require('./keys.js');

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
