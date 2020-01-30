const mongoose = require('mongoose')

const connect = () => {
  return mongoose.connect('mongodb://localhost:27017/fit-minded')
}

const user = new mongoose.Schema({
  fistName: String
})

const User = mongoose.model('user', user)

connect()
  .then(async connect => {
    console.log('Connected to DB!')
    const user = await User.create({ firstName: 'Billy' })
    console.log('Test User:', user)
  })
  .catch(e => console.error(e))
