import {
  GET_DEFAULT_BOOKMARKS,
  ADD_NEW_DEFAULT_BOOKMARK,
  UPDATE_BOOKMARK,
  DELETE_BOOKMARK,
  SET_CURRENT_EDITED_BOOKMARK,
  CLEAR_CURRENT_EDITED_BOOKMARK,
  ADD_NEW_BOOKMARK_PLACEHOLDER,
  REMOVE_BOOKMARK_PLACEHOLDER,
  BOOKMARK_ERROR,
} from '../actions/types';

const initialState = {
  defaultBookmarks: [],
  currentEditedBookmark: null,
  loading: true,
  bookmarkPlaceholders: [],
  error: false,
};

export default function (state = initialState, action) {
  // Destructuring type and payload from action.
  const { type, payload } = action;

  switch (type) {
    case GET_DEFAULT_BOOKMARKS:
      return { ...state, loading: false, defaultBookmarks: payload };
    case ADD_NEW_DEFAULT_BOOKMARK:
      return {
        ...state,
        loading: false,
        defaultBookmarks: [...state.defaultBookmarks, payload],
      };
    case UPDATE_BOOKMARK:
      return {
        ...state,
        loading: false,
        defaultBookmarks: state.defaultBookmarks.map((bookmark) =>
          bookmark._id === payload._id ? payload : bookmark
        ),
      };
    case DELETE_BOOKMARK:
      return {
        ...state,
        loading: false,
        defaultBookmarks: state.defaultBookmarks.filter(
          (bookmark) => bookmark._id !== payload
        ),
      };
    case SET_CURRENT_EDITED_BOOKMARK:
      return {
        ...state,
        currentEditedBookmark: payload,
      };
    case CLEAR_CURRENT_EDITED_BOOKMARK:
      return {
        ...state,
        currentEditedBookmark: null,
      };
    case ADD_NEW_BOOKMARK_PLACEHOLDER:
      return {
        ...state,
        bookmarkPlaceholders: [...state.bookmarkPlaceholders, payload],
      };
    case REMOVE_BOOKMARK_PLACEHOLDER:
      return {
        ...state,
        bookmarkPlaceholders: state.bookmarkPlaceholders.filter(
          (placeholder) => placeholder !== payload
        ),
      };
    case BOOKMARK_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      // Do nothing.
      return state;
  }
}
