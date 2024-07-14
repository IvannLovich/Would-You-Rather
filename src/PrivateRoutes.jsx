import { Route, Redirect } from 'react-router-dom';
import { useDashboardData } from './hooks/useDashboardData';

function PrivateRoutes({ component: Component, ...rest }) {
  const { loggedUser } = useDashboardData();

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

export default PrivateRoutes;
