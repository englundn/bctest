
const express = require('express');
const path = require('path');
const fs = require('fs');
const query = require('./s3query.js');
const archiver = require('archiver');


const port = 8888;
const app = express();

const router = express.Router();

router.get('/list', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/*', (req, res) => {
  const index = req.params[0];
  // const output = fs.createWriteStream(path.join(__dirname, `/${index}.zip`));
  const archive = archiver('zip');

  // output.on('close', () => {
  //   console.log('Archive wrote %d bytes', archive.pointer());
  // });

  archive.on('error', (err) => {
    res.status(500).send({ error: err.message });
  });

  archive.on('end', () => {
    console.log('Archive wrote %d bytes', archive.pointer());
  });

  res.attachment(`${index}.zip`);

  archive.pipe(res);
  query(index).then((arr) => {
    arr.forEach((stream) => {
      archive.append(stream.stream, { name: stream.name });
    });
    archive.finalize();
    console.log('here');
  });
  // res.redirect('/api/list');
});

app.use('/api', router);

console.log(`Listening on port ${port}`);
app.listen(port);
