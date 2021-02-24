import React from 'react';
import AuthService from "../api/AuthService";

import { Redirect, Route, useParams } from "react-router-dom";

/**
 * Access the global auth service.
 */
const auth = AuthService.instance;

/**
 * Render a private route element which redirects to the sign in page when
 * if the user is not logged in, otherwise rendering the requested view.
 * 
 * @param param0 
 */
const PrivateRoute = ({ component, ...rest }: any) => {
  return (
    <Route {...rest} render={
      (props: any) => (
        auth.isAuthenticated() ? React.createElement(component, props) : <Redirect to='/signin' />
      )
    } />
  )
}

export default PrivateRoute;