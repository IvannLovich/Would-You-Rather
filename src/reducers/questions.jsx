import {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION,
  SAVE_ANSWER,
} from '../constants/questions';

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case SAVE_QUESTION:
      return {
        ...state,

        [action.questionAdded.id]: action.questionAdded,
      };

    case SAVE_ANSWER:
      return {
        ...state,

        [action.questionId]: {
          ...state[action.questionId],
          [action.answer]: {
            ...state[action.questionId][action.answer],
            votes: state[action.questionId][action.answer].votes.concat([
              action.authUser,
            ]),
          },
        },
      };

    default:
      return state;
  }
}
