import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// import checkAuthorization from '../utlities/authenticationUtilities.js';

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth) return <Component {...props} />;
        if (!auth)
          return (
            <Redirect to={{ path: '/', state: { from: props.location } }} />
          );
      }}
    />
  );
};

export default ProtectedRoute;
