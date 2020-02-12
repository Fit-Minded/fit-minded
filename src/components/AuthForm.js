import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../store';

class AuthForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '""'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      [e.target.name]: e.target.value
    });
  }

  render() {
    const { name, displayName, handleSubmit, error, handleGoogle } = this.props;
    return (
      <div id='authForm'>
        <h1 className='title'>
          Fit<span>Minded</span>
        </h1>
        <form onSubmit={handleSubmit} name={name} className='login-form'>
          <h1>{name.toUpperCase()}</h1>
          <div>
            <input
              name='email'
              type='text'
              placeholder='✉️  Email'
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div>
            <input
              name='password'
              type='password'
              placeholder='🔒 *******'
              onChange={this.handleChange}
            />
          </div>
          <div className='remember-chbx'>
            <input type='checkbox' name='remember-me' className='chbx-btn' />
            Remember Me
          </div>
          <br />
          <div id='authSubmit'>
            {displayName === 'Sign Up' ? (
              <Link
                to={{
                  pathname: '/signUpPage',
                  state: {
                    email: this.state.email,
                    password: this.state.password
                  }
                }}
              >
                <button type='button'>SIGN UP</button>
              </Link>
            ) : (
              <button type='submit'>LOGIN</button>
            )}
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
        <a href='/auth/google'> with Google</a>
      </div>
    );
  }
}

const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth({ email, password }, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
