import axios from 'axios';
import {
  authenticatedUserRequest,
  authenticatedUserSuccess,
  authenticatedUserFailure,
} from '../redux/actions/actionAuth';

export const signInAuth = ({
  username,
  email,
  password,
  setFieldError,
  URL,
}) => {
  return async (dispatch) => {
    dispatch(authenticatedUserRequest({ isLoadingAuth: true }));
    try {
      const data = {
        user: { email: email, password: password, username: username },
      };

      const authOptions = {
        method: 'POST',
        url: URL,
        data: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        json: true,
      };
      const response = await axios(authOptions);
      const token = await response.data.user.token;
      const name = await response.data.user.username;
      await dispatch(authenticatedUserSuccess({ isAuth: true, token, name }));
      localStorage.setItem('token', token);
      localStorage.setItem('name', name);
      dispatch(authenticatedUserRequest({ isLoadingAuth: false }));
    } catch (err) {
      const responseErrors = err.response.data.errors;
      for (let key in responseErrors) {
        if (key.toString() === 'email or password') {
          setFieldError('email', 'email or password is invalid');
          setFieldError('password', 'email or password is invalid');
        } else {
          setFieldError(key.toString(), responseErrors[key][0]);
        }
      }
      dispatch(authenticatedUserFailure({ isAuth: false }));
      dispatch(authenticatedUserRequest({ isLoadingAuth: false }));
    }
  };
};
