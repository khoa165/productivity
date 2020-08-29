import axios from 'axios';
import {
  GET_DEFAULT_TASKS,
  SET_CURRENT_EDITED_TASK,
  CLEAR_CURRENT_EDITED_TASK,
} from './types';

const API = 'api/v1';

// Get default tasks of current authenticated user.
export const getDefaultTasks = () => async (dispatch) => {
  try {
    // Send request to API endpoints.
    const res = await axios.get(`/${API}/tasks`);

    // Call reducer to load tasks into state.
    dispatch({
      type: GET_DEFAULT_TASKS,
      payload: res.data,
    });
  } catch (err) {
    // Call reducer to indicate error.
  }
};

// Set current edited task.
export const setCurrentEditedTask = (task) => async (dispatch) => {
  // Call reducer to set task as currently edited.
  dispatch({
    type: SET_CURRENT_EDITED_TASK,
    payload: task,
  });
};

// Clear current edited task.
export const clearCurrentEditedTask = () => async (dispatch) => {
  // Call reducer to indicate task as not currently edited.
  dispatch({
    type: CLEAR_CURRENT_EDITED_TASK,
  });
};
