import { createAction } from 'redux-actions';

export const authenticatedUserRequest = createAction(
  'USER_AUTHENTICARED_REQUEST'
);
export const authenticatedUserSuccess = createAction(
  'USER_AUTHENTICARED_SUCCESS'
);
export const authenticatedUserFailure = createAction(
  'USER_AUTHENTICARED_FAILURE'
);

export const logout = createAction('LOG_OUT_PROFILE');
