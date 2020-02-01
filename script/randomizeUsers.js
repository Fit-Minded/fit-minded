const randomUsers = []

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
function generateName() {
  let name1 = [
    'Marquis',
    'Samir',
    'Adrien',
    'Joyce',
    'Pierce',
    'Juliette',
    'Kelton',
    'Jacob',
    'Isiah',
    'Lindsay',
    'Kian',
    'Jordyn',
    'Jaquan',
    'Anya',
    'Wayne',
    'Khalil',
    'Adel',
    'Robert',
    'Manami',
    'Roy'
  ]
  let name2 = [
    'Mills',
    'Mercer',
    'Reeves',
    'Hines',
    'Sanford',
    'Irwin',
    'Koch',
    'Hinton',
    'Estes',
    'Jackson',
    'Lowe',
    'Guerra',
    'Pineda',
    'Franco',
    'Cowan',
    'Krause',
    'Fox',
    'Jabbar',
    'Tessler',
    'Ueda'
  ]
  let finalFirst = capFirst(name1[getRandomInt(name1.length)])
  let finalLast = capFirst(name2[getRandomInt(name2.length)])
  return [finalFirst, finalLast]
}

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

for (let i = 0; i < 300; i++) {
  let minAge = getRandomInt(15) + 18
  let maxAge = minAge + getRandomInt(15) + 1
  let latitude = (
    40.725 +
    (getRandomInt(150) * negOrPos[getRandomInt(2)]) / 10000
  ).toFixed(3)
  let longitude = (
    -73.995 +
    (getRandomInt(150) * negOrPos[getRandomInt(2)]) / 10000
  ).toFixed(3)

  let user = {
    firstName: generateName()[0],
    lastName: generateName()[1],
    email: `Xtest${i}@test.com`,
    password: '123',
    gender: {
      own: genders[getRandomInt(2)],
      preferred: genders[getRandomInt(2)]
    },
    age: {
      own: getRandomInt(22) + 18,
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
    activities: calcRandAct(),
    lastLogin: new Date()
  }

  randomUsers.push(user)
}

module.exports = randomUsers
