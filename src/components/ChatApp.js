import React from "react";
import MessageList from "./MessageList";
import SendMessageForm from "./SendMessageForm";
import Title from "./Title";
import Chatkit from "@pusher/chatkit-client";

const instanceLocator = "v1:us1:e45d7daa-545e-450f-bf52-00fff9c517d0";
const testToken =
  "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e45d7daa-545e-450f-bf52-00fff9c517d0/token";
const username = "Cody";
const roomId = 1;

const DUMMY_DATA = [
  {
    senderId: "perborgen",
    text: "who'll win?"
  },
  {
    senderId: "janedoe",
    text: "who'll win?"
  }
];

class ChatApp extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: DUMMY_DATA
    };
  }

  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: username,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    });

    chatManager.connect().then(currentUser => {
      currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }
  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: roomId
    });
  }

  render() {
    return (
      <div className="chat-app">
        <Title />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default ChatApp;
