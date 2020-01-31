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

for (let i = 0; i < 300; i++) {
  let minAge = getRandomInt(20) + 18
  let maxAge = minAge + getRandomInt(20) + 1

  let user = {
    firstName: 'Test',
    lastName: 'Name',
    gender: {
      own: genders[getRandomInt(2)],
      preferred: genders[getRandomInt(2)]
    },
    age: {
      own: getRandomInt(60) + 18,
      preferred: {
        min: minAge,
        max: maxAge
      }
    },
    location: {
      own: {
        latitude:
          40.725 + (getRandomInt(300) * negOrPos[getRandomInt(2)]) / 10000,
        longitude:
          73.995 + (getRandomInt(300) * negOrPos[getRandomInt(2)]) / 10000
      },
      preffered: getRandomInt(30) / 10
    }
  }

  randomUsers.push(user)
}

module.exports = randomUsers
