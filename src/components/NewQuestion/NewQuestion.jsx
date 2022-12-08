import { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { handleSaveQuestion } from '../../actions/questions';
import './new-question.css';

function NewQuestion({ handleSaveQuestion }) {
  const history = useHistory();
  const [options, setOptions] = useState({ optionOne: '', optionTwo: '' });

  const { optionOne, optionTwo } = options;

  function sendingQuestion(e) {
    const { optionOne, optionTwo } = options;
    e.preventDefault();
    history.push('/questions');
    return handleSaveQuestion(optionOne, optionTwo);
  }

  function optionChange(e) {
    setOptions({ ...options, [e.target.name]: e.target.value });
  }

  return (
    <div className="new-poll-form">
      <h1>Would you rather...</h1>
      <form onSubmit={sendingQuestion}>
        <input
          type="text"
          name="optionOne"
          placeholder="Enter option one"
          value={optionOne}
          onChange={optionChange}
        />

        <div>or</div>

        <input
          type="text"
          name="optionTwo"
          placeholder="Enter option two"
          value={optionTwo}
          onChange={optionChange}
        />
        <br />
        <br />
        <div>
          <button
            className="button-new-poll"
            disabled={
              options.optionOne === '' || (options.optionTwo === '' && true)
            }
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
}

function mapDispachToProps(dispatch) {
  return bindActionCreators({ handleSaveQuestion }, dispatch);
}

export default connect(null, mapDispachToProps)(NewQuestion);
