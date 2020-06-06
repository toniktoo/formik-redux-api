/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../redux/actions';

const Home = ({ isLoading, dispatch, name }) => {
  const handleLogout = () => {
    dispatch(logout({ isAuth: false, token: undefined, name: '' }));
  };
  return isLoading ? (
    'Loading...'
  ) : (
    <div>
      <h2>
        Ваше имя:
        {name}
      </h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default connect((state) => ({
  name: state.authReducer.name,
  isLoading: state.authReducer.isLoading,
}))(Home);
