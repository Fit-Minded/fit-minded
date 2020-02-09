const router = require('express').Router();
const User = require('../db/schemas/user');
const { protect } = require('./securityUtils');
module.exports = router;

router.get('/', protect, async (req, res, next) => {
  try {
    const users = await User.find({}).exec();
    res.json(users);
  } catch (err) {
    next(err);
  }
});
