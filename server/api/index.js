const router = require('express').Router()

router.use('/users', require('./users'))
router.use('/pool', require('./pool'))
router.use('/profile', require('./profile'))
router.use('/decision', require('./decision'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
module.exports = router
