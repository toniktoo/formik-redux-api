import React from 'react';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FormField from './FormField';
import { fetchSignIn } from '../api';
import {
  authUserRequest,
  authUpUserSuccess,
  authUpUserFailure,
} from '../redux/actions';

const signInAuth = ({
  username, email, password, setFieldError,
}) => async (
  dispatch,
) => {
  dispatch(authUserRequest({ isLoading: true }));
  try {
    const data = {
      user: { email, password, username },
    };
    const response = await fetchSignIn(data);
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
  email: yup.string().email('Not correct email').required('Enter email'),
  password: yup.string().required('Enter password'),
});

const renderForm = ({ isLoading, handleSubmit }) => (isLoading ? (
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
  displayName: 'signInAuth',
})(renderForm);

const mapStateToProps = (state) => ({
  isLoading: state.authReducer.isLoading,
});

export default connect(mapStateToProps, { signInAuth })(FormLogin);
