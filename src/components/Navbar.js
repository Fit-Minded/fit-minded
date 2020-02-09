import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

class Navbar extends Component {
  render() {
    const { isLoggedIn } = this.props

    return (
      <div>
        {isLoggedIn ? (
          <nav id="navBar">
            <Link to="/">
              <i className="fas fa-home"></i>
            </Link>
            <Link to="/likedMe">
              <i className="fas fa-smile"></i>
            </Link>
            <Link to="/matches">
              <i className="fas fa-link"></i>
            </Link>
            <Link to="/profile">
              <i className="fas fa-user"></i>
            </Link>
          </nav>
        ) : (
          <nav id="navBar">
            <Link to="/">
              <h2>Login</h2>
            </Link>
            <Link to="/signup">
              <h2>Sign Up</h2>
            </Link>
          </nav>
        )}
      </div>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user._id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
