import {
  GET_DEFAULT_TASKS,
  UPDATE_TASK,
  SET_CURRENT_EDITED_TASK,
  CLEAR_CURRENT_EDITED_TASK,
} from '../actions/types';

// Get token, set isAuthenticated and user to null, set loading to true.
const initialState = {
  defaultTasks: [],
  currentEditedTask: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  // Destructuring type and payload from action.
  const { type, payload } = action;

  switch (type) {
    case GET_DEFAULT_TASKS:
      // Set isAuthenticated to true, loading to false and set user.
      return { ...state, loading: false, defaultTasks: payload };
    case UPDATE_TASK:
      // Set isAuthenticated to true, loading to false and set user.
      return {
        ...state,
        loading: false,
        defaultTasks: state.defaultTasks.map((task) =>
          task._id === payload.id ? payload : task
        ),
      };
    case SET_CURRENT_EDITED_TASK:
      return {
        ...state,
        currentEditedTask: payload,
      };
    case CLEAR_CURRENT_EDITED_TASK:
      return {
        ...state,
        currentEditedTask: null,
      };
    default:
      // Do nothing.
      return state;
  }
}
