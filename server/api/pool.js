const router = require("express").Router();
const User = require("../db/schemas/user");
const { getToJudgeFromPool } = require("../../script/routeUtil");
module.exports = router;

router.get("/toJudge", async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId).exec();
    let usersToJudge = [];
    if (!user.toJudge || user.toJudge.length === 0) {
      usersToJudge = await getToJudgeFromPool(user);
    } else {
      for (let i = 0; i < user.toJudge.length; i++) {
        const id = user.toJudge[i];
        const currentUser = await User.findById(id, [
          "gender.own",
          "age.own",
          "firstName",
          "lastName",
          "activities",
          "image"
        ]).exec();
        usersToJudge.push(currentUser);
      }
    }
    res.send(usersToJudge);
  } catch (err) {
    next(err);
  }
});
