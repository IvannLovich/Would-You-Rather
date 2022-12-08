import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Polls from '../../components/Polls/Polls';
import { getQuestionsData, getUsersData } from '../../actions/data';
import { handleSaveAnswer } from '../../actions/questions';
import '../../base.css';
import './dashboard.css';

function Dashboard({
  getQuestionsData,
  questions,
  getUsersData,
  users,
  handleSaveAnswer,
  answeredIds,
  unansweredIds,
}) {
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const history = useHistory();

  useEffect(() => {
    getQuestionsData();
    getUsersData();
  }, []);

  function sendingSelection(e, questionId) {
    e.preventDefault();

    history.push(`/questions/${questionId}`);
    return handleSaveAnswer(questionId, selectedOption.selectedOption);
  }

  function selectionChange(e) {
    setSelectedOption({
      selectedOption: e.target.value,
    });
  }
  console.log('====>', questions);
  return (
    <section className="main-content dashboard">
      <div className="dashboard__qts-buttons-container">
        <div className="dashboard__indicator-container">
          <button
            className="dashboard__qts-button"
            type="button"
            onClick={() => setIsAnswered(false)}
          >
            Unanswered
          </button>
          <div
            className={`dashboard__indicator ${isAnswered && 'active'}`}
          ></div>
        </div>
        <div className="dashboard__indicator-container">
          <button
            className="dashboard__qts-button"
            type="button"
            onClick={() => {
              setIsAnswered(true);
              setSelectedOption('');
            }}
          >
            Answered
          </button>
          <div
            className={`dashboard__indicator ${!isAnswered && 'active'}`}
          ></div>
        </div>
      </div>

      {isAnswered
        ? answeredIds.map((answeredId, index) => {
            console.log('FD', questions[answeredId]);
            return (
              <Polls
                key={index}
                users={users}
                questions={questions}
                questionId={answeredId}
                answered={true}
                selectedOption={selectedOption}
                history={history}
                selectionChange={selectionChange}
                sendingSelection={sendingSelection}
              />
            );
          })
        : unansweredIds.map((unansweredId, index) => {
            console.log('zzD', questions[unansweredId]);

            return (
              <Polls
                key={index}
                users={users}
                questions={questions}
                questionId={unansweredId}
                answered={false}
                selectedOption={selectedOption}
                history={history}
                selectionChange={selectionChange}
                sendingSelection={sendingSelection}
              />
            );
          })}
    </section>
  );
}

function mapStateToProps({ loggedUser, users, questions }) {
  if (users && loggedUser) {
    const unansweredIds = [];
    const answeredIds = Object.keys(users[loggedUser].answers);

    const questionsId = Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp,
    );
    questionsId.map(
      (id) => answeredIds.includes(id) === false && unansweredIds.push(id),
    );
    answeredIds.sort((a, b) => questions[b] - questions[a]);
    return {
      users,
      questions,
      loggedUser,
      answeredIds,
      unansweredIds,
    };
  }
  return {
    loggedUser,
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators(
    { getQuestionsData, getUsersData, handleSaveAnswer },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispachToProps)(Dashboard);
