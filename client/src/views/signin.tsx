import './signin.css';

import React from "react";
import AuthService from "../api/AuthService";
import { Link, Redirect } from "react-router-dom";

interface SignInProps { }

interface SignInState {
  redirectToRefferer: boolean;
}

export default class SignInView extends React.Component<SignInProps, SignInState> {

  public state: SignInState;

  constructor(props: SignInProps) {
    super(props);

    this.state = {
      redirectToRefferer: AuthService.instance.isAuthenticated(),
    }
  }

  public signIn() {
    AuthService.instance.authenticate();
    if (AuthService.instance.isAuthenticated()) {
      this.setState({ redirectToRefferer: true });
    }
  }

  public render() {
    if (this.state.redirectToRefferer === true) {
      return <Redirect to='/dashboard' />
    }

    return (
      <div className="app" id="sign-in">
        <form className="app-form" onSubmit={this.signIn.bind(this)}>
          <div className="app-form__header">
            <h2>Sign in</h2>
            <div>Connect to your University account</div>
            <div>Don't have an account? <Link className="link" to="/signup">Sign up here</Link></div>
          </div>
          <div className="app-form__body">
            <div className="app-form__group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" placeholder="Username" />
            </div>
            <div className="app-form__group">
              <label htmlFor="password">Password</label>
              <input type="text" name="password" id="password" placeholder="Password" />
            </div>
            <button type="submit">Sign in</button>
          </div>
          <div className="app-form__footer">
            <Link className="link" to="/resetpassword">Reset password</Link>
          </div>
        </form>
      </div>
    )
  }

}