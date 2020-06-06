/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React from 'react';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FormField from './FormField';
import { fetchSignUp } from '../api';
import {
  authUserRequest,
  authUpUserSuccess,
  authUpUserFailure,
} from '../redux/actions';

export const signInAuth = ({
  username,
  email,
  password,
  setFieldError,
}) => async (dispatch) => {
  dispatch(authUserRequest({ isLoading: true }));
  try {
    const data = {
      user: { email, password, username },
    };
    const response = await fetchSignUp(data);
    const token = await response.data.user.token;
    const name = await response.data.user.username;
    await dispatch(
      authUpUserSuccess({
        isAuth: true,
        token,
        name,
        isLoading: false,
      }),
    );
  } catch (error) {
    dispatch(
      authUpUserFailure({
        isAuth: false,
        isLoading: false,
        error,
        setFieldError,
      }),
    );
  }
};

const schema = yup.object().shape({
  username: yup
    .string()
    .max(50, 'no more than 50 characters')
    .required('Заполните имя'),
  email: yup.string().email('Not correct email').required('Enter email'),
  password: yup
    .string()
    .required('Enter password')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Password between 8 and 40 characters, at least one number and one capital letter',
    ),
});

const renderForm = ({ isLoading, handleSubmit }) => (isLoading ? (
  'Loading...'
) : (
  <form onSubmit={handleSubmit} className="form">
    <div>
      <h2 className="title">Registration</h2>
      <hr className="lineTitle" />
      <FormField
        name="username"
        component="input"
        placeholder="enter username..."
      />
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
    <button type="submit">Registration</button>
    <Link to="/login" className="link">
      Login
    </Link>
  </form>
));

const FormRegistration = withFormik({
  mapPropsToValues: () => ({
    username: '',
    email: '',
    password: '',
  }),
  validationSchema: () => schema,
  handleSubmit: ({ username, email, password }, { props, setFieldError }) => {
    props.signInAuth({
      username,
      email,
      password,
      setFieldError,
    });
  },
  displayName: 'FormRegistration',
})(renderForm);

const mapStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
});

export default connect(mapStateToProps, { signInAuth })(FormRegistration);
