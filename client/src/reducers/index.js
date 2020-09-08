import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import task from './task';
import bookmark from './bookmark';
import jobapplication from './jobapplication';

export default combineReducers({
  auth,
  profile,
  task,
  bookmark,
  jobapplication,
});
