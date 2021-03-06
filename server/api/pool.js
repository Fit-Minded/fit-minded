const router = require('express').Router()
const User = require('../db/schemas/user')
const { getToJudgeFromPool } = require('../../script/routeUtil')
const { protect } = require('./securityUtils')

module.exports = router

router.get('/toJudge', protect, async (req, res, next) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId).exec()
    let usersToJudge = []
    if (!user.toJudge || user.toJudge.length === 0) {
      usersToJudge = await getToJudgeFromPool(user)
    } else {
      for (let i = 0; i < user.toJudge.length; i++) {
        const id = user.toJudge[i]
        const currentUser = await User.findById(id, [
          'gender.own',
          'age.own',
          'firstName',
          'lastName',
          'activities',
          'imageURLs',
          'neighborhood'
        ]).exec()
        usersToJudge.push(currentUser)
      }
    }
    res.send(usersToJudge)
  } catch (err) {
    next(err)
  }
})

router.get('/likedMe', protect, async (req, res, next) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId).exec()
    let usersWhoLikedMe = []
    for (let [key, value] of user.likedMe) {
      const currentUser = await User.findById(key, [
        'gender.own',
        'age.own',
        'firstName',
        'lastName',
        'activities',
        'imageURLs',
        'neighborhood'
      ]).exec()
      usersWhoLikedMe.push(currentUser)
    }
    res.send(usersWhoLikedMe)
  } catch (err) {
    next(err)
  }
})

router.get('/matches', protect, async (req, res, next) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId).exec()
    let matches = []
    for (let [key, value] of user.matches) {
      const currentUser = await User.findById(key, [
        'gender.own',
        'age.own',
        'firstName',
        'lastName',
        'activities',
        'imageURLs',
        'neighborhood'
      ]).exec()
      matches.push(currentUser)
    }
    res.send(matches)
  } catch (err) {
    next(err)
  }
})
