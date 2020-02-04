const router = require('express').Router();
const User = require('../db/schemas/user');
const {
  getQueryData,
  generatePool,
  configSignUpStateData
} = require('../../script/routeUtil');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else if (!user.password === req.body.password) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong username and/or password');
    } else {
      console.log(`Logging in ${user.firstName} ${user.lastName}`);
      const queryData = getQueryData(user);
      const pool = await generatePool(queryData);

      user.lastLogin = new Date();
      user.pool = { ...pool };
      await user.save();
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const newUserData = configSignUpStateData(req.body);
    const user = await User.create(newUserData);
    console.log(`Created User ${user.firstName} ${user.lastName}`);
    const queryData = getQueryData(user);
    const pool = await generatePool(queryData);
    console.log('Generated Pool: ', pool);
    user.lastLogin = new Date();
    user.pool = pool;
    await user.save();
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  const {
    age,
    gender,
    location,
    _id,
    firstName,
    lastName,
    activities,
    image
  } = req.user;

  const reduxUser = {
    age,
    gender,
    location,
    _id,
    firstName,
    lastName,
    activities,
    image
  };
  res.json(reduxUser);
});

// router.use('/google', require('./google'))
