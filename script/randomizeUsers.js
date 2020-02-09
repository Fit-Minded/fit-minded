const randomUsers = []

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
function generateName(gender) {
  let firstNameMale = [
    'Marquis',
    'Samir',
    'Adrien',
    'Pierce',
    'Kelton',
    'Jacob',
    'Isiah',
    'Jaquan',
    'Wayne',
    'Khalil',
    'Adel',
    'Robert',
    'Roy',
    'Michael',
    'Steven',
    'Christopher',
    'William',
    'Ryan',
    'Thomas',
    'Edward',
    'James',
    'Jason',
    'Kevin'
  ]
  let firstNameFemale = [
    'Joyce',
    'Juliette',
    'Lindsay',
    'Jordyn',
    'Anya',
    'Manami',
    'Christine',
    'Jessica',
    'Sarah',
    'Maria',
    'Catherine',
    'Samantha',
    'Tina',
    'Erica',
    'Margaret',
    'Meghan',
    'Ashley'
  ]
  let lastName = [
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
  let firstName
  if (gender === 'Male') {
    firstName = capFirst(firstNameMale[getRandomInt(firstNameMale.length)])
  } else {
    firstName = capFirst(firstNameFemale[getRandomInt(firstNameFemale.length)])
  }
  let lastNameFinal = capFirst(lastName[getRandomInt(lastName.length)])
  return [firstName, lastNameFinal]
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
  let possibleActivites = ['Running', 'Lifting', 'Yoga']
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
    (getRandomInt(150) * negOrPos[getRandomInt(2)]) / 10000
  ).toFixed(3)
  let longitude = (
    -73.995 +
    (getRandomInt(150) * negOrPos[getRandomInt(2)]) / 10000
  ).toFixed(3)

  let user = {
    firstName: generateName()[0],
    lastName: generateName()[1],
    imageURLs: [],
    email: `test${i}@test.com`,
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
    activities: calcRandAct()
    // lastLogin: new Date()
  }

  if (user.gender.own === 'Male') {
    user.imageURLs = [
      `/userPhotos/male/0${getRandomInt(5) + 1}.jpg`,
      `/userPhotos/male/0${getRandomInt(5) + 1}.jpg`,
      `/userPhotos/male/0${getRandomInt(5) + 1}.jpg`
    ]
  }

  if (user.gender.own === 'Female') {
    user.imageURLs = [
      `/userPhotos/female/0${getRandomInt(5) + 1}.jpg`,
      `/userPhotos/female/0${getRandomInt(5) + 1}.jpg`,
      `/userPhotos/female/0${getRandomInt(5) + 1}.jpg`
    ]
  }

  randomUsers.push(user)
}

module.exports = randomUsers
