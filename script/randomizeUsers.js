const randomUsers = [];

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
  ];
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
  ];
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
  ];
  let firstName;
  if (gender === 'Male') {
    firstName = capFirst(firstNameMale[getRandomInt(firstNameMale.length)]);
  } else {
    firstName = capFirst(firstNameFemale[getRandomInt(firstNameFemale.length)]);
  }
  let lastNameFinal = capFirst(lastName[getRandomInt(lastName.length)]);
  return [firstName, lastNameFinal];
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const genders = {
  0: 'Male',
  1: 'Female'
};

const negOrPos = {
  0: -1,
  1: 1
};
let activityText = [
  {
    RockClimbing:
      'Currently climbing 2-3 /w. Mostly bouldering, and starting to dip my feet into more structured progression.'
  },
  {
    Yoga:
      'Currently taking Hot (bikram) yoga 3-4 /w for flexibility and injury prevention.'
  },
  {
    Gymnastics:
      'Bodyweight progression/exercises: wrist/hand stretching routine, handstands, planche, levers, squat 30 min/d, static hang 7min/d, pushups, l-sits, leg raises, pullup pyramids, internal/external rotators rubber band work.'
  },
  {
    CrossFit:
      'I do pull ups (working towards OAC), dumbbell overhead press, rows and front lever work, push ups and pistol squat work along with whatever else I feel like throwing in. That is my strength routine at the moment.'
  },
  {
    Cycling:
      'I cycle 2-4 times a week really depending on who is around and how busy I am. Typically that is 50/50 inside and outside.'
  },
  {
    Running:
      'I am doing C25K at the moment too which is going slowly but nicely. I have always hated running but am really enjoying it this time round.'
  },
  { Swimming: 'Currently swimming 4-5 /w. Mostly indoor during the winter' }
];
const calcRandAct = () => {
  let possibleActivites = ['Running', 'Lifting', 'Yoga'];
  let activities = {};

  let numOfActivites = getRandomInt(4);
  for (let i = 0; i <= numOfActivites; i++) {
    let activityName = possibleActivites[getRandomInt(3)];
    activities[activityName] = true;
  }
  return activities;
};

for (let i = 0; i < 1000; i++) {
  let minAge = getRandomInt(15) + 18;
  let maxAge = minAge + getRandomInt(15) + 1;
  let latitude = (
    40.725 +
    (getRandomInt(150) * negOrPos[getRandomInt(2)]) / 10000
  ).toFixed(3);
  let longitude = (
    -73.995 +
    (getRandomInt(150) * negOrPos[getRandomInt(2)]) / 10000
  ).toFixed(3);

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
  };

  if (user.gender.own === 'Male') {
    user.imageURLs = [
      `/userPhotos/male/0${getRandomInt(5) + 1}.jpg`,
      `/userPhotos/male/0${getRandomInt(5) + 1}.jpg`,
      `/userPhotos/male/0${getRandomInt(5) + 1}.jpg`
    ];
  }

  if (user.gender.own === 'Female') {
    user.imageURLs = [
      `/userPhotos/female/0${getRandomInt(5) + 1}.jpg`,
      `/userPhotos/female/0${getRandomInt(5) + 1}.jpg`,
      `/userPhotos/female/0${getRandomInt(5) + 1}.jpg`
    ];
  }

  randomUsers.push(user);
}

module.exports = randomUsers;
