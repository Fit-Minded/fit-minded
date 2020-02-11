import React from 'react'

class MessageList extends React.Component {
  render() {
    console.log("this.props - messagelist", this.props)
    return (
      <div className="message-list">
        {this.props.messages.map(message => {
          const senderName = message.userStore.users[message.senderId].name
          return (
            <div key={message.id} className="single-message">
              <div className="message-sender">{senderName}</div>
              <div className="message-text">{message.text}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default MessageList
