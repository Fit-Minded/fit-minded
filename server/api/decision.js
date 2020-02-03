const router = require("express").Router();
const User = require("../db/schemas/user");
module.exports = router;

router.put("/", async (req, res, next) => {
  try {
    const userId = req.user._id.toString();
    const { decisionType, otherUserId } = req.body;
    const user = await User.findById(userId).exec();
    const otherUser = await User.findById(otherUserId).exec();
    // console.log("other user.....", typeof );
    if (decisionType === "like") {
      user.toJudge.shift();
      user.liked.set(otherUserId, true);
      otherUser.likedMe.set(userId, true);
    }
    if (decisionType === "dislike") {
      user.toJudge.shift();
      user.disliked.set(otherUserId, true);
      otherUser.dislikedMe.set(userId, true);
    }
    await user.save();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
});
