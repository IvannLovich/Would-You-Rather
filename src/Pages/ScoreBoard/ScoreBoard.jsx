import { useDashboardData } from '../../hooks/useDashboardData';

import './scores.css';

function ScoreBoard() {
  const { users } = useDashboardData();

  function sortScores() {
    return Object.keys(users.usersScores).sort(
      (a, b) => users.usersScores[b].total - users.usersScores[a].total
    );
  }

  return (
    <section className="score-board">
      <table className="score-board__table">
        <thead>
          <tr>
            <th>User Name</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {sortScores().map((userId) => {
            return (
              <tr key={userId}>
                <td>{users[userId].name}</td>
                <td>{users.usersScores[userId].total}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default ScoreBoard;
