import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm'
import { DecisionPage } from './components'
import { me, getToJudge } from './store'

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    // const { isLoggedIn } = this.props;

    return (
      <Switch>
        <Route exact path="/home" component={DecisionPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
      </Switch>
    )
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    async loadInitialData() {
      await dispatch(me())
      await dispatch(getToJudge())
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(Routes))
