const { createPusherRoom, createPusherUser } = require('./chatUtil.js')
const { makeId } = require('./generalUtil')
const { activitiesInCommon } = require('./routeUtil')

const like = (user, userId, otherUser, otherUserId) => {
  user.toJudge.shift()
  user.liked.set(otherUserId, true)
  otherUser.likedMe.set(userId, true)
  if (otherUser.pool.get(userId)) {
    otherUser.pool.delete(userId)
  }
  if (otherUser.toJudge.includes(userId)) {
    let index = otherUser.toJudge.indexOf(userId)
    otherUser.toJudge.splice(index, 1)
  }
}

const dislike = (user, userId, otherUser, otherUserId) => {
  user.toJudge.shift()
  user.disliked.set(otherUserId, true)
  otherUser.dislikedMe.set(userId, true)
  if (otherUser.pool.get(userId)) {
    otherUser.pool.delete(userId)
  }
  if (otherUser.toJudge.includes(userId)) {
    let index = otherUser.toJudge.indexOf(userId)
    otherUser.toJudge.splice(index, 1)
  }
}

const match = (user, userId, otherUser, otherUserId) => {
  try {
    const roomId = makeId(8)
    const userName = `${user.firstName} ${user.lastName}`
    const otherUserName = `${otherUser.firstName} ${otherUser.lastName}`
    const activities = activitiesInCommon(user, otherUser)
    const matchObject = {
      roomId,
      activities,
      location: user.location.coordinates
    }
    createPusherUser(userId, userName)
    createPusherUser(otherUserId, otherUserName)
    createPusherRoom(roomId, userId, otherUserId)
    user.likedMe.delete(otherUserId)
    user.matches.set(otherUserId, matchObject)
    otherUser.liked.delete(userId)
    otherUser.matches.set(userId, matchObject)
  } catch (error) {
    console.error(error)
  }
}

const dontMatch = (user, userId, otherUser, otherUserId) => {
  user.likedMe.delete(otherUserId)
  user.disliked.set(otherUserId, true)
  otherUser.liked.delete(userId)
  otherUser.dislikedMe.set(userId, true)
}

module.exports = {
  like,
  dislike,
  match,
  dontMatch
}
