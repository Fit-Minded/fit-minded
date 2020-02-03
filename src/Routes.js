import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import { DecisionPage, SignUpPage } from './components';
import { me } from './store';
import LikedMe from './components/LikedMe';

class Routes extends Component {
  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.loadInitialData();
    }
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {isLoggedIn ? (
          <Switch>
            <Route exact path='/home' component={DecisionPage} />
            <Route exact path='/likedMe' component={LikedMe} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/signUpPage' component={SignUpPage} />
          </Switch>
        )}
      </Switch>
    );
  }
}

const mapState = state => {
  return {
    isLoggedIn: !!state.user._id
  };
};

const mapDispatch = dispatch => {
  return {
    async loadInitialData() {
      await dispatch(me());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
