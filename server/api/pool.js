const router = require('express').Router()
const User = require('../db/schemas/user')
const { getToJudgeFromPool } = require('../../script/routeUtil')
module.exports = router

router.get('/toJudge', async (req, res, next) => {
  try {
    const userId = '5e3702c676c330702add90c3'
    const user = await User.findById(userId).exec()
    let usersToJudge = []
    if (!user.toJudge || user.toJudge.length === 0) {
      usersToJudge = await getToJudgeFromPool(user)
    } else {
      user.toJudge.forEach(async id => {
        let user = await User.findById(id, [
          'gender.own',
          'age.own',
          'firstName',
          'lastName',
          'activities'
        ]).exec()
        usersToJudge.push(user)
      })
    }
    await user.save()
    console.log('BEFORE SEND', usersToJudge)
    res.send(usersToJudge)
  } catch (err) {
    next(err)
  }
})
