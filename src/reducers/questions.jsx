import {
  RECEIVE_QUESTIONS,
  SAVE_QUESTION,
  SAVE_ANSWER,
} from '../constants/questions';


// const initialState = {
//   questionsAnsweredIds: [],
//   questionsUnansweredIds: [],
// };

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      // const arrayOfKeysSorted = Object.keys(action.questions)
      //   .slice()
      //   .sort(
      //     (a, b) =>
      //       action.questions[b].timestamp - action.questions[a].timestamp,
      //   );

      // const arrayAnswered = arrayOfKeysSorted.filter((questionId) => {
      //   return (
      //     action.questions[questionId].optionOne.votes.length !== 0 ||
      //     action.questions[questionId].optionTwo.votes.length !== 0
      //   );
      // });

      // const arrayUnanswered = arrayOfKeysSorted.filter((questionId) => {
      //   return (
      //     action.questions[questionId].optionOne.votes.length === 0 &&
      //     action.questions[questionId].optionTwo.votes.length === 0
      //   );
      // });

      return {
        ...state,
        ...action.questions,
        // questionsAnsweredIds: arrayAnswered,
        // questionsUnansweredIds: arrayUnanswered,
      };

    case SAVE_QUESTION:
      return {
        ...state,
        // questionsUnansweredIds: [
        //   ...state.questionsUnansweredIds,
        //   action.questionAdded.id,
        // ],
        [action.questionAdded.id]: action.questionAdded,
      };

    case SAVE_ANSWER:
      return {
        ...state,
        // questionsAnsweredIds: [
        //   ...state.questionsAnsweredIds,
        //   action.questionId,
        // ],
        // questionsUnansweredIds: state.questionsUnansweredIds.filter(
        //   (qId) => qId !== action.questionId,
        // ),
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
