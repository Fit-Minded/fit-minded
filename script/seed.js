const User = require('../server/db/schemas/user')
const randomUsers = require('./randomizeUsers')
const { connect } = require('../server/db/index')
const {
  getQueryData,
  generatePool,
  getToJudgeFromPool
} = require('./routeUtil')
const { deleteAllPusherUsers } = require('./chatUtil.js')

async function seed() {
  await connect()
  console.log('DB is synced!')
  await User.deleteMany({})
  console.log('Collection has been cleared.')
  const users = await User.create(randomUsers)
  console.log(`Seeded ${users.length} users.`)
  deleteAllPusherUsers()
  console.log('Deleted all previous pusher users')
  for (let i = 0; i < users.length; i++) {
    if (i % 100 === 0) {
      console.log(i)
    }
    const user = users[i]
    const queryData = getQueryData(user)
    const pool = await generatePool(queryData)
    user.lastLogin = new Date()
    user.pool = pool
    getToJudgeFromPool(user)
  }
  console.log('Created pools and toJudges for all users')
}

seed()

module.exports = seed
