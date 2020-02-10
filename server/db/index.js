const mongoose = require('mongoose');

const dbAddress =
  process.env.NODE_ENV === 'production'
    ? process.env.MONGODB_URI
    : 'mongodb://localhost:27017/fit-minded';

const connect = () => {
  return mongoose.connect(dbAddress, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
};

const db = mongoose.connection;

module.exports = {
  connect,
  db
};
