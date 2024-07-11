import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDashboardData } from '../../hooks/useDashboardData';
import getPercentage from '../../utils/helpers';

function PollDetail() {
  const { id } = useParams();
  const { questions, users, loggedUser, handleSetAuthUser } =
    useDashboardData();

  useEffect(() => {
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

export default PollDetail;
