import { _getUsers, _getQuestions } from '../utils/_DATA';
import { receiveUsers } from './users';
import { receiveQuestions } from './questions';

export function getQuestionsData() {
  return async (dispatch) => {
    const res = await _getQuestions();
    dispatch(receiveQuestions(res));
  };
}

export function getUsersData() {
  return async (dispatch) => {
    const res = await _getUsers();
    dispatch(receiveUsers(res));
  };
}
