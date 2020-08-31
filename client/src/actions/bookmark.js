import axios from 'axios';
import {
  GET_DEFAULT_BOOKMARKS,
  ADD_NEW_DEFAULT_BOOKMARK,
  UPDATE_BOOKMARK,
  DELETE_BOOKMARK,
  SET_CURRENT_EDITED_BOOKMARK,
  CLEAR_CURRENT_EDITED_BOOKMARK,
  ADD_NEW_BOOKMARK_PLACEHOLDER,
  REMOVE_BOOKMARK_PLACEHOLDER,
} from './types';
import { toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const API = 'api/v1';

// Get default bookmarks of current authenticated user.
export const getDefaultBookmarks = () => async (dispatch) => {
  try {
    // Send request to API endpoints.
    const res = await axios.get(`/${API}/bookmarks`);

    // Call reducer to load bookmarks into state.
    dispatch({
      type: GET_DEFAULT_BOOKMARKS,
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

// Update bookmark.
export const updateBookmark = (formData, edit = false) => async (dispatch) => {
  try {
    // Request headers.
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Send request to API endpoints.
    const res = await axios.post(`/${API}/bookmarks`, formData, config);

    // Call reducer to update bookmark or add new bookmark.
    if (edit) {
      // Update bookmark
      dispatch({
        type: UPDATE_BOOKMARK,
        payload: res.data,
      });
    } else {
      // Add bookmark
      dispatch({
        type: ADD_NEW_DEFAULT_BOOKMARK,
        payload: res.data,
      });
    }

    dispatch(clearCurrentEditedBookmark());

    toast.success(
      edit
        ? 'Bookmark updated successfully!'
        : 'Woohoooo, you created a new bookmark!'
    );
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};

// Set current edited bookmark.
export const setCurrentEditedBookmark = (bookmark) => async (dispatch) => {
  // Call reducer to set bookmark as currently edited.
  dispatch({
    type: SET_CURRENT_EDITED_BOOKMARK,
    payload: bookmark,
  });
};

// Clear current edited bookmark.
export const clearCurrentEditedBookmark = () => async (dispatch) => {
  // Call reducer to indicate bookmark as not currently edited.
  dispatch({
    type: CLEAR_CURRENT_EDITED_BOOKMARK,
  });
};

// Add placeholder for new bookmark.
export const addNewBookmarkPlaceholder = () => async (dispatch) => {
  const id = uuidv4();

  // Call reducer to add new bookmark placeholder.
  dispatch({
    type: ADD_NEW_BOOKMARK_PLACEHOLDER,
    payload: id,
  });
};

// Remove a bookmark placeholder.
export const removeBookmarkPlaceholder = (placeholderId) => async (
  dispatch
) => {
  // Call reducer to remove the bookmark placeholder.
  dispatch({
    type: REMOVE_BOOKMARK_PLACEHOLDER,
    payload: placeholderId,
  });
};

// Delete bookmark.
export const deleteBookmark = (id) => async (dispatch) => {
  try {
    await axios.delete(`/${API}/bookmarks/${id}`);

    dispatch({
      type: DELETE_BOOKMARK,
      payload: id,
    });

    toast.success('Bookmark deleted successfully!');
  } catch (err) {
    // Loop through errors and notify user.
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => toast.error(error.msg));
    }
  }
};
