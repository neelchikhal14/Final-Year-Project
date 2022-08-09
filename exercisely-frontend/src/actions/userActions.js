import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from '../constants/userConstants';

import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/v1/users/login',
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    const localDate = new Date().getTime();
    // 1 min expiry
    const expirestAt = localDate + 15 * 60 * 1000;
    console.log(new Date(localDate));
    console.log(new Date(expirestAt));
    console.log(localDate, expirestAt);
    if (sessionStorage.getItem('expiresAt')) {
      sessionStorage.removeItem('expiresAt');
      sessionStorage.setItem('expiresAt', expirestAt.toString());
    } else {
      sessionStorage.setItem('expiresAt', expirestAt.toString());
    }
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const register =
  (title, firstname, lastname, email, password, role) => async (dispatch) => {
    try {
      dispatch({
        type: USER_REGISTER_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      console.log(title, firstname, lastname, email, password, role);
      const { data } = await axios.post(
        'api/v1/users/',
        { title, firstname, lastname, email, password, role },
        config
      );
      dispatch({
        type: USER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
