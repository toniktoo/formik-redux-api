import React from 'react';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FormField from './FormField';
import { setItemDB } from '../db';
import { fetchSignIn } from '../api';
import {
  authenticatedUserRequest,
  authenticatedUserSuccess,
  authenticatedUserFailure,
} from '../redux/actions';

const signInAuth = ({
  username, email, password, setFieldError,
}) => async (
  dispatch,
) => {
  dispatch(authenticatedUserRequest({ isLoadingAuth: true }));
  try {
    const data = {
      user: { email, password, username },
    };
    const response = await fetchSignIn(data);
    const token = await response.data.user.token;
    const name = await response.data.user.username;
    await dispatch(authenticatedUserSuccess({ isAuth: true, token, name }));
    setItemDB('token', token);
    setItemDB('name', name);
    dispatch(authenticatedUserRequest({ isLoadingAuth: false }));
  } catch (err) {
    if (err.message === 'Network Error') {
      alert(err.message);
    }
    const responseErrors = err.response.data.errors;
    if (responseErrors['email or password']) {
      setFieldError('email', 'email or password is invalid');
      setFieldError('password', 'email or password is invalid');
    }
    dispatch(authenticatedUserFailure({ isAuth: false }));
    dispatch(authenticatedUserRequest({ isLoadingAuth: false }));
  }
};

const schema = yup.object().shape({
  email: yup.string().email('Not correct email').required('Enter email'),
  password: yup.string().required('Enter password'),
});

const renderForm = ({ isLoadingAuth, handleSubmit }) => (isLoadingAuth ? (
  'Loading...'
) : (
  <form onSubmit={handleSubmit} className="form">
    <div>
      <h2 className="title">Login</h2>
      <hr className="lineTitle" />
      <FormField
        name="email"
        component="input"
        placeholder="enter email..."
      />
      <FormField
        name="password"
        type="password"
        component="input"
        placeholder="enter password..."
      />
    </div>
    <button type="submit">Login</button>
    <Link to="/sign" className="link">
      Registration
    </Link>
  </form>
));

const FormLogin = withFormik({
  mapPropsToValues: () => ({
    email: '',
    password: '',
  }),
  validationSchema: () => schema,
  handleSubmit: ({ email, password }, { props, setFieldError }) => {
    props.signInAuth({
      email,
      password,
      setFieldError,
    });
  },
  displayName: 'FormAuth',
})(renderForm);

const mapStateToProps = (state) => ({ isLoadingAuth: state.isLoadingAuth });

export default connect(mapStateToProps, { signInAuth })(FormLogin);
