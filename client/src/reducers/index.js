import { combineReducers } from 'redux';
import auth from './auth';
import profile from './profile';
import task from './task';

export default combineReducers({ auth, profile, task });
