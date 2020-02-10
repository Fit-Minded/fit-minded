import React from 'react'

class MessageList extends React.Component {
  render() {
    const { myId } = this.props
    var prevMesSenderId
    return (
      <div className="message-list">
        {this.props.messages.map(message => {
          console.log(message)
          const senderName = message.userStore.users[message.senderId].name
          let messageClassName = 'single-message-from-them'
          if (message.senderId === myId) {
            messageClassName = 'single-message-from-me'
          }
          if (prevMesSenderId === message.senderId) {
            var isSameUser = true
          } else {
            var isSameUser = false
          }
          prevMesSenderId = message.senderId
          return (
            <div key={message.id} className={messageClassName}>
              {!isSameUser && (
                <div className="message-sender">{senderName}</div>
              )}
              <div className="message-text">{message.text}</div>
            </div>
          )
        })}
      </div>
    )
  }
}

export default MessageList
