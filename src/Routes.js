import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm'
import {
  DecisionPage,
  LikedMe,
  Matches,
  SignUpPage,
  UserProfile,
  ChatApp,
  ProfileView
} from './components'
import { me } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const { isLoggedIn } = this.props

    return (
      <Switch>
        {isLoggedIn ? (
          <Switch>
            <Route exact path="/home" component={ProfileView} />
            <Route exact path="/likedMe" component={ProfileView} />
            <Route exact path="/matches" component={Matches} />
            <Route exact path="/profile" component={ProfileView} />
            <Route exact path="/chat/:roomId" component={ChatApp} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signUpPage" component={SignUpPage} />
          </Switch>
        )}
      </Switch>
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
    loadInitialData() {
      dispatch(me())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))
