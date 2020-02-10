import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import { ListView, SignUpPage, ProfileView, ChatApp } from './components';
import { me } from './store';

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn } = this.props;

    return (
      <Switch>
        {isLoggedIn ? (
          <Switch>
            <Route exact path='/' component={ProfileView} />
            <Route exact path='/matches' component={ListView} />
            <Route exact path='/chat/:roomId' component={ChatApp} />
            <Route exact path='/likedMe' component={ListView} />
            <Route exact path='/likedMe/:index' component={ProfileView} />
            <Route exact path='/profile' component={ProfileView} />
            <Route exact path='/profile/update' component={SignUpPage} />
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/' component={Login} />
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
    loadInitialData() {
      dispatch(me());
    }
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
