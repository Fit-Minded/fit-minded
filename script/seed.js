const User = require('../server/db/schemas/user')
const randomUsers = require('./randomizeUsers')
const { connect, db } = require('../server/db/index')

function calcDistance(lat1, lon1, lat2, lon2) {
  var R = 3958
  var dLat = ((lat2 - lat1) * Math.PI) / 180
  var dLon = ((lon2 - lon1) * Math.PI) / 180
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  var d = R * c
  return d.toFixed(2)
}

async function seed() {
  await connect()
  console.log('DB is synced!')
  await User.deleteMany({})
  console.log('Collection has been cleared.')
  const users = await User.create(randomUsers)
  console.log(`Seeded ${users.length} users.`)
  // db.close()
  // console.log('Database connection is closed.')
}

async function testQuery() {
  let allUsers = await User.find({
    gender: {
      own: 'Male',
      preferred: 'Female'
    },
    'age.own': {
      $gte: 25,
      $lte: 35
    },
    'age.preferred.min': {
      $lte: 30
    },
    'age.preferred.max': {
      $gte: 30
    },
    location: {
      $near: {
        $maxDistance: 5000,
        $geometry: {
          type: 'Point',
          coordinates: [-73.995, 40.725]
        }
      }
    },
    'activities.running': true
  }).exec()

  // allUsers = allUsers.filter(user => {
  //   return (
  //     user.radius >=
  //     calcDistance(
  //       40.725,
  //       -73.995,
  //       user.location.coordinates[1],
  //       user.location.coordinates[0]
  //     )
  //   )
  // })

  console.log(`Number of results: ${allUsers.length}`)
  console.log('Example User: ', allUsers[0])
}

async function seedAndTest() {
  const start = new Date().getTime()
  await seed()
  const middle = new Date().getTime()
  await testQuery()
  const end = new Date().getTime()
  console.log(`Seeding Time: ${(middle - start) / 1000} seconds`)
  console.log(`Query Time: ${(end - middle) / 1000} seconds`)
}

seedAndTest()

module.exports = seed
