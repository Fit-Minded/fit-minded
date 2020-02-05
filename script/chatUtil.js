const ChatKit = require('@pusher/chatkit-server')
const { instanceLocator, key } = require('../src/pusherCredentials')

const chatKit = new ChatKit.default({ instanceLocator, key })

const createPusherUser = async (id, name) => {
  await chatKit
    .createUser({ id, name })
    .then(() => {
      console.log('User created successfully')
    })
    .catch(err => console.error(err))
}

const createPusherRoom = async (roomId, creatorId, otherUserId) => {
  await chatKit
    .createRoom({
      id: roomId,
      creatorId: creatorId,
      userIds: [creatorId, otherUserId]
    })
    .then(() => {
      console.log('Room created successfully')
    })
    .catch(err => console.error(err))
}

module.exports = {
  createPusherUser,
  createPusherRoom
}
