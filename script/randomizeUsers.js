const randomUsers = []

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max))
}

const genders = {
  0: 'Male',
  1: 'Female'
}

const negOrPos = {
  0: -1,
  1: 1
}

const calcRandAct = () => {
  let possibleActivites = ['running', 'lifting', 'yoga']
  let activities = {}
  let numOfActivites = getRandomInt(4)
  for (let i = 0; i <= numOfActivites; i++) {
    let activityName = possibleActivites[getRandomInt(3)]
    activities[activityName] = true
  }
  return activities
}

for (let i = 0; i < 1000; i++) {
  let minAge = getRandomInt(15) + 18
  let maxAge = minAge + getRandomInt(15) + 1
  let latitude = (
    40.725 +
    (getRandomInt(300) * negOrPos[getRandomInt(2)]) / 10000
  ).toFixed(3)
  let longitude = (
    -73.995 +
    (getRandomInt(300) * negOrPos[getRandomInt(2)]) / 10000
  ).toFixed(3)

  let user = {
    firstName: 'Test',
    lastName: 'Name',
    gender: {
      own: genders[getRandomInt(2)],
      preferred: genders[getRandomInt(2)]
    },
    age: {
      own: getRandomInt(30) + 18,
      preferred: {
        min: minAge,
        max: maxAge
      }
    },
    location: {
      type: 'Point',
      coordinates: [longitude, latitude]
    },
    radius: (getRandomInt(50) + 10) / 10,
    activities: calcRandAct()
  }

  randomUsers.push(user)
}

module.exports = randomUsers
