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
} from '../actions/types';

const initialState = {
  jobApplications: [],
  currentEditedJobApplication: null,
  loading: true,
  jobApplicationPlaceholders: [],
  error: false,
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
    case SET_CURRENT_EDITED_JA:
      return {
        ...state,
        currentEditedJobApplication: payload,
      };
    case CLEAR_CURRENT_EDITED_JA:
      return {
        ...state,
        currentEditedJobApplication: null,
      };
    case ADD_NEW_JA_PLACEHOLDER:
      return {
        ...state,
        jobApplicationPlaceholders: [
          ...state.jobApplicationPlaceholders,
          payload,
        ],
      };
    case REMOVE_JA_PLACEHOLDER:
      return {
        ...state,
        jobApplicationPlaceholders: state.jobApplicationPlaceholders.filter(
          (placeholder) => placeholder !== payload
        ),
      };
    case JOB_APPLICATION_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      // Do nothing.
      return state;
  }
}
