import { createAction } from 'redux-actions';

export const signupUserRequest = createAction('USER_SIGNUP_REQUEST');
export const signupUserSuccess = createAction('USER_SIGNUP_SUCCESS');
export const signupUserFailure = createAction('USER_SIGNUP_FAILURE');

export const authUserRequest = createAction('USER_AUTH_REQUEST');
export const authUserSuccess = createAction('USER_AUTH_SUCCESS');
export const authUserFailure = createAction('USER_AUTH_FAILURE');

export const logout = createAction('LOG_OUT_PROFILE');
