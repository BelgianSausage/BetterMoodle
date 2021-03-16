import './signin.css';

import React from "react";
import Alert from 'react-bootstrap/Alert';
import AuthService from "../api/AuthService";
import { Link, Redirect } from "react-router-dom";

interface SignInProps { }

interface SignInState {
  error: string;
  showError: boolean;
  redirectToRefferer: boolean;
}

export default class SignInView extends React.Component<SignInProps, SignInState> {

  state: SignInState = {
    error: "",
    showError: false,
    redirectToRefferer: AuthService.instance.isAuthenticated(),
  }

  async signIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const credentials = await AuthService.instance.signIn(event);
    if (credentials.isAuthenticated) {
      this.setState({ redirectToRefferer: true });
    } else if (credentials.error) {
      this.setState({ error: credentials.error, showError: true });
    } else {
      this.setState({ error: "500 - Internal server error!", showError: true });
    }
  }

  showError() {
    this.setState({ showError: true });
  }

  hideError() {
    this.setState({ showError: false });
  }

  render() {
    if (this.state.redirectToRefferer === true) {
      return <Redirect to='/dashboard' />
    }

    return (
      <div className="app" id="sign-in">
        <Alert variant="danger" show={this.state.showError} onClose={this.hideError.bind(this)} dismissible>
          <Alert.Heading>Error!</Alert.Heading>
          <p>{this.state.error}</p>
        </Alert> 
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
              <input type="password" name="password" id="password" placeholder="Password" />
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