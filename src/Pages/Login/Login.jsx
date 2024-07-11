import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDashboardData } from '../../hooks/useDashboardData';

import John from '../../public/Images/gamer.png';
import Sarah from '../../public/Images/woman.png';
import Tyler from '../../public/Images/man.png';

import '../../base.css';
import './users.css';

function Login() {
  const history = useHistory();
  const { users, handleSetAuthUser } = useDashboardData();

  function userAvatar(userId) {
    switch (userId) {
      case 'sarahedo':
        return Sarah;
      case 'johndoe':
        return John;
      case 'tylermcginnis':
        return Tyler;
      default:
        return '';
    }
  }

  return (
    <section className="main-content">
      <h1>Welcome to Would You Rather Game</h1>
      <div className="users-login">
        {users.usersIds.map((usId, index) => {
          return (
            <div
              className="users-login__user"
              key={index}
              onClick={() => {
                handleSetAuthUser(users[usId].id);
                history.push('/questions');
              }}
            >
              <div className="users-login__avatar">
                <img src={`${userAvatar(users[usId].id)}`} alt="Users Avatar" />
              </div>

              {users[usId].name}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Login;
