import { useHistory } from 'react-router-dom';

function NotFoundPage() {
  const history = useHistory();
  return (
    <>
      <section className="not-login-page">
        <h1>404 Page not found</h1>
        <h3>You need to login first!</h3>
        <button className="not-login-page__button" type="button" onClick={() => history.push('/')}>
          Back to Login
        </button>
      </section>
    </>
  );
}

export default NotFoundPage;
