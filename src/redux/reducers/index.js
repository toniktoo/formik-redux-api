import { handleActions } from 'redux-actions';
import {
  authenticatedUserFailure,
  authenticatedUserRequest,
  authenticatedUserSuccess,
  logout,
} from '../actions';
import { removeItemDB } from '../../db';

const initState = {
  name: '',
  token: undefined,
  isLoadingAuth: false,
  isAuth: false,
};

export const reducer = handleActions(
  {
    [authenticatedUserRequest]: (state, { payload: { isLoadingAuth } }) => {
      return {
        ...state,
        isLoadingAuth,
      };
    },
    [authenticatedUserSuccess]: (
      state,
      { payload: { isAuth, token, name } }
    ) => {
      return {
        ...state,
        isAuth,
        token,
        name,
      };
    },
    [authenticatedUserFailure]: (state, { payload: { isAuth } }) => {
      return {
        ...state,
        isAuth,
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
  initState
);
