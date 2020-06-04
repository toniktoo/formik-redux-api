import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Redirect } from 'react-router-dom';
import FormLogin from './components/FormLogin';
import Home from './components/Home';
import FormRegistration from './components/FormRegistration';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { authenticatedUserSuccess } from './redux/actions/actionAuth';

const App = ({ dispatch }) => {
  useEffect(() => {
    if (localStorage.token !== undefined) {
      dispatch(
        authenticatedUserSuccess({
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
        <PublicRoute path="/login" component={FormLogin} />
        <PublicRoute path="/sign" component={FormRegistration} />
        <Redirect to="/login" />
      </Switch>
    </div>
  );
};

export default connect((state) => ({
  isLoadingAuth: state.isLoadingAuth,
  token: state.token,
}))(App);
