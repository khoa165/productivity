import axios from 'axios';
import { GET_PROFILE, CLEAR_PROFILE, ACCOUNT_DELETED } from './types';
import { toast } from 'react-toastify';
import * as ROUTES from '../constants/routes';

const API = 'api/v1';

// Get current user profile.
export const getCurrentProfile = () => async (dispatch) => {
  try {
    // Send request to API endpoints.
    const res = await axios.get(`/${API}/profile/me`);

    // Call reducer to get profile.
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
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
    const res = await axios.post(`/${API}/profile`, formData, config);

    // Call reducer to get profile.
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });

    toast.success(
      edit ? 'Profile updated successfully!' : 'Profile created successfully!'
    );

    history.push(ROUTES.DASHBOARD);
    // if (!edit) {
    //   history.push('/dashboard');
    // }
  } catch (err) {
    // Loop through errors and call reducer to set alert.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

// Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure? This can NOT be undone!')) {
    try {
      await axios.delete(`/${API}/profile`);

      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });

      toast.warn('Your account has been permanently deleted!');
    } catch (err) {
      // Loop through errors and notify user.
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((error) => toast.error(error.msg));
      }
    }
  }
};
