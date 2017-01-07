const archiver = require('archiver');
const query = require('./s3query.js');
const updateLogs = require('./updateLogs.js');

module.exports = (req, res) => {
  const startTime = Date.now();
  const index = req.params[0];

  const archive = archiver('zip');

  archive.on('error', (err) => {
    res.status(500).send({ error: err.message });
  });

  archive.on('end', () => {
    console.log('Archive wrote %d bytes', archive.pointer());
    const newLog = {
      name: index,
      date: startTime,
      duration: Date.now() - startTime,
    };
    updateLogs(newLog);
  });

  res.attachment(`${index}.zip`);

  archive.pipe(res);
  query(index).then((arr) => {
    arr.forEach((stream) => {
      archive.append(stream.stream, { name: stream.name });
    });
    archive.finalize();
  });
};
