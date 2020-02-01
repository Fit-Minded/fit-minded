const router = require('express').Router()
const User = require('../db/schemas/user')
const { getQueryData, generatePool } = require('../../script/routeUtil')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const user = await User.findById('5e35ac475406ab26fc01733e').exec()
    const queryData = await getQueryData(user)
    const pool = await generatePool(queryData)
    user.pool = pool
    console.log('USER WITH POOL', user)
    await user.save()
    res.json('hello')
  } catch (err) {
    next(err)
  }
})
