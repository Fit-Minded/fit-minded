const router = require("express").Router();
const User = require("../db/schemas/user");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find({}).exec();
    res.json(users);
  } catch (err) {
    next(err);
  }
});
