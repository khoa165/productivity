import {
  GET_PROFILE,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  PROFILE_NOT_FOUND,
} from '../actions/types';

const initialState = {
  profile: null,
  loading: true,
};

export default function (state = initialState, action) {
  // Destructuring type and payload from action.
  const { type, payload } = action;

  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
      };
    case PROFILE_NOT_FOUND:
      return {
        ...state,
        loading: false,
      };
    default:
      // Do nothing.
      return state;
  }
}
