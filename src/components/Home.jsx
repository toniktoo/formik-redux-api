/* eslint-disable react/button-has-type */
import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/actionAuth';

const Home = ({ isLoadingAuth, dispatch, name }) => {
  const handleLogout = () => {
    dispatch(logout({ isAuth: false, token: undefined, name: '' }));
  };
  return isLoadingAuth ? (
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
  name: state.name,
  isLoadingAuth: state.isLoadingAuth,
}))(Home);
