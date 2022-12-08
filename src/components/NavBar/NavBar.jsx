import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getUsersData } from '../../actions/data';
import { handleSetAuthUser } from '../../actions/loggedUser';

import './nav.css';

function NavBar({ users, loggedUser, handleSetAuthUser, getUsersData }) {
  const history = useHistory();
  useEffect(() => {
    getUsersData();
  }, []);

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

function mapStateToProps({ users, loggedUser }) {
  return {
    users,
    loggedUser,
  };
}

function mapDispachToProps(dispatch) {
  return bindActionCreators({ handleSetAuthUser, getUsersData }, dispatch);
}

export default connect(mapStateToProps, mapDispachToProps)(NavBar);
