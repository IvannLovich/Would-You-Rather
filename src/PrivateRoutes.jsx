import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function PrivateRoutes({ component: Component, loggedUser, ...rest }) {
  console.log(rest);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedUser ? <Component {...props} /> : <Redirect to="/404" />
      }
    />
  );
}

function mapStateToProps({ loggedUser }) {
  return {
    loggedUser,
  };
}

export default connect(mapStateToProps)(PrivateRoutes);
