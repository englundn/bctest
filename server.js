
const express = require('express');
const path = require('path');
const archiveMaker = require('./archiveMaker.js');

const port = 8888;
const app = express();

const router = express.Router();

router.get('/list', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

router.get('/*', (req, res) => {
  archiveMaker(req, res);
});

app.use('/api', router);

console.log(`Listening on port ${port}`);
app.listen(port);
