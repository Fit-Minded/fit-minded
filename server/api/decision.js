const router = require('express').Router()
const User = require('../db/schemas/user')
module.exports = router

router.put('/', async (req, res, next) => {
  try {
    const userId = req.user._id
    const { decisionType, otherUserId } = req.body
    const user = await User.findById(userId).exec()
    if (decisionType === 'like') {
      user.toJudge.shift()
      user.liked.set(otherUserId, true)
    }
    if (decisionType === 'dislike') {
      user.toJudge.shift()
      user.disliked.set(otherUserId, true)
    }
    await user.save()
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})
