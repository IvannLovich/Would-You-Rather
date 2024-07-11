import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Polls from '../../components/Polls/Polls';
import { useDashboardData } from '../../hooks/useDashboardData';
import '../../base.css';
import './dashboard.css';

function Dashboard() {
  const { questions, users, answeredIds, unansweredIds, handleSaveAnswer } =
    useDashboardData();
  const [isAnswered, setIsAnswered] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const history = useHistory();

  function sendingSelection(e, questionId) {
    e.preventDefault();
    history.push(`/questions/${questionId}`);
    handleSaveAnswer(questionId, selectedOption.selectedOption);
  }

  function selectionChange(e) {
    setSelectedOption({
      selectedOption: e.target.value,
    });
  }

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
        ? answeredIds.map((answeredId, index) => (
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
          ))
        : unansweredIds.map((unansweredId, index) => (
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
          ))}
    </section>
  );
}

export default Dashboard;
