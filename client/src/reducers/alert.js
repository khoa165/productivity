import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

// Empty array of alerts.
const initialState = [];

export default function(state = initialState, action) {
  // Destructuring type and payload from action.
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      // Add new alert (from action payload) to the state.
      return [...state, payload];
    case REMOVE_ALERT:
      // Remove alert by filter out the one that matches id (from payload).
      return state.filter(alert => alert.id !== payload);
    default:
      // Do nothing.
      return state;
  }
}
