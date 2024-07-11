import { useHistory } from 'react-router-dom';
import { useDashboardData } from '../../hooks/useDashboardData';

import './nav.css';

function NavBar() {
  const history = useHistory();
  const { users, loggedUser, handleSetAuthUser } = useDashboardData();

  return (
    <nav className="nav">
      <div className="nav__right">
        <h2>{users[loggedUser].name}</h2>
        <span
          onClick={() => {
            history.push('/');
            handleSetAuthUser(null);
          }}
        >
          Log out
        </span>
      </div>
      <ul className="nav__left">
        <li>
          <span onClick={() => history.push('/new')}>New question</span>
        </li>
        <li>
          <span onClick={() => history.push('/questions')}>Home</span>
        </li>
        <li>
          <span onClick={() => history.push('/board')}>Leader Board</span>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
