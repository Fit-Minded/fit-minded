import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../store'

class UserProfile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { logout } = this.props
    const { image, firstName, lastName } = this.props.user
    console.log(this.props.user)
    return (
      <div id="userProfile">
        <h1>
          {firstName} {lastName}
        </h1>
        <img src={image} alt="userPic" />

        <button type="button" onClick={logout}>
          LOGOUT
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
