const mongoose = require('mongoose')

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/fit-minded', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
}

const db = mongoose.connection

module.exports = {
  connect,
  db
}
