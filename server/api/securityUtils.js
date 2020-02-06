const protect = (req, res, next) => {
  if (!req.user) {
    res.status(401).send('Unauthorized Request, Admin Only Route');
  } else if (!req.user.dataValues.isAdmin) {
    res.status(401).send('Unauthorized Request, Admin Only Route');
  } else {
    next();
  }
};

const protectById = (req, res, next) => {
  if (!req.user) {
    res.status(401).send('Unauthorized Request, Please Login');
  } else if (
    Number(req.user.dataValues.id) !== Number(req.params.userId) &&
    !req.user.dataValues.isAdmin
  ) {
    res.status(401).send('Unauthorized Request, This is not your account');
  } else {
    next();
  }
};

module.exports = {
  protect,
  protectById
};
