import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const AuthenticatedRoute = ({
  component: Component,
  isAuth,
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) => (isAuth ? <Redirect to="/" /> : <Component {...props} />)}
  />
);

export default connect((state) => ({
  isAuth: state.authReducer.isAuth,
}))(AuthenticatedRoute);
