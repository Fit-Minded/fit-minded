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

// router.get("/:userId", async (req, res, next) => {
//   try {
//     const singleUser = await User.findOne({ _id: req.params.userId }).exec();
//     res.json(singleUser);
//   } catch (err) {
//     next(err);
//   }
// });
