import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import FormLogin from './components/FormLogin';
import Home from './components/Home';
import FormRegistration from './components/FormRegistration';
import PrivateRoute from './components/PrivateRoute';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import { authUserSuccess } from './redux/actions';

const App = ({ dispatch }) => {
  useEffect(() => {
    if (localStorage.token !== undefined) {
      dispatch(
        authUserSuccess({
          isAuth: true,
          token: localStorage.token,
          name: localStorage.name,
        }),
      );
    }
  }, [dispatch]);

  return (
    <div className="app">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <AuthenticatedRoute path="/login" component={FormLogin} />
        <AuthenticatedRoute path="/sign" component={FormRegistration} />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
};

export default connect((state) => ({
  isAuth: state.authReducer.isAuth,
  token: state.authReducer.token,
}))(App);
