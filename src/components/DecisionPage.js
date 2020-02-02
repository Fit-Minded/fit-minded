import React, { Component } from "react";
import { connect } from "react-redux";
import { gotUser } from "../store/user";
class DecisionPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    };
  }
  componentDidMount() {
    this.props.onLoadUser();
  }

  render() {
    const { image, firstName, lastName, activities } = this.state.currentUser;
    return (
      <div>
        Test
        <img src={image} alt="profile-pic" />
        <h2>
          {" "}
          {firstName} {lastName}
        </h2>
        <div>
          <p> {activities}</p>
        </div>
        <div>
          <button type="button">Yes</button>
          <button type="button">No</button>
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    currentUser: state.currentUser
  };
};

const mapDispatch = dispatch => {
  return {
    onLoadUser: function() {
      const action = gotUser();
      dispatch(action);
    }
  };
};

export default connect(mapState, mapDispatch)(DecisionPage);
