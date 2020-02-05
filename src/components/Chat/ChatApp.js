import React from 'react'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'
import Chatkit from '@pusher/chatkit-client'

const instanceLocator = 'v1:us1:fb89b76a-014b-425c-9996-f0d8dbc1e571'
const testToken =
  'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/fb89b76a-014b-425c-9996-f0d8dbc1e571/token'
const userId = '12'
const roomId = '7b31bc3d-311d-4af4-be10-f272c9cbfed8'

const DUMMY_DATA = [
  {
    senderId: 'perborgen',
    text: "who'll win?"
  },
  {
    senderId: 'janedoe',
    text: "who'll win?"
  }
]

class ChatApp extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: DUMMY_DATA
    }
    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    console.log('roomId', roomId)

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: userId,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    })
    console.log('chatManager', chatManager)

    chatManager.connect().then(currentUser => {
      console.log('HELLO from connect')
      this.currentUser = currentUser
      currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      })
    })
  }
  sendMessage(text) {
    console.log('SEND MESSAGE', this.currentUser)
    this.currentUser.sendMessage({
      text: text,
      roomId: roomId
    })
  }

  render() {
    console.log('render', this.currentUser)
    return (
      <div className="chat-app">
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    )
  }
}

export default ChatApp
