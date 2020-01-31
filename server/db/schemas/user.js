const mongoose = require('mongoose')

const user = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    own: {
      type: String,
      required: true
    },
    preferred: {
      type: String,
      required: true
    }
  },
  age: {
    own: {
      type: Number,
      required: true
    },
    preferred: {
      min: {
        type: Number,
        required: true
      },
      max: {
        type: Number,
        required: true
      }
    }
  },
  location: {
    own: {
      latitude: {
        type: Number,
        required: true
      },
      longitude: {
        type: Number,
        required: true
      }
    },
    preffered: {
      type: Number,
      required: true
    }
  },
  pool: {
    type: Map
  },
  toJudge: {
    type: Map
  },
  denied: {
    type: Map
  },
  liked: {
    type: Map
  },
  matched: {
    type: Map
  }
})

const User = mongoose.model('user', user)

module.exports = User
