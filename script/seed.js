const User = require('../server/db/schemas/user')
const randomUsers = require('./randomizeUsers')
const { connect, db } = require('../server/db/index')

async function seed() {
  await connect()
  console.log('DB is synced!')
  // await User.deleteMany({})
  // console.log('Collection has been cleared.')
  const users = await User.create(randomUsers)
  console.log(`Seeded ${users.length} users.`)
  // db.close()
  // console.log('Database connection is closed.')
}

seed()

module.exports = seed
