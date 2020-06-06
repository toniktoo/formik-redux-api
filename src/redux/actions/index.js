import { createAction } from 'redux-actions';

export const authUserRequest = createAction('USER_AUTH_REQUEST');
export const authUpUserSuccess = createAction('USER_AUTH_SUCCESS');
export const authUpUserFailure = createAction('USER_AUTH_FAILURE');

export const logout = createAction('LOG_OUT_PROFILE');
