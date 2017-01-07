const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test');
const Log = mongoose.model('Log', { name: String, date: Number, duration: Number });

module.exports = (log) => {
  const newLog = new Log({ name: log.name, date: log.date, duration: log.duration });
  newLog.save((err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('log saved');
    }
  });
};
