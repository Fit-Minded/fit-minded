const router = require('express').Router()
const User = require('../db/schemas/user')
const { protect } = require('./securityUtils')
const { like, dislike, match, dontMatch } = require('../../script/decisionUtil')

module.exports = router

router.put('/', protect, async (req, res, next) => {
  try {
    const userId = req.user._id.toString()
    const { decisionType, otherUserId } = req.body
    const user = await User.findById(userId).exec()
    const otherUser = await User.findById(otherUserId).exec()

    if (decisionType === 'like') {
      like(user, userId, otherUser, otherUserId)
    }

    if (decisionType === 'dislike') {
      dislike(user, userId, otherUser, otherUserId)
    }

    if (decisionType === 'match') {
      match(user, userId, otherUser, otherUserId)
    }
    if (decisionType === 'dontMatch') {
      dontMatch(user, userId, otherUser, otherUserId)
    }
    await otherUser.save()
    await user.save()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
