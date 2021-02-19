import React from 'react';
import { Redirect, Route } from "react-router-dom";
import AuthService from "../api/AuthService";

const auth = AuthService.instance;

const PrivateRoute = ({ component, ...rest }: any) => (
  <Route {...rest} render={
    (props: any) => (
      auth.isAuthenticated() ? React.createElement(component, props) : <Redirect to='/signin' />
    )
  } />
)

export default PrivateRoute;