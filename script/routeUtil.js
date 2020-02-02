const User = require('../server/db/schemas/user')
const { calcDistance } = require('./generalUtil')

function getQueryData(user) {
  let { gender, age, location, radius, activities, lastLogin } = user
  const ownGender = gender.own,
    prefGender = gender.preferred
  const ownAge = age.own,
    prefAge = [age.preferred.min, age.preferred.max]
  const coordinates = location.coordinates
  activities = Object.keys(activities)
  radius = radius * 1609.34
  const queryData = {
    ownGender,
    prefGender,
    ownAge,
    prefAge,
    coordinates,
    radius,
    activities,
    lastLogin
  }
  return queryData
}

async function generatePool(queryData) {
  const {
    ownGender,
    prefGender,
    ownAge,
    prefAge,
    coordinates,
    radius,
    activities,
    lastLogin
  } = queryData

  let pool

  // if lastLogin is not null we are REFRESHING the pool
  if (lastLogin) {
    pool = await User.find({
      createdAt: {
        $gte: lastLogin
      }
    })
      .find({
        gender: {
          own: prefGender,
          preferred: ownGender
        },
        'age.own': {
          $gte: prefAge[0],
          $lte: prefAge[1]
        },
        'age.preferred.min': {
          $lte: ownAge
        },
        'age.preferred.max': {
          $gte: ownAge
        },
        location: {
          $near: {
            $maxDistance: radius,
            $geometry: {
              type: 'Point',
              coordinates: coordinates
            }
          }
        }
      })
      .exec()
  } else {
    pool = await User.find({
      gender: {
        own: prefGender,
        preferred: ownGender
      },
      'age.own': {
        $gte: prefAge[0],
        $lte: prefAge[1]
      },
      'age.preferred.min': {
        $lte: ownAge
      },
      'age.preferred.max': {
        $gte: ownAge
      },
      location: {
        $near: {
          $maxDistance: radius,
          $geometry: {
            type: 'Point',
            coordinates: coordinates
          }
        }
      }
    }).exec()
  }

  pool = pool
    .filter(user => {
      return (
        user.radius >=
        calcDistance(
          40.725,
          -73.995,
          user.location.coordinates[1],
          user.location.coordinates[0]
        )
      )
    })
    .filter(user => {
      for (let i = 0; i < activities.length; i++) {
        if (user.activities[activities[i]]) {
          return true
        }
      }
      return false
    })

  console.log(`Number of results: ${pool.length}`)

  const idMap = {}

  pool = pool.forEach(user => (idMap[user._id] = true))

  return idMap
}

module.exports = {
  getQueryData,
  generatePool
}
