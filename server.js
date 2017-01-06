
const express = require('express');
const path = require('path');
const fs = require('fs');
const query = require('./s3query.js');

const port = 8888;
const app = express();

const router = express.Router();

router.get('/list', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/*', (req, res) => {
  const index = req.params[0];
  query(index, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(data);
    }
  });
  res.redirect('/api/list');
});

app.use('/api', router);

console.log(`Listening on port ${port}`);
app.listen(port);
