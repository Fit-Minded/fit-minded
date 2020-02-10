import React from 'react';
import { MessageList, SendMessageForm } from '../index';
import Chatkit from '@pusher/chatkit-client';
import { connect } from 'react-redux';
import { instanceLocator, testToken } from '../../herokuPusherCredentials';

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
      this.currentUser = currentUser;
      currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }

  sendMessage(text) {
    const { roomId } = this.props.match.params;
    this.currentUser.sendMessage({
      text: text,
      roomId: roomId
    });
  }

  render() {
    return (
      <div className='chat-app'>
        <div className='chat-app-title'>
          <h1>CHATROOM</h1>
        </div>
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
