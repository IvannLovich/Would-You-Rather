import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from './Pages/Login/Login';
import PrivateRoutes from './PrivateRoutes';
import Dashboard from './Pages/Dashboard/Dashboard';
import NavBar from './components/NavBar/NavBar';
import PollDetail from './Pages/PollDetail/PollDetail';
import NewQuestion from './components/NewQuestion/NewQuestion';
import ScoreBoard from './Pages/ScoreBoard/ScoreBoard';
import NotFoundPage from './Pages/NotFound/NotFoundPage';



function App({ loggedUser }) {
  console.log('--->', loggedUser);
  return (
    <BrowserRouter>
      {loggedUser !== null && <NavBar />}
      <Route
        exact
        path="/404"
        component={loggedUser === null && NotFoundPage}
      />
      <Route exact path="/" component={loggedUser === null && Login} />
      <PrivateRoutes
        exact
        path="/questions"
        component={loggedUser !== null && Dashboard}
      />
      <PrivateRoutes
        exact
        path="/questions/:id"
        component={loggedUser !== null && PollDetail}
      />
      <PrivateRoutes
        exact
        path="/new"
        component={loggedUser !== null && NewQuestion}
      />
      <PrivateRoutes
        exact
        path="/board"
        component={loggedUser !== null && ScoreBoard}
      />
    </BrowserRouter>
  );
}

function mapStateToProps({loggedUser}) {
  return {
    loggedUser,
  };
}

export default connect(mapStateToProps, null)(App);
