import {
  GET_JOB_APPLICATIONS,
  ADD_NEW_JOB_APPLICATION,
  UPDATE_JOB_APPLICATION,
  DELETE_JOB_APPLICATION,
  SET_CURRENT_EDITED_JOB_APPLICATION,
  CLEAR_CURRENT_EDITED_JOB_APPLICATION,
  ADD_NEW_JOB_APPLICATION_PLACEHOLDER,
  REMOVE_JOB_APPLICATION_PLACEHOLDER,
} from '../actions/types';

const initialState = {
  jobApplications: [],
  currentEditedJobApplication: null,
  loading: true,
  jobApplicationPlaceholders: [],
};

export default function (state = initialState, action) {
  // Destructuring type and payload from action.
  const { type, payload } = action;

  switch (type) {
    case GET_JOB_APPLICATIONS:
      return { ...state, loading: false, jobApplications: payload };
    case ADD_NEW_JOB_APPLICATION:
      return {
        ...state,
        loading: false,
        jobApplications: [...state.jobApplications, payload],
      };
    case UPDATE_JOB_APPLICATION:
      return {
        ...state,
        loading: false,
        jobApplications: state.jobApplications.map((jobapplication) =>
          jobapplication._id === payload._id ? payload : jobapplication
        ),
      };
    case DELETE_JOB_APPLICATION:
      return {
        ...state,
        loading: false,
        jobApplications: state.jobApplications.filter(
          (jobapplication) => jobapplication._id !== payload
        ),
      };
    case SET_CURRENT_EDITED_JOB_APPLICATION:
      return {
        ...state,
        currentEditedJobApplication: payload,
      };
    case CLEAR_CURRENT_EDITED_JOB_APPLICATION:
      return {
        ...state,
        currentEditedJobApplication: null,
      };
    case ADD_NEW_JOB_APPLICATION_PLACEHOLDER:
      return {
        ...state,
        jobApplicationPlaceholders: [
          ...state.jobApplicationPlaceholders,
          payload,
        ],
      };
    case REMOVE_JOB_APPLICATION_PLACEHOLDER:
      return {
        ...state,
        jobApplicationPlaceholders: state.jobApplicationPlaceholders.filter(
          (placeholder) => placeholder !== payload
        ),
      };
    default:
      // Do nothing.
      return state;
  }
}
