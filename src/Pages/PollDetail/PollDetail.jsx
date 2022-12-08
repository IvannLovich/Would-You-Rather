import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getQuestionsData, getUsersData } from '../../actions/data';
import { handleSetAuthUser } from '../../actions/loggedUser';

import getPercentage from '../../utils/helpers';

function PollDetail({
  getQuestionsData,
  questions,
  getUsersData,
  users,
  loggedUser,
  handleSetAuthUser,
}) {
  const { id } = useParams();

  useEffect(() => {
    getQuestionsData();
    getUsersData();
    handleSetAuthUser(loggedUser);
  }, []);

  const numberOfUsers = Object.keys(users).length;
  const question = questions[id];
  const firstOptionText = question.optionOne.text;
  const secondOptionText = question.optionTwo.text;
  const firstOptionVotes = question.optionOne.votes;
  const secondOptionVotes = question.optionTwo.votes;
  return (
    <section className="polls__detail">
      <div className="polls__detail-texts">
        {firstOptionText}
        {firstOptionVotes.includes(loggedUser) && (
          <span className="polls__user-vote">Your vote</span>
        )}
      </div>
      <hr />
      <span>{firstOptionVotes.length} votes </span>
      <span>({getPercentage(numberOfUsers, firstOptionVotes.length)} %)</span>
      <br />
      <br />

      <div className="polls__detail-texts">
        {secondOptionText}
        {secondOptionVotes.includes(loggedUser) && (
          <span className="polls__user-vote">Your vote</span>
        )}
      </div>
      <hr />
      <span>{secondOptionVotes.length} votes </span>
      <span>({getPercentage(numberOfUsers, secondOptionVotes.length)} %)</span>
    </section>
  );
}

function mapStateToProps({ questions, users, loggedUser }) {
  return {
    questions,
    users,
    loggedUser,
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(
    { getQuestionsData, getUsersData, handleSetAuthUser },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispachToProps)(PollDetail);
