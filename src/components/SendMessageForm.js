import React from "react";

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log("THIS.STATE", this.state)
    console.log("currentUser", this.currentUser)
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ""
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type your message and hit ENTER"
          type="text"
        />
      </form>
    );
  }
}

export default SendMessageForm;
