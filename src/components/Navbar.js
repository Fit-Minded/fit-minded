import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

class Navbar extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <nav id="navBar"></nav>
        ) : (
          <nav id="navBar">
            <Link to="/login">
              <h2 className="navbar-h2">Login</h2>
            </Link>
            <Link to="/signup">
              <h2 className="navbar-h2">Sign Up</h2>
            </Link>
          </nav>
        )}
      </div>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);
