const fs = require('fs');
const archiver = require('archiver');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, '/example.zip'));

const archive = archiver('zip', {
  store: true,
});

output.on('close', () => {
  console.log(archive.pointer(), ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});
