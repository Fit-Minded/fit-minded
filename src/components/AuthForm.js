import React from "react";
import { connect } from "react-redux";
import { auth } from "../store";

const AuthForm = props => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div id="authForm">
      <form onSubmit={handleSubmit} name={name} className="login-form">
        <div className="form-container">
          <h1 className="log-or-sign-head">{name.toUpperCase()}</h1>
          <div>
            <input
              name="email"
              type="text"
              className="form-input-box"
              placeholder="✉️  Email"
            />
          </div>
          <br />
          <div>
            <input
              name="password"
              type="password"
              className="form-input-box"
              placeholder="🔒 *******"
            />
          </div>
          <div className="remember-chbx">
            <input type="checkbox" name="remember-me" className="chbx-btn" />
            Remember Me
          </div>
          <br />
          <div id="authSubmit">
            <button type="submit" className="login-signup-btn">
              {displayName.toUpperCase()}
            </button>
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </div>
      </form>
    </div>
  );
};

const mapLogin = state => {
  return {
    name: "login",
    displayName: "Login",
    error: state.user.error
  };
};

const mapSignup = state => {
  return {
    name: "signup",
    displayName: "Sign Up",
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
      dispatch(auth(email, password, formName));
    }
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);
