function Polls({
  users,
  questions,
  questionId,
  answered,
  selectedOption,
  history,
  selectionChange,
  sendingSelection,
}) {
  return (
    <section className="polls">
      <div
        className={`polls__cards ${
          answered ? 'polls--answered' : 'polls--unanswered'
        }`}
        onClick={
          answered ? () => history.push(`/questions/${questionId}`) : undefined
        }
      >
        <div className="polls__text">
          {users[questions[questionId].author].name} want to know:
          <hr />
          <div>Would you rather:</div>
          <br />
          {answered ? (
            <>
              <strong>{questions[questionId].optionOne.text}</strong>
              <div>or</div>
              <strong>{questions[questionId].optionTwo.text}</strong>
            </>
          ) : (
            <form
              className="polls__form"
              onSubmit={(e) => sendingSelection(e, questionId)}
            >
              <div className="polls__select-options-container">
                <div className="polls__select-options">
                  <span>
                    <strong>{questions[questionId].optionOne.text}</strong>
                  </span>
                </div>
                <div className="polls__select-options">
                  <span>
                    <strong>{questions[questionId].optionTwo.text}</strong>
                  </span>
                </div>
                <div  className="polls__buttons">
                  <input
                    type="radio"
                    name="question"
                    value="optionOne"
                    onChange={selectionChange}
                  />
                  <input
                    type="radio"
                    name="question"
                    value="optionTwo"
                    onChange={selectionChange}
                  />
                </div>
              </div>

              <button
                className="qts-button"
                disabled={selectedOption === '' && true}
              >
                Send
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

export default Polls;
