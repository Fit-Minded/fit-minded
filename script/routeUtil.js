const User = require('../server/db/schemas/user');
const { calcDistance } = require('./generalUtil');

function configSignUpStateData(state) {
  const {
    email,
    password,
    firstName,
    lastName,
    imageURLs,
    ageOwn,
    agePrefMin,
    agePrefMax,
    genderOwn,
    genderPref,
    longitude,
    latitude,
    radius,
    activities
  } = state;

  const activitiesObj = {};
  activities.forEach(activity => (activitiesObj[activity] = true));

  const imageURLsStrings = imageURLs.map(object => object.url);

  const newUserData = {
    email,
    password,
    firstName,
    lastName,
    imageURLs: imageURLsStrings,
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
    activities: activitiesObj
  };
  return newUserData;
}

function getQueryData(user) {
  let {
    gender,
    age,
    location,
    radius,
    activities,
    lastLogin,
    liked,
    disliked,
    likedMe,
    dislikedMe,
    matches,
    toJudge,
    _id
  } = user;
  const ownGender = gender.own,
    prefGender = gender.preferred;
  const ownAge = age.own,
    prefAge = [age.preferred.min, age.preferred.max];
  const coordinates = location.coordinates;
  activities = Object.keys(activities);
  radius = radius * 1609.34;
  const queryData = {
    ownGender,
    prefGender,
    ownAge,
    prefAge,
    coordinates,
    radius,
    activities,
    lastLogin,
    liked,
    disliked,
    likedMe,
    dislikedMe,
    matches,
    toJudge,
    _id
  };
  return queryData;
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
    lastLogin,
    liked,
    disliked,
    likedMe,
    dislikedMe,
    matches,
    toJudge,
    _id
  } = queryData;

  let pool;

  // if lastLogin is not null we are REFRESHING the pool
  if (lastLogin) {
    pool = await User.find({
      createdAt: {
        $gte: lastLogin
      }
    })
      .find({
        _id: {
          $ne: _id
        },
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
      .exec();

    pool = pool.filter(user => {
      let userId = user._id;
      if (
        toJudge.includes(userId) ||
        liked.get(userId) ||
        disliked.get(userId) ||
        likedMe.get(userId) ||
        dislikedMe.get(userId) ||
        matches.get(userId)
      ) {
        return false;
      } else {
        return true;
      }
    });
  } else {
    pool = await User.find({
      _id: {
        $ne: _id
      },
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
    }).exec();
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
      );
    })
    .filter(user => {
      for (let i = 0; i < activities.length; i++) {
        if (user.activities[activities[i]]) {
          return true;
        }
      }
      return false;
    });

  const idMap = {};

  pool = pool.forEach(user => (idMap[user._id] = true));

  return idMap;
}

async function getToJudgeFromPool(user) {
  let poolKeys = [],
    usersToJudge = [];
  let count = 0;
  for (let [key, value] of user.pool) {
    user.pool.delete(key);
    poolKeys.push(key);
    count++;
    if (count === 10) {
      break;
    }
  }

  user.toJudge = poolKeys;
  await user.save();

  for (let i = 0; i < 10; i++) {
    let currentUser = await User.findById(poolKeys[i], [
      'gender.own',
      'age.own',
      'firstName',
      'lastName',
      'activities',
      'imageURLs',
      'neighborhood'
    ]).exec();
    usersToJudge.push(currentUser);
  }
  return usersToJudge;
}

module.exports = {
  getQueryData,
  generatePool,
  getToJudgeFromPool,
  configSignUpStateData
};
