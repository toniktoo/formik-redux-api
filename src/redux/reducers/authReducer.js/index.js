/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import { handleActions } from 'redux-actions';
import { removeItemDB, setItemDB } from '../../../db';
import {
  authUserRequest,
  authUserSuccess,
  authUserFailure,
  signupUserRequest,
  signupUserSuccess,
  signupUserFailure,
  logout,
} from '../../actions';

const initState = {
  name: '',
  token: undefined,
  isLoading: false,
  isAuth: false,
};

const authReducer = handleActions(
  {
    [signupUserRequest]: (state, { payload: { isLoading } }) => ({
      ...state,
      isLoading,
    }),
    [signupUserSuccess]: (
      state,
      {
        payload: {
          isAuth, token, name, isLoading,
        },
      },
    ) => {
      setItemDB('token', token);
      setItemDB('name', name);
      return {
        ...state,
        isAuth,
        token,
        name,
        isLoading,
      };
    },
    [signupUserFailure]: (
      state,
      {
        payload: {
          isAuth, isLoading, setFieldError, error,
        },
      },
    ) => {
      if (error.message === 'Network Error') {
        alert(error.message);
      }
      const responseErrors = error.response.data.errors;
      for (const key in responseErrors) {
        setFieldError(key.toString(), responseErrors[key][0]);
      }
      return {
        ...state,
        isAuth,
        isLoading,
      };
    },
    [authUserRequest]: (state, { payload: { isLoading } }) => ({
      ...state,
      isLoading,
    }),
    [authUserSuccess]: (
      state,
      {
        payload: {
          isAuth, token, name, isLoading,
        },
      },
    ) => {
      setItemDB('token', token);
      setItemDB('name', name);
      return {
        ...state,
        isAuth,
        token,
        name,
        isLoading,
      };
    },
    [authUserFailure]: (
      state,
      {
        payload: {
          isAuth, isLoading, setFieldError, error,
        },
      },
    ) => {
      if (error.message === 'Network Error') {
        alert(error.message);
      }
      const responseErrors = error.response.data.errors;
      if (responseErrors['email or password']) {
        setFieldError('email', 'email or password is invalid');
        setFieldError('password', 'email or password is invalid');
      }
      return {
        ...state,
        isAuth,
        isLoading,
      };
    },
    [logout]: (state, { payload: { isAuth, token, name } }) => {
      removeItemDB('token');
      removeItemDB('name');
      return {
        ...state,
        name,
        isAuth,
        token,
      };
    },
  },
  initState,
);

export default authReducer;
