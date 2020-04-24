import axios from 'axios';
import {
  GET_PROFILE,
  UPDATE_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
} from './types';
import { setAlert } from './alert';

// Get current user profile.
export const getCurrentProfile = () => async (dispatch) => {
  try {
    // Send request to API endpoints.
    const res = await axios.get('/api/profile/me');

    // Call reducer to get profile.
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    // Call reducer to indicate error.
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Create or update profile.
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  try {
    // Request headers.
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Send request to API endpoints.
    const res = await axios.post('/api/profile', formData, config);

    // Call reducer to get profile.
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    dispatch(
      setAlert(
        edit
          ? 'Profile updated successfully!'
          : 'Profile created successfully!',
        'success'
      )
    );

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (err) {
    // Loop through errors and call reducer to set alert.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }

    // Call reducer to indicate error.
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete('/api/profile');

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      dispatch(setAlert('Your account has been permanently deleted!'));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};
