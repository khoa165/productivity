import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  CLEAR_PROFILE,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import { toast } from 'react-toastify';

const API = 'api/v1';

// Load user.
export const loadUser = () => async (dispatch) => {
  // Check for token and set it.
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    // Send request to API endpoints.
    const res = await axios.get(`/${API}/auth`);

    // Call reducer to load user.
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    // Call reducer to indicate authentication error.
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user.
export const register = ({
  username,
  email,
  password,
  confirmedPassword,
}) => async (dispatch) => {
  // Request headers.
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // User data.
  const body = JSON.stringify({ username, email, password, confirmedPassword });

  try {
    // Send request to API endpoint.
    const res = await axios.post(`/${API}/users`, body, config);

    // Call reducer to register user.
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });

    // Call reducer to load user.
    dispatch(loadUser());
  } catch (err) {
    // Loop through errors and call reducer to set alert.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    // Call reducer to indicate fail registration.
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Login user.
export const login = ({ credential, password }) => async (dispatch) => {
  // Request headers.
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // User data.
  const body = JSON.stringify({ credential, password });

  try {
    // Send request to API endpoint.
    const res = await axios.post(`/${API}/auth`, body, config);

    // Call reducer to login user.
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    // Call reducer to load user.
    dispatch(loadUser());
    toast.success('You successfully signed in!');
  } catch (err) {
    // Loop through errors and call reducer to set alert.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    // Call reducer to indicate fail login.
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// Clear profile & logout user.
export const logout = () => async (dispatch) => {
  // Call reducer to clear profile & logout user.
  dispatch({ type: CLEAR_PROFILE });
  dispatch({ type: LOGOUT });
};
