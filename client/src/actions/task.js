import axios from 'axios';
import {
  GET_DEFAULT_TASKS,
  ADD_NEW_DEFAULT_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_CURRENT_EDITED_TASK,
  CLEAR_CURRENT_EDITED_TASK,
  ADD_NEW_TASK_PLACEHOLDER,
  REMOVE_TASK_PLACEHOLDER,
  TASK_ERROR,
} from './types';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

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
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

// Update task.
export const updateTask = (formData, edit = false) => async (dispatch) => {
  try {
    // Request headers.
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Send request to API endpoints.
    const res = await axios.post(`/${API}/tasks`, formData, config);

    // Call reducer to update task or add new task.
    if (edit) {
      // Update task
      dispatch({
        type: UPDATE_TASK,
        payload: res.data,
      });
    } else {
      // Add task
      dispatch({
        type: ADD_NEW_DEFAULT_TASK,
        payload: res.data,
      });
    }

    dispatch(clearCurrentEditedTask());

    toast.success(
      edit ? 'Task updated successfully!' : 'Woohoooo, you created a new task!'
    );
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }

    dispatch({ type: TASK_ERROR });
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

// Add placeholder for new task.
export const addNewTaskPlaceholder = () => async (dispatch) => {
  const id = uuidv4();

  // Call reducer to add new task placeholder.
  dispatch({
    type: ADD_NEW_TASK_PLACEHOLDER,
    payload: id,
  });
};

// Remove a task placeholder.
export const removeTaskPlaceholder = (placeholderId) => async (dispatch) => {
  // Call reducer to remove the task placeholder.
  dispatch({
    type: REMOVE_TASK_PLACEHOLDER,
    payload: placeholderId,
  });
};

// Delete task.
export const deleteTask = (id) => async (dispatch) => {
  try {
    await axios.delete(`/${API}/tasks/${id}`);

    dispatch({
      type: DELETE_TASK,
      payload: id,
    });

    toast.success('Task deleted successfully!');
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};
