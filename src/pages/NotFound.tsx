import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

const NotFound: React.FC = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <h1>
        {error.status} – {error.statusText}
      </h1>
    );
  }

  return <h1>Something went wrong</h1>;
};

export default NotFound;
