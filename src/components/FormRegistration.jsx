import React from 'react';
import { withFormik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FormField from './FormField';
import { signInAuth } from '../api/signInAuth';

const URL = 'https://conduit.productionready.io/api/users/';

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

const renderForm = ({ isLoadingAuth, handleSubmit }) => (isLoadingAuth ? (
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
      username, email, password, setFieldError, URL,
    });
  },
  displayName: 'FormAuth',
})(renderForm);

const mapStateToProps = (state) => ({ isLoadingAuth: state.isLoadingAuth });

export default connect(mapStateToProps, { signInAuth })(FormRegistration);
