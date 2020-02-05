import React from "react";
import { MessageList, SendMessageForm } from "../index";
import Chatkit from "@pusher/chatkit-client";
import { connect } from "react-redux";

const instanceLocator = "v1:us1:e45d7daa-545e-450f-bf52-00fff9c517d0";
const testToken =
  "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/e45d7daa-545e-450f-bf52-00fff9c517d0/token";

class ChatApp extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };

    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    const userId = this.props.user._id;
    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: userId,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    });

    const { roomId } = this.props.match.params;

    chatManager.connect().then(currentUser => {
      console.log("HELLO from connect", currentUser);
      this.currentUser = currentUser;
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
    console.log(this.currentUser);
    const { roomId } = this.props.match.params;
    this.currentUser.sendMessage({
      text: text,
      roomId: roomId
    });
    this.setState({
      messages: [...this.state.messages, text]
    });
  }

  render() {
    return (
      <div className="chat-app">
        <h1>CHATROOM</h1>
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  };
};

export default connect(mapState)(ChatApp);
