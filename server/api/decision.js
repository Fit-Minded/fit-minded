const router = require('express').Router()
const User = require('../db/schemas/user')
const {
  createPusherRoom,
  createPusherUser
} = require('../../script/chatUtil.js')
const { makeId } = require('../../script/generalUtil')
const { protect } = require('./securityUtils')
const { activitiesInCommon } = require('../../script/routeUtil')

module.exports = router

router.put('/', protect, async (req, res, next) => {
  try {
    const userId = req.user._id.toString()
    const { decisionType, otherUserId } = req.body
    const user = await User.findById(userId).exec()
    const otherUser = await User.findById(otherUserId).exec()

    if (decisionType === 'like') {
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

    if (decisionType === 'dislike') {
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

    if (decisionType === 'match') {
      const roomId = makeId(8)
      const userName = `${user.firstName} ${user.lastName}`
      const otherUserName = `${otherUser.firstName} ${otherUser.lastName}`
      const activities = activitiesInCommon(user, otherUser)
      const matchObject = {
        roomId,
        activities,
        location: user.location.coordinates
      }
      await createPusherUser(userId, userName)
      await createPusherUser(otherUserId, otherUserName)
      await createPusherRoom(roomId, userId, otherUserId)
      user.likedMe.delete(otherUserId)
      user.matches.set(otherUserId, matchObject)
      otherUser.liked.delete(userId)
      otherUser.matches.set(userId, matchObject)
    }
    if (decisionType === 'dontMatch') {
      user.likedMe.delete(otherUserId)
      user.disliked.set(otherUserId, true)
      otherUser.liked.delete(userId)
      otherUser.dislikedMe.set(userId, true)
    }
    await otherUser.save()
    await user.save()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
