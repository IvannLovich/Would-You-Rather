import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsData, getUsersData } from '../actions/data.js';
import { handleSaveAnswer, handleSaveQuestion } from '../actions/questions.js';
import { handleSetAuthUser } from '../actions/loggedUser.js';

export const useDashboardData = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questions);
  const users = useSelector((state) => state.users);
  const loggedUser = useSelector((state) => state.loggedUser);
  const answeredIds = loggedUser ? Object.keys(users[loggedUser].answers) : [];
  const unansweredIds = loggedUser
    ? Object.keys(questions).filter((id) => !answeredIds.includes(id))
    : [];

  useEffect(() => {
    dispatch(getQuestionsData());
    dispatch(getUsersData());
  }, [dispatch]);

  return {
    questions,
    users,
    loggedUser,
    answeredIds,
    unansweredIds,
    handleSaveAnswer: (questionId, selectedOption) =>
      dispatch(handleSaveAnswer(questionId, selectedOption)),
    handleSetAuthUser: (userId) => dispatch(handleSetAuthUser(userId)),
    handleSaveQuestion: (op1, op2) => dispatch(handleSaveQuestion(op1, op2)),
  };
};
