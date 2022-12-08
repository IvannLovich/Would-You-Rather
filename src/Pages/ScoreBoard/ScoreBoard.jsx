import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsersData } from '../../actions/data';

import './scores.css';

function ScoreBoard({ getUsersData, users }) {
  useEffect(() => {
    getUsersData();
  }, []);

  function sortScores() {
    return Object.keys(users.usersScores).sort(
      (a, b) => users.usersScores[b].total - users.usersScores[a].total,
    );
  }

  return (
    <section className="score-board">
      <table className="score-board__table">
        <tr>
          <th>User Name</th>
          <th>Total Score</th>
        </tr>
        {sortScores().map((userId) => {
          return (
            <tr>
              <td>{users[userId].name}</td>
              <td>{users.usersScores[userId].total}</td>
            </tr>
          );
        })}
      </table>
    </section>
  );
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators({ getUsersData }, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(ScoreBoard);
