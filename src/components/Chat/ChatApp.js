import React from 'react'
import { MessageList, SendMessageForm } from '../index'
import Chatkit from '@pusher/chatkit-client'
import { connect } from 'react-redux'
import { instanceLocator, testToken } from '../../herokuPusherCredentials'
import { Link } from 'react-router-dom'

class ChatApp extends React.Component {
  constructor() {
    super()
    this.state = {
      messages: []
    }

    this.sendMessage = this.sendMessage.bind(this)
  }

  componentDidMount() {
    const userId = this.props.me._id

    const chatManager = new Chatkit.ChatManager({
      instanceLocator: instanceLocator,
      userId: userId,
      tokenProvider: new Chatkit.TokenProvider({
        url: testToken
      })
    })

    const { roomId } = this.props.match.params

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser
      currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            })
          }
        }
      })
    })
  }

  sendMessage(text) {
    const { roomId } = this.props.match.params
    this.currentUser.sendMessage({
      text: text,
      roomId: roomId
    })
  }

  render() {
    const { roomId } = this.props.match.params
    const { user } = this.props.location.state
    const { activities } = this.props.location.state.matchObject
    const longitude = this.props.location.state.matchObject.location[0],
      latitude = this.props.location.state.matchObject.location[1]
    return (
      <div className="chat-app">
        <div className="chat-app-title">
          <img src={user.imageURLs[0]}></img>
          <h1>
            {user.firstName} {user.lastName.slice(0, 1)}
          </h1>
          <Link
            to={{
              pathname: `/chat/${roomId}/map`,
              state: {
                latitude,
                longitude,
                activities
              }
            }}
          >
            <i className="fas fa-map-marked-alt"></i>
          </Link>
        </div>
        <MessageList messages={this.state.messages} myId={this.props.me._id} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    )
  }
}

const mapState = state => {
  return {
    me: state.user
  }
}

export default connect(mapState)(ChatApp)
