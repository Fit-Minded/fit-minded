// const router = require("express").Router();
// const User = require("../db/schemas/user");
// module.exports = router;

// router.get("/likedMe", async (req, res, next) => {
//   try {
//     const userId = req.user._id;
//     const user = await User.findById(userId).exec();
//     let usersWhoLikedMe = [];
//     for (let i = 0; i < user.likedMe.length; i++) {
//       const id = user.likedMe[i];
//       const currentUser = await User.findById(id, [
//         "gender.own",
//         "age.own",
//         "firstName",
//         "lastName",
//         "activities",
//         "image"
//       ]).exec();
//       usersWhoLikedMe.push(currentUser);
//     }
//     if (usersWhoLikedMe.length < 1) {
//       res.send("hello");
//     } else {
//       res.send(usersWhoLikedMe);
//     }
//   } catch (err) {
//     next(err);
//   }
// });
