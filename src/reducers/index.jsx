import { combineReducers } from 'redux';
import users from './users';
import questions from './questions';
import loggedUser from './loggedUser';

export default combineReducers({
  users,
  questions,
  loggedUser,
});
