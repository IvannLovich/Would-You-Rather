import { _saveQuestion, _saveQuestionAnswer } from '../utils/_DATA';
import {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION,
  SAVE_ANSWER,
} from '../constants/questions';

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function saveQuestion(questionAdded) {
  return {
    type: SAVE_QUESTION,
    questionAdded,
  };
}

export function saveAnswer(authUser, questionId, answer) {
  return {
    type: SAVE_ANSWER,
    authUser,
    questionId,
    answer,
  };
}

export function handleSaveQuestion(op1, op2) {
  return async (dispatch, getState) => {
    const { loggedUser } = getState();
    const res = await _saveQuestion({
      optionOneText: op1,
      optionTwoText: op2,
      author: loggedUser,
    });

    dispatch(saveQuestion(res));
  };
}

export function handleSaveAnswer(questionId, userResponse) {
  return async (dispatch, getState) => {
    const { loggedUser } = getState();
    console.log(loggedUser);
    console.log(questionId);
    console.log(userResponse);
    const res = await _saveQuestionAnswer({
      authedUser: loggedUser,
      qid: questionId,
      answer: userResponse,
    });

    dispatch(saveAnswer(res));
  };
}
