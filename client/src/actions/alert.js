import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from './types';

export const setAlert = (msg, alertType, timeout = 10000) => (dispatch) => {
  // Create fake id for alert.
  const id = uuid.v4();

  // Call reducer to set alert.
  dispatch({
    type: SET_ALERT,
    payload: { msg, alertType, id },
  });

  // Set 10s time out for alert
  setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
};
