const connect = require('./db/index.js')

connect()
  .then(async connect => {
    console.log('Connected to DB!')
  })
  .catch(e => console.error(e))
