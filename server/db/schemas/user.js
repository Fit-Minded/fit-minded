const mongoose = require("mongoose");

const user = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
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
      type: {
        type: String,
        enum: ["Point"],
        required: true
      },
      coordinates: {
        type: [Number],
        required: true
      }
    },
    radius: {
      type: Number,
      required: true
    },
    activities: {
      type: Object,
      required: true
    },
    pool: {
      type: Map
    },
    liked: {
      type: Map,
      default: {}
    },
    likedMe: {
      type: Map,
      default: {}
    },
    disliked: {
      type: Map,
      default: {}
    },
    dislikedMe: {
      type: Map,
      default: {}
    },
    matches: {
      type: Map,
      default: {}
    },
    toJudge: {
      type: [String],
      required: true,
      default: []
    },
    lastLogin: {
      type: Date
    }
  },
  { timestamps: true }
);

user.virtual("createdAtMs").get(function() {
  return this.createdAt.getTime();
});

user.index({ location: "2dsphere" });

const User = mongoose.model("user", user);

module.exports = User;
