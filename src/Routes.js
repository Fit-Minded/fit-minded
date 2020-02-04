<<<<<<< HEAD
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Login, Signup } from './components/AuthForm';
import { DecisionPage, SignUpPage } from './components';
import { me } from './store';
import LikedMe from './components/LikedMe';
import Chat from './components/Chat'
import Matches from './components/Matches';
=======
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { Login, Signup } from "./components/AuthForm";
import { DecisionPage, SignUpPage } from "./components";
import { me } from "./store";
import LikedMe from "./components/LikedMe";
import Matches from "./components/Matches";
import ChatApp from "./components/ChatApp";
>>>>>>> c77af903cbba671bcfa27a6a8b3de54f8a378132

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
            <Route exact path="/home" component={DecisionPage} />
            <Route exact path="/likedMe" component={LikedMe} />
            <Route exact path="/matches" component={Matches} />
          </Switch>
        ) : (
          <Switch>
<<<<<<< HEAD
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/signUpPage' component={SignUpPage} />
            <Route exact path='/chat' component={Chat}/>
=======
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signUpPage" component={SignUpPage} />
            <Route exact path="/chat" component={ChatApp} />
>>>>>>> c77af903cbba671bcfa27a6a8b3de54f8a378132
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
