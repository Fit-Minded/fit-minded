const ChatKit = require("@pusher/chatkit-server");

const instanceLocator = "v1:us1:e45d7daa-545e-450f-bf52-00fff9c517d0";
const key =
  "a0f574a0-2ab0-41f2-9888-9d5d5a59d6fa:jvo1es7wqEzwFAP2Uv6z/JwjdwWvCRd9MMRLHrRFrCQ=";
// const testToken =
//   "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/fb89b76a-014b-425c-9996-f0d8dbc1e571/token";

const chatKit = new ChatKit.default({ instanceLocator, key });

const createPusherUser = async (id, name) => {
  await chatKit
    .createUser({ id, name })
    .then(() => {
      console.log("User created successfully");
    })
    .catch(err => console.error(err));
};

const createPusherRoom = async (roomId, creatorId, otherUserId) => {
  await chatKit
    .createRoom({
      id: roomId,
      creatorId: creatorId,
      userIds: [creatorId, otherUserId]
    })
    .then(() => {
      console.log("Room created successfully");
    })
    .catch(err => console.error(err));
};

module.exports = {
  createPusherUser,
  createPusherRoom
};
