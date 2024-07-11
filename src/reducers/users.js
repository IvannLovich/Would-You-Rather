import { RECEIVE_USERS } from '../constants/users';
import { SAVE_QUESTION, SAVE_ANSWER } from '../constants/questions';

const initialState = {
  usersIds: [],
  usersScores: {},
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      const usIds = Object.keys(action.users)
        .slice()
        .map((id) => id);

      const scores = usIds.forEach((usId) => {
        return (state.usersScores[usId] = {
          questions: action.users[usId].questions.length,
          answers: Object.keys(action.users[usId].answers).length,
          total:
            action.users[usId].questions.length +
            Object.keys(action.users[usId].answers).length,
        });
      });

      return {
        ...state,
        ...action.users,
        usersIds: usIds,
        userScores: scores,
      };
    case SAVE_QUESTION:
      return {
        ...state,
        [action.questionAdded.author]: {
          ...state[action.questionAdded.author],
          questions: state[action.questionAdded.author].questions.concat([
            action.questionAdded.id,
          ]),
        },
        userScores: Object.assign({}, state.usersScores, {
          [action.questionAdded.author]: (state.usersScores[
            action.questionAdded.author
          ].questions += 1),
        }),
      };
    case SAVE_ANSWER:
      return {
        ...state,
        [action.authUser]: {
          ...state[action.authUser],
          answers: {
            ...state[action.authUser].answers,
            [questionId]: action.answer,
          },
        },
        usersScores: Object.assign({}, state.usersScores, {
          [action.authUser]: (state.usersScores[action.authUser].answers += 1),
        }),
      };
    default:
      return state;
  }
}
