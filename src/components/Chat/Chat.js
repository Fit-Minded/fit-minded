import React, { Component } from "react";

class Chat extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="chat-form">
          <ul id="message-list"></ul>
          <form id="message-form">
            <input type="text" id="message-text" />
            <input type="submit" />
          </form>
        </div>

        <div id="root"></div>
      </div>
    );
  }
}

export default Chat;
