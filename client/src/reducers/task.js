import {
  GET_DEFAULT_TASKS,
  ADD_NEW_DEFAULT_TASK,
  UPDATE_TASK,
  DELETE_TASK,
  SET_CURRENT_EDITED_TASK,
  CLEAR_CURRENT_EDITED_TASK,
  ADD_NEW_TASK_PLACEHOLDER,
  REMOVE_TASK_PLACEHOLDER,
} from '../actions/types';

const initialState = {
  defaultTasks: [],
  currentEditedTask: null,
  loading: true,
  taskPlaceholders: [],
};

export default function (state = initialState, action) {
  // Destructuring type and payload from action.
  const { type, payload } = action;

  switch (type) {
    case GET_DEFAULT_TASKS:
      return { ...state, loading: false, defaultTasks: payload };
    case ADD_NEW_DEFAULT_TASK:
      return {
        ...state,
        loading: false,
        defaultTasks: [...state.defaultTasks, payload],
      };
    case UPDATE_TASK:
      return {
        ...state,
        loading: false,
        defaultTasks: state.defaultTasks.map((task) =>
          task._id === payload._id ? payload : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        loading: false,
        defaultTasks: state.defaultTasks.filter((task) => task._id !== payload),
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
    case ADD_NEW_TASK_PLACEHOLDER:
      return {
        ...state,
        taskPlaceholders: [...state.taskPlaceholders, payload],
      };
    case REMOVE_TASK_PLACEHOLDER:
      return {
        ...state,
        taskPlaceholders: state.taskPlaceholders.filter(
          (placeholder) => placeholder !== payload
        ),
      };
    default:
      // Do nothing.
      return state;
  }
}
