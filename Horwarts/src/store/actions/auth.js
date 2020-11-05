import * as actionTypes from './actionTypes';
import axios from '../../axios';

export const loginStart = () => {
  return {
    type: actionTypes.LOGIN_START
  };
};

export const loginSuccess = (user, token) => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    user: user,
    token: token
  };
};

export const loginFail = (error) => {
  return {
    type: actionTypes.LOGIN_FAIL,
    error: error
  };
};

export const login = (login, password) => {
  return (dispatch) => {
    dispatch(loginStart());
    axios
      .post('/auth/login', { login: login, password: password })
      .then((response) => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        dispatch(loginSuccess(response.data.user, response.data.token));
        dispatch(checkAuthTimeout(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(loginFail(err));
      });
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('user');
  return {
    type: actionTypes.LOGOUT
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));
      if (expirationDate > new Date()) {
        const user = localStorage.getItem('user');
        dispatch(loginSuccess(user, token));
        dispatch(
          checkAuthTimeout(
            expirationDate.getTime() - new Date().getTime() / 1000
          )
        );
      } else {
        dispatch(logout());
      }
    }
  };
};
