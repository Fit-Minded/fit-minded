const protect = (req, res, next) => {
  if (!req.user) {
    res.status(401).send('Unauthorized Request, Please Login');
  } else {
    next();
  }
};

module.exports = {
  protect
};
