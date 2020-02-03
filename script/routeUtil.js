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

function configSignUpStateData(state) {
  const {
    email,
    password,
    firstName,
    lastName,
    imageUrl,
    ageOwn,
    agePrefMin,
    agePrefMax,
    genderOwn,
    genderPref,
    longitude,
    latitude,
    radius,
    activity
  } = state
  const newUserData = {
    email,
    password,
    firstName,
    lastName,
    image: imageUrl,
    age: {
      own: Number(ageOwn),
      preferred: {
        min: Number(agePrefMin),
        max: Number(agePrefMax)
      }
    },
    gender: {
      own: genderOwn,
      preferred: genderPref
    },
    location: {
      type: 'Point',
      coordinates: [Number(longitude), Number(latitude)]
    },
    radius: Number(radius),
    activities: {
      [activity]: true
    }
  }
  return newUserData
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

async function getToJudgeFromPool(user) {
  let poolKeys = [],
    usersToJudge = []
  let count = 0
  for (let [key, value] of user.pool) {
    user.pool.delete(key)
    poolKeys.push(key)
    count++
    if (count === 10) {
      break
    }
  }

  user.toJudge = poolKeys
  await user.save()

  for (let i = 0; i < 10; i++) {
    let currentUser = await User.findById(poolKeys[i], [
      'gender.own',
      'age.own',
      'firstName',
      'lastName',
      'activities',
      'image'
    ]).exec()
    usersToJudge.push(currentUser)
  }
  return usersToJudge
}

module.exports = {
  getQueryData,
  generatePool,
  getToJudgeFromPool,
  configSignUpStateData
}
