import axios from 'axios';
import {
  GET_JOB_APPLICATIONS,
  ADD_NEW_JOB_APPLICATION,
  UPDATE_JOB_APPLICATION,
  DELETE_JOB_APPLICATION,
  SET_CURRENT_EDITED_JA,
  CLEAR_CURRENT_EDITED_JA,
  ADD_NEW_JA_PLACEHOLDER,
  REMOVE_JA_PLACEHOLDER,
  JOB_APPLICATION_ERROR,
} from './types';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const API = 'api/v1';

// Get job applications of current authenticated user.
export const getJobApplications = () => async (dispatch) => {
  try {
    // Send request to API endpoints.
    const res = await axios.get(`/${API}/jobapplications`);

    // Call reducer to load job applications into state.
    dispatch({
      type: GET_JOB_APPLICATIONS,
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

// Update job application.
export const updateJobApplication = (formData, edit = false) => async (
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
    const res = await axios.post(`/${API}/jobapplications`, formData, config);

    // Call reducer to update job application or add new job application.
    if (edit) {
      // Update job application
      dispatch({
        type: UPDATE_JOB_APPLICATION,
        payload: res.data,
      });
    } else {
      // Add job application
      dispatch({
        type: ADD_NEW_JOB_APPLICATION,
        payload: res.data,
      });
    }

    dispatch(clearCurrentEditedJobApplication());

    toast.success(
      edit
        ? 'Job application updated successfully!'
        : 'Woohoooo, you added a new job application!'
    );
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    console.log('about to dispatch error');
    dispatch({ type: JOB_APPLICATION_ERROR });
  }
};

// Set current edited job application.
export const setCurrentEditedJobApplication = (jobapplication) => async (
  dispatch
) => {
  // Call reducer to set job application as currently edited.
  dispatch({
    type: SET_CURRENT_EDITED_JA,
    payload: jobapplication,
  });
};

// Clear current edited job application.
export const clearCurrentEditedJobApplication = () => async (dispatch) => {
  // Call reducer to indicate job application as not currently edited.
  dispatch({
    type: CLEAR_CURRENT_EDITED_JA,
  });
};

// Add placeholder for new job application.
export const addNewJobApplicationPlaceholder = () => async (dispatch) => {
  const id = uuidv4();

  // Call reducer to add new job application placeholder.
  dispatch({
    type: ADD_NEW_JA_PLACEHOLDER,
    payload: id,
  });
};

// Remove a job application placeholder.
export const removeJobApplicationPlaceholder = (placeholderId) => async (
  dispatch
) => {
  // Call reducer to remove the job application placeholder.
  dispatch({
    type: REMOVE_JA_PLACEHOLDER,
    payload: placeholderId,
  });
};

// Delete job application.
export const deleteJobApplication = (id) => async (dispatch) => {
  try {
    await axios.delete(`/${API}/jobapplications/${id}`);

    dispatch({
      type: DELETE_JOB_APPLICATION,
      payload: id,
    });

    toast.success('Job application deleted successfully!');
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};
