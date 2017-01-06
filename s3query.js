const S3 = require('aws-sdk/clients/s3');

const keys = require('./keys.js');

const s3 = new S3({
  accessKeyId: keys.key,
  secretAccessKey: keys.secret,
});

module.exports = (query, callback) => {
  s3.listObjects({
    Bucket: 'coding-challenges',
    Prefix: `files-challenge/${query}`,
  }, (err, data) => {
    callback(err, data);
  });
};
