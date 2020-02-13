const User = require('../server/db/schemas/user')
const { connect } = require('../server/db/index')
const { like } = require('./decisionUtil')

const generateLikedMes = async () => {
  try {
    await connect()

    console.log('Connected to DB')

    const me = await User.findOne({ email: 'test7@test.com' }).exec()
    const myId = String(me._id)
    const otherUsers = await User.find({ toJudge: myId }).exec()

    console.log(`Found ${otherUsers.length} users to like you`)

    let length = otherUsers.length
    if (length > 10) {
      length = 10
    }

    for (let i = 0; i < length; i++) {
      const otherUser = otherUsers[i]
      const otherUserId = String(otherUser._id)
      like(otherUser, otherUserId, me, myId)
      otherUser.save()
    }
    me.save()

    console.log('Added likes successfully!')
  } catch (error) {
    console.error(error)
  }
}

generateLikedMes()
